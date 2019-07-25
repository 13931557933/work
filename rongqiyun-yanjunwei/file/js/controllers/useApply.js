app.controller("useApplyCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
	$scope.useAppName = sspaasMemory.get('useApplyData')?sspaasMemory.get('useApplyData').application_id:"";
	/*终端*/
	function termContent(){
		$('#term').text('');
		var containerId = $('#terminalDrop_enter').attr('data-containerId');
		var hostId = $('#terminalDrop_enter').attr('data-hostIp');
		connect(containerId,hostId);	
	}
	$scope.terminalFn = function(){
		termContent();
		apiService.Show('813px','.js_terminal');
	}
	$scope.termCloseFn = function(){
		WebSocketAllFn.onClose();		
		apiService.Hide();
	}
	$scope.termDropDataFn = function(e){
        var $txt =  $(e.target).parent('.js_dropList');
		$txt.siblings('.js_frame').text($(e.target).text());        
        $txt.siblings('.js_frame').attr('data-hostIp',$(e.target).attr('data-hostIp'));
        $txt.siblings('.js_frame').attr('data-containerId',$(e.target).attr('data-containerId'));
        $txt.siblings('.js_frame').removeClass('on');
        termContent();      
        $txt.hide();  
	}
	/*终端结束*/
	/*详情信息切换展示*/
	$scope.detailTypeFn = function(e){
		var index = $(e.target).index();
		$(e.target).addClass('add');
		$(e.target).siblings().removeClass('add');
		$('.js_switch').eq(index).addClass('on');
		$('.js_switch').eq(index).siblings().removeClass('on');
		if(index == 0){
			$scope.basicInformation();
			return false; 			
		};
		if(index == 1){
			return false; 			
		};
		if(index == 2){
			$scope.serviceInformationFn()
			return false; 			
		};
		if(index == 3){			
			$scope.appMonitor();
			return false; 			
		};							
	}
	/*详情信息切换展示结束*/
	/*复制服务地址*/ 
	$scope.copyAddressFn = function(){
      var text = document.getElementById("js_copy").innerText;
      var input = document.getElementById("js_copyTxt");
      input.value = text; // 修改文本框的内容
      input.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      layer.alert('复制成功')
	}
	/*复制服务地址结束*/
	/*升级弹窗*/	
	$scope.upGradeModelFn = function(){
		var url = $rootScope.gearBoxdIp + "/application/upgrade_info";
		var data = {
			application_id:$scope.useAppName,
		};	
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.versionInformLIst = json.data.image_version.version_list;
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})				
		apiService.Show('520px','.js_upGrade')
	}
	$scope.appUpGradeFn = function(e){
		$(e.target).attr('disabled',true)
		var url = $rootScope.gearBoxdIp + "/application/upgrade_application";
		var data = {
			application_id:$scope.useAppName,
			image_name:$scope.basicInformLIst.image_name,
			image_version:$('#js-verson').text()
		};	
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$state.go('appDetail');
				$scope.closeFn();
				$(e.target).attr('disabled',false);
			}else{
				$(e.target).attr('disabled',false);
				layer.alert(json.message,{icon:7})			
			}
		})			
	}
	/*升级弹窗结束*/
	/*日志弹窗*/
	$scope.applyLogFn = function(){
		$scope.logDataFn();
        $('.scrollDiv').slimScroll('','#f1f1f1');
		apiService.Show('900px','.js_logModel')		
	}
	/*日志弹窗结束*/
	/*关闭日志*/
	$scope.closeWebSocket = function(){
        if (window.s) {
            window.s.close();//关闭websocket
            $('.js_logsContent').text('');
			apiService.Hide();
        }
    }    
	/*关闭日志结束*/
	/*基本信息*/	
	$scope.basicInformation = function(){
		var url = $rootScope.gearBoxdIp + "/application/application_details";
		var data = {
			application_id:$scope.useAppName,
		};	
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.basicInformLIst = json.data;
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	};
	$scope.basicInformation(); 
	/*基本信息結束*/
	/*绑定域名*/
	$scope.domainInformationFn = function(){
		var url = $rootScope.gearBoxdIp + "/application/domain_list";
		var data = {
			application_id:$scope.useAppName,
		};	
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.doaminInformLIst = json.data.domain_name_list;
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	}
	$scope.domainInformationFn();
	$scope.addDomainFn = function(){
		var url = $rootScope.gearBoxdIp + "/application/bind_domain";
		var data = {
			application_id:$scope.useAppName,
			domain_name:$('#domain-Name').val(),
			port:$('#js-port').text() 
		};	
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.domainInformationFn();				
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})				
	};
	$scope.delDomainFn = function(data){
		var url = $rootScope.gearBoxdIp + "/application/delete_domain";
		var data = {
			application_id:$scope.useAppName,
			ingress_id:data.ingress_id
		};	
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.domainInformationFn();			
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	}	
	/*绑定域名結束*/
	/*服务实例*/	
	$scope.serviceInformationFn = function(){
		var url = $rootScope.gearBoxdIp + "/application/running_instance";
		var data = {
			application_id:$scope.useAppName,
		};	
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.serviceInformLIst = json.data.pods_list;
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	};
	$scope.serviceInformationFn();			
	/*服务实例结束*/
	/*日志*/
	$scope.logDataFn = function(){
		var url=$rootScope.gearBoxgIp+"/log/push";
		var data = {
			application_id:$scope.useAppName,
			instance_name:$('#js-instance').text(),
		};	
		apiService.getSocket(url,data)	
	}
	/*日志结束*/ 
	/*监控*/	
	$scope.appMonitor = function(text,netCard){
		var url = $rootScope.gearBoxdIp + "/application/search_pod_monitor";
		var data = {
			instance_name:$('#js-mirrorExam').text(),
			graininess:20,
			period:$('#js-cycle').text(),
			indicator:$('#js-indicator').text()
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.monitorData = json.data;	
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
			arr1.push(data[i].memory);
			arr2.push(data[i].network_rx);
			arr3.push(data[i].network_tx);
			arr4.push(data[i].current_time);
		};
	  	var cpuData = arr;
	  	var memData = arr1;
	  	var intData = arr2;
	  	var intData1 = arr3;
	  	var timeData = arr4;
	    comChart("cpuChart",Cpucolor,"","CPU利用率(%)",cpuData,"",timeData,"CPU利用率",'');
	    comChart("memChart",Memcolor,"","内存利用率(%)",memData,"",timeData,"内存利用率",'');
	    comChart("intChart",intcolor,intcolor1,"网络收/发速度(kbps)",intData,intData1,timeData,'网络接收速度','网络发送速度');		
	}	
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
	    			trigger:'axis'
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
		return option ;	    	
    };
	/*监控结束*/
	/*下拉选中*/	
	$scope.appDropDataFn = function(e){
        var $txt =  $(e.target).parent('.js_dropList');
        $txt.siblings('.js_frame').text($(e.target).text());
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();  		
	}
	$scope.appLogDropDataFn = function(e){
		$('.js_logsContent').text('');
		$scope.appDropDataFn(e);
		$scope.logDataFn();				
	}
	$scope.appMirrorDropDataFn = function(e){
		$scope.appDropDataFn(e);
		$scope.appMonitor();  		
	}
	/*下拉选中结束*/
	/*表单提交*/	
  $('form').on("change",'input[type="file"]',function(event){
        var elForm = $(event.target).parents('form');
        uploadPicture(elForm,event);
    })
    function uploadPicture(elForm,event){
        elForm.ajaxSubmit({
            type: 'post',
            url:  $rootScope.gearBoxdIp+'/application/upload_file',
            headers: {
            },
            xhrFields:{
                withCredentials:true
            },
            beforeSubmit: function() {
            } ,
            success: function(json){
                if(json.code == 200){
                }else{
                    alert(json.message,{icon: 7});
                }
            },
            error: function(){
                alert('上传失败', {icon: 7, time: 1000});
            }
        });
    }   	
	/*表单提交结束*/	
}])
app.filter('statuFilter',function(){
	return function(data){
		var map = {
			0:"创建中",
			1:"运行中",
			2:"升级中",
			3:"删除中",
			4:"创建失败",
			5:"删除失败",
			6:"删除成功",
			7:"升级失败",
			8:"升级成功",
		};
		return map[data] ? map[data]:data
	}
})