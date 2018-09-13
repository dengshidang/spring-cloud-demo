
$(function(){
	//筛选
	$('.sel-top').click(function(){
		$(this).next('.sel-list').slideToggle(200);
		$(this).find('.fa').toggleClass('fa-caret-up');
		$(this).parents('.trade-sel-item').siblings().find('.sel-list').hide();
	})
	$('.sel-list li').click(function(){
		$(this).parent('.sel-list').prev('.sel-top').find('.sel-active').html($(this).html());
		$(this).parent('.sel-list').slideUp(200);
		$(this).parent('.sel-list').prev('.sel-top').find('.fa').removeClass('fa-caret-up');
	})
	
	//购买
	$('.buy-btn').on("click",function(){
		$(this).toggleClass('buy-btn-active');
		$(this).parents('.row-info').next('.row-detail').slideToggle(200);
		$(this).parents('.trade-row').siblings().find('.row-detail').slideUp(200);
		$(this).parents('.trade-row').siblings().find('.buy-btn').removeClass('buy-btn-active');
	})
	$('.trade-cancel-btn').on("click",function(){
		$(this).parents('.row-detail').slideUp(200);
		$(this).parents('.row-detail').prev('.row-info').find('.buy-btn').removeClass('buy-btn-active');
	})
	
	//出售
	$('.sell-btn').on("click",function(){
		$(this).toggleClass('sell-btn-active');
		$(this).parents('.row-info').next('.row-detail').slideToggle(200);
		$(this).parents('.trade-row').siblings().find('.row-detail').slideUp(200);
		$(this).parents('.trade-row').siblings().find('.sell-btn').removeClass('sell-btn-active');
	})
	$('.trade-cancel-btn').on("click",function(){
		$(this).parents('.row-detail').slideUp(200);
		$(this).parents('.row-detail').prev('.row-info').find('.sell-btn').removeClass('sell-btn-active');
	})
	
	//选择付款方式
	$('.pay-option').click(function(){
		$(this).addClass('pay-option-active');
		$(this).siblings().removeClass('pay-option-active');
		$('.pay-info-box').eq($(this).index()).show();
		$('.pay-info-box').eq($(this).index()).siblings().hide();
	})
	
})
