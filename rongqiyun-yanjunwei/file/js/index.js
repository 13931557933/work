app.controller("console", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
    $scope.userName = sspaasMemory.get('userMsg') ? sspaasMemory.get('userMsg').username : '';
	/*左侧导航列表js*/
	var netIndex = 0; 
	$scope.listActiveFn = function(index,url){
        $('.navListDownSecs').removeClass('on'); 
		/*先判断被点击者的下标与之前一次相等时的处理*/
		if(netIndex == index){
			$scope.navList[index].show = !$scope.navList[index].show;
			if($scope.navList[index].children.length){
                $scope.navList[index].isIcon = !$scope.navList[index].isIcon;
			};
            if(!$scope.navList[index].children.length){
                $scope.navList[index].isIcon = false;
                $state.go(url)
            };            
			return false
		};
		/*如果不相等的处理*/
		if($scope.navList[index].children.length){
			$scope.navList[index].isIcon = true;
		};
        if(!$scope.navList[index].children.length){
            $scope.navList[index].isIcon = false;
            $state.go(url);
        };        
		$scope.navList[index].show = true ;
		$scope.navList[netIndex].show = false ;
		$scope.navList[netIndex].isIcon = false ;
		netIndex = index;
	};

	/*二级路由跳转*/
    $scope.urlFn = function(url,e){
        $('.navListDownSecs').removeClass('on');
        $(e.target).addClass('on');
        $state.go(url);
	}
    /*左侧导航列表js结束*/
    /*项目信息*/
    $scope.projectMsgFn = function(){
        var url = $rootScope.gearBoxIp + "/project/list";
        apiService.axjxGet(url,'').then(function(json){
            if(json.code == 200){
                $scope.projectList = json.result.projects;
                if(!sspaasMemory.get('currentProjectInfo')){
                    $scope.currentProject = $scope.projectList[0] ? $scope.projectList[0]: '';
                    sspaasMemory.set('currentProjectInfo',$scope.currentProject);
                }else{
                    $scope.currentProject = sspaasMemory.get('currentProjectInfo')
                }
                leftBarMsg();
            }else{
                layer.alert(json.message,{icon:7})             
            }
        })          
    }
    $scope.projectMsgFn();
    /*左侧当行栏*/
    function leftBarMsg (){
        var url = $rootScope.gearBoxIp + "/web/urlinfo";
        var data = {
            project_id:$scope.currentProject.project_id
        };
        apiService.axjxPost(url,data).then(function(json){
            if(json.code == 200){
                $scope.navList = json.result.weburl;
                refreshTheSelected();
            }else{ 
                layer.alert(json.message,{icon:7})                       
            }
        })          
    };
    /*窗口关闭方式*/
    $scope.closeFn = function(){
        apiService.Hide();
    };
    /*窗口关闭方式结束*/
    /*单选框公共选择方式*/
    $scope.choiceFn = function(e,data){
        $(e.target).parents('.oneDataGroup').siblings().find('.choiceBox').removeClass('add');
        if($(e.target).hasClass('add')){
            $(e.target).removeClass('add');
            $scope.recordData = '';
        }else{
            $scope.recordData = data;
            $(e.target).addClass('add');
        }
    }
    /*单选框公共选择方式结束*/
    /*下拉框公共方式*/
    $scope.dropDownFn = function(e){
        if($(e.target).hasClass('on')){
            $(e.target).removeClass('on');
            $(e.target).siblings('ul').hide()
        }else{
            $('.js_frame').removeClass('on');
            $('.js_dropList').hide();            
            $(e.target).addClass('on');
            $(e.target).siblings('ul').show()        
        }   
    };
    $scope.dropDataFn = function(data,e){
        sspaasMemory.set('currentProjectInfo',data);
        var $txt =  $(e.target).parent('.js_dropList');
        var url = $rootScope.gearBoxIp + "/project/switch";
        var data1 = {
            project_id:data.project_id
        };
        $txt.siblings('.js_frame').text($(e.target).text());
        $txt.siblings('.js_frame').removeClass('on')      
        $txt.hide();
        apiService.axjxPost(url,data1).then(function(json){
            if(json.code == 200){
                $state.go('overView');
                window.location.reload();
            }else{ 
                layer.alert(json.message,{icon:7})                       
            }
        })             
    };
    $(window).on('click',function(e){
        var $tr = $(e.target).hasClass('js_frame') || $(e.target).hasClass('js_dropList');
        if(!$tr){
           $('.js_frame').removeClass('on');
           $('.js_dropList').hide();         
        }
    })
    /*下拉框公共方式结束*/
    /*刷新后左侧导航依旧选中*/
    function refreshTheSelected(){
        var $hash = location.hash.split('#/')[1];
        if(!$hash){
            $scope.navList[0].show = true ;
            return false
        };
        for(var i=0;i<$scope.navList.length;i++){
            if($scope.navList[i].url == $hash ){
                $scope.navList[i].show = true ;
                netIndex = i; 
                return false
            };
            if($scope.navList[i].url==''){            
                for(var k=0;k<$scope.navList[i].children.length;k++){
                    if($scope.navList[i].children[k].url == $hash){
                        $scope.navList[i].show = true ; 
                        $scope.navList[i].isIcon = true ;
                        $scope.navList[i].children[k].on = true;
                        netIndex = i;
                        return false
                    };
                }
            }
        }    
    };
    /*刷新后左侧导航依旧选中结束*/
    /*退出登录*/
    $scope.logOutFn = function(){
        var url = $rootScope.gearBoxIp + "/logout";
        apiService.axjxPost(url).then(function(json){
            if(json.code == 200){
                sspaasMemory.clear();
                clearCookie();
                window.location.href = 'login/index.html'
            }else{
                layer.alert(json.message,{icon:7});                           
            }
        })          
    }
    /*退出登录结束*/
}])