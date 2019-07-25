app.controller("hostDetailsCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
	$scope.hostDetailTxt = sspaasMemory.get('hostDetailTxt') ? sspaasMemory.get('hostDetailTxt') : '';
	/*获取网卡*/
	function netWorkCard(){
		var url = $rootScope.gearBoxbIp + "/list/adapts";
		var data = {
			host_name:$scope.hostDetailTxt.host_name, 
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.nWCard = json.result;
				$scope.netCardTxt = json.result[0];
				hostDetailsMonitor($('.js_time.color').text(),$scope.netCardTxt)
			}else{
				layer.alert(json.message,{icon:7})		 	
			}
		})	
	}
	netWorkCard(); 
	/*获取网卡结束*/
	/*返回*/
	$scope.backGoFn = function(){
		if($scope.hostDetailTxt.module =="1"){
			$state.go('subGroup');
		}else{
			$state.go('hostComputer');			
		}
	}
	/*返回结束*/
    $scope.hostDetailDropDataFn = function(data,roleData,e){
        var $txt =  $(e.target).parent('.js_dropList');
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();
        $txt.siblings('.js_frame').text($(e.target).text());         
		hostDetailsMonitor($('.js_time.color').text(),$(e.target).text())
    };
	/*获取监控列表*/
	function hostDetailsMonitor(text,netCard){
		var url = $rootScope.gearBoxbIp + "/search/host/monitor";
		var data = {
			host_name:$scope.hostDetailTxt.host_name, 
			graininess:"20",
			period:text,
			adapter:netCard
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.monitorData = json.result;	
				chartFn($scope.monitorData)  						
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})				
	};	
	function chartFn(data){
		var arr = [];
		var arr1 = [];
		var arr2 = [];
		var arr3 = [];
		var arr4 = [];
		for(var i = 0;i<data.length;i++){
			arr.push(data[i].cpu);
			arr1.push(data[i].mem);
			arr2.push(data[i].net_in_bw);
			arr3.push(data[i].net_out_bw);
			arr4.push(data[i].current_time);
		};
	  	var cpuData = arr;
	  	var memData = arr1;
	  	var intData = arr2;
	  	var intData1 = arr3;
	  	var timeData = arr4;
	    comChart("cpuChart",Cpucolor,"","CPU利用率(%)",cpuData,"",timeData,"CPU利用率",'');
	    comChart("memChart",Memcolor,"","内存利用率(%)",memData,"",timeData,"内存利用率",'');
	    comChart("intChart",intcolor,intcolor1,"网络收/发速度(byte)",intData,intData1,timeData,"网络接收速度","网络发送速度");		
	}
	/*获取监控列表结束*/
	/*监控时间以及切换状态*/
	$scope.monitorMessageFn = function(e){
		$(e.target).addClass('color').siblings().removeClass('color');
		hostDetailsMonitor($('.js_time.color').text(),$('.js_frame ').text());		
	}
	/*监控时间以及切换状态结束*/
	/*组建详情列表*/
	function moduleList(page,rows){
		var url = $rootScope.gearBoxbIp + "/list/component";
		var data = {
			page:page, 
			rows:rows,
			host_name:$scope.hostDetailTxt.host_name,
			search_name:$('.searchBox').val()
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.chipLIst = json.result;
				$scope.chipPageCount = json.result.pages;
				$scope.chipTotalData = json.result.total;
				Page({
				    num:$scope.chipPageCount,    //页码数
				    startnum:page,             //指定页码
				    elem:$('#page2'),       //指定的元素
				    callback:function(n){   //回调函数
			    		moduleList(n,10)				    		
				    }
				});						
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})				
	}
	moduleList(1,10)
	/*组建详情列表结束*/
	/*模糊查询*/
	$scope.moduleSearchFn = function(){
		moduleList(1,10)		
	}
	/*模糊查询结束*/
	/*硬盘使用率echart*/
	function diskRate(data){
		var myChartFill = echarts.init(document.getElementById('fill'));
		option = {
			title:{
					text:'硬盘使用率',
	                textStyle:{
	                    color:'#3c3c3c',
	                    fontWeight:"normal",
	                    fontSize:20
	                },				
					left:"center",
					bottom:"0px"
				},
			series: [{
				type: 'liquidFill',
				radius:"80%",
				outline: {show: false},
				color:['#9ce37d','#7bd951'],
	            itemStyle: {
	                shadowBlur: 20,
	                },	
				data: [data/100, {
					value: data/100,
					phase: Math.PI,			
				}],
				backgroundStyle: {
					borderColor: '#e9f8e2',
					borderWidth: 5,
					color:"#FFFFFF",
					shadowBlur: 0
				},
				label: {
					normal:{
						formatter:data+'%',
						baseline: 'bottom',
						position: ['50%', '86%'],
						textStyle: {
		                color: '#6aaf4b', //波浪上文本颜色
		                insideColor: '#FFFFFF', //波浪内部字体颜色
		                fontFamily: 'Lobster Two',
		                fontSize: 20
		            }
		        }	
		    } ,              
		    phase: 0,
		    period: 4000,
		    waveLength: '100%',
		    animationDurationUpdate: 2000
			}]
		};
		myChartFill.setOption(option, true);
	      window.addEventListener('resize',function(){
	            myChartFill.resize();
	        })			
	}
	diskRate($scope.hostDetailTxt.disk_percent);
	/*硬盘使用率echart结束*/
	/*IP功能*/
	$scope.IPMOdelFn = function(){
		apiService.Show('349px','.js_allIp')
	}
	/*IP功能结束*/
  	/*cpu这些图表*/
  	var Cpucolor = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color:'#47b749'},{offset: 1, color:'#dae25b'}],false);
  	var Memcolor = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color:'#48b74b'},{offset: 1, color:'#7cccf5'}],false);
  	var intcolor = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color:'#b8a4de'},{offset: 1, color:'#d3e05a'}],false);
  	var intcolor1 = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color:'#798dd9  '},{offset: 1, color:'#7887d7'}],false);
    function comChart(id,myColor,myColor1,name,Data,Data1,time,name1,name2){
    	var myChart = echarts.init(document.getElementById(id));
		var	option = {
			    title: {
	        		text: name,
	                textStyle:{
	                    color:'#333333',
	                    fontWeight:"normal",
	                    fontSize:22
	                },				
					left:"center",
	    		},
	    		tooltip:{
	    			trigger:"axis"
	    		}, 		
			    xAxis: {
		           	axisLine: {
		                lineStyle: {
			                type: 'solid',
		                    color: '#008acd',//左边线的颜色
		                }
		            },
		            axisLabel: {
		                textStyle: {
		                color: '#333333',//坐标值得具体的颜色
						},
					},
				    splitLine: {
						lineStyle: {
							color:"#f5f5f5"
						}
					},
					data:time							    	
			    },
			    yAxis: {
		        	splitArea: {
	            		show: true,
	            		areaStyle:{
	            			color:['#fff','#fbfbfb']
	            		},
	    			},
				    splitLine: {
						lineStyle: {
							color:"#f5f5f5"
						}
					},		
		           	axisLine: {
		                lineStyle: {
			                type: 'solid',
		                    color: '#008acd',//左边线的颜色
		                }
		            },
		            axisLabel: {
		                textStyle: {
		                color: '#333333',//坐标值得具体的颜色
						},
					},			    
			    },
			    color:[myColor,myColor1],
			    series: [{
			        symbolSize: 5,
			        name:name1,
			        data:Data,
			        type: 'line',
	                smooth: true,
		     		itemStyle:{
		                    normal : {
		                        lineStyle:{
		                            width:5,//折线宽度
		                            color: myColor
	                        },
	                        borderColor: "#90dccb"  // 点边线的颜色
	                    }
	                }		    
		   		},
				{
			        symbolSize: 5,
			        name:name2,
			        data:Data1,
			        type: 'line',
	                smooth: true,
		     		itemStyle:{
		                    normal : {
		                        lineStyle:{
		                            width:5,//折线宽度
		                            color: myColor1
	                        },
	                        borderColor: "#90dccb"  // 点边线的颜色
	                    }
	                }		    
		   		}		   		
		   		]
			};
    	myChart.setOption(option);
        window.addEventListener('resize',function(){
            myChart.resize();
        })    	   
		return option ;	    	
    };
  	/*cpu这些图表结束*/
  	/*监控组件详情的howHide*/
  	$scope.monitorBoxFn = function(e){
  		var index = $(e.target).index();
  		$(e.target).addClass('add').siblings().removeClass('add');
  		$('.js_monitorBox').eq(index).show().siblings().hide();
  	}
  	/*监控组件详情的howHide*/
  	/*时间段选择*/
	var dateRange1 = new pickerDateRange('date1', {
		isTodayValid : true,
		/*startDate : '2018-06-14',
		endDate : '2018-07-10',*/
		needCompare : false,
		defaultText : ' - ',
		autoSubmit : true,
		theme : 'ta',
		success : function(obj) {
			timeMonitor( obj.startDate,obj.endDate);
		}
	});
	function timeMonitor(start,end){
		var url = $rootScope.gearBoxbIp + "/search/time/monitor";
		var data = {
			host_name:$scope.hostDetailTxt.host_name,
	       	graininess:20,
	       	start_time:start,
	       	end_time:end,
	       	adapter:$('.js_frame ').text()			 
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.monitorData = json.result;	
				chartFn($scope.monitorData)  	
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})	
	}	
  	/*时间段选择结束*/
}]);
app.filter('fiterStatu',function(){
	return function(data){
		var map = {
			0:"正常",
			1:"异常"
		};
		return map[data] ? map[data]: data
	}
})	