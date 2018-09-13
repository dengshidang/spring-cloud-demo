
$(function(){
	/*导航*/
	$('.nav-fa').hover(function() {
		$('ul', this).slideDown(400);
		$(this).find('.fa-caret-down').addClass("fa-caret-up");
	}, function() {
		$('ul', this).slideUp(400);
		$(this).find('.fa-caret-down').removeClass("fa-caret-up");
	});
	
	/*语言选择*/
	$('.lang-list li').click(function(){
		var lang = $(this).find('.lang-sel').html();
		$('.lang-active').html(lang);
		$('.lang-list').slideUp(400);
	})
	
	/*下拉选择*/
//	$('.sel-top').click(function(){
//		$(this).next('.sel-list').toggle();
//		$(this).find('.fa').toggleClass('fa-caret-up');
//	})
//	$('.sel-list li').click(function(){
//		$(this).parent('.sel-list').prev('.sel-top').find('.sel-active').html($(this).html());
//		$(this).parent('.sel-list').slideUp(200);
//	})
})
