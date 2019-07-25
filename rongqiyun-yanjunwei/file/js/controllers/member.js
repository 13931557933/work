app.controller("memberCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {

	/*成员列表*/
	function memberList(page,rows){
		var url = $rootScope.gearBoxIp + "/user";
		var data = {
			page:page, 
			rows:rows,
			searchname:$('.searchBox').val()
		};		
		apiService.axjxGet(url,data).then(function(json){
			if(json.code == 200){
				layer.closeAll();
				$scope.memberLIst = json.result.users;
				$scope.memberPageCount = json.result.page_count;
				$scope.memberTotalData = json.result.total_data;
				Page({
				    num:$scope.memberPageCount,    //页码数
				    startnum:page,             //指定页码
				    elem:$('#page2'),       //指定的元素
				    callback:function(n){   //回调函数
			    		memberList(n,10)				    		
				    }
				});						
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})				
	};
	memberList(1,10)
	/*成员列表结束*/
	/*查询列表*/
	$scope.searchMemberFn = function(){
		memberList(1,10)		
	}
	/*查询列表结束*/
	/*新增成员*/
	$scope.newMemberFn = function(e){
		$(e.target).attr('disabled',true);		
		var url = $rootScope.gearBoxIp + "/user/create";
		var data = {
			username:$scope.newUserVal,
			phone:$scope.newPhoneVal,		
			email:$scope.newMailVal,		
			password:$scope.newPawVal,		
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('添加成功',{icon:1},function(){
					$(e.target).attr('disabled',false);
					memberList(1,10);
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})				
	}
	/*新增成员結束*/
	/*注销*/
	/*修改信息*/
	$scope.changeMemberMsgFn = function(e){
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxIp + "/user/update";
		var data = {
			member_id:$scope.modiferTxt.user_id,
			phone:$('.js_phone').val(),		
			email:$('.js_email').val(),		
			password:$('.js_pwd').val(),
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('修改成功',{icon:1},function(){
					$(e.target).attr('disabled',false);
					memberList(1,10);
					$(".js_isFrozen").removeClass('add');		
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})			
	};
	/*修改信息结束*/
	/*冻结信息*/
	$scope.sureFrostFn = function(e){
		$(e.target).attr('disabled',true);		
		var url = $rootScope.gearBoxIp + "/user/freeze";
		var data = {
			member_id:$scope.frostUserId,
			user_status:"1"
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('冻结成功',{icon:1},function(){
					$(e.target).attr('disabled',false);
					memberList(1,10);
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})				
	}
	/*冻结信息结束*/
	/*解冻信息*/
	$scope.sureUnFrostFn = function(e){
		$(e.target).attr('disabled',true);		
		var url = $rootScope.gearBoxIp + "/user/freeze";
		var data = {
			member_id:$scope.unFrostUserId,
			user_status:"0"
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('解冻成功',{icon:1},function(){
					$(e.target).attr('disabled',false);
					memberList(1,10);
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})				
	}	
	/*解冻信息结束*/
	/*注销成员*/
	$scope.memDelMemberFn = function(e){
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxIp + "/user/delete";
		var data = {
			member_id:$scope.recordData.user_id,
			project_id:''
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('移除成功',{icon:1},function(){
					memberList(1,10)				
					$(e.target).attr('disabled',false);
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})				
	}
	/*注销成员接结束*/
	/*刷新*/
	$scope.refreshMemberFn = function(){
	layer.load(0, {
			shade: [0.1,'#fff']
	});		
	memberList(1,10)
	}
	/*公共验证方式*/
	$scope.checksFn = function(e,test){
		if(!$(e.target).val() || test($(e.target).val())){
			$(e.target).addClass('error');
			checkInput(e);
			return;
		};
		$(e.target).removeClass('error');
		checkInput(e);			
	};	
	$scope.checkspawFn = function(e,test){
		if($(e.target).val() && test($(e.target).val())){
			$(e.target).addClass('error');
			checkInput(e);
			return;
		};
		$(e.target).removeClass('error');
		checkInput(e);			
	};
	$scope.newChecksFn = function(e,test){
		if(!$(e.target).val() || test($(e.target).val())){
			$(e.target).addClass('error');
			return;
		};
		$(e.target).removeClass('error');
	};
	function checkInput(e){
		var $lea = $(e.target).siblings('i');
		$lea.removeClass('add');
		$(e.target).attr('disabled',true);
	};
	/*公共验证方式结束*/
	/*窗口的打开方式*/  
	$scope.newCreateFn = function(){
		apiService.Show('520px','.js_newCreate');
	};
	$scope.deleteFn = function(){
		if($('.choiceBox').hasClass('add')){
			apiService.Show('520px','.js_delete');
		}else{
			layer.alert('请选择需要删除的项目')
		}
	};
	$scope.deleteModelFn = function(data){
		$scope.recordData = data
		apiService.Show('520px','.js_delete');
	};
	$scope.freezeModelFn = function(data){
		$scope.frostUserId = data.user_id;
		apiService.Show('520px','.js_freeze');
	};
	$scope.unFreezeModelFn = function(data){
		$scope.unFrostUserId = data.user_id;
		apiService.Show('520px','.js_unfreeze');
	};
	$scope.revisionModelFn = function(data){
		$scope.modiferTxt = data
		apiService.Show('520px','.js_revision');
	};
	/*窗口的打开方式结束*/
	/*新增成员里边的执行事件*/
	$scope.repPawFn = function(val,e){
		if(val != $scope.newPawVal){
			$(e.target).addClass('error')
		}else{
			$(e.target).removeClass('error');			
		}
	}
	/*新增成员里边的执行事件结束*/
	/*修改信息里边的执行事件*/
	$scope.changeMsgFn = function(e){
		var $input = $(e.target).siblings('input');
		$(e.target).addClass('add');
		$input.attr('disabled',false);
		$input.focus();
	};
	$scope.changeStatuFn = function(e){
		var $btn =  $(e.target);
	 	$btn.addClass('add');
	 	$btn.parent().siblings('span').find('button').removeClass('add');
	};
	/*修改信息里边的执行事件结束*/	
}])
app.filter('isFreeze',function(){
	return function(val){
		var map = {
			0:'正常',
			1:'冻结'
		};
	return map[val] ? map[val] : val 
	}	
})