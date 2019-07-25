app.controller("hostComputerCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
	var loading = null;
	/*添加主机*/ 
	$scope.addSureHostFn = function(e){
		$(e.target).attr("disabled",true)
		var url = $rootScope.gearBoxbIp + "/connect/host";
		var data = {
			host_ip:$('.js_hostIP').val().trim().split("\n"), 
			host_username:$scope.userAccount,
			port:$scope.portNum,
			host_password:$scope.userPwd
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				layer.alert('添加成功',{icon:1});
				$scope.closeFn('loading');
				hostList(1,7);
				$(e.target).attr("disabled",false)												
			}else{
				layer.alert(json.message,{icon:7});
				$(e.target).attr("disabled",false)							
			}
		})				
	}
	/*添加主机结束*/
	/*获取列表信息*/
	hostList(1,7);
	var timer =null ;	
	function hostList(page,rows){
        if($state.current.name.indexOf('hostComputer') != -1){
            clearTimeout(timer)             	
			var url = $rootScope.gearBoxbIp + "/host/search";
			var data = {
				page:page, 
				rows:rows,
				search_name:$('.searchBox').val()
			};		
			apiService.axjxPost(url,data).then(function(json){
				if(json.code == 200){
					layer.closeAll('loading');
					$scope.hostLIst = json.result.list;
					$scope.hostPageCount = json.result.pages;
					$scope.hostTotalData = json.result.total;
					Page({
					    num:$scope.hostPageCount,    //页码数
					    startnum:page,             //指定页码
					    elem:$('#page2'),       //指定的元素
					    callback:function(n){   //回调函数
							hostList(n,7);		    		
					    }
					});						
				}else{
					layer.alert(json.message,{icon:7})			
				}
                for(var i = 0 ;i< $scope.hostLIst.length;i++){
                    if($scope.hostLIst[i].status ==1){
                        timer = setTimeout(function(){
						hostList(1,7);
                        },1500);
                        return false                    
                    }
                }  				
			})				
        }		
	};
	/*获取列表信息结束*/
	/*添加别名*/ 
	$scope.addAliasName = function(e){
		var $target = $(e.target).siblings('input');
		$target.attr('disabled',false);
		$target.focus();
	}
	/*添加别名结束*/
	/*修改别名*/
	$scope.changeAlisaNameFn = function(e,d){
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxbIp + "/change/hostname";
		var data = {
			host_name:d.host_name,
			host_alias:$(e.target).val()
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				hostList(1,7);				
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	}
	/*修改别名结束*/
	/*刷新*/
	$scope.hostResearchFn = function(){
		loading = layer.load(0, {
				shade: [0.1,'#fff']
		});
		hostList(1,7);						
	}
	/*刷新结束*/
	/*查询搜索*/
	$scope.hostSearchFn = function(){
		hostList(1,7);		
	}
	/*查询搜索结束*/
	/*新建主机弹窗打开方式*/
	$scope.addHostFn = function(){
		apiService.Show("520px",'.js_addHost')
	}
	/*新建主机弹窗打开方式结束*/
	/*弹窗IP地址的校验*/
	$scope.changeIP = function(){
		var IpGroup = $('.js_hostIP').val().trim().split("\n");
		for(var i = 0;i<IpGroup.length;i++){
			if($rootScope.IP(IpGroup[i])){
				$('.js_hostIP').addClass('error')
				layer.tips('第'+(i+1)+'个IP地址格式错误', '.js_hostIP', {
  					tips: [1, '#2c2c2c'] //还可配置颜色
  				});
				return false
			}
		};
		if((new Set(IpGroup)).size != IpGroup.length){
			$('.js_hostIP').addClass('error')
			layer.tips('IP地址不能重复', '.js_hostIP', {
				tips: [1, '#2c2c2c'] //还可配置颜色
			});
			return false
		};
		$('.js_hostIP').removeClass('error')	
	};
	/*弹窗IP地址的校验结束*/
	$scope.hostSeeDetailFn = function(data){
		sspaasMemory.set('hostDetailTxt',data);
		$state.go('hostDetails')
	}
}])