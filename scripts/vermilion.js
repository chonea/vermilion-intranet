/*
 *  submit the search form
 */
function submitSearch () {
	if (document.searchform.searchkey.value) document.searchform.submit();
}

// on load
(function($) {

	/*
	 *  replace the checkboxes with the images
	 */
	$(document).ready(function() {

		$('#search-form label').wrapInner('<div style="position: relative; height: 16px; width: 100%;" />');
		$('#search-form label div').each(function(){
			$(this).wrapInner('<div style="float: left;" />');
			var labelHeight = $(this).contents().height();
			$(this).find('div').css('marginTop' , '-' + (labelHeight - 12) + 'px');
		});

		$('.radio input').each(function() {
			if (this.checked) {
				$(this).parent().addClass('selected');
			}
		});
		$('.radio').click(function() {
			var thisRadio = this;
			// clear radios
			$('.radio input').each(function() {
				$(this).attr('checked', false);
			});
			$('.radio').removeClass('selected');
			// select current radio
			$(thisRadio).find('input').attr('checked', true);
			$(thisRadio).addClass('selected');
		});
	});


	/*
	 *  block tabs
	 */
	$(document).ready(function() {

		$('.tab').hide();
		$('.tab > h2').hide();
		$('.tabs').each(function(){
			var thisTabs = $(this);
			$(thisTabs).before('<ul class="tab-list"></ul>');
			$(thisTabs).find('.tab > h2').each(function() {
				var tabName = $(this).text();
				var newTab = '<li>' + tabName + '</li>';
				$(newTab).appendTo($(thisTabs).prev('ul.tab-list'));
			});
			$(thisTabs).prev('ul.tab-list').addClass('tabs-' + $(thisTabs).prev('ul.tab-list').find('li').length);
			//$(this).prev('.tab-list').find('h2').show();
			$(thisTabs).find('.tab').first().show();
			$(thisTabs).prev('ul.tab-list').find('li').first().addClass('active-tab');
		});

		$('.tab-list li').click(function() {
			var thisTab = $(this);
			if (!$(thisTab).hasClass('active-tab')) {
				var thisTabIndex = $(this).index();
				var thisTabList = $(this).parent();
				var thisTabs = $(thisTabList).next('.tabs');
				var thatTabIndex = $(thisTab).siblings('.active-tab').index();
				$(thisTab).siblings().removeClass('active-tab');
				$(thisTab).addClass('active-tab');
				$(thisTabs).find('.tab').hide();
				//$('.tab:nth-child(' + (thisTabIndex+1) + ')', thisTabs).show();
				
				if (thisTabIndex >= thatTabIndex) {
					$('.tab:nth-child(' + (thisTabIndex+1) + ')', thisTabs).show('slide', {direction: 'right'}, 400);
				} else {
					$('.tab:nth-child(' + (thisTabIndex+1) + ')', thisTabs).show('slide', {direction: 'left'}, 400);
				}
			}
		});

		$("ul#main-menu li").hover(function() {
			var timeout = $(this).data("timeout");
			if(timeout) clearTimeout(timeout);
				$(this).find("ul").fadeIn();
			}, function() {
				$(this).data("timeout", setTimeout($.proxy(function() {
				$(this).find("ul").fadeOut();
			}, this), 500));
		});
		$(document).click(function() {
				$('ul#main-menu li ul:visible').hide();
		});


	});


	/*
	 *  format event dates
	 */
	$(document).ready(function() {
		$('#events-block').find('.post').each(function() {
			var thisPost = $(this);
			var dateString = $(thisPost).find('h4').first().text();
			var dateParts = dateString.split(' ');
			$(thisPost).find('h4').first().html('<span class="event-post-month">' + dateParts[0] + '</span>' + '<span class="event-post-day">' + dateParts[1] + '</span>');
			$(thisPost).find('h4').first().prependTo(thisPost);
		});
	});
	

	/*
	 *  set equal heights on vermillion data section of home page
	 */
	$(document).ready(function() {
		var vdHeight = $('#vermilion-data').height();
		$('#vermilion-data .content-column').height(vdHeight);
	});


	/*
	 *  fancybox
	 */
	$(document).ready(function() {
		if ($.isFunction($.fn.fancybox)) {
			$(".fancybox").fancybox();
		}
	});


	/*
	 *  flexslider
	 */
	$(window).load(function() {
		if ($.isFunction($.fn.flexslider)) {

			// home page quickmenu
			if ($('#quick-menu li').length > 10) {
				$('#quick-menu-container').flexslider({
					animation: "slide",
					controlNav: false,
					animationLoop: true,
					slideshow: false,
					itemWidth: 85,
					itemMargin: 20,
					minItems: 1,
					maxItems: 10,
				});
			}

			// home page slider
			$('#slider').flexslider({
				animation: "fade",
				controlNav: "thumbnails",
				pauseOnHover: true,
				directionNav: false,
				start: function(slider) {
					$('ol.flex-control-thumbs li:eq(' + slider.currentSlide + ') img').animate({
						marginTop: '+=30px'
					}, 200, function() {
						// Animation complete.
					});
					var caption = $(slider.slides[0]).find('.flex-caption').html();
					$('#manual-slider-caption #slider-caption').html(caption);
					$('#manual-slider-caption #slider-caption').fadeIn();
				},
				before: function(slider) {
					$('ol.flex-control-thumbs li:eq(' + slider.currentSlide + ') img').animate({
						marginTop: '-=30px'
					}, 200, function() {
						// Animation complete.
					});
					$('#manual-slider-caption #slider-caption').fadeOut();
					$('#manual-slider-caption #slider-caption').html('');
				},
				after: function(slider) {
					$('ol.flex-control-thumbs li:eq(' + slider.currentSlide + ') img').animate({
						marginTop: '+=30px'
					}, 200, function() {
						// Animation complete.
					});
					var caption = $(slider.slides[slider.currentSlide]).find('.flex-caption').html();
					$('#manual-slider-caption #slider-caption').html(caption);
					$('#manual-slider-caption #slider-caption').fadeIn();
					//customSlider.setCurSlide(slider.currentSlide);
				},
			});
			$('ol.flex-control-thumbs li img').mouseenter(function(){
				if (!$(this).hasClass('flex-active')) {
					$(this).animate({
						marginTop: '-=30px'
					}, 400, function() {
						// Animation complete.
					});
				}
			});
			$('ol.flex-control-thumbs li img').mouseleave(function(){
				if (!$(this).hasClass('flex-active')) {
					$(this).animate({
						marginTop: '+=30px'
					}, 100, function() {
						// Animation complete.
					});
				}
			});
			$('ol.flex-control-thumbs li img').click(function(){
				if (!$(this).hasClass('flex-active')) {
					$(this).animate({
						marginTop: '+=30px'
					}, 50, function() {
						// Animation complete.
					});
				}
			});
			$('#slider-container .slider-prev').click(function(){
				$('#slider-container .flexslider').flexslider('prev');
			});
			$('.slider-next').click(function(){
				$('#slider-container .flexslider').flexslider('next');
			});

		}
  });
})(jQuery);