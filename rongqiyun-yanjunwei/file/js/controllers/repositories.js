app.controller("repositoriesCtrl", ["$rootScope", "$scope", "$state","apiService","$compile",function($rootScope,$scope,$state,apiService,$compile) {
	/*下载、上传、部署、删除模板*/
	$scope.upLoadFn = function(){
		apiService.Show('520px','.js_upLoad');	
	}
	$scope.downLoadFn = function(){
		apiService.Show('520px','.js_downLoad');			
	}
	$scope.deployModelFn = function(e,data){
		$scope.deployMentImageName = data.name;
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxdIp + "/application/create_app_info";
		var data = {
			image_name:data.name,
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$(e.target).attr('disabled',false);
				$scope.mirrorData = json.data;
				$scope.versionList = json.data.image_version.version_list;
				$scope.envirList = json.data.image_info.env_total_list;
				$scope.portList = json.data.image_info.port_protocol_list;
				$scope.volumeList = json.data.available_volume_list;
				$scope.configList = json.data.configuration_information;		
				apiService.Show('900px','.js_deploy');			
			}else{
				$(e.target).attr('disabled',false);
				layer.alert(json.message,{icon:7})			
			}
		});
	}
	$scope.deployDeleteFn = function(data){
		$scope.deployDeleteData = data.name;		
		apiService.Show('520px','.js_deleteMirror');		
	}
	$scope.nextDeplyFn = function(){
		apiService.Show('900px','.js_envDeploy');		
	}
	$scope.sureDelBtnFn = function(e){
		$(e.target).attr('disabled',true);
		 var url = $rootScope.gearBoxeIp + "/repository/delete/image";
		var data = {
			repo_name:$scope.deployDeleteData
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$(e.target).attr('disabled',false);
				$scope.closeFn();
				if(!$scope.lock){
					$scope.publicImg(1,16,1)		
				}else{
					$scope.publicImg(1,16,2)			
				}								
			}else{
				$(e.target).attr('disabled',false);					
				layer.alert(json.message,{icon:7})			
			}
		})			
	}
	/*下载、上传、部署、删除模板结束*/
	/*选择信息*/
	$scope.volumeDataFn = function(data,e){
        var $txt =  $(e.target).parent('.js_dropList');
        $txt.siblings('.js_frame').text($(e.target).text());
        $txt.siblings('.js_frame').attr('data-attr',data.pvc_id);
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();  		
	}		
	$scope.appDropDataFn = function(e){
        var $txt =  $(e.target).parent('.js_dropList');
        $txt.siblings('.js_frame').text($(e.target).text());
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();      		
	}
	/*选择信息结束*/
	/*模板的高级操作*/
	$scope.isTrue = false;
	$scope.showThirdPartFn = function(){
		$scope.isTrue = !$scope.isTrue
	};
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
		var $ev = $(e.target).parents(".js_add").siblings().eq(-1);
		var $div = '<div class="js_envBox inputBox left">'+
					'<input class="keyWid left" type="text" name="">'+
					'<input class="keyWid left" type="text" name="">'+
					'<button class="deleteBtn del left" ng-click="delEnvGroupFn($event)">'+'</button>'+	
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
		$(e.target).parents('.js_add').before($compile($div)($scope));
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
	$scope.addServiceGroupFn = function(e){
		var $group = '<div class="inputBox js_addService left">'+
			'<input class="keyWid left" type="text" name="">'+
			'<div class="keyWid left mar">'+
			'<div id="dropDown" class="dropFramePosition wid1 left">'+
			'<div class="frame wid1 js_frame" ng-click="dropDownFn($event)">{{list[0].name}}</div>'+
			'<ul class="dropList js_dropList">'+
			'<li ng-click="dropDataFn(data,$event)" ng-repeat = "data in list">{{data.name}}</li>'+
			'</ul>'+
			'</div>'+											
			'</div>'+	
			'<button class="deleteBtn del left" ng-click="delServiceGroupFn($event)"></button>'+	
			'</div>'
		$(e.target).parents('.js_serviceAdd').before($compile($group)($scope));					
	};
	$scope.delServiceGroupFn = function(e){
		var $delBox = $(e.target).parents(".js_addService").siblings(".js_addService");
		if($delBox.length<=0){
			layer.msg('至少保留一个');
			return false
		};
		if($delBox.length>0){
			$(e.target).parents(".js_addService").remove();
		};
	}
	$scope.selectConfigFn = function(e){
		var $box = $(e.currentTarget);
		$('.js_configBox').removeClass('add');
		$('.js_configBox').children().removeClass('add');
		$box.addClass('add');
		$box.children().addClass('add');
	}
	$scope.instanceNumFn = function(e){
		if($scope.instanceNum>10){
			$scope.instanceNum = 10;
		};
		if($scope.instanceNum<1){
			$scope.instanceNum ='';			
		}
	}
	/*模板的高级操作结束*/
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
			image_name:$scope.deployMentImageName,
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
				$(e.currentTarget).attr('disabled',false);						
			}else{
				layer.alert(json.message,{icon:7});
				$(e.currentTarget).attr('disabled',false);								
			}
		})	
	}
	/*部署结束*/	
	/*共有、私有镜像的切换操作*/
	$scope.lock = false;
	$scope.publicFn = function(e){
		type(e);
		$scope.lock = false;
		$scope.publicImg(1,16,1)		
	}
	$scope.privateFn = function(e){
		type(e);
		$scope.lock = true;
		$scope.publicImg(1,16,2)		
	};
	function type(e){
		$(e.target).addClass('add').siblings().removeClass('add');
	}
	$scope.openSwitchFn = function(data,str){
		var url = $rootScope.gearBoxeIp + "/repository/set/image";
		var data = {
			repo_name:data.name,
			is_public:str
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.publicImg(1,16,2)					
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})				
	}
	/*共有、私有镜像的切换操作结束*/
	/*获取共有镜像*/
	$scope.publicImg = function(page,rows,sort){
		var url = $rootScope.gearBoxeIp + "/repository/image";
		var data = {
			page_num: page,
			page_limit: rows,
			serach_info:$('.searchBox').val(),
			all_private_or_public_image:sort,
			user_name: $scope.userName
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.mirrorLIst = json.data.data;
				$scope.domainName = json.data.domain_name;
				$scope.mirrorPage = json.data.page_count;
				$scope.mirrorTotal = json.data.total_number;
				Page({
				    num:$scope.mirrorPage,    //页码数
				    startnum:page,             //指定页码
				    elem:$('#page2'),       //指定的元素
				    callback:function(n){   //回调函数
						$scope.publicImg(n,16,sort)			    	
				    }
				});
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	}
	$scope.publicImg(1,16,1);
	/*获取共有镜像结束*/
	/*查询*/
	$scope.mirrorSearchFn = function(){
		if(!$scope.lock){
			$scope.publicImg(1,16,1)		
		}else{
			$scope.publicImg(1,16,2)			
		}
	}
	/*查询结束*/
	/*刷新*/
	$scope.mirrorRefreshFn = function(){
		if(!$scope.lock){
			$scope.publicImg(1,16,1)		
		}else{
			$scope.publicImg(1,16,2)			
		}		
	}
	/*刷新结束*/
	/*跳转详情*/
	$scope.GoDetailFn = function(data){
		sspaasMemory.set('repositoryMirrorName',data)
		$state.go('deployDetail')
	}
	/*跳转详情结束*/
}])
