
$(function(){
	//买入限额滑块
	$('.single-slider').jRange({
		from: 0,
		to: 100,
		step: 1,
		scale: [0,25,50,75,100],
		format: '%s',
		showLabels: true,
		showScale: true,
		onstatechange: function(){
			setTimeout(function(){
				var sel_w1 = $('.buy-slide .selected-bar').width();
				var all_w1 = $('.buy-slide .back-bar').width();
				var per    = sel_w1 / all_w1 * 100;
				var circle = $('.buy-slide .scale span');
				for(var i=1; i<4; i++){
					if(per > 25*i){
						circle.eq(i).addClass('on');
					}else{
						circle.eq(i).removeClass('on');
					}
				}
			},500)
		}
	});
    
    //卖出限额滑块
	$('.range-slider').jRange({
		from: 0,
		to: 100,
		step: 1,
		scale: [0,25,50,75,100],
		format: '%s',
		showLabels: true,
		showScale: true,
		onstatechange: function(){
			setTimeout(function(){
				var sel_w2 = $('.sell-slide .selected-bar').width();
				var all_w2 = $('.sell-slide .back-bar').width();
				var per    = sel_w2 / all_w2 * 100;
				var s_cricle  = $('.sell-slide .scale span');
				for(var i=1; i<4; i++){
					if(per > 25*i){
						s_cricle.eq(i).addClass('on');
					}else{
						s_cricle.eq(i).removeClass('on');
					}
				}
			},500)
		}
	});
	
	//深度选择
	$('.sel-top').click(function(){
		$(this).next('.sel-list').slideToggle(200);
		$(this).find('.fa').toggleClass('fa-caret-up');
	})
	$('.sel-list li').click(function(){
		$(this).parent('.sel-list').prev('.sel-top').find('.sel-active').html($(this).html());
		$(this).parent('.sel-list').slideUp(200);
		$(this).parent('.sel-list').prev('.sel-top').find('.fa').removeClass('fa-caret-up');
	})
	
	//自选列表
	$('.market-star').click(function(){
		$(this).find('.fa').toggleClass('fa-star');
		var starId = $(this).data('id');
		if($(this).find('.fa').hasClass('fa-star')){//选中星星
			$(this).find('.fa').removeClass('fa-star-o');
			var cont = $(this).parent('.market-row').html();
			$('#coin_mySel').prepend("<div class='market-row'>" + cont + "</div>");
		}else{//取消选中星星
			$(this).find('.fa').addClass('fa-star-o');
			$('#coin_mySel').find(".market-star[data-id=" + starId +"]").parent('.market-row').remove();
		}
	})
	//自选列表中的星星取消
	$('#coin_mySel').delegate(".market-star","click",function(){
		$(this).parent('.market-row').remove();
		$('.market-star[data-id=' + $(this).data('id') +']').find('.fa').addClass('fa-star-o');
	});
	
});