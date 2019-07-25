app.controller("projectCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
	/*获取list集合*/
	listData(1,10);
	/*获取list集合结束*/
	/*查询列表*/
	$scope.searchListFn = function(){
		listData(1,10);
	}
	/*新建项目*/
	$scope. newProjectFn = function(e){
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxIp + "/project/create";
		var data = {
			project_name:$scope.newProjectName
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn(); 
				layer.alert("新建成功",{icon:1},function(){
					$(e.target).attr('disabled',false);
					listData(1,10);
				    $scope.projectMsgFn();				
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})		
	}
	/*新建项目结束*/
	/*删除项目*/
	$scope.sureDelFn = function(e){
		$(e.target).attr('disabled',true);		
		var url = $rootScope.gearBoxIp + "/project/delete";
		var data = {
			project_id:$scope.recordData,			
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('删除成功',{icon:1},function(){
					$(e.target).attr('disabled',false);
					if(data.project_id == sspaasMemory.get('currentProjectInfo').project_id){
				        sspaasMemory.remove('currentProjectInfo');					
					};
  					window.location.reload();    													
				})
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})		
	};
	/*删除项目结束*/
	/*修改项目名称*/
	$scope.revisionProjectNameFn = function(e){
		$(e.target).attr('disabled',true);		
		var url = $rootScope.gearBoxIp + "/project/update";
		var data = {
			project_id:$scope.visionName,
			new_project_name:$('.js_visionName').val(),
			project_name:$('.js_visionName').val(),
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('修改成功',{icon:1},function(){
					$(e.target).attr('disabled',false);
					if(data.project_id == sspaasMemory.get('currentProjectInfo').project_id){
        				sspaasMemory.set('currentProjectInfo',data); 	
					}
					window.location.reload();				
				});
			}else{
				layer.alert(json.message,{icon:7})
				$(e.target).attr('disabled',false);						
			}
		})			
	}
	/*修改项目名称结束*/
	/*刷新列表*/
	$scope.refreshFn = function(){
		layer.load(0, {
  			shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
		listData(1,10);
	}
	/*刷新列表结束*/
	/*跳转详情*/
	$scope.srefFn = function(data){
		sspaasMemory.set('projectDetailName',data.project_id);
		$state.go('projectDetail')
	}
	/*跳转详情结束*/
	/*执行事件*/
	$scope.createFn = function(){
		apiService.Show('520px','.js_create');
	};
	$scope.changeFn = function(data){
		$scope.visionName = data.project_id;
		apiService.Show('520px','.js_change');
	}
	$scope.deleteFn = function(){
		if($('.choiceBox').hasClass('add')){
			apiService.Show('520px','.js_delete');
		}else{
			layer.alert('请选择需要删除的项目')
		}
	}
	$scope.showDeleteMOdelFn = function(data){
		$scope.recordData = data.project_id;
		apiService.Show('520px','.js_delete');
	}
	/*执行事件结束*/
    /*查询方法*/
	function listData(page,rows){
		var url = $rootScope.gearBoxIp + "/project";
		var data = {
			page:page,
			rows:rows,
			searchname:$('.searchBox').val()
		};
		apiService.axjxGet(url,data).then(function(json){
			if(json.code == 200){
				$scope.totalPage = json.result.page_count;
				$scope.projectTxt = json.result.projects;
				$scope.totalCount = json.result.total_data;
				Page({
				    num:json.result.page_count,    //页码数
				    startnum:page,             //指定页码
				    elem:$('#page2'),       //指定的元素
				    callback:function(n){   //回调函数
			    		listData(n,10);
				    }
				});			
				layer.closeAll();
			}else{
				layer.alert(json.message,{icon:7})
			}

		})
	}  
    /*查询方法结束*/
}])