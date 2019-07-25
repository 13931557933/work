app.controller("netWorkCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
    var loading = null;
	/*创建网络弹窗*/	
	$scope.addNetFn = function(){
		apiService.Show('520px','.js_addNet')
	}
	/*创建网络弹窗结束*/	
	/*删除网络*/
	$scope.delNetFn = function(data){
		$scope.delDataName = data;
		apiService.Show('520px','.js_delNet')
	}
	/*删除网络结束*/
	/*验证IP*/
    $('.js_firstVal').on('input propertychange', function(){
    	$scope.validateIP($(this))
    });    
    $('.js_secVal').on('input propertychange', function(){
    	$scope.validateIP($(this))
    });
    $('.js_thirdVal').on('input propertychange', function(){
    	$scope.validateIP($(this))
    });
    $scope.validateIP = function(_self){
    	var value = _self.val().substr(0,3).replace(/\D/g,'');
    	_self.val(value);
        if(parseInt(value) > 255){
    		_self.val(255);
        	return;
        };
    	if(value.length > 1 && value.charAt(0) === '0'){
            //大于1位的，开头都不可以是‘0’
            value = value.substr(1, 3);
            _self.val(value);
        }          
    }
	/*验证IP结束*/
	/*新建网络*/
	$scope.addSureNetFn = function(e){
		$(e.target).attr('disabled',true)
		var IP = $('.js_firstVal').val()+'.';
		 	IP += $('.js_secVal').val()+'.';
		 	IP += $('.js_thirdVal').val()+'.0/24';
		var	url = $rootScope.gearBoxdIp + "/network/create_network";
		var data = {
			network_name:$('.js_netName').val(),
			subnet:IP
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$(e.target).attr('disabled',false)
				$scope.closeFn();
				$scope.netList(1,7)							
			}else{
				$(e.target).attr('disabled',false)
				layer.alert(json.message,{icon:7})			
			}
		})			
	}
	/*新建网络结束*/
	/*网络列表*/
	var timer =null ;
	$scope.netList = function(page,rows){
        if($state.current.name.indexOf('netWork') != -1){
            clearTimeout(timer)        	
			var url = $rootScope.gearBoxdIp + "/network/network_list";
			var data = {
				page_num:page, 
				page_limit:rows,
				search_keyword:$('.searchBox').val()
			};		
			apiService.axjxPost(url,data).then(function(json){
				if(json.code == 200){
					layer.close(loading);
					$scope.netLIst = json.data.network_list;
					$scope.netPageCount = json.data.total_pages;
					$scope.netTotalData = json.data.total_items;
					Page({
					    num:$scope.netPageCount,    //页码数
					    startnum:page,             //指定页码
					    elem:$('#page2'),       //指定的元素
					    callback:function(n){   //回调函数
				    		$scope.netList(n,7)				    		
					    }
					});						
				}else{
					layer.alert(json.message,{icon:7})			
				}
                for(var i = 0 ;i< $scope.netLIst.length;i++){
                    if($scope.netLIst[i].status ==4 || $scope.netLIst[i].status ==5){
                        timer = setTimeout(function(){
                        	$scope.netList(1,7)
                        },1500);
                        return false                    
                    }
                }     				
			})		
        }		
	};
	$scope.netList(1,7)
	/*网络列表结束*/
	/*刷新*/
	$scope.netResearchFn = function(){
		loading = layer.load(0, {
				shade: [0.1,'#fff']
		});
	$scope.netList(1,7)				
	}
	/*刷新结束*/
	/*搜索框*/
	$scope.netSearchFn = function(){
		$scope.netList(1,7)			
	}
	/*搜索框结束*/
	/*删除*/
	$scope.delSureNetFn = function(e){
		$(e.target).attr('disabled',true);
		var	url = $rootScope.gearBoxdIp + "/network/delete_network";
		var data = {
			network_name:$scope.delDataName.network_name,
			subnet:$scope.delDataName.subnet
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$(e.target).attr('disabled',false)
				$scope.closeFn();
				$scope.netList(1,7)							
			}else{
				$(e.target).attr('disabled',false)
				layer.alert(json.message,{icon:7})			
			}	
		})	
	}
	/*删除结束*/
}])
app.filter('netStatus',function(){
	return function(data){
		var map = {
			0:'创建成功',
			1:'创建失败',
			2:'删除成功',
			3:'删除失败',
			4:'创建中',
			5:'删除中'
		}
		return map[data] ? map[data]:data;
	}
})