app.controller("subGroupCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
	var timer =null ;	
	/*集群和存储的展示与隐藏*/ 
	$('.js_selected').click(function(){
		var index = $(this).index();
		$(this).addClass('add').siblings().removeClass('add');
		$(".js_store").eq(index).show().siblings(".js_store").hide();
	})
	/*集群和存储的展示与隐藏结束*/
	/*关闭集群*/
	$scope.closeSubGroupFn = function(){
		$('.js_hostNodeList').children().remove();
		$('.js_bslaveNode').children().remove();
		$('.js_sureHost').children().remove();
		$('.js_sureSolve').children().remove();		
		$scope.nodeBox = "";
		$scope.arrData = "";
		apiService.Hide()
	}
	/*关闭集群结束*/
	/*新建集群弹窗*/
	$scope.createModelFn = function(){
		apiService.Show('813px','.js_newColony');
		nodeDataFn(); 	
	};
	function nodeDataFn(){
		var url = $rootScope.gearBoxbIp + "/search/host/name";	
		apiService.axjxPost(url,'').then(function(json){
			if(json.code == 200){
				$scope.nodeBox = json.result;
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	}
	$scope.nextModelFn = function(){
		var $len = $('.js_hostNodeList').children().length;
		if($len>3 || $len<1){
			$('.js_hostError').addClass('error');
			return false
		};
		$scope.closeFn();
		$('.js_hostError').removeClass('error');
		var arr = [];
		$('.js_host .nodeDataTxt').each(function(){
			var _selfData = $(this).text().trim();
			arr.push(_selfData);
		})
		$scope.arrData = arr ;
		apiService.Show('813px','.js_secColony');		
	}
	$scope.sureModelFn = function(){
		var $len = $('.js_bslaveNode').children().length;
		if($len<1){
			$('.js_solveError').addClass('error');
			return false;
		};
		$('.js_solveError').removeClass('error')
		$scope.closeFn()		
		apiService.Show('724','.js_sureColony');
		$('.js_sureHost').append($('.js_hostNodeList').children().clone(true));		
		$('.js_sureSolve').append($('.js_bslaveNode').children().clone(true));		
	}
	$scope.backModelFn = function(){
		$('.js_bslaveNode').children().remove();		
		$('.js_sureHost').children().remove();
		$('.js_sureSolve').children().remove();
		$scope.arrData = '';
		apiService.Show('813px','.js_newColony');		
	}
	/*新建集群弹窗结束*/
	/*选择网络*/
	$scope.storageDropFn = function(e){
        var $txt =  $(e.target).parent('.js_dropList');
        $txt.siblings('.js_frame').text($(e.target).text());
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();  		
	}
	/*选择网络结束*/
	/*新建存储集群*/
	$scope.storeModelFn = function(){
		apiService.Show('724','.js_storeColony');
		nodeDataFn();
		var url = $rootScope.gearBoxbIp + "/list/adapts";
		var data = {
			host_name:'',
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.netWorkBox = json.result					
			}else{
				layer.alert(json.message,{icon:7});						
			}
		})					
	};
	$scope.storageNodeFn = function(e){
		var $storageDiv = $(e.target).parent('.js_storage');
		if(!$(e.target).hasClass('add')){
			$(e.target).addClass('add');
			$('.js_storageData').append($storageDiv);
			return false
		};		
		if($(e.target).hasClass('add')){
			$(e.target).removeClass('add');
			$('.js_storageNode').append($storageDiv);
			return false
		};
	}
	$scope.surestorageCreateFn = function(e){
		$(e.target).attr("disabled",true);			
		var $slen = $('.js_storageData').children().length;
		var arr = [];
		if($slen<1){
			$('.js_storageError').addClass('error');
			return false
		};
		$('.js_storageData .js_storage').each(function(){
			var _selfData = $(this).text().trim();
			arr.push(_selfData);
		})			
		var url = $rootScope.gearBoxbIp + "/create/str/cluster";
		var data = {
			cluster_name:$scope.storageGroupName, 
			strhost:arr,
			network:$('.js_storageNet').text()
			};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				layer.alert('添加成功',{icon:1});
				$scope.closeFn();

				$(e.target).attr("disabled",false)												
			}else{
				layer.alert(json.message,{icon:7});
				$(e.target).attr("disabled",false)							
			}		
		})
	}
	/*新建存储集群结束*/
	/*新建集群点击操作*/
	$scope.hostNodeFn = function(e){
		var $len = $('.js_hostNodeList').children().length;
		var $div = $(e.target).parent('.js_hostNode');
		if(!$(e.target).hasClass('add') && $len<3){
			$(e.target).addClass('add');
			$('.js_hostNodeList').append($div);
			return false;
		};
		if($(e.target).hasClass('add')){
			$(e.target).removeClass('add');
			$('.js_host').append($div);
			return false			
		}
	};
	$scope.slaveNodeFn = function(e){
		var $parDiv = $(e.target).parent('.js_region')
		if(!$(e.target).hasClass('add')){
			$(e.target).addClass('add');
			$('.js_bslaveNode').append($parDiv);
			return false;
		};
		if($(e.target).hasClass('add')){
			$(e.target).removeClass('add');
			$('.js_aslaveNode').append($parDiv);
			return false;
		};				
	}
	/*新建集群操作结束*/
	/*确定创建*/
	$scope.sureCreateHostFn = function(e){
		$(e.target).attr("disabled",true);
		var arr= [];
		var arr1= [];
		$('.js_sureHost .js_hostNode').each(function(){
			var _selfData = $(this).text().trim();
			arr.push(_selfData);
		})			
		$('.js_sureSolve .js_region').each(function(){
			var _selfData = $(this).text().trim();
			arr1.push(_selfData);
		})		
		var url = $rootScope.gearBoxbIp + "/create/k8s/cluster";
		var data = {
			cluster_name:$scope.k8sGroupName, 
			domain:$scope.k8sAreaName,
			master:arr,
			slave:arr1
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				layer.alert('添加成功',{icon:1});
				$scope.closeFn();
				hostList(1,7,$scope.hostSearchName);
				$(e.target).attr("disabled",false)												
			}else{
				layer.alert(json.message,{icon:7});
				$(e.target).attr("disabled",false)							
			}
		})			
	}
	/*确定创建结束*/
	/*k8s集群列表*/
	k8sList(1,6);	
	function k8sList(page,rows){
        if($state.current.name.indexOf('subGroup') != -1){
            clearTimeout(timer)             	
			var url = $rootScope.gearBoxbIp + "/show/k8s/message";
			var data = {
				page:page,
				rows:rows,
				search_name:$('.searchNameK8s').val()
			};		
			apiService.axjxPost(url,data).then(function(json){
				if(json.code == 200){
					$scope.k8sClusterName = json.result.cluster_name ? json.result.cluster_name :"";
					$scope.k8sLIst = json.result.list;
					$scope.k8sPageCount = json.result.pages;
					$scope.k8sTotalData = json.result.total;
					Page({
					    num:$scope.k8sPageCount,    //页码数
					    startnum:page,             //指定页码
					    elem:$('#page2'),       //指定的元素
					    callback:function(n){   //回调函数
							k8sList(n,6);	    		
					    }
					});						
				}else{
					layer.alert(json.message,{icon:7})			
				}
                for(var i = 0 ;i< $scope.k8sLIst.length;i++){
                    if($scope.k8sLIst[i].cls_status ==4){
                        timer = setTimeout(function(){
						k8sList(1,6);	 
                        },240000);
                        return false                    
                    }
                }  				
			})				
        }		
	};	
	/*k8s集群列表结束*/
	/*k8s修改名称*/
	$scope.changeK8sNameFn = function(e){
		var $input = $(e.target).siblings('input');
		$input.attr('disabled',false);
		$input.focus();
	}
	$scope.sureChangeK8sNameFn = function(e){
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxbIp + "/change/cluster/name";
		var data = {
			cluster_type:'k8s',
			old_cluster_name:$scope.k8sClusterName,
			new_cluster_name:$('.js_k8sName').val()
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				layer.alert('修改成功',{icon:1})
				k8sList(1,6);			
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	}
	/*k8s修改名称结束*/
	/*k8s模糊查询*/
	$scope.k8sSearchFn = function(){
		k8sList(1,6);			
	}
	/*k8s模糊查询结束*/
	/*查看详情*/
	$scope.checkDetailsFn = function(data){
		data.module = '1';
		sspaasMemory.set('hostDetailTxt',data);
		$state.go('hostDetails')
	}
	/*查看详情结束*/
	/*存储列表*/
	$scope.storageList = function(page,rows){
        if($state.current.name.indexOf('subGroup') != -1){
            clearTimeout(timer)             	
			var url = $rootScope.gearBoxbIp + "/search/str";
			var data = {
				page:page, 
				rows:rows,
				search_name:$('.searchNameStorage').val()
			};		
			apiService.axjxPost(url,data).then(function(json){
				if(json.code == 200){
					$scope.storageClusterName = json.result.cluster_name ?json.result.cluster_name :'';
					$scope.storageLIst = json.result.list;
					$scope.storagePageCount = json.result.pages;
					$scope.storageTotalData = json.result.total;
					Page({
					    num:$scope.storagePageCount,    //页码数
					    startnum:page,             //指定页码
					    elem:$('#page1'),       //指定的元素
					    callback:function(n){   //回调函数
						$scope.storageList(n,6)		
					    }
					});						
				}else{
					layer.alert(json.message,{icon:7})			
				}
                for(var i = 0 ;i< $scope.storageLIst.length;i++){
                    if($scope.storageLIst[i].cls_status ==4){
                        timer = setTimeout(function(){
						$scope.storageList(1,6)	 
                        },240000);
                        return false                    
                    }
                }  				
			})				
        }	
	}
	$scope.storageList(1,6)	
	/*存储列表结束*/
	/*存储模糊查询*/
	$scope.storageSearchFn = function(){
		$scope.storageList(1,6)	
	}
	/*存储模糊查询结束*/
	/*修改存储别名*/
	$scope.sureChangeStorageNameFn = function(e){
		$(e.target).attr('disabled',true);
		var url = $rootScope.gearBoxbIp + "/change/str/name";
		var data = {
			cluster_type:'storage',
			old_cluster_name:$scope.storageClusterName,
			new_cluster_name:$('.js_storageName').val()
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				layer.alert('修改成功',{icon:1})
				$scope.storageList(1,6);			
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})			
	}	
	/*修改存储别名结束*/
}])