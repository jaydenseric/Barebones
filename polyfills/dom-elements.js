// https://github.com/barberboy/dom-elements
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.domElements=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// as it is a circular dependency, we need to keep `module.exports` on top.
module.exports = Elements;

var pushUniq = _dereq_('../utils/pushuniq');
var elementsPrototype = Elements.prototype = [];
var methods = _dereq_('../methods');

function Elements() {}

// Elements.queryAll(selector);
elementsPrototype.queryAll = function (selector) {
  var pusher = pushUniq();
  return this.reduce(function(results, element){
    return pusher(methods.queryAll.call(element, selector));
  }, null);
};

// Elements.query(selector);
elementsPrototype.query = function (selector) {
  return elementsPrototype.queryAll.call(this, selector)[0] || null;
};

},{"../methods":5,"../utils/pushuniq":11}],2:[function(_dereq_,module,exports){
var methods = _dereq_('./methods');
var isNative = _dereq_('./utils/is-native');
var array = [];

if (
  typeof Document === 'undefined' ||
  !('map' in array) ||
  !('reduce' in array) ||
  !('querySelectorAll' in document)
) {
  throw new TypeError('Missing browser features to initiantiate dom-elements');
}

if('Element' in window) {
  if(!isNative(Element.prototype, 'query')) {
    Element.prototype.query = methods.query;
  }
  if(!isNative(Element.prototype, 'queryAll')) {
    Element.prototype.queryAll = methods.queryAll;
  }
}


['Document', 'DocumentFragment'].forEach(function (ParentNode) {
  var prototype;
  // Don't throw errors if these globals don't exist — just move on.
  if (!(ParentNode in window)) {
    return;
  }
  prototype = window[ParentNode].prototype;
  if (!isNative(prototype, 'query')) {
    prototype.query = methods.queryWrapper;
  }
  if (!isNative(prototype, 'queryAll')) {
    prototype.queryAll = methods.queryAllWrapper;
  }
});

},{"./methods":5,"./utils/is-native":10}],3:[function(_dereq_,module,exports){
var attributeName = _dereq_('./attribute-name');

module.exports = function (attributeValue) {
  return function (item){
    return '[' + attributeName + '="' + attributeValue + '"] ' + item;
  };
};

},{"./attribute-name":4}],4:[function(_dereq_,module,exports){
module.exports = 'data-dom-elements-id-' + _dereq_('../utils/expando');

},{"../utils/expando":9}],5:[function(_dereq_,module,exports){
var scope = _dereq_('../scope');
var supportsScoped = _dereq_('../scope/support');
var methods = module.exports = {};
var Elements = _dereq_('../elements');
var toArray = _dereq_('../utils/to-array');
var attributeName = _dereq_('./attribute-name');
var scopeSelector = _dereq_('./scope-selector');
var absolutizeSelector = _dereq_('./absolutize-selector');
var unique = -1;

methods.query = function(selector){
  return methods.queryAll.call(this, selector)[0] || null;
};

methods.queryAll = function(sourceSelector){
  var element = this;
  var elements;
  var selector;
  var result;
  if(!supportsScoped) {
    element.setAttribute(attributeName, ++unique);
  }
  selector = supportsScoped ?
    scope(sourceSelector, scopeSelector) :
    scope(sourceSelector, absolutizeSelector(unique));
  elements = element.querySelectorAll(selector);
  if (!supportsScoped) {
    element.removeAttribute(attributeName);
  }
  result = new Elements();
  result.push.apply(result, toArray(elements));
  return result;
};

methods.queryAllWrapper = function(selector){
  var elements = this.querySelectorAll(selector);
  var result = new Elements();
  result.push.apply(result, toArray(elements));
  return result;
};

methods.queryWrapper = function(selector){
  return this.querySelector(selector);
};

},{"../elements":1,"../scope":7,"../scope/support":8,"../utils/to-array":13,"./absolutize-selector":3,"./attribute-name":4,"./scope-selector":6}],6:[function(_dereq_,module,exports){
module.exports = function (item) {
  return ':scoped ' + item;
};

},{}],7:[function(_dereq_,module,exports){
var separateSelector = _dereq_('../utils/separate-selector');

module.exports = function(selector, method){
  var selectors = separateSelector(selector);
  var scopedSelectors = selectors.map(method);
  return scopedSelectors.join();
};

},{"../utils/separate-selector":12}],8:[function(_dereq_,module,exports){
try {
  document.createElement('i').querySelector(':scoped *');
  module.exports = true;
} catch (e) {
  module.exports = false;
}

},{}],9:[function(_dereq_,module,exports){
module.exports = String(Math.random()).replace(/\D/g, '');

},{}],10:[function(_dereq_,module,exports){
var nativeToString = Function.prototype.toString;
var nativeQuerySelector = nativeToString.call(document.querySelector);
var nameRE = /\bquerySelector\b/g;

module.exports = function(context, name){
  if (!context[name]) {
    return false;
  }
  return (
    nativeToString.call(context[name]) ===
    nativeQuerySelector.replace(nameRE, name)
  );
};

},{}],11:[function(_dereq_,module,exports){
var Elements = _dereq_('../elements');
var expando = _dereq_('./expando');
var propertyName = 'domElementsId' + expando;
var id = -1;

/**
 * pushUniq
 *
 * returns a function that pushes elements not yet in `target`.
 * as the internal API only uses it before making the array
 * available, we can use a `map` cache to store the elements
 * already in the newly built array, letting us prevent extensive looping.
 */
module.exports = function (original) {
  var target = new Elements();
  var map = {};

  function pusher(source) {
    var index = -1;
    var length = source.length;
    var item;
    while (++index < length) {
      item = source[index];
      if (!item || item.nodeType !== 1) {
        continue;
      }
      if (propertyName in item && map.hasOwnProperty(item[propertyName])) {
        continue;
      }
      item[propertyName] = ++id;
      map[id] = 1;
      target.push(item);
    }
    return target;
  }

  if(arguments.length) {
    pusher(original);
  }

  return pusher;
};

},{"../elements":1,"./expando":9}],12:[function(_dereq_,module,exports){
module.exports = function(selector){
  return selector.split(/\s*,\s*/);
};

},{}],13:[function(_dereq_,module,exports){
module.exports = function(nodeList){
  var index = -1;
  var length = nodeList.length;
  var array = Array(length);
  while (++index < length) {
    array[index] = nodeList[index];
  }
  return array;
};

},{}]},{},[2])
(2)
});
