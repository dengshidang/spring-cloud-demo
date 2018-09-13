<template>
  <div class="model-deal m-t-10">
    <!--深度图-->
    <div class="trade-depth">
      <h4>深度图</h4>
      <p id="message"></p>
      <div class="trade-depth-pic layout">
      	
      <canvas id="depth" width="760" height="300"></canvas>
      <canvas id="x" width="760" height="24"></canvas>
      <canvas id="y" width="48" height="300"></canvas>
     </div>

    </div>
    <!--实时成交数据-->
    <div class="trade-data">
      <div class="trade-data-head">
        <span class="d-b f-l">最新成交</span>
      </div>
      <div class="trade-data-list">
        <div class="trade-data-top">
          <span class="trade-data-option">时间</span>
          <span class="trade-data-option">类型</span>
          <span class="trade-data-option">价格({{precoinName}})</span>
          <span class="trade-data-option">数量({{sufcoinName}})</span>
          <div class="clearfix"></div>
        </div>
        <div class="trade-data-main">
          <!--显示最新15条数据-->
          <div class="trade-data-row" v-for="item in list">
            <span class="trade-data-option">{{item.time|subDate}}</span>
            <span class="trade-data-option col-1">{{item.type}}</span>
            <span class="trade-data-option">{{item.price}}</span>
            <span class="trade-data-option">{{item.number}}</span>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script>
    export default {
        name: "TransactionData",
        data(){
          return{
            params:{
              marketId:this.$route.query.id,
              pageNum:1,
              pageSize:15
            },
            list:[],
            precoinName:this.$route.query.precoinName,
            sufcoinName:this.$route.query.sufcoinName,
            timer:null,
           d:{"sell":
							[
							{"price":9000,"amount":8176},
							{"price":8999.84,"amount":10245},
							{"price":8999.68,"amount":19147},
							{"price":8999.52,"amount":4150},
							{"price":8999.36,"amount":10420},
							{"price":8999.2,"amount":16053},
							{"price":8999.04,"amount":8480},
							{"price":8998.88,"amount":12751},
							{"price":8998.72,"amount":14187},
							{"price":8998.56,"amount":7916}
						],
						"buy":[
							{"price":8749,"amount":8379},
							{"price":8748.74,"amount":18582},
							{"price":8748.48,"amount":9173},
							{"price":8748.22,"amount":13327},
							{"price":8747.96,"amount":1990},
							{"price":8747.7,"amount":3414},
							{"price":8747.44,"amount":12062},
							{"price":8747.18,"amount":19389},
							{"price":8746.92,"amount":8999},
							{"price":8746.66,"amount":8675}
						]}
          } 
        },
        methods:{
          getNewTradeCord(){
            clearInterval(this.timer);
            this.timer=setInterval(()=> {
              this.$Http.post('/trade/getNewTradeCord', this.params).then(resp => {
                if (resp.data.code == "SUCCESS") {
                  this.list = resp.data.result.list;
                }
              });
            },1000);
          },
          drawDepths(){
          	clearInterval(this.timer);
            this.timer=setInterval(()=> {
          	  this.$Http.post('/trade/drawDepths',{marketId:this.params.marketId}).then(resp => {
                if (resp.data.code == "SUCCESS" && resp.data.result !=null ) {  
                  this.drawDepthChart(this.d);
                }
              });
            },1000);
          },
          drawDepthChart(data){
         
						for(i in data['buy']){
								var total = 0;
								for(n=0; n<= i; n++){
										total += data['buy'][n]['amount'];
								}
								
								data['buy'][i]['total'] = total;
							}
							
							for(var i in data['sell']){
								var total = 0;
								for(var n=i; n< data['sell'].length; n++){
										total += data['sell'][n]['amount'];
								}
								
								data['sell'][i]['total'] = total;
							}
							
							
							var gap = 1; //X轴偏移量 防止左右两部分连接以利于美观
							var canvas=document.getElementById('depth');
							var width = canvas.getAttribute('width');
							var height = canvas.getAttribute('height');
							
							//计算交易量的最大值，作为纵坐标的最大刻度值	
							var maxAmount = Math.max( data['sell'][0]['total'],  data['buy'][data['buy'].length-1]['total']);	
							
							var scaleH = maxAmount / height;
							
							//买卖各占一半宽度
							var scaleW = width / 2 / data['sell'].length;
							
							var context=canvas.getContext('2d');	
							
							//开始一个连续绘制路径
							context.beginPath();
							context.fillStyle = '#9dd'; //设置买入区域填充颜色
							var x =0;var y = 0;
							context.moveTo(width/2-gap, height);
							
							//从中间向上、向左绘制买单图
							for(var i in data['buy']){
								x = width/2 - i * scaleW-gap;
								y = height - data['buy'][i]['total']/maxAmount*height;
								context.lineTo(x, y);
							}
							
							context.lineTo(0, y); //延伸到最左侧边缘
							context.lineTo(0, height);
							context.lineTo(width/2-gap, height);
							context.fill(); //形成一个封装区域 并按fillStyle指定的颜色填充		
							context.closePath();
							
							//同上 开始绘制卖单深度图
							context.beginPath();
							context.fillStyle = '#1aa';
							context.moveTo(width/2+gap, height);
							for(var i in data['sell']){
								var index =data['sell'].length - i -1;
								x = width/2 + i * scaleW + gap;
								y = height - data['sell'][index]['total']/maxAmount * height;
								context.lineTo(x,y);
							}
							
							context.lineTo(width+gap, y);
							context.lineTo(width+gap, height);
							context.lineTo(width/2+gap, height);
							context.fill();	
							context.closePath();
							
							//X轴刻度
							var contextX = document.getElementById('x').getContext('2d');
							var contextY = document.getElementById('y').getContext('2d');
							contextX.fillStyle = '#ccc';
							contextY.fillStyle = '#ccc';
							
							for(var i in data['buy']){
								if(i%3) continue;
								x = width/2 - i * scaleW-30;
								y = 12;
								contextX.fillText(data['buy'][i]['price'], x, y);
							}
							
							for(var i in data['sell']){
								if(i%3 || i ==0) continue;
								x = width/2 + i * scaleW;
								y = 12;
								var index =data['sell'].length - i -1; 
								contextX.fillText(data['sell'][index]['price'], x, y);
							}
							
							//Y轴5等份
							var seg = maxAmount/5;
							for(var i=1; i<6; i++){
								x = 12;
								y = height - seg*i/maxAmount * height;
								contextY.fillText(seg*i > 1000 ? (seg*i/1000+'K'): seg*i, x, y);
							}

          },
          drawdepthLine(){
          	
					    var canvas = document.getElementById("depth");
							var context= canvas.getContext('2d');							
							function getLocation(x, y) {
								var bbox = canvas.getBoundingClientRect();
								return {
									x: (x - bbox.left) * (canvas.width / bbox.width),
									y: (y - bbox.top) * (canvas.height / bbox.height)
								};
							}
							function drawHorizontalLine(y) {
								context.beginPath();
								context.moveTo(0, y);
								context.lineTo(canvas.width, y);
								context.stroke();
								context.closePath();
							}
							function drawVerticalLine(x) {
								context.beginPath();
								context.moveTo(x, 0);
								context.lineTo(x, canvas.height);
								context.stroke();
								context.closePath();
							}
							canvas.onmousemove = function (e) {
								var location = getLocation(e.clientX, e.clientY);
								var message = document.getElementById("message");
								message.innerHTML = "x=" + location.x + " ,y=" + location.y;
								context.clearRect(0, 0, canvas.width, canvas.height);
								drawHorizontalLine(location.y);
								drawVerticalLine(location.x);
							};

          	
          }
        },
        mounted(){
          this.getNewTradeCord();
          this.drawDepths();
          this.drawdepthLine()
        },
        destroyed(){
          clearInterval(this.timer);
        }
    }
    
</script>

<style scoped>
  @import "../../assets/css/coin_trade.css"; 
.layout{
	position:relative;	
}

.layout canvas{
	position:absolute;	
}

.layout #x{
	top:300px;
	left:0;	
}

.layout #y{
	top:0px;
	left:750px;	
}

</style>
