app.controller("projectDetailCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
	
	$scope.projectMemberId = sspaasMemory.get('projectDetailName') ? sspaasMemory.get('projectDetailName') : '';
	$scope.proSearch = $scope.proSearch ? $scope.proSearch : '';
	/*项目详情列表信息*/
	function pDetail(page,rows,search){
		var url = $rootScope.gearBoxIp + "/project/member";
		var data = {
			page:page,
			rows:rows,
			searchname:search,
			project_id:$scope.projectMemberId
		};		
		apiService.axjxGet(url,data).then(function(json){
			if(json.code == 200){
				layer.closeAll();
				$scope.proMemList = json.result.member;
				$scope.proMemPageCount = json.result.page_count;
				$scope.proMemTotalData = json.result.total_data;
				Page({
				    num:$scope.proMemPageCount,    //页码数
				    startnum:page,             //指定页码
				    elem:$('#page2'),       //指定的元素
				    callback:function(n){   //回调函数
			    		pDetail(n,10,$scope.proSearch)				    		
				    }
				});						
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	};
	pDetail(1,10,$scope.proSearch)
	/*项目详情列表信息结束*/
	/*角色下拉*/
    $scope.roleDropDataFn = function(data,roleData,e){
        var $txt =  $(e.target).parent('.js_dropList');
        var url = $rootScope.gearBoxIp + "/role/switch";
        var data = {
            project_id:$scope.projectMemberId,
            member_id:data.user_id,
            role_id:roleData.role_id
        };
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();
        apiService.axjxPost(url,data).then(function(json){
            if(json.code == 200){
    	        $txt.siblings('.js_frame').text($(e.target).text());
            	layer.alert('修改角色成功',{icon:1});

            }else{ 
                layer.alert(json.message,{icon:7})                       
            }
        })             
    };	
	/*角色下拉结束*/    
	/*添加成员*/
	$scope.addMemberFn = function(e){
		$(e.target).attr('disabled',true);	
		var arr = [];
		$('.js_dataBox i.add').each(function(){
			var obj = {};
			var key = $(this).attr('data-value');
			var val = $(this).parent().siblings('.js_joinNum').text();
			obj[key] = val ;
			arr.push(obj);
		});
		var url = $rootScope.gearBoxIp + "/user/add_member";
		var data = {
			project_id:$scope.projectMemberId,
			member_list:arr
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('添加成功',{icon:1},function(){
					$(e.target).attr('disabled',false);
					pDetail(1,10,$scope.proSearch)
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})		
	}
	/*添加成员结束*/
	/*移除成员*/
	$scope.delMemberFn = function(e){
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxIp + "/user/remove_member";
		var data = {
			member_id:$scope.recordData.user_id,
			project_id:$scope.projectMemberId
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('移除成功',{icon:1},function(){
					pDetail(1,10,$scope.proSearch)					
					$(e.target).attr('disabled',false);
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})		
	}
	/*移除成员结束*/
	/*刷新大集合*/
	$scope.proRefresh = function(){
		layer.load(0, {
				shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
		pDetail(1,10,$scope.proSearch);						
	}
	/*刷新大集合结束*/
	/*list外边的大查询*/
	$scope.proDetailSearchFn = function(){
		pDetail(1,10,$scope.proSearch);		
	}
	/*list外边的大查询结束*/
	/*添加成员里边查询成员*/
	$scope.searchMemberFn = function(){
		memberDetail($scope.searchMember,$scope.projectMemberId)
	};
	function memberDetail(search,id){
		var url = $rootScope.gearBoxIp + "/user/list_member";
		var data = {
			searchname:search,
			project_id:id
		}
		apiService.axjxGet(url,data).then(function(json){
			if(json.code == 200){
				$scope.pDMemberList = json.result.members
			}
		})	
	}	
	/*添加成员里边查询成员结束*/

	/*弹窗打开方式*/
	$scope.addModelFn = function(){
		apiService.Show('520px','.js_addMember'); 
		memberDetail('',$scope.projectMemberId);
	}
	$scope.deleteFn = function(){
		if($('.choiceBox').hasClass('add')){
			apiService.Show('520px','.js_deleteMember');
		}else{
			layer.alert('请选择需要删除的项目')
		}		
	}	
	$scope.deleteModelFn = function(data){
		$scope.recordData = data;
		apiService.Show('520px','.js_deleteMember');
	}
	$scope.changeUserFn = function(){
		$state.go('member');
	}	
	/*弹窗打开方式结束*/
	/*复选框选择方式*/
	$scope.memberCheckBoxFn = function(e,o){
		var $checkBox = $(e.target);
		if($checkBox.hasClass('add')){
			$checkBox.removeClass('add');
		}else{
			$checkBox.addClass('add');
		};
		$('.addListDataLi').each(function(){
			if(!$(this).find('i').hasClass('add')){
				$('.js_checkBox').removeClass('add');
				return false;
			}else{
				$('.js_checkBox').addClass('add');
			}
		})
	}
	$('.js_checkBox').click(function(){
		if($(this).hasClass('add')){
			$(this).removeClass('add');
			$('.choiceGroup').find('i').removeClass('add');
		}else{
			$(this).addClass('add');
			$('.choiceGroup').find('i').addClass('add');
		}
	})
	/*复选框选择方式结束*/
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