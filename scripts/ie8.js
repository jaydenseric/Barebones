$(function() {

//-------------------------------------------- Fix font icons sometimes not rendering

// Source: http://stackoverflow.com/a/10557782

	var	head	= document.getElementsByTagName('head')[0],
		style	= document.createElement('style');
	style.type = 'text/css';
	style.styleSheet.cssText = ':before, :after { content: none !important }';
	head.appendChild(style);
	setTimeout(function() {
		head.removeChild(style);
	}, 0);

//-------------------------------------------- SVG to PNG fallback

	$('img[src*="svg"]').attr('src', function () {
		return $(this).attr('src').replace('.svg', '.png');
	});

});