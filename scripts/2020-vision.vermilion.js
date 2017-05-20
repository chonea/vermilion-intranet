/*
 * 2020 Vision JS
 */
 
(function($){
	$(document).ready(function(){

		// This isn't loaded until the SVG is loaded	
		function loadSVGFunctions(svg) {

			function moveSlice(obj, moveX, moveY, contentObj) {
				// hide all slice content
				$('#vision-2020-content').find('div').fadeOut(100);
				// if the selected slice is the active slice...
				if ($(activeObj).attr('id') == $(obj).attr('id')) {
					// ...reset the pie
					$('.slice').animate({
						opacity: 1.0,
						svgTransform: 'translate(0,0)'
					}, {duration: 250, queue: false});
					// ...unset the selected slice
					activeObj = null;
				// if we're selecting a new slice...
				} else {
					// ...push all other slices back in and fade out
					$('.slice').not(obj).animate({
						opacity: 0.35,
						svgTransform: 'translate(0,0)'
					}, {duration: 250, queue: false});
					// ...pull out selected slice and fade in
					$(obj).animate({
						opacity: 1.0,
						svgTransform: 'translate(' + moveX + ',' + moveY + ')'
					}, {duration: 250, queue: false});
					// ...save the selected slice
					activeObj = obj;
					// ...show selected slice's content
					$(contentObj).stop(true,true).fadeIn({duration: 500, queue: false});
				}
			}
			var activeObj = null;
			$('#vision-2020-svg .slice').click(function() {
				// when the pie is clicked, scroll the screen up so content is visible
				$('html, body').stop(true,true).animate({scrollTop: $("#vision-2020").offset().top - 20}, {duration: 500, queue: false});
			});
			$('#svg-extraordinary-people').click(function() {
				moveSlice($(this), 15.0, -27.71281, $('#vision-2020-content-people'));
			});
			$('#svg-best-in-class-health-safety-environment').click(function() {
				moveSlice($(this), 32, 0, $('#vision-2020-content-health-safety-environment'));
			});
			$('#svg-top-quartile-shareholder-returns').click(function() {
				moveSlice($(this), 15.0, 27.71281, $('#vision-2020-content-shareholder-returns'));
			});
			$('#svg-robust-portfolio').click(function() {
				moveSlice($(this), -15.0, 27.71281, $('#vision-2020-content-robust-portfolio'));
			});
			$('#svg-operational-excellence').click(function() {
				moveSlice($(this), -32, 0, $('#vision-2020-content-operational-excellence'));
			});
			$('#svg-entrepreneurial-approach').click(function() {
				moveSlice($(this), -15.0, -27.71281, $('#vision-2020-content-entrepreneurial-approach'));
			});
			$("path.svg-background").mouseenter(function() {
					$(this).attr("fill", "#ff0000");
			 });
			$("path.svg-background").mouseleave(function() {
					$(this).attr("fill", "#ccc");
			 });
		} // end loadSVGFunctions

		if ($('body').hasClass('lang-fr')) {
			svgLoadURL = 'images/vision-2020/outlined_french.svg';
		} else {
			svgLoadURL = 'images/vision-2020/outlined_english.svg';
		}

		$('#vision-2020-graphic').svg({ 
			loadURL: svgLoadURL, // External document to load 
			onLoad: loadSVGFunctions, // Callback once loaded 
			settings: {
				addTo: true,
				changeSize: false
			}, // Additional settings for SVG element 
			initPath: '' // Initial path for blank document 
		});

	});
})(jQuery);