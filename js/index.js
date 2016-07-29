// 曲线图 diagram
function diagram(){
    $.get("http://120.24.97.190/spidercount",function(data){
    	var obj2 = "";
        for(var i in data){
        	obj2 = data[i];

        }
//        alert(obj2);
//        jsons["series"][0]["data"] = obj2;
        //曲线图
        $("#diagram").highcharts({
        	chart: {
                type: 'spline',
                // renderTo: 'container',
                backgroundColor:null,
            },
            title: {
                text: ''
            },
            xAxis: {
                labels:{
                	enabled:false
                }
            },
            yAxis: {
                min: 0
            },
            // 去掉水印
            credits: {
                 enabled: false        
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br />' + '' + this.y;
                },
                // backgroundColor: '#CCCCCC',
                borderWidth: 2,
                // opacity:1,
                style: {
                    //提示框内容的样式
                    color: 'black',
                    // padding: '10px',
                    //内边距 (这个会常用到)
                    fontSize: '9pt',
                }
            },
            plotOptions: {
                spline: {
                    lineWidth: 3,
                    //线条的宽度
                    marker: {
                        //标志
                        enabled: false //数据点标志是否可见
                        },
                    pointInterval: 3600000,
                    // 点之间的间隔
                    pointStart: Date.UTC(2015, 9, 15, 0, 0, 0)
                    
                    //开始的点的值
                },
                //消除曲线图动态加载效果
                series: {
                	animation: false//动画
                	}
            },
            //导出功能
	        exporting:{
	        	enabled:false
	        },
            series: [{
                name: '爬虫线程数量',
                data: obj2,
                type:'spline',
                color:'#E50011' //线条颜色
            }],
            // 图例
            legend:{
            	enabled:false
            }
		});
    });
}

function guage(){
	$.get("http://120.24.97.190/jsontest",function(data){
		var toNum = data["sucrate"];
		// 仪表图
		$('#container123').highcharts({
		    chart: {
		        type: 'gauge',
		        backgroundColor: '#4b6fff', //外框背景颜色
		        plotBackgroundColor: null, //绘图区背景颜色
		        plotBackgroundImage: null, //绘图区背景图片
		        plotBorderWidth: 0, //绘图区边框
		        plotShadow: true //绘图区投影
		    },
		    
		    title: {
		        text: ''
		    },
		    //只适用在极坐标图和角度测量仪
		    pane: {
		        startAngle: -150,//x轴或测量轴的开始度数，0是北
		        endAngle: 150,//x轴极坐标或角度轴的最终度数，0是北
		        color:'#000',
		        background: [{
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#2f80ff'],
		                    [1, '#333']
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%'
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#333'],
		                    [0.5, '#3782ff'],
		                    [1, '#1f56f7']
		                ]
		            },
		            borderWidth: 10,
		            outerRadius: '107%'
		        }, {
		            // default background
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#6ba0ff'],
		                    [0.5, '#3782ff'],
		                    [1, '#3179ff']
		                
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%',
		            innerRadius: '0%'
		            //从外（109%）到内（0%）的背景颜色
		        }]
		    },
		    // 去掉水印
	        credits: {
	             enabled: false
	        },
	        //导出功能
	        exporting:{
	        	enabled:false
	        },
		    // the value axis
		    yAxis: {
		       	min: 0,
		        max: 100,
		        minorTickInterval: 'auto',
		        minorTickWidth: 1,
		        minorTickLength: 10,
		        minorTickPosition: 'inside',
		        minorTickColor: '#295fb7', //小刻度的颜色
		
		        tickPixelInterval: 30,
		        tickWidth: 2,
		        tickPosition: 'inside',
		        tickLength: 10,
		        tickColor: '#295fb7', //大刻度的颜色
		        labels: {
		            step: 2,
		            rotation: 'auto'
		        },
		        title: {
		            text: '%'
		        },
		        plotBands: [{
		            from: 0,
		            to: 100,
		            color: '#557bff' //所有刻度所占位置的颜色
		        },{
		            from: 0,
		            to: data["sucrate"],
		            color: '#6ed7db' //已有刻度所占位置的颜色
		        }]
		    },
		    plotOptions : {
	            gauge : {
	                dataLabels : {
		        	//是否显示图例
	                    enabled : true
	                },
	                dial : {
	                    backgroundColor: '#FF0000',
	                    color:'#FF0000',
	                    // 半径：指针长度，颜色
	                    radius : '96%',
	                    borderWidth: 5,baseWidth: 5,topWidth: 1
	                }
	            },
	            
                //消除曲线图动态加载效果(指针不再从0开始)
                series: {
                	animation: false//动画
                }
	        },
		    series: [{
		    	//显示框内容
		        name: 'Success Rate',
		        data: [data["sucrate"]],
		        tooltip: {
		            valueSuffix: ' %'
		        }
		    }]
		}, 

		// Add some life
		function (chart) {
			if (!chart.renderer.forExport) {
			    setInterval(function () {
			        var point = chart.series[0].points[0],
			            newVal,
			            inc = Math.round((Math.random() - 0.5) * 20);
			        newVal = point.y + inc;
			        if (newVal > 100) {
			            newVal = 100;
			        }else if(newVal < 90){
			        	newVal = 90;
			        }
			        toNum = newVal;
			        point.update(newVal);
			    }, 3000);
			}
		});

	});
}

function text(){
	$.get("http://120.24.97.190/jsontest",function(data){
		// news
		$("#news p").text(data["news"]);
		// video
		$("#video p").text(data["video"]);
		// weibo
		$("#weibo_1 p").text(data["weibo"]);
		// weixin
		$("#weixin p").text(data["weixin"]);
	});
}

var chart;
$(function(){
	// 曲线图
	diagram();
	// 仪表图
	guage();
	// 文字
	text();

	$(".chart").css("height",$(".chart").width());
});
setInterval("diagram();",3000);
setInterval("guage();",3000);
setInterval("text();",3000);
