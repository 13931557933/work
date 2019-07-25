app.controller("appDetailCtrl", ["$rootScope", "$scope", "$state","apiService","$compile",function($rootScope,$scope,$state,apiService,$compile) {
	var loading = null; 
	/*获取镜像*/
	$scope.accessMirror = function(page,rows){
		var url = $rootScope.gearBoxeIp + "/repository/image";
		var data = {
			page_num: page,
			page_limit: rows, 
			serach_info:$('.imageQueryBox').val(),
			all_private_or_public_image:3,
			user_name:$scope.userName
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.platDataList = json.data.data;
				$scope.platDataPage = json.data.page_count;
				$scope.platDataTotal = json.data.total_number;
				Page({
				    num:$scope.platDataPage,    //页码数
				    startnum:page,             //指定页码
				    elem:$('#page2'),       //指定的元素
				    callback:function(n){   //回调函数
						$scope.accessMirror(n,8)			    	
				    }
				});
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})		
	}
	/*获取镜像结束*/
	/*查询镜像*/
	$scope.imageQueryFn = function(){
		$scope.accessMirror(1,8)
	}
	/*查询镜像结束*/
	/*创建应用弹窗*/
	$scope.addAppFn = function(){
		$scope.accessMirror(1,8); 
		apiService.Show('900px','.js_addApp');
	};	
	$scope.addFirstFn = function(){
		$scope.closeFn();
		$scope.mirrorMsg();
	};
	$scope.lastStepFn = function(){				
		$scope.closeFn();	
		apiService.Show('900px','.js_addApp');		
	}	
	$scope.addSecFn = function(){
		var isReturn = false;
		$('.maxOverHeight').find('input').each(function(){
			if(!$(this).val()){
				layer.msg('请完善信息');
				isReturn = true;
				return false;
			}
		});
		if(isReturn){
			return false
		};
		apiService.Show('900px','.js_addAppThr')
	}; 
	$scope.mirrorMsg = function(){
		$scope.mirrorSelected = $('.js_mirrorBox.add div').text();
		$scope.imgSelected  = $('.js_mirrorBox.add img').attr('src');
		var url = $rootScope.gearBoxdIp + "/application/create_app_info";
		var data = {
			image_name:$scope.mirrorSelected,
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.mirrorData = json.data;
				$scope.versionList = json.data.image_version.version_list;
				$('#js-verson').text(json.data.image_version.version_list[0]);
				$('#js-net').text(json.data.available_network_list[0]);
				$scope.envirList = json.data.image_info.env_total_list;
				$scope.portList = json.data.image_info.port_protocol_list;
				$scope.configList = json.data.configuration_information;
				$scope.volumeList = json.data.available_volume_list;
				apiService.Show('900px','.js_addAppSec');								
			}else{
				layer.alert(json.message,{icon:7})		
			}
		})					
	}
	/*创建应用弹窗结束*/
	/*选择镜像*/
	$scope.mirrorChFn = function(e){
		$('.js_mirrorBox').removeClass('add');
		$(e.currentTarget).addClass('add');
	}
	/*选择镜像结束*/
	/*选择信息*/
	$scope.appDropDataFn = function(e){
        var $txt =  $(e.target).parent('.js_dropList');
        $txt.siblings('.js_frame').text($(e.target).text());
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();      		
	}
	$scope.statuChcFn = function(e){
		if($(e.target).hasClass('add')){
			$(e.target).removeClass('add');
			$scope.hasServe = false;
			return false
		};
		if(!$(e.target).hasClass('add')){
			$(e.target).addClass('add');
			$scope.hasServe = true;
			return false
		};	
	}	
	$scope.accStorageFn = function(e){
        if($(e.target).hasClass('on')){
            $(e.target).removeClass('on');
            $(e.target).siblings('ul').hide()
        }else{
            $('.js_frame').removeClass('on');
            $('.js_dropList').hide();            
            $(e.target).addClass('on');
            $(e.target).siblings('ul').show();

        } 
	}
/*	$scope.volumeNewList = function(){
		let arr = ["1","2","3","4","5",];
		let arr1 =[];
		let input = document.getElementsByClassName("div");
		let a = Array.from(input, s => s.innerHTML);
	    arr.forEach( v => {
	      if(a.indexOf(v) === -1)arr1.push(v) 
	    })
	};*/
	$scope.createStorageFn = function(){
		$scope.closeFn();
		$state.go('storageVolume');
	}
	$scope.volumeDataFn = function(data,e){
        var $txt =  $(e.target).parent('.js_dropList');
        $txt.siblings('.js_frame').text($(e.target).text());
        $txt.siblings('.js_frame').attr('data-attr',data.pvc_id);
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();  		
	}	
	/*选择信息结束*/
	/*高级操作*/	
	$scope.expertFn = function(){
		$scope.isShow = !$scope.isShow
	}
	$scope.delEnvGroupFn = function(e){
		var $delBox = $(e.target).parents(".js_envBox").siblings('.js_envBox');
		if($delBox.length<=0){
			layer.msg('至少保留一个');
			return false
		};
		if($delBox.length>0){
			$(e.target).parents(".js_envBox").remove();
		};
	};
	$scope.addEnvGroupFn = function(e){
		var $ev = $(e.target).siblings().eq(-1);
		var $div ='<div class="js_envBox compumpBox left">'+
				'<input class="left" type="text" name="">'+
				'<input class="mar8 left" type="text" name="">'+
				'<button class="mar20 delBtn" ng-click="delEnvGroupFn($event)">'+
				'</button>'+
				'</div>';
	 	var isReturn = false;					
		var $next = $ev.find('input').each(function(){
			if($(this).val() == ''){
				layer.tips('请输入',$(this),{tips:1});
				isReturn = true;
				return false;
			}
		});
		if(isReturn){
			return false
		};
		$(e.target).before($compile($div)($scope));
	};
	$scope.timeZooeFn = function(e){
		if($(e.target).hasClass('add')){
			$(e.target).removeClass('add');
			$(e.target).attr('data-attr','')
			return false
		};
		if(!$(e.target).hasClass('add')){
			$(e.target).addClass('add');
			$(e.target).attr('data-attr',true)
			return false
		};
	}
	$scope.delServiceGroupFn = function(e){
		var $delBox = $(e.target).parents(".js_addService").siblings(".js_addService");
		if($delBox.length<=0){
			layer.msg('至少保留一个');
			return false
		};
		if($delBox.length>0){
			$(e.target).parents(".js_addService").remove();
		};
	};
	$scope.addServiceGroupFn = function(e){
		var $group ='<div class="compumpBox js_addService left">'+
					'<input class="left" type="text" name="">'+
					'<div class="keyWid left mar8">'+
					'<div id="dropDown" class="dropFramePosition wid1 left">'+
					'<div class="frame wid1 js_frame" ng-click="dropDownFn($event)">{{list[0].name}}</div>'+
					'<ul class="dropList js_dropList">'+
					'<li ng-click="dropDataFn(data,$event)" ng-repeat = "data in list">{{data.name}}</li>'+
					'</ul>'+
					'</div>'+		
					'</div>'+
					'<button class="mar20 delBtn" ng-click="delServiceGroupFn($event)"></button>'+
					'</div>'

		$(e.target).before($compile($group)($scope));					
	};

	$scope.selectConfigFn = function(e){
		var $box = $(e.currentTarget);
		$('.js_configBox').removeClass('add');
		$('.js_configBox').children().removeClass('add');
		$box.addClass('add');
		$box.children().addClass('add');
	};
	$scope.instanceNumFn = function(e){
		if($scope.instanceNum>10){
			$scope.instanceNum = 10;
		};
		if($scope.instanceNum<1){
			$scope.instanceNum ='';			
		}
	}							
	/*高级操作结束*/
	/*部署*/
	$scope.sureDeployFn = function(e){
		if(!$('#js-exam').val()){
			layer.msg('请完善信息');
			return false;
		}
		$(e.currentTarget).attr('disabled',true);
		var arr = [];
		var arr1 = [];
		var arr2 = [];
		for(var i= 0;i<$('#js-port .js_envBox').length;i++){
			var key = {};
			key.containerPort = $('#js-port .js_envBox').eq(i).find('input').eq(0).val();
			key.protocol = $('#js-port .js_envBox').eq(i).find('input').eq(1).val();
			arr.push(key);
		};
		for(var i= 0;i<$('#js-env .js_envBox').length;i++){
			var key = {};
			key.name = $('#js-env .js_envBox').eq(i).find('input').eq(0).val();
			key.value = $('#js-env .js_envBox').eq(i).find('input').eq(1).val();
			arr1.push(key);
		};
		for(var i= 0;i<$('#js-volume .js_addService').length;i++){
			var key = {};
			key.mountPath = $('#js-volume .js_addService').eq(i).find('input').val();
			key.claimName = $('#js-volume .js_addService').eq(i).find('.js_frame').attr('data-attr');
			arr2.push(key);
		};
		var url = $rootScope.gearBoxdIp + "/application/create_application";
		var data = {
			image_name:$scope.mirrorSelected,
			image_version:$('#js-verson').text(),
			application_name:$('#js-serve').val(),
			cpu_cores:$('.js-cpu.add').text().slice(0,-3),
			memory_capacity:$('.js-mem.add').text(),
			port_protocol:arr,
			env:arr1,
			network_name:$('#js-net').text(),
			replications:$('#js-exam').val(),
			stateful_load:arr2,
			node_synchronization:$('#js-syn').attr('data-attr'),
		};	
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('操作成功',{icon:1});
				$scope.appList(1,10)
				$(e.currentTarget).attr('disabled',false);						
			}else{
				layer.alert(json.message,{icon:7});
				$(e.currentTarget).attr('disabled',false);								
			}
		})	
	}
	/*部署结束*/
	/*应用列表*/
	var timer =null ;	
	$scope.appList = function(page,rows){
        if($state.current.name.indexOf('appDetail') != -1){
            clearTimeout(timer)      		
			var url = $rootScope.gearBoxdIp + "/application/application_list";
			var data = {
				page_limit:rows,
				page_num:page,
				search_keyword:$('.searchName').val()
			};		
			apiService.axjxPost(url,data).then(function(json){
				if(json.code == 200){
					layer.closeAll('loading');
					$scope.appLIst = json.data.application_list;
					$scope.appPage = json.data.total_pages;
					$scope.appTotalRows = json.data.total_items;
					Page({
					    num:$scope.appPage,    //页码数
					    startnum:page,             //指定页码
					    elem:$('#page1'),       //指定的元素
					    callback:function(n){   //回调函数
							$scope.appList(n,10)			    	
					    }
					});					
				}else{
					layer.alert(json.message,{icon:7})			
				}
                for(var i = 0 ;i< $scope.appLIst.length;i++){
                    if($scope.appLIst[i].status ==0 || $scope.appLIst[i].status ==2 || $scope.appLIst[i].status ==3){
                        timer = setTimeout(function(){
                        	$scope.appList(1,10)
                        },1500);
                        return false                    
                    }
                }				
			})
		}			
	}
	$scope.appList(1,10)
	/*应用列表结束*/
	/*查询*/
	$scope.appSearchFn = function(){
		$scope.appList(1,10)		
	}
	/*查询结束*/
	/*刷新*/
	$scope.appResearchFn = function(){
		loading = layer.load(0, {
			shade: [0.1,'#fff']
		});	
		$scope.appList(1,10);			
	}
	/*刷新结束*/
	/*删除*/
	$scope.delAppFn = function(data){
		$scope.delAppName = data.application_id;
		apiService.Show('520px','.js_appDelete');
	};
	$scope.appDelFn = function(e){
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxdIp + "/application/delete_application";
		var data = {
			application_id:$scope.delAppName
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				$(e.target).attr('disabled',false);				
				layer.alert('删除成功',{icon:1})
				$scope.appList(1,10)								
			}else{
				$(e.target).attr('disabled',false);				
				layer.alert(json.message,{icon:7})			
			}
		})				
	}
	/*删除结束*/
	/*查看详情*/
	$scope.appDetailFn = function(data){
		sspaasMemory.set('useApplyData',data);
		$state.go('useApply')
	}
	/*查看详情結束*/

}]);
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