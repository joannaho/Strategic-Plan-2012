/*
 * Strategic plan 2012 JavaScript
 * Authoured: Joanna Lit
 * Date: Dec 14, 2011
 */
$(document).ready(function() {
	var $navVM = $('nav .vm'),
		$navCore = $('nav .core'),
		$navGoals = $('nav .gmain'),
		$navG1 = $('nav .g1'),
		$navG2 = $('nav .g2'),
		$navG3 = $('nav .g3'),
		$navG4 = $('nav .g4'),
		g2loadcount = 0,
		$coresprite = $('#corevalue .sprite'),
		$nav = $('nav'),
		$hexbtn = $('.hex a'),
		isIE6 = $.browser.msie && parseFloat($.browser.version) < 7;

	$('nav li a').bind('click', scrollNav);
	$hexbtn.bind('click', scrollNav);

	updatePos();
	checkWidth();
	checkCurrPos();
	
	$(window).resize(function(){checkWidth();});
	$(window).scroll(function(){checkCurrPos();});
	
	function scrollNav(){
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({scrollTop: targetOffset}, 1000);
				return false;
			}
        }
	}
	
	function updatePos(){
		homePos = $('#visionmission').offset().top;
		corePos = $('#corevalue').offset().top - 50;
		goalsPos = $('#goals').offset().top - 100;
		goal1Pos = $('#goal1').offset().top - 100;
		goal2Pos = $('#goal2').offset().top - 100;
		goal3Pos = $('#goal3').offset().top - 100;
		goal4Pos = $('#goal4').offset().top - 100;
	}
	
	function checkWidth(){
		if($(window).width() < 750){
			var $navdd = $('nav select');
			$navdd.change(function(){
				window.location = $("nav select option:selected").val();
			});
			$coresprite.removeClass('animation');
		}
		else {
			checkCurrPos();
		}
	}
	//detect viewport
	function checkCurrPos(){
		var currScrollPos = $(window).scrollTop();
		var $goalsSprite = $('#goals .elements');
		var $goal1bg = $('#goal1 .bg');
		var $goal1sprite = $('#goal1 #parallax .sprite');
		var $goal2sprite = $('#goal2 .sprite');
		var $goal3sprite = $('#goal3 .sprite');
		var $goal4bg = $('#goal4 .bg');
		var windowWidth = $(window).width();
		
		updatePos();
		
		//if scroll position at home or core, enable animation, else disable		
		if(currScrollPos >= homePos && currScrollPos < goalsPos){ 
			if(windowWidth > 750){
				if(!($coresprite.hasClass('animation'))){
					$coresprite.addClass('animation');
				}
			}else { 
				$coresprite.removeClass('animation');
			}
		}
		else if(windowWidth > 750 && currScrollPos >= goalsPos){
			if($coresprite.hasClass('animation')){ 
				$coresprite.removeClass('animation');
			}
		}
		
		//check section to update navigation and load background images
		if(currScrollPos >= homePos && currScrollPos < corePos){ 
			if(!($navVM.hasClass('current'))){
				$navVM.addClass('current').siblings('.current').removeClass('current');
			}
		}
		else if(currScrollPos >= corePos && currScrollPos < goalsPos){ 
			if(!($navCore.hasClass('.current'))){
				$navCore.addClass('current').siblings('.current').removeClass('current');
			}
		}
		else if(currScrollPos >= goalsPos && currScrollPos < goal1Pos){ 
			if(!($navGoals.hasClass('.current'))){
				$navGoals.addClass('current').siblings('.current').removeClass('current');
			}
			if(/msie|MSIE 6/.test(navigator.userAgent)) {
			} 
			else {
				if(windowWidth > 750 && $goalsSprite.css('background-image') == 'none'){
					$('<img/>').attr('src',"images/goals-sprite.png").load(function(){
						$goalsSprite.css("background-image", "url(images/goals-sprite.png)");
						$goalsSprite.fadeIn('slow');
					});
					$('#goals .sphere1').vparallax("position","75%", 3600, 0.3, true);
					$('#goals .sphere2').vparallax("position","-5%", 2400, 0.5, true);
					$('#goals .sphere3').vparallax("position","80%", 500, 0.2, true);
					$('#goals .sphere4').vparallax("position","0%", 1000, 0.2, true);
					$('#goals .sprite5').vparallax("position","87%", 3000, 0.1, true);
				}
			}
		}
		else if(currScrollPos >= goal1Pos && currScrollPos < goal2Pos){ //goal 1
			if(!($navG1.hasClass('.current'))){
				$navG1.addClass('current').siblings('.current').removeClass('current');
			} 
			if(/msie|MSIE 6/.test(navigator.userAgent)) {
				//do nothing
			}
			else {
				if(windowWidth > 750 && $goal1bg.css('background-image') == 'none'){
					$('<img/>').attr('src',"images/goal1-bg.jpg").load(function(){
						$goal1bg.css("background-image", "url(images/goal1-bg.jpg)");
						$goal1bg.fadeIn('slow', function(){
							$('<img/>').attr('src',"images/goal1-sprite.png").load(function(){
								$goal1sprite.css("background-image", "url(images/goal1-sprite.png)");
								$goal1sprite.fadeIn('slow');
							});
						});
					});
				}
			}
		} 
		else if(currScrollPos >= goal2Pos && currScrollPos < goal3Pos){ //goal 2
			if(!($navG2.hasClass('current'))){
				$navG2.addClass('current').siblings('.current').removeClass('current');
			}
			if(/msie|MSIE 6/.test(navigator.userAgent)) {
				//do nothing
			}
			else {
				if(windowWidth > 750 && $goal2sprite.css('background-image') == 'none' && g2loadcount < 1){
					$('<img/>').attr('src',"images/goal2-bg.jpg").load(function(){
						
						$goal2sprite.css("background-image", "url(images/goal2-bg.jpg)");
						
						var fadeTimer = setInterval(showRandom, 600);
						var randorder = shuffle([0,1,2,3,4,5,6,7]);
						var index = 0;
						
						function showRandom(){
							var randomNum = (randorder[randorder[index++]]);
							var $randomSprite = $('#goal2 .sprite-wrap > span:eq('+randomNum+')');
							
								$randomSprite.fadeTo(800,0.5, function(){
									$(this).fadeTo(800, 0.15);
								});
							if(randomNum === undefined){
								clearInterval(fadeTimer);
							}
						}
					});
					g2loadcount++;
				}
				shuffle = function(o){ //shuffle function - random background image
					for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
					return o;
				};
			}
		}
		else if(currScrollPos >= goal3Pos && currScrollPos < goal4Pos){ //goal 3
			if(!($navG3.hasClass('current'))){
				$navG3.addClass('current').siblings('.current').removeClass('current');
			}
			if(/msie|MSIE 6/.test(navigator.userAgent)) {
			}else {
				if(windowWidth > 750 && $goal3sprite.css('background-image') == 'none'){
					$('<img/>').attr('src',"images/goal3-sprite.png").load(function(){
						$goal3sprite.css("background-image", "url(images/goal3-sprite.png)");
						$goal3sprite.fadeIn('slow');
					});
				}
			}
		}
		else if(currScrollPos >= goal4Pos){ //goal 
			if(!($navG4.hasClass('current'))){
				$navG4.addClass('current').siblings('.current').removeClass('current');
			} 
			if(windowWidth > 750 && $goal4bg.css('background-image') == 'none'){
				$('<img/>').attr('src',"images/goal4-bg.jpg").load(function(){
					$goal4bg.css("background-image", "url(images/goal4-bg.jpg)");
					$goal4bg.fadeIn(1000, function(){
						$('<img/>').attr('src',"images/goal4-sprite.png").load(function(){
							$('#goal4 .element1').css("background-image", "url(images/goal4-sprite.png)");
							$('#goal4 .element1').fadeIn('slow');
						});
					});
				});
			}
		}
	}
	
	if(/msie|MSIE 6/.test(navigator.userAgent)) {
	}else { 
		//goal 1 parallax
			jQuery('#goal1 #parallax .parallax-layer').parallax(
				{}, //{mouseport: jQuery("#goal1 #parallax")},
				{xparallax:false, xtravel:'10px' ,ytravel:'20px'}, //layer 0
				{xparallax:true, xtravel:'20px', ytravel:'50px'}, //layer 1
				{xparallax:false, xtravel:'5px', ytravel:'5px'}, //layer 2
				{yparallax:false, xtravel:'20px'}
			);
	}

	//tabs
	var tabs = $('dl.tabs'),
		tabsContent = $('ul.tabs-content');
	tabs.each(function(i) {
		//Get all tabs
		var tab = $(this).children('dd').children('a');
		tab.click(function(e) {
			//Get Location of tab's content
			var contentLocation = $(this).attr("href");
			contentLocation = contentLocation + "Tab";
			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
				e.preventDefault();
				tab.removeClass('active');
				$(this).addClass('active');
				$(contentLocation).parent('.tabs-content').children('li').css({"display":"none"});
				$(contentLocation).css({"display":"block"});
			} 
		});
	});

	//Lightbox 
	var $extraBtn = $('.extras a');
	$extraBtn.live('click', revealBox);

	function revealBox(e){
		var $this = $(this);
		var sectionID = $this.closest('section').attr('id');
		try {		
			if($this.hasClass('video')){
				$f(sectionID +"player", "https://assets.acs.org/prod/js/plugins/flowplayer/flowplayer.commercial.acs-3.2.7.swf", {
					'clip': { 
						'autoPlay':'false',
					},
					plugins: {
						controls: {
							url: "https://assets.acs.org/prod/js/plugins/flowplayer/flowplayer.controls-3.2.5.swf"
						},
						audio: { 
							url: "https://assets.acs.org/prod/js/plugins/flowplayer/plugins/flowplayer.audio-3.2.1.swf"
						},
						gatracker: {
							url: "https://assets.acs.org/prod/js/plugins/flowplayer/plugins/flowplayer.analytics-3.2.1.swf",
							googleId: "UA-6067916-1",
							trackingMode: "AS3",
							debug: false
						}				
					},
					key:['#@e4613dc7b69a222c719','#@5f4e5f81f209168003b']
				});
				
				$this.closest('section').find('.video-box').reveal();
				$('.close-reveal-modal').live('click', closeReveal);
				$('.reveal-modal-bg').live('click', closeReveal);	
			}
		}
		catch(err) {
			$.error(err);
		}	
		function closeReveal(e){
			$('.close-reveal-modal').die('click', closeReveal);
			$('.reveal-modal-bg').die('click', closeReveal);	
			$("#"+ sectionID +"player object").remove();
		}
	}
	
});