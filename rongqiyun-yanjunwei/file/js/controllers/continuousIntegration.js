 app.controller("continuousIntegrationCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
    /*查询方法*/
	var loading = null;
    var timer = null ;
	function comtinData(page,rows){
        if($state.current.name.indexOf('continuousIntegration') != -1){
            clearTimeout(timer)        	
			var url = $rootScope.gearBoxcIp + "/integration/search/build";
			var data = {
				page_num: page,
				page_limit:rows,
				search_project_name:$('.searchBox').val()
				};
			apiService.axjxGet(url,data).then(function(json){
				if(json.code == 200){
					$scope.continuList = json.data.data;
					$scope.continuCount = json.data.num_limit
					Page({
					    num:json.data.page_num,    //页码数
					    startnum:page,             //指定页码
					    elem:$('#page2'),       //指定的元素
					    callback:function(n){   //回调函数
				    		comtinData(n,7);
					    }
					});			
					layer.closeAll('loading');
				}else{
					layer.alert(json.message,{icon:7})
				}
                for(var i = 0 ;i< $scope.continuList.length;i++){
                    if($scope.continuList[i].status =="构建中"){
                        timer = setTimeout(function(){
                        	comtinData(1,7);
                        },1500);
                        return false                    
                    }
                }				
			})
        	
        }
	}; 
	comtinData(1,7)    	 
    /*查询方法就结束*/
    /*刷新列表*/
    $scope.conRefreshFn = function(){
		loading = layer.load(0, {
				shade: [0.1,'#fff']
		});
		comtinData(1,7)    	
    }
    /*刷新列表结束*/
    /*搜索框代码*/
    $scope.conSearchFn = function(){
		comtinData(1,7)
    }
    /*搜索框代码结束*/
	/*操作列表展示*/
	$scope.opeModelFn = function(data,e){
		if($(e.target).hasClass('on')){
			$(e.target).removeClass('on');
        	$(e.target).siblings('.js_opList').removeClass('off');
        	$scope.MenuData = sspaasMemory.set("IntegrationmenuData", '');			
		}else{
			$('.icon').removeClass('on');
			$(e.target).addClass('on');
        	$(e.target).siblings('.js_opList').addClass('off');
        	$scope.MenuData = sspaasMemory.set("IntegrationmenuData", data);			
		}
	}
    $(window).on('click',function(e){
        var $tr = $(e.target).hasClass('icon');
        if(!$tr){
       		$('.icon').removeClass('on');
       		$('.js_opList').removeClass('off');
    		$scope.MenuData = sspaasMemory.set("IntegrationmenuData", '');           
        }
    })
   $(window).on('click',function(e){
        var $tr = $(e.target).hasClass('js_frame') || $(e.target).hasClass('js_dropList');
        if(!$tr){
           $('.js_frame').removeClass('on');
           $('.js_dropconList').removeClass('off');
            $scope.menuData = sspaasMemory.set("IntegrationmenuData", '');           
        }
    })    	
	/*操作列表展示结束*/
	/*弹窗*/
	$scope.webHookModelFn = function(data){
		var url = $rootScope.gearBoxcIp + "/integration/git/webhooks";
		var data = {
			project_name:data.project_name,
			project_type:data.project_type
		};		
		apiService.axjxGet(url,data).then(function(json){
			if(json.code == 200){
				$scope.webhookContent = json.data.webhooks;	
				apiService.Show('660px','.js_webhook');
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})	
	};
	$scope.recentRecordFn = function(data){
        if(data.status == "未构建" || data.status == "构建中"){
            layer.alert("暂时没有记录",{icon:7});
            return false;
        };
		apiService.Show('813px','.js_recordLog');
        var url = $rootScope.gearBoxcIp + '/integration/latest/logs';
        var data = {
            code_source:data.address,
            latest_log: 'latest_log',
            start_time:'',
            end_time:''
        }
        apiService.axjxPost(url,data).then(function(json){
	        if(json.code ==200){
	            $scope.recentRecordData = json.data; 
	            var textHtml = $scope.recentRecordData.execution_log;
            	textHtml = textHtml.toString().replace(/\n/g,"<br/>");
	            $(".js_recordMessage").html(textHtml);
	        }
        	
        });
	} 
	/*弹窗结束*/
	/*复制webhook*/ 
	$scope.copyWebFn = function(e){
      var text = document.getElementById("js_copy").innerText;
      var input = document.getElementById("js_copyTxt");
      input.value = text; // 修改文本框的内容
      input.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      layer.alert('复制成功')
	}
	/*复制webhook结束*/
	/*执行记录内容的显示与隐藏*/ 
	$scope.retoteIconFn = function(e){
		if($(e.target).hasClass('add')){
			$(e.target).removeClass('add');
			$('.js_recordMessage').slideDown()				
		}else{
			$(e.target).addClass('add');
			$('.js_recordMessage').slideUp()			
		}
	};
	/*执行记录内容的显示与隐藏结束*/ 
	/*执行记录页面跳转*/
	$scope.projectRecord = function(data){
   		sspaasMemory.set("continuousIntegrationData",data);		
		$state.go('logRecord');
	}
	/*执行记录页面跳转结束*/
	/*分支信息*/
	$scope.continudropDownFn = function(e,data){
        if($(e.target).hasClass('on')){
            $(e.target).removeClass('on');
            $(e.target).siblings('ul').removeClass('off');
    		$scope.menuData = sspaasMemory.set("IntegrationmenuData",'');              
        }else{
            $('.js_frame').removeClass('on');
            $('.js_dropList').removeClass('off');            
            $(e.target).addClass('on');
            $(e.target).siblings('ul').addClass('off');
    		$scope.menuData = sspaasMemory.set("IntegrationmenuData",data);                       
        }   		
	}
	$scope.continuDropFn = function(e,data){
        var $txt =  $(e.target).parent('.js_dropList');
        var url = $rootScope.gearBoxcIp + "/integration/git/select_branch";
        var data = {
			project_name:data.project_name,
			project_type:data.project_type,
			branch:$(e.target).text(),        	
        };
        $txt.siblings('.js_frame').text($(e.target).text());
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();
        apiService.axjxGet(url,data).then(function(json){
        	if(json.code ==200){
				comtinData(1,7) 	 
        	}
        })    
	}
	/*分支信息结束*/
	/*立即构建*/
	$scope.buildImmedFn = function(e,data){
		$(e.target).attr("disabled",true);
		var numData = $(e.target).parents('.js_oneListGroup').find('.js_frame').text();
		var url = $rootScope.gearBoxcIp + "/integration/git/structure";
		var data = {
			project_name:data.project_name,
			project_type:data.project_type,
			branch:numData,
		};		
		apiService.axjxGet(url,data).then(function(json){
			if(json.code == 200){
				$(e.target).attr("disabled",false);				
				comtinData(1,7)		
			}else{
				$(e.target).attr("disabled",false);				
				layer.alert(json.message,{icon:7})			
			}
		})				
	}
	/*立即构建结束*/
	/*解除关联*/
	$scope.relieveContentFn = function(e,data){
	    var numData = $(e.target).parents(".js_oneListGroup").find('.js_frame').text(); 
	    var url = $rootScope.gearBoxcIp + '/integration/git/activation';
	    var data = {
	        project_name:data.project_name,
	        project_type:data.project_type,
	        branch:numData,
	        is_activation:"0"        
	    }
	    apiService.axjxGet(url,data).then(function(json){
	      if(json.code == 200){
	      	layer.alert("已解除",{icon:7})
			comtinData(1,7) 					 
	      }else{
	        layer.alert(json.message,{icon:7})
	      }      
	    });       
	}
	/*解除关联结束*/
}])
