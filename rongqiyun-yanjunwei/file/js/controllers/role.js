app.controller("roleCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
   
	/*获取角色列表*/
	function roleList(page,rows){
		var url = $rootScope.gearBoxIp + "/role";
		var data = {
			page:page,
			rows:rows,
			searchname:$('.searchBox').val()
		}
		apiService.axjxGet(url,data).then(function(json){
			if(json.code == 200){
				$scope.roleTotalPage = json.result.page_count;
				$scope.roleDataList = json.result.roles;
				$scope.roleTotalCount = json.result.total_data;
				Page({
				    num:$scope.roleTotalPage,    //页码数
				    startnum:page,             //指定页码
				    elem:$('#page2'),       //指定的元素
				    callback:function(n){   //回调函数
			    		roleList(n,10);
				    }
				});			
				layer.closeAll();
			}else{
				layer.alert(json.message,{icon:7});
			}
		})			
	}
	roleList(1,10);
	/*获取角色列表结束*/
	/*新建角色列表*/
	var arr = [];
	$scope.roleCreateFn = function(e){
		$(e.target).attr('disabled',true);
		$('.js_createNewRole .js_newRoleName').each(function(){
			var obj = {};
			var $key = $(this).attr('data-value');
			var $value = $(this).siblings('.js_writeStatu').find('.add').attr('data-attr');
			obj[$key] = $value ;
			arr.push(obj);
		})
		var url = $rootScope.gearBoxIp + "/role/create";
		var data = {
			rolename:$scope.newRoleUserVal,
			describe:$scope.decribeTxt,
			authority:arr
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				arr=[];
				layer.alert('创建成功',{icon:1},function(){
					roleList(1,10);				
					$(e.target).attr('disabled',false);
				})
			}else{
				layer.alert(json.message,{icon:7});
				arr=[];
				$(e.target).attr('disabled',false);						
			}
		})	
	}
	/*新建角色列表结束*/
	/*编辑角色*/

	/*编辑角色结束*/
	/*删除角色*/
	$scope.roleDelFn = function(e){
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxIp + "/role/delete";
		var data = {
			role_id:$scope.recordData.role_id,
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('删除成功',{icon:1},function(){
					roleList(1,10);				
					$(e.target).attr('disabled',false);
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})		
	}
	/*删除角色结束*/
	/*刷新*/
	$scope.roleRefresh = function(){
		layer.load(0, {
				shade: [0.1,'#fff']
		});			
		roleList(1,10);
	}
	/*刷新结束*/
	/*搜索*/
	$scope.roleSearchFn = function(){
		roleList(1,10);		
	}
	/*搜索结束*/
    /*窗口关闭方式*/
    /*编辑*/
    $scope.roleEditorFn = function(e){
		$(e.target).attr('disabled',true);
		$('.js_roleEditor .js_roleEditorName').each(function(){
			var obj = {};
			var $key = $(this).attr('data-value');
			var $value = $(this).siblings('.js_roleEditorStatu').find('.add').attr('data-attr');
			obj[$key] = $value ;
			arr.push(obj);
		});		
		var url = $rootScope.gearBoxIp + "/role/update";
		var data = {
			rolename:$scope.editUserVal,
			describe:$scope.describeTxt,
			role_id:$scope.editRoleId,			
			authority:arr
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('编辑成功',{icon:1},function(){
					roleList(1,10);				
					$(e.target).attr('disabled',false);
					arr = [];
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);
				arr = [];						
			}
		})		    	
    }
    /*编辑结束*/
	/*公共校验方法*/
	$scope.checkUserFn = function(val,e){
		if(!val || val.length>15 || val.length<2){
			$(e.target).addClass('error');
			return;
		};
		$(e.target).removeClass('error');
	}
	/*公共校验方法结束*/
	/*角色打开方式*/
	$scope.newRoleModelFn = function(){
		apiService.Show('520px','.js_newRole');
		var url = $rootScope.gearBoxIp + "/power/info";
		apiService.axjxGet(url,'').then(function(json){
			if(json.code == 200){
				$scope.rolePermissionList = json.result.powers
			}else{
				layer.alert(json.message,{icon:7})
			}
		})				
	};
	$scope.deleteRoleFn = function(){
		if($('.choiceBox').hasClass('add')){
			apiService.Show('520px','.js_delete');
		}else{
			layer.alert('请选择需要删除的项目')
		}		
	};
	$scope.deleteModelFn = function(data){
		$scope.recordData = data;
		apiService.Show('520px','.js_delete')
	};	
	$scope.editorModelFn = function(data){
		$scope.editUserVal = data.rolename;
		$scope.editRoleId = data.role_id;
		var url = $rootScope.gearBoxIp + "/role/info";
		var data = {
			role_id:$scope.editRoleId
		};
		apiService.axjxGet(url,data).then(function(json){
			if(json.code == 200){
				$scope.roleEditorList = json.result.authority;
				$scope.describeTxt = json.result.describe;
			}else{
				layer.alert(json.message,{icon:7})
			}
		})				
		apiService.Show('520px','.js_editor');
	};	
	/*角色打开方式结束*/
	/*单选框方式*/
	$scope.radioBoxFn = function(e){
		var $box = $(e.target);
		$box.addClass('add');
		$box.parent().siblings('span').find('button').removeClass('add');
	}
	/*单选框方式结束*/

}])