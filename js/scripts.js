/*
*   Author: bslthemes
*   Author URL: http://themeforest.net/user/bslthemes
*   Version: 2.7
*/


/*
	Preloader - Removed
*/

$(function () {
	'use strict';


	/*
		Vars
	*/

	var width = $(window).width();
	var height = $(window).height();


	/*
		Typed
	*/

	$('.subtitle.subtitle-typed').each(function(){
		var subtitleContainer = $(this);

		subtitleContainer.typed({
			stringsElement: subtitleContainer.find('.typing-title'),
			backDelay: 3500, /* Delay in text change */
			typeSpeed: 0, /* Typing speed */
			loop: true
		});
	});


	/*
		Sidebar Show/Hide
	*/

	$('header, .profile').on('click', '.menu-btn', function(){
		$('.s_overlay').fadeIn();
		$('.content-sidebar').addClass('active');
		$('body,html').addClass('sidebar-open');
		return false;
	});
	$('.content-sidebar, .container').on('click', '.close, .s_overlay', function(){
		$('.s_overlay').fadeOut();
		$('.content-sidebar').removeClass('active');
		$('body,html').removeClass('sidebar-open');
	});


	/*
		Popup Menu Navigation
	*/

	$('.main-menu li.page_item_has_children').each(function(){
		$(this).find('> a').after('<span class="children_toggle"></span>');
	});
	$('.main-menu').on('click', '.children_toggle', function(){
		var main_menu_item = $(this).closest('.page_item_has_children');
		if(main_menu_item.hasClass('open')) {
			main_menu_item.removeClass('open');
			main_menu_item.find('> ul').slideUp(250);
		} else {
			main_menu_item.addClass('open');
			main_menu_item.find('> ul').slideDown(250);
		}
	});


	/*
		Default Menu
	*/

	$('.lnk-view-menu').on('click', function(){
		var btn_text1 = $(this).find('.text').text();
		var btn_text2 = $(this).find('.text').data('text-open');
		if($('.profile').hasClass('default-menu-open')){
			$('.profile').removeClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		} else {
			$('.profile').addClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		}

		return false;
	});


	/*
		Header Menu Desktop
	*/

	var container = $('.container');
	var card_items = $('.card-inner');
	var animation_in = container.data('animation-in');
	var animation_out = container.data('animation-out');

	$('.top-menu').on('click', 'a', function(){

		/* vars */
		var custom_width = 1024;
		var width = $(window).width();
		var id = $(this).attr('href');
		var h = parseFloat($(id).offset().top);
		var card_item = $(id);
		var menu_items = $('.top-menu li');
		var menu_item = $(this).closest('li');
		var d_lnk = $('.lnks .lnk.discover');

		if($('.new-skin').length) {
		custom_width = 1200;
		}
		if(!$('.new-skin').length) {
		custom_width = 1024;
		}

		if((width >= custom_width)) {

			/* if desktop */
			if(!menu_item.hasClass('active') & (width > 1023) & $('#home').length) {

				/* close card items */
				menu_items.removeClass('active');
				container.find(card_items).removeClass('animated '+animation_in);

				if($(container).hasClass('opened')) {
					container.find(card_items).addClass('animated '+animation_out);
				}

				/* open card item */
				menu_item.addClass('active');
				container.addClass('opened');
				container.find(card_item).removeClass('animated '+animation_out);
				container.find(card_item).addClass('animated '+animation_in);

				$(card_items).addClass('hidden');

				$(card_item).removeClass('hidden');
				$(card_item).addClass('active');
			}
		}
		/* if tablet */
		if((width < custom_width) & (width > 560) & $('#home').length) {

			/* scroll to section */
			$('body,html').animate({
				scrollTop: h
			}, 800);
		}
		/* if mobile */
		if((width < 561) & $('#home').length) {

			/* scroll to section */
			$('body,html').animate({
				scrollTop: h - $('.header').height()
			}, 800);
		}

		return false;
	});
	if((width >= 1200)) {
	if (window.location.hash) {
		// Find the entry in the menu corresponding to the hash in the address bar url
		$('.top-menu a[href=\'' + window.location.hash + '\']')
			.find('.link')
			.trigger('click');
	
		if (window.location.hash == '#about') {
			history.replaceState(null, null, ' ');
		}
	}
	}

	$(window).on('resize', function(){
		var width = $(window).width();
		var height = $(window).height();
		var custom_width = 1024;

		if($('.new-skin').length) {
		custom_width = 1200;
		}
		if(!$('.new-skin').length) {
		custom_width = 1024;
		}
		if((width < custom_width)) {
			$('.card-inner').removeClass('hidden');
			$('.card-inner').removeClass('fadeOutLeft');
			$('.card-inner').removeClass('rotateOutUpLeft');
			$('.card-inner').removeClass('rollOut');
			$('.card-inner').removeClass('jackOutTheBox');
			$('.card-inner').removeClass('fadeOut');
			$('.card-inner').removeClass('fadeOutUp');
			$('.card-inner').removeClass('animated');

			$(window).on('scroll', function(){
				var scrollPos = $(window).scrollTop();
				$('.top-menu ul li a').each(function () {
					var currLink = $(this);
					var refElement = $(currLink.attr("href"));
					if((width > 561)) {
						if (refElement.offset().top - 100 <= scrollPos) {
							$('.top-menu ul li').removeClass("active");
							currLink.closest('li').addClass("active");
						}
					} else {
						if (refElement.offset().top - $('.header').height() <= scrollPos) {
							$('.top-menu ul li').removeClass("active");
							currLink.closest('li').addClass("active");
						}
					}
				});
			});

			$('.card-inner .card-wrap').slimScroll({destroy: true});
			$('.card-inner .card-wrap').attr('style', '');
		}
		else {
			$($('.top-menu li.active a').attr('href')).addClass('active');
			if((!$('.page').hasClass('new-skin')) && (width > custom_width)) {
				$('.card-inner .card-wrap').slimScroll({
					height: '570px'
				});
			}
		}

		/*
			Dotted Skills Line On Resize Window
		*/
		setTimeout(skillsDotted_resize, 750);
	});

	/*
		Dotted Skills Line On Resize Window
	*/

	function skillsDotted_resize() {
		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
		}
	}


	/*
		Smoothscroll
	*/

	if((width < 1024) & $('#home').length) {
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if((width > 561)) {
					if (refElement.offset().top - 100 <= scrollPos) {
						$('.top-menu ul li').removeClass("active");
						currLink.closest('li').addClass("active");
					}
				} else {
					if (refElement.offset().top - $('.header').height() - 10 <= scrollPos) {
						$('.top-menu ul li').removeClass("active");
						currLink.closest('li').addClass("active");
					}
				}
			});
		});
	}


	/*
		slimScroll
	*/

	if((!$('.page').hasClass('new-skin')) && (width > 1024)) {
		$('.card-inner .card-wrap').slimScroll({
			height: '570px'
		});
	}


	/*
		Hire Button
	*/

	$('.lnks').on('click', '.lnk.discover', function(){
		var width = $(window).width();
		var custom_width = 1024;
		var card_item = $('#contacts');
		var menu_items = $('.top-menu li');

		if($('.new-skin').length) {
			custom_width = 1200;
		}

		if((width >= custom_width)) {
			/* if desktop */
			/* close card items */
			menu_items.removeClass('active');
			container.find(card_items).removeClass('animated '+animation_in);

			if($(container).hasClass('opened')) {
				container.find(card_items).addClass('animated '+animation_out);
			}

			/* open card item */
			container.addClass('opened');
			container.find(card_item).removeClass('animated '+animation_out);
			container.find(card_item).addClass('animated '+animation_in);

			$(card_items).addClass('hidden');
			$(card_item).removeClass('hidden');
			$(card_item).addClass('active');
		} else {
			/* if tablet/mobile - scroll to contact form */
			var h = parseFloat(card_item.offset().top);
			if(width < 561) {
				$('body,html').animate({
					scrollTop: h - $('.header').height()
				}, 800);
			} else {
				$('body,html').animate({
					scrollTop: h
				}, 800);
			}
		}
		return false;
	});


	/*
		Initialize Portfolio - REMOVED (no portfolio grid items in HTML)
	*/


	/*
		Filter items on button click - REMOVED (no filter buttons in HTML)
	*/


	/*
		Gallery popup - REMOVED (no gallery items in HTML)
	*/


	/*
		Media popup - REMOVED (no popup media in HTML)
	*/


	/*
		Image popup - REMOVED (no popup images in HTML)
	*/


	/*
		Video popup - REMOVED (no popup videos in HTML)
	*/


	/*
		Music popup - REMOVED (no popup music in HTML)
	*/


	/*
		Gallery popup - REMOVED (no gallery popups in HTML)
	*/


	/*
		Web3Forms Contact Form Handler
	*/

	$("#cform").on('submit', function(e) {
		e.preventDefault();
		
		var form = $(this);
		var submitBtn = form.find('button[type="submit"]');
		var submitText = submitBtn.find('.text');
		var originalText = submitText.text();
		
		// Basic validation check
		var name = form.find('input[name="name"]').val().trim();
		var email = form.find('input[name="email"]').val().trim();
		var message = form.find('textarea[name="message"]').val().trim();
		
		if(!name || !email || !message) {
			$('.alert-error').html('<p>❌ Please fill in all required fields.</p>').fadeIn(400);
			setTimeout(function() {
				$('.alert-error').fadeOut(400);
			}, 5000);
			return false;
		}
		
		// Disable submit button and show loading
		submitBtn.prop('disabled', true);
		submitText.text('Sending...');
		
		// Hide previous messages
		$('.alert-success, .alert-error').fadeOut();
		
		$.ajax({
			url: form.attr('action'),
			method: 'POST',
			data: form.serialize(),
			dataType: 'json',
			success: function(response) {
				if(response.success) {
					// Show success message with animation
					$('.alert-success').fadeIn(400);
					// Reset form
					form[0].reset();
					// Keep message visible for 8 seconds
					setTimeout(function() {
						$('.alert-success').fadeOut(400);
					}, 8000);
				} else {
					// Show error message
					$('.alert-error').html('<p>❌ ' + (response.message || 'Something went wrong. Please try again.') + '</p>').fadeIn(400);
					setTimeout(function() {
						$('.alert-error').fadeOut(400);
					}, 8000);
				}
			},
			error: function(xhr, status, error) {
				// Show error message with details
				console.error('Form submission error:', error);
				$('.alert-error').html('<p>❌ Failed to send message. Please check your internet connection or try again later.</p>').fadeIn(400);
				setTimeout(function() {
					$('.alert-error').fadeOut(400);
				}, 8000);
			},
			complete: function() {
				// Re-enable submit button
				submitBtn.prop('disabled', false);
				submitText.text(originalText);
			}
		});
	});


	/*
		Testimonials Carousel - REMOVED (no testimonials carousel in HTML)
	*/


	/*
		Dotted/Circle Skills - REMOVED (not using dotted/circle skills visualization)
	*/

	/*
		Wrap First Title Word
	*/

	$('.content .title').each(function(index) {
	    var title = $(this).text().split(' ');
	    if(title.length>1){
		    var firstWord = title[0];
		    var replaceWord = '<span class="first-word">' + firstWord + '</span>';
		    var newString = $(this).html().replace(firstWord, replaceWord);
		    $(this).html(newString);
		} else {
			$(this).html('<div class="first-letter">'+ $(this).html() + '</div>');
		}
	});

});

