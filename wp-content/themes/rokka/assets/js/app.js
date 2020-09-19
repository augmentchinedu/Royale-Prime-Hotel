(function($){
	'use strict';

	var $navWrapper = $('nav.navbar');

	$(document).ready(function(){
		var height = $navWrapper.height();
		if(!$navWrapper.hasClass('over-content')) {

		}
		if($(window).scrollTop() > 20) {
			$navWrapper.addClass('shrinked nav-scroll').removeClass($navWrapper.data('navStart'));
		} else {
			$navWrapper.removeClass('shrinked nav-scroll').addClass($navWrapper.data('navStart'));
		}
		rokkaNavScrollToAnchor();
		rokkaInitHotelCart();
	});

	$(window).scroll(function(){
		if($(window).scrollTop() > 20) {
			$navWrapper.addClass('shrinked nav-scroll').removeClass($navWrapper.data('navStart'));
		} else {
			$navWrapper.removeClass('shrinked nav-scroll').addClass($navWrapper.data('navStart'));
		}
		$('.animate-image').each(function(){
			if($(this).offset().top < $(window).scrollTop() + $(window).height() * 0.8) {
				$(this).addClass('loaded');
			}
		})
	});


	// Custom styles
	var styleElems = $('.custom-styles'), count = styleElems.length;
	var customStyles = '';
	styleElems.each( function(i) {
		customStyles += $(this).data('styles');
		if (!--count) rokkaInjectStyles(customStyles);
		$(this).remove();
	});

	function rokkaInjectStyles(styles) {
		$('head').append('<style>'+styles+'</style>');
	}

	$(document).ready(function(){
		rokkaBindStretchRowSide();
		rokkaStretchLeft();
	  	$('.row-slides').each(function(){
			var slides = [];
			$(this).find('div').each(function(i, el){
				var slide = $(this).data('slide');
				slides.push({'src' : slide});
			});
	  		$(this).vegas({
			    slides: slides
			});
	  	})
	});
	$(window).resize(function(){
		rokkaFooterSticky();
		rokkaSetInteractiveBox();
	});
	$(window).on('load',function(){
		TweenLite.to('.rokka-loader', 0.10, { autoAlpha: 0});
		$('.animate-image').each(function(){
			if($(this).offset().top < $(window).scrollTop() + $(window).height() * 0.8) {
				$(this).addClass('loaded');
			}
		})

		rokkaBindBookingCalendar();
		rokkaInitRowParallax();
		rokkaInitBlogStaticLoadMore();
		rokkaFooterSticky();
		rokkaInitCarousel();
		rokkaInitCountdown();
		rokkaInitCounter();
		rokkaInitGalleryCarousel();
		rokkaInitGalleryMasonry();
		rokkaSetInteractiveBox();
		rokkaChangeColorSocials();
		rokkaInitRoomSlider();
		rokkaInitHomeSlider();
		rokkaInitVideo();
		rokkaInitGallerySlider();
		rokkaOpenMobileOverlay();
		rokkaScrollToTop();
		rokkaOpenDropdownOverlayNav();

		rokkaPositionDropdown();

		$('.room-gallery').each(function(){
			var $that = $(this);
			$that.magnificPopup({
				delegate: 'a',
				type:'image', 
				gallery:{
					enabled:true
				},
			});
		});
		$('.rokka-gallery-carousel:not(.mfg-ready)').each(function(){
			$(this).addClass('mfg-ready');
			$(this).magnificPopup({
				disableOn: 0,
				delegate: 'a',
				type: 'image',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				gallery: {
					enabled: true
				}
			});
		});
		$('.rokka_video_lightbox:not(.mfg-ready) a').each(function(){

			$(this).parent().addClass('mfg-ready');
			$(this).magnificPopup({
				disableOn: 0,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
			});
		});
	
		$('.intro-post .intro-slider-content').css('margin-top',-$('.intro-post .intro-slider-content').height());
		$('.hb_room_pricing_plan_data').addClass('h5');
		$('input.hasDatepicker').attr( "autocomplete", "off" );

	});

	// Scroll to anchor
	function rokkaNavScrollToAnchor() {
		$('.menu-item a, a.btn').on('click', function(e){
			var that_link = $(this),
				link_url = that_link.attr('href'),
				link_anchor = '#'+link_url.replace(/^.*?(#|$)/,'');
			if ( link_anchor !== '#' && link_anchor ) {
				e.preventDefault();
				var current_url = window.location.href,
					current_url_hash = window.location.hash,
					new_url = link_url.replace(/#[^#]*$/, ''),
					old_url = current_url.replace(/#[^#]*$/, '');
				// case when url+hash
				if ( current_url_hash !== '' ) {
					window.history.pushState('', '', link_url);
					link_url = link_url.substring(link_url.lastIndexOf("#"));
					rokkaToAnchor(link_url);
				} else {
					//case when url has no hash
					if ( current_url === link_url ) {
						//scroll
						rokkaToAnchor(link_anchor);
					} else {
						var new_url = link_url.replace(/#[^#]*$/, ''),
							old_url = current_url.replace(/#[^#]*$/, '');
						if(new_url == old_url) {
							window.history.pushState('', '', current_url + link_anchor);
							rokkaToAnchor(link_anchor);
						} else {
							rokkaToAnchor(link_anchor);
							window.location.href = link_url;
						}
					}
				}
			}
		});
	}
	function rokkaScrollToAnchor() {
		var anchor = window.location.hash;
		if ( anchor !== '' ) {
			rokkaToAnchor(anchor);
		}
	}
	function rokkaToAnchor(anchor) {
		if(anchor === '#') {
			return false;
		}
		if($(anchor).length > 0) {
			$('.mobile-navbar-helper').removeClass('open-overlay');
			$('.mobile-navbar-overlay').removeClass('show-mobile-nav');
			$("body").removeClass('no-scroll');
			var scrollOffset = $(anchor).offset().top;
			TweenLite.to(window, 1, { scrollTo: scrollOffset, ease:Power1.easeOut, onComplete:function(){

				$('.nav-scroller').removeClass('mobile-active');
				$('.mobile-nav-helper').removeClass('active-helper');
			} });

		}
	}

	// VC Carousel
	function rokkaInitCarousel() {
		$('.rokka-carousel').each(function(){
			var $carousel = $(this),
			$autoplay = $carousel.data('autoplay'),
			$loop = $carousel.data('slide-loop'),
			$arrows = $carousel.data('arrows'),
			$slidesCount = $carousel.data('slides'),
			$pagination = $carousel.parent().find('.rokka-carousel-pagination'),
			$arrowPrev = $carousel.parent().find('.rokka-carousel-arrows .arrow-prev'),
			$arrowNext = $carousel.parent().find('.rokka-carousel-arrows .arrow-next');
			var breakpoint = '';

			$carousel.find('.swiper-wrapper').children('.vc_row').addClass('swiper-slide');
			if($autoplay == '0' || $autoplay == '' ) {
				$autoplay = false;
			} else {
				$autoplay = {delay: $autoplay};
			}
			if($slidesCount >= 3) {
				breakpoint = {
					575: {
						slidesPerView: 1,
						spaceBetween: 0,
					},
					991: {
						slidesPerView: 2,
						spaceBetween: 0,
					},
					1199: {
						slidesPerView: 3,
						spaceBetween: 0,
					}
				}
			} else if($slidesCount == 2) {
				breakpoint = {
					575: {
						slidesPerView: 1,
						spaceBetween: 0,
					},
					991: {
						slidesPerView: 2,
						spaceBetween: 0,
					},
				}
			} 
			var sliderCarousel = new Swiper($carousel, {
				speed: 2000,
				slidesPerView: $slidesCount,
				autoplay: $autoplay,
				loop: $loop,
				autoHeight: true,
				direction: 'horizontal',
				grabCursor: false,
				spaceBetween: 0,
				slideClass: 'swiper-slide',
				keyboard: {
					enabled: true,
				}, 
				pagination: {
					el: $pagination,
					type: 'bullets',
					clickable: true
				},
				navigation: {
					nextEl: $arrowNext,
					prevEl: $arrowPrev,
				},
				breakpoints: breakpoint,
				on: {
					init: function(){
						$carousel.find('.img-wrapper').addClass('loaded');
					}
				}
			});
		});
	}

	// VC Countdown
	function rokkaInitCountdown() {
		$('.rokka_countdown-dateAndTime').each(function(){
			var t = new Date($(this).html());
			var tz = $(this).data('time-zone')*60;
			var tfrmt = $(this).data('countformat');
			var labels_new = $(this).data('labels');
			var new_labels = labels_new.split(",");
			var labels_new_2 = $(this).data('labels2');
			var new_labels_2 = labels_new_2.split(",");
			var font_count = $(this).data('font-count');
			var font_text = $(this).data('font-text');
			var color = $(this).data('color-text');
			var server_time = function(){          
			  return new Date($(this).data('time-now'));
			}
			var ticked = function (a){
				$(this).find('.rokka_countdown-period').css('font-size',font_text);
				$(this).find('.rokka_countdown-period').css('color',color);
				$(this).find('.rokka_countdown-amount').css('font-size',font_count);
			}

		if($(this).hasClass('rokka-usrtz')){
			$(this).rokka_countdown({labels: new_labels, labels1: new_labels_2, until : t, format: tfrmt, padZeroes:true,onTick:ticked});
		}else{
			$(this).rokka_countdown({labels: new_labels, labels1: new_labels_2, until : t, format: tfrmt, padZeroes:true,onTick:ticked , serverSync:server_time});
		}
		});
	}

	// VC Counter
	function rokkaInitCounter() {
		$('.rokka-counter').each(function() {
			var endNum = parseFloat($(this).find('.counter').data('counter'));
			var Num = ($(this).find('.counter').data('counter'))+' ';
			var speed = parseInt($(this).find('.counter').data('speed'));
			var ID = $(this).find('.counter').data('id');
			var sep = $(this).find('.counter').data('separator');
			var dec = $(this).find('.counter').data('decimal');
			var dec_count = Num.split(".");
			var started = false;

			$(this).waypoint(function(){
				if(started === false) {
					started = true;

					if(dec_count[1]){
						dec_count = dec_count[1].length-1;
					} else {
						dec_count = 0;
					}
					var grouping = true;
					if(dec == "none"){
						dec = "";
					}
					if(sep == "none"){
						grouping = false;
					} else {
						grouping = true;
					}
					var settings = {
						useEasing : true, 
						useGrouping : grouping, 
						separator : sep, 
						decimal : dec
					}
					var counter = new countUp(ID, 0, endNum, dec_count, speed, settings);
					counter.start();
				}
			}, { offset: "85%" });
		});
	}

	// VC Gallery Masonry
	function rokkaInitGalleryMasonry() {
		$('.rokka-gallery-masonry').each(function(){
			var $gallery = $(this);
			$gallery.imagesLoaded(function(){
				$gallery.masonry({
					itemSelector: 'article',
					percentPosition: true,
					transitionDuration: '0.4s',
					masonry: {
						columnWidth: '.grid-sizer',
					},
					hiddenStyle: {
						opacity: 0,
						transform: 'translate3d(0, 30px, 0)',
					},
					visibleStyle: {
						opacity: 1,
						transform: 'translate3d(0, 0, 0)',
					},
				});
				rokkaFooterSticky();
			});

			$gallery.magnificPopup({
				delegate: 'a',
				type:'image', 
				gallery:{
					enabled:true
				}
			});
		});
	}

	// VC Gallery Carousel
	function rokkaInitGalleryCarousel() {
		$('.rokka-gallery-carousel').each(function(){
			var $carousel = $(this),
				autoplay = $carousel.data('autoplay'),
				$pagination = $carousel.find('.rokka-carousel-pagination'),
				$arrowPrev = $carousel.find('.rokka-carousel-arrows .arrow-prev'),
				$arrowNext = $carousel.find('.rokka-carousel-arrows .arrow-next'),
				dataHeight = $carousel.data('height'),
				paginationHeight = $pagination.outerHeight()+11,
				spaceBetween = '';
			$('.rokka-carousel-arrows .arrow').css('margin-top',-(20+(paginationHeight/2))); 
			if($carousel.hasClass('show-gutter')) {
				spaceBetween = 30;
			} else {
				spaceBetween = 0;
			}
			if(autoplay == '0' || autoplay == '') {
				autoplay = false;
			} else {
				autoplay = {delay: autoplay, stopOnLastSlide: true};
			}
			var swiper = new Swiper($carousel.find('.rokka-gallery-carousel-wrapper'), {
				speed: 2000,
				slidesPerView: 'auto',
				pagination: {
					el: $pagination,
					type: 'bullets',
					clickable: true
				},
				navigation: {
					nextEl: $arrowNext,
					prevEl: $arrowPrev,
				},
				keyboard: {
					enabled: true,
				}, 
				loop: true,
				spaceBetween: spaceBetween,
				autoplay: autoplay,
			});
			setTimeout(function(){
				swiper.update(true);
				swiper.slideTo(0, 0);
				if(autoplay) {
					swiper.autoplay.start();
				}
			}, 1)
			if(dataHeight == 'full') {
				$carousel.find('.swiper-slide,img').height( $(window).height() - paginationHeight);
				$(window).on('resize', function(){
					$carousel.find('.swiper-slide,img').height( $(window).height() - paginationHeight);
				});
			} else if(dataHeight == 'auto') {

			} else {
				$carousel.height(dataHeight);
				$carousel.find('.swiper-slide,img').height(dataHeight - paginationHeight);
			}
			$carousel.imagesLoaded().progress( function() {
				swiper.update();
			});
		});
	}

	// VC Interactive Box
	function rokkaSetInteractiveBox() {
		$('.interactive-box').each(function(i){
			var $that = $(this);
			var heightSmall = $that.data('smHeight');
			var heightLarge = $that.data('lgHeight');
			if($(window).width() < 768) {
				$that.css('height',heightSmall);
			} else {
				$that.css('height',heightLarge);
			}
			$that.find('.lightbox').magnificPopup({
				type:'image', 
				gallery:{
					enabled:true
				}
			});
		
		});
		$('.video-link').magnificPopup({
			type:'iframe',
			disableOn: 0,
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
		});
	}

	function rokkaFooterSticky() {
		if($('body').outerHeight() < $(window).outerHeight()) {
			$('footer.page-footer').addClass('footer-fixed');
		} else {
			if($('footer.page-footer').outerHeight() < $(window).outerHeight() && $('footer.page-footer').outerHeight() < $('.page-wrapper').outerHeight()) {
				$('.page-wrapper').css('margin-bottom',$('body > footer').outerHeight());
				$('footer.page-footer').addClass('footer-fixed');
			} else {
				$('.page-wrapper').css('margin-bottom',0);
				$('footer.page-footer').removeClass('footer-fixed');
			}
		}	
		
	}

	function rokkaInitBlogStaticLoadMore() {
		$('.blog-standard, .blog-grid').each(function(){
			var $blog = $(this);
				if($blog.hasClass('blog-standard')) {
					var $blogInner = $(this).find('.blog-post-content');
				} else {
					var $blogInner = $(this).find('.blog-grid-wrapper');
				}
				var canClick = true,
				page = 2,
				ppp = $blog.data('ppp'),
				categories = $blog.data('cat'),
				showImg = 1,
				style = $blog.data('style');
			$(this).find('.rokka-load-more').on('click', function(e){
				if(canClick == true) {
					canClick = false;			
					var $loadmore = $(this);
					e.preventDefault();
					$.ajax({
						url: rest_object.api_url + 'blog/',
						type: 'POST',
						dataType: 'json',
						data: { page : page, posts_per_page: ppp, categories: categories, show_img: showImg,style: style },
						beforeSend: function ( xhr ) {
							xhr.setRequestHeader( 'X-WP-Nonce', rest_object.api_nonce );
						},
					}).done(function(response) {
						var $content = $( response.output );
						$blogInner.append($content);
						setTimeout(function(){
							$('.post-meta:not(.loaded-post)').addClass('loaded-post');
						}, 100)
						if(response.next === false) {
							$loadmore.remove();
						} else {
							page = response.next;
						}
						canClick = true;
					}).fail(function() {
						canClick = true;
					});
				}

			})

		});
	}

	function rokkaBindBookingCalendar() {
		$('.rokka-hotel-booking, .hotel-booking-search').each(function(){
			$(this).find('.hasDatepicker').each(function(){
				var $picker = $(this),
				dayLabel = $(this).parent().find('.day.input-date'),
				monthLabel = $(this).parent().find('.month.input-date');
				$picker.datepicker( 'setDate', new Date());
				$picker.datepicker( 'option' , 'onClose', function (date, inst) {
					if(date == '') {
						return; 
					}

					date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
					var month = $.datepicker.formatDate( "M", date );
					var day = $.datepicker.formatDate( "dd", date );
					dayLabel.html(day);
					monthLabel.html(month);

				});
			})

			$(this).find('select').on('change', function(){
				$(this).parent().find(' > span').html($(this).val());
			})
		})
	}

	// Social profiles
	function rokkaColorLuminance(hex, lum) {
	    // validate hex string
	    hex = String(hex).replace(/[^0-9a-f]/gi, '');
	    if (hex.length < 6) {
	        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	    }
	    lum = lum || 0;
	    // convert to decimal and change luminosity
	    var rgb = "#", c, i;
	    for (i = 0; i < 3; i++) {
	        c = parseInt(hex.substr(i*2,2), 16);
	        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
	        rgb += ("00"+c).substr(c.length);
	    }
	    return rgb;
	}

	function rokkaChangeColorSocials() {
		var $styles = $('#rokka-app-inline-css'),
			styleString = '',
			i = 0;
		$('.rokka-social-profiles, .team-member .member-socials').each(function(){
			var $that = $(this);
			if($that.hasClass('social-solid')) {
				$that.find('li').each(function(el){
					if($(this).data('color')) {
						var color = $(this).data('color');
						$(this).addClass('rokka-social-st'+i);
						var newColor = rokkaColorLuminance(color, -0.2); 
						styleString += '.rokka-social-st'+i+' a:hover {background:'+newColor+'!important;}';
					}
					i++;
				});
			} 
		});
		$styles.text($styles.text() + styleString);
	}

	// VC Progress bar
	function rokkaInitProgressBar() {
		if($('.vc_progress_bar').length > 0) {
			$('.vc_progress_bar').waypoint('destroy');
			$('.vc_progress_bar .rokka-single-bar').each(function() { 
				var bar = $(this).find('.vc_label_units');
				var max = bar.parents('.rokka-single-bar').find('.vc_bar').data('value');
				var maxPercent = bar.parents('.rokka-single-bar').find('.vc_bar').data('value') + '%';
				var time = max / 1;
				bar.html('0%');
				var started = false;
				$(this).waypoint(function(){
					if(started == false) {
						started = true;
						TweenLite.to(bar, 1.5, { left: maxPercent, onUpdate: function(){
							if(this.progress() <= 1) {
								bar.html(Math.round((this.progress()*100) / (100/parseInt(maxPercent)) )+'%');
							}
						}})
						TweenLite.to(bar.parents('.rokka-single-bar').find('.vc_bar'), 1.5, {width: maxPercent});
					}
				}, { offset: "85%" });
			});
		}
	}

	// "Back to top" arrow
	function rokkaScrollToTop() {
		var window_height = $(window).outerHeight();
		var start_scroll = $(window).scrollTop();
		if(start_scroll <= 300) {
			$('.back-to-top').removeClass('show-arrow');
		} else {
			$('.back-to-top').addClass('show-arrow');
		}
		$(window).scroll(function(){
			var scroll_pos = $(window).scrollTop(); 
			if(scroll_pos <= 300) {
				$('.back-to-top').removeClass('show-arrow');
			} else {
				$('.back-to-top').addClass('show-arrow');
			}
		});

		$('.back-to-top').off('click.scrollTop');
		$('.back-to-top').on('click.scrollTop', function(e){
			$('html,body').animate({scrollTop:0}, 500, 'swing');
		});
	}

	function rokkaInitRoomSlider() {
		$('.hb_single_room .intro-slider-img').each(function(){
			var $slider = $(this);
			var sliderImg = new Swiper($slider, {
				speed: 700,
				loop: true,
				centeredSlides: true,
				slidesPerView: 1,
				effect: 'fade',
				fadeEffect: {
					crossFade: false
				},
				autoplay: {
				    delay: 3000,
				},
				navigation: {
					nextEl: $('.post-content .arrow-next').parent(),
					prevEl: $('.post-content .arrow-prev').parent(),
				},
			});
		});
	}

	function rokkaInitHomeSlider() {
		$('.intro-slider').each(function(){
			var $slider = $(this);
			var sliderImg = new Swiper($slider.find('.intro-slider-img'), {
				speed: 500,
				loop: true,
				centeredSlides: true,
				slidesPerView: 1,
				effect: 'fade',
				fadeEffect: {
					crossFade: false
				},
				pagination: {
					el: $slider.find('.swiper-pagination'),
					type: 'fraction',
				},
				navigation: {
					nextEl: $slider.find('.arrow-next'),
					prevEl: $slider.find('.arrow-prev'),
				},
			});
			var sliderDesc = new Swiper($slider.find('.intro-slider-content'), {
				speed: 500,
				loop: true,
				centeredSlides: true,
				slidesPerView: 1,
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
				allowTouchMove: false,
			});
			sliderImg.controller.control = sliderDesc;
			sliderDesc.controller.control = sliderImg;
		});
	}

	// VC row parallax
	function rokkaInitRowParallax() {
		$('.rokka-parallax:not(.rokka-parallax-slider)').each(function(){
			var $that = $(this),
			speed = $that.data('rokkaParallax'),
			video = null,
			videoStartTime = 0;
			if(speed > 1) {
				speed = speed / 10;
			}
			if($that.data('video')) {
				video = $that.data('video');
				videoStartTime = $that.data('videoStart');
			}
			
			if(speed != 1 || video) {
				if($('.rokka-full-pages').length > 0) {
					$that.jarallax({
						speed: speed,
						videoSrc: video,
						videoStartTime: videoStartTime,
						imgElement: '.rokka-slider',
						videoPlayOnlyVisible: false,
						loop: 1,
					});
				} else {

					$that.jarallax({
						speed: speed,
						videoSrc: video,
						videoStartTime: videoStartTime,
						imgElement: '.rokka-slider',
						loop: 1
					});
				}
			}
		});
		var sectionsCount = $('.rokka-full-pages').find('.fp-section').length 
		if(sectionsCount == '1') {
			$('#fp-nav').css('display','none');
		}
	}

	function rokkaInitVideo() {
		if($('.video-wrapper').length > 0) {
			$('.video-wrapper').YTPlayer();
		}
	}


	function rokkaBindStretchRowSide() {
		rokkaStretchRowSide();
		$(window).on('resize', function(){
			rokkaStretchRowSide();
		})
	}


	function rokkaStretchLeft() {
		$('.stretch-left').each(function(){
			var $that = $(this);
			var offset = -$that.offset().left;
			$that.css('margin-left', offset);
			if($(document).width() < 992) {
				$that.css('marginRight', offset);
			}
			$(window).on('resize', function(){
				$that.css('margin-left', 0);
				var offset = -$that.offset().left;
				$that.css('margin-left', offset);
				if($(window).width() < 992) {
					$that.css('margin-right', offset);
				} else {
					$that.css('margin-right', 0);
				}
			})
		})
	}

	function rokkaStretchRowSide() {
		$('[data-vc-stretch-side="right"] .extended_bg').each(function(){
			var value = -$(this).parent().offset().left;
			$(this).css('right', value+'px').css('left', 0);
		})
		$('[data-vc-stretch-side="left"] .extended_bg').each(function(){
			var value = -$(this).parent().offset().left;
			$(this).css('left', value+'px').css('right', 0);
		})
	}

	function rokkaPositionDropdown() {
		$('.menu-item-has-children').on('mouseenter', function(){
			var $dropdown = $(this).find('> .sub-menu');
			var moveLeft = '',
				position = $dropdown.parent().offset(),
				dropdownPosition = position.left;
			dropdownPosition = dropdownPosition - ($dropdown.width() / 2);

			

			if((position.left + $dropdown.width()) > $(window).width()) {
				moveLeft = (position.left + $dropdown.width()) - $(window).width();
			} else {
				moveLeft = '';
			}

			if($dropdown.length > 0) {
				if($dropdown.parent().hasClass('first-level')) {
					$dropdown.css('margin-left', ($dropdown.width() / -2) - moveLeft);
				} else {
					if($dropdown.parent().outerWidth()*2 + $dropdown.parent().offset().left > $(window).width()) {
						$dropdown.addClass('dropdown-left');
					} else {
						$dropdown.removeClass('dropdown-left');
					}
				}
			}
		})
	}

	function rokkaOpenDropdownOverlayNav() {
		$('.menu-item:has(ul)').addClass('has-children');
		$('.nav-overlay .menu-item.has-children > a').on('click', function(e){
			e.preventDefault();
			$(this).parent().toggleClass('active')
		});
	}

	function rokkaInitGallerySlider() {
		$('.rokka-gallery-slider').each(function(){
			var $slider = $(this);
			var sliderImg = new Swiper($slider, {
				speed: 500,
				loop: false,
				slidesPerView: 'auto',
				slidesPerColumn: 2,
				spaceBetween: 30,
			});
		});
	}

	function rokkaOpenMobileOverlay() {
		$('.burger-nav').on('click', function(){
			$('.nav-overlay').toggleClass('overlay-active');
		});
	}

	function rokkaInitHotelCart() {
		$('.rokka-minicart-open').on('click', function(){
			$('.rokka-minicart').toggleClass('rokka-minicart--active');
			$('.rokka-minicart-open').toggleClass('rokka-minicart-open--cart-active');
		});

		$('body').on('hb_added_item_to_cart', function(){
			$('.rokka-minicart-open').addClass('rokka-minicart-open--active');
			var count = $('.rokka-minicart-open--count').data('count')+1;
			$('.rokka-minicart-open--count').data('count', count);
			$('.rokka-minicart-open--count').html(count);
			$('.rokka-minicart').addClass('rokka-minicart--active');
			$('.rokka-minicart-open').addClass('rokka-minicart-open--cart-active');
		});

		$( document ).ajaxComplete(function(event, request, settings) {
			var searchParams = new URLSearchParams(settings.data);
			if(searchParams.get('action') === 'hotel_booking_ajax_remove_item_cart' ) {

				var count = $('.rokka-minicart-open--count').data('count')-1;
				$('.rokka-minicart-open--count').data('count', count);
				$('.rokka-minicart-open--count').html(count);

				if($('.rokka-minicart .hb_mini_cart_item').length === 0) {
					$('.rokka-minicart').removeClass('rokka-minicart--active');
					$('.rokka-minicart-open').removeClass('rokka-minicart-open--cart-active');
					$('.rokka-minicart-open').removeClass('rokka-minicart-open--active');
				}
			}
		});
	}

})(jQuery);
