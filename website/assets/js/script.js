/*----------------------------------------------------
	FARINA - BAKERY / CAKERY / RESTAURANT TEMPLATE.

	Author:			theme_div
	Type:          	JS
	Last Update:   	10.09.2019

	[Table of contents]
	1. Slider
	2. Animate on scroll
	3. Masonry gallery
	3. Mobile Menu (open/close)
	4. Menu tabs
	5. On Page Nav
	6. Form submission
	8. Functions
		8.1. Validate E-mail

----------------------------------------------------*/

(function ($) {
	"use strict";

	/*==== 1. Slider  ====*/
	var $sliderHeroCont = $('.js-hero-slider');
	if($sliderHeroCont.length) {
		$sliderHeroCont.slick({
			autoplay: true,
			autoplaySpeed: 2000,
			infinite: true,
			arrows: false,
			dots: true,
			fade: true,
			speed: 800
		});
	}

	var $sliderCont = $('.js-slider');
	if($sliderCont.length) {
		$sliderCont.slick({
			slidesToShow: 3,
			slide: '.js-slide',
			autoplay: true,
			prevArrow: '.js-arrow-prev',
			nextArrow: '.js-arrow-next',
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	}
	
	var $slider1Cont = $('.js-slider-1');
	if($slider1Cont.length) {
		$slider1Cont.slick({
			slidesToShow: 1,
			slide: '.js-slide',
			autoplay: true,
			arrows: false,
			dots: true
		});
	}


	/*==== 2. Animate on Scroll ====*/
	AOS.init({
		disable: 'mobile',
		duration: 1400, // values from 0 to 3000, with step 50ms
		easing: 'ease', // default easing for AOS animations
		once: true, // whether animation should happen only once - while scrolling down
	});


	/*==== 3. Masonry gallery ====*/
	var $gridCont = $('.grid');
	if($gridCont.length) {
		var $grid = $gridCont.masonry({
			itemSelector: '.grid-item',
			//columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
		});
	
		// layout Masonry after each image loads
		$grid.imagesLoaded().progress( function() {
			$grid.masonry('layout');
		});
	}
	
	/*==== 3. Mobile menu (open/close) ====*/
	$(document).on('click', '.js-open-mobile-nav', function(e) {
		e.preventDefault();
		var $self = $(this);
		var $icon = $('.icon', $self);
		var iconName = $icon.attr('name');

		var iconAttr = (iconName == 'menu' ? 'close' : 'menu');
		$icon.attr('name', iconAttr);
		$('.js-mobile-nav').slideToggle('slow');
		$icon.toggleClass('icon--black');

	} );

	$(document).on('click', '.js-open-submenu', function(e) {
		e.preventDefault();
		var $self = $(this);

		$self.toggleClass('active');
		$self.siblings( '.js-submenu' ).slideToggle();

	} );

	/*==== 4. Menu tabs ====*/
	$(document).on('click', '.js-menu-link', function(e) {
		e.preventDefault();

		var $self = $(this);
		$('.js-menu-link').removeClass('u-color-primary');
		$self.addClass('u-color-primary');
		var target = $(this).attr('href');

		$('.js-menu-tab').hide();
		$(target).fadeIn();
	});

	/*==== 5. On Page Nav ====*/
	$(document).on('click', '.js-on-page-nav', function(e) {
		e.preventDefault();

		var target = $(this).attr('href');
		console.log(target);

		$('html, body').animate({
			scrollTop: $(target).offset().top - 100
		}, 1000);
	})

	/*==== 6. Form submission ====*/
	$('.js-form').on('submit', function(e) {
		e.preventDefault();
		var $form = $(this);
		var action = $form.attr('action');

		var email = $('.js-email').val()
		var emailValidation = validateEmail(email);

		if(!emailValidation) {
			$('.js-email').addClass('error');
			$('.js-email-error').show();
			return false;
		}

		var formData = $form.serialize();
		$('.js-email').removeClass('error');
		$('.js-email-error').hide();

		$.ajax({
			type: 'POST',
			url: action,
			data: formData
		})
		.done(function(response) {
			$('.js-form').hide();
			$('.js-form-confirmation').show();
		})
	} );

	/*==== 8. Functions ====*/
	// 8.1. Validate Email
	function validateEmail( email ) {
		var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test( String( email ).toLowerCase() );
	}

}(jQuery));
