import 'dom4'
import 'svgxuse'
import domready from 'domready'
import Intro from '../intro'

domready(function () {
  // Initialize the intro component
  new Intro(document.query('.intro'))
})
