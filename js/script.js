$(document).ready(function() {

	//Navigation scrollTo
	var $nav = $('nav');
	$('nav li a').click(function() {
		$nav.find('li').removeClass('current');
		$(this).parent().addClass('current');
		
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {
          var $target = $(this.hash);
          $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
          	if ($target.length) {
            	var targetOffset = $target.offset().top;
            	$('html,body').animate({scrollTop: targetOffset}, 1000);
           		return false;
          	}
        }
	});


	//detect viewport
	var $navVM = $('nav .vm');
	var $navCore = $('nav .core');
	var $navGoals = $('nav .gmain');
	var $navG1 = $('nav .g1');
	var $navG2 = $('nav .g2');
	var $navG3 = $('nav .g3');
	var $navG4 = $('nav .g4');
	var g2loadcount = 0;

	homePos = $('#visionmission').offset().top;
	corePos = $('#corevalue').offset().top - 50;
	goalsPos = $('#goals').offset().top - 100;
	goal1Pos = $('#goal1').offset().top - 100;
	goal2Pos = $('#goal2').offset().top - 100;
	goal3Pos = $('#goal3').offset().top - 100;
	goal4Pos = $('#goal4').offset().top - 100;
	
	checkCurrPos();
	
	$(window).resize(function(){
		checkWidth();
	});
		
	$(window).scroll(function(){
		checkCurrPos();
	});
	
	
	
	function checkCurrPos(){
		var currScrollPos = $(window).scrollTop();
		
		if($navVM.hasClass('current') || $navCore.hasClass('.current')){
			
		}
		
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
			if($('.elements').css('background-image') == 'none'){
	    		$('<img/>').attr('src',"images/goals-sprite.png").load(function(){
	    			$('.elements').css("background-image", "url(images/goals-sprite.png)");
	    			$('.elements').fadeIn('slow');
	    		});
	    	}
		}
		else if(currScrollPos >= goal1Pos && currScrollPos < goal2Pos){ 
			if(!($navG1.hasClass('.current'))){
				$navG1.addClass('current').siblings('.current').removeClass('current');
			}
			if($('#goal1 .bg').css('background-image') == 'none'){
	    		$('<img/>').attr('src',"images/goal1-bg.jpg").load(function(){
	    			$('#goal1 .bg').css("background-image", "url(images/goal1-bg.jpg)");
	    			$('#goal1 .bg').fadeIn('slow', function(){
		    			$('<img/>').attr('src',"images/goal1-sprite.png").load(function(){
			    			$('#goal1 #parallax .sprite').css("background-image", "url(images/goal1-sprite.png)");
			    			$('#goal1 #parallax .sprite').fadeIn('slow');
			    		});
	    			});
	    		});
			}
		}
		else if(currScrollPos >= goal2Pos && currScrollPos < goal3Pos){ 
			if(!($navG2.hasClass('current'))){
				$navG2.addClass('current').siblings('.current').removeClass('current');
			}
			if($('#goal2 .sprite.img1').css('background-image') == 'none' && g2loadcount < 1){
	    		$('<img/>').attr('src',"images/goal2-bg.jpg").load(function(){
	    			
	    			$('#goal2 .sprite').css("background-image", "url(images/goal2-bg.jpg)");
	    			
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
	    		g2loadcount++
	    	}
			//shuffle function - random background image
			shuffle = function(o){ //v1.0
				for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			};
		}
		else if(currScrollPos >= goal3Pos && currScrollPos < goal4Pos){ 
			if(!($navG3.hasClass('current'))){
				$navG3.addClass('current').siblings('.current').removeClass('current');
			}
			if($('#goal3 .sprite').css('background-image') == 'none'){
    			$('<img/>').attr('src',"images/goal3-sprite.png").load(function(){
	    			$('#goal3 .sprite').css("background-image", "url(images/goal3-sprite.png)");
	    			$('#goal3 .sprite').fadeIn('slow');
	    		});
			}
		}
		else if(currScrollPos >= goal4Pos){ 
			if(!($navG4.hasClass('current'))){
				$navG4.addClass('current').siblings('.current').removeClass('current');
			}
			if($('#goal4 .goal-intro .bg').css('background-image') == 'none'){
	    		$('<img/>').attr('src',"images/goal4-bg.jpg").load(function(){
	    			$('#goal4 .bg').css("background-image", "url(images/goal4-bg.jpg)");
	    			$('#goal4 .bg').fadeIn(1000, function(){
		    			$('<img/>').attr('src',"images/goal4-sprite.png").load(function(){
			    			$('#goal4 .element1').css("background-image", "url(images/goal4-sprite.png)");
			    			$('#goal4 .element1').fadeIn('slow');
			    		});	   			
	    			});
	    			
	    		});
			}
		}
	}
	
	
	

	
	
	//goal 1 parallax
  	jQuery('#goal1 #parallax .sprite').parallax(
  		{}, //{mouseport: jQuery("#goal1 #parallax")},
  		{xparallax:false, xtravel:'10px' ,ytravel:'20px'}, //layer 0
  		{xparallax:true, xtravel:'20px'}, //layer 1
  		{xparallax:false, xtravel:'5px', ytravel:'5px'} //layer 2
  	);
	
	//.parallax(object, xPosition, adjuster, inertia, outerHeight) options:
	//object - background or position
	//xPosition - Horizontal position of the element
	//adjuster - y position to start from
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	$('#goals .sphere1').vparallax("position","75%", 3600, 0.3, true);
	$('#goals .sphere2').vparallax("position","-5%", 2400, 0.5, true);
	$('#goals .sphere3').vparallax("position","80%", 500, 0.2, true);
	$('#goals .sphere4').vparallax("position","0%", 1000, 0.2, true);
	$('#goals .sprite5').vparallax("position","87%", 3000, 0.1, true);


	if($(window).width() >= 1150){ //minimum width for goals hex to not be block by the parallax sprite

	}
	else if($(window).width() >= 750){

	}
	else if($(window).width() < 750){
		var $navdd = $('nav select');
		$navdd.change(function(){
			window.location = $("nav select option:selected").val();
		});
	}
	
	
	
	//Lightbox 
	var $extraBtn = $('.extras a');
	
	$extraBtn.live('click', revealBox);

	function revealBox(e){
		var $this = $(this);
		var sectionID = $this.closest('section').attr('id');
		
		if($this.hasClass('video')){
			$f(sectionID +"player", "http://assets.machost/prod/js/plugins/flowplayer/flowplayer.commercial.acs-3.2.7.swf", {
				clip: { 
					autoPlay:false
				},
				key:['#@e4613dc7b69a222c719','#@5f4e5f81f209168003b']
			});
			
			$this.closest('section').find('.video-box').reveal();
			$('.close-reveal-modal').live('click', closeReveal);
			$('.reveal-modal-bg').live('click', closeReveal);	
		}
		else if($this.hasClass('charts')){
			$this.closest('section').find('.charts-box').reveal();
		}
		
		
		function closeReveal(e){
			$('.close-reveal-modal').die('click', closeReveal);
			$('.reveal-modal-bg').die('click', closeReveal);	
			$f(sectionID +"player").stop();
		}
	}
	
});

