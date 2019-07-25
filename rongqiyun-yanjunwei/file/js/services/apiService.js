app.service('apiService',["$rootScope","$http", "$q",function($rootScope,$http, $q){
	
	/*邮箱验证规则*/
   $rootScope.Email = function (arg){
	    return !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(arg.trim());
    };
    /*手机号验证规则*/
    $rootScope.phone = function (arg){
        return !/^1[3|4|5|7|8][0-9]\d{8,8}$/.test(arg.trim());
    };
    /*用户名验证规则*/
    $rootScope.use = function (arg){
        return !/^[a-z][a-z0-9_]{3,14}$/.test(arg.trim());
    }
    /*密码验证规则*/
    $rootScope.paw = function (arg){
        return !/^[a-zA-Z]\w{4,9}$/.test(arg.trim());
    }
    /*只能输入中英文的验证*/
    $rootScope.onlyChineseEng = function (arg){
        return !/^[A-Za-z\u4e00-\u9fa5]+$/.test(arg.trim());
    };
    $rootScope.users = function(arg){
    	return !/^[a-zA-Z0-9\u4e00-\u9fa5]{2,15}$/.test(arg.trim())		
    };
    $rootScope.IP = function (arg){
    	return !/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(arg.trim())		
    };   
     $rootScope.checkprojectName = function (arg){
    	return !/^[\u4e00-\u9fa5]{1,7}$|^[a-zA-Z][a-zA-Z0-9_]{4,20}$/.test(arg.trim())		
    };
     $rootScope.checMemberName = function (arg){
    	return !/^[a-zA-Z][a-zA-Z0-9_]{3,14}$/.test(arg.trim())		
    };
    $rootScope.regular = function (arg){
        return !/^(http(s)?:\/\/)/.test(arg.trim());
    }
    var urlIp = ['127.0.0.1','gearbox.docker.sspaas.net']
    if(urlIp.indexOf(window.location.host)=='-1'){ 
	    $rootScope.gearBoxIp = "http://usersystem.sspaas.net"; 
	    $rootScope.gearBoxbIp = "http://hostmanager.sspaas.net"; 
	    $rootScope.gearBoxcIp = "http://koncing.sspaas.net"; 
	    $rootScope.gearBoxdIp = "http://application.sspaas.net"; 
	    $rootScope.gearBoxeIp = "http://new_koncing.sspaas.net";  
	    $rootScope.gearBoxfIp = "http://logs.sspaas.net";
	    $rootScope.gearBoxgIp = ''; 
    }else{
	    $rootScope.gearBoxIp = "http://usersystem.gearboxtest.sspaas.net";
	    $rootScope.gearBoxbIp = "http://hostmanager.gearboxtest.sspaas.net";
	    $rootScope.gearBoxcIp = "http://koncing.gearboxtest.sspaas.net";
	    $rootScope.gearBoxdIp = "http://application.gearboxtest.sspaas.net";
	    $rootScope.gearBoxeIp = "http://new_koncing.gearboxtest.sspaas.net";
	    $rootScope.gearBoxfIp = "http://logs.gearboxtest.sspaas.net";  
	    $rootScope.gearBoxgIp = "ws://websocket.gearboxtest.sspaas.net"; 	      	
    }
	return ({
		getData: jsonp,
		axjxGet: getWay,
		axjxPost: postWay,
		Show:sppassPopup,
		Hide:sppassPopupClose,
		getSocket:webSocket
	});
	/*展开弹窗*/
	function sppassPopup (w,tag,move,anim,shade){
	    var anim = anim?anim : 0;
	    var shade = shade==-1?0:0.6; 
	    layer.open({
	        type: 1 //Page层类型
	        ,area: w
	        ,title: false
	        ,shade: shade //遮罩透明度
	        ,maxmin: false //允许全屏最小化
	        ,closeBtn: 0
	        ,shadeClose: false
	        ,anim: anim //0-6的动画形式，-1不开启
	        ,content:$(tag)
	        ,move: move
	    });   
	}

	// 关闭弹出框
	function sppassPopupClose (){
		layer.closeAll()
	};
	function jsonp(url,data) {
		var defer = $q.defer();
		$http({
			method: "JSONP",
			url:url,
			data:data,
		}).success(function(json) {
			defer.resolve(json)
		}).error(function() {
			defer.reject("There was an error")
		});
		return defer.promise
	}; 
	function getWay(url,data){
		var defer = $q.defer();
        var token = getCookie('glearBoxToken') ? getCookie('glearBoxToken') : '';
        var data = projectIdFn(data);
        var url = url + '?';
        for(var key in data){
            url = url+key+'='+data[key]+"&";
        };
        url= url.substring(0,url.length-1);        
		$http({
			method: "GET",
			url:url,
			headers:{"token":token}
		}).success(function(json) {
			if(json.code ==307){
		        sspaasMemory.clear();
        		clearCookie();				
				window.location.href = '../file/login/index.html';
				return
			};			
			defer.resolve(json)
		}).error(function() {
			defer.reject("Tere was an error")
		});
		return defer.promise		
	};
	function postWay(url,data){
		var defer = $q.defer();
        var token = getCookie('glearBoxToken') ? getCookie('glearBoxToken') : '';
        var data = projectIdFn(data);
		$http({
			method:'POST',
			url:url,
			data:data,
			dataType:"json",
			headers:{"token":token,},			
		}).success(function(json){
			if(json.code ==307){
		        sspaasMemory.clear();
        		clearCookie();
				window.location.href = '../file/login/index.html';
				return
			};
			defer.resolve(json)
		}).error(function() {
			defer.reject("There was an error")
		});
		return defer.promise		
	};
    function webSocket(url,data) {
        if (window.s) {
            window.s.close()
        };
        var socket = new WebSocket(url);
        var token = getCookie('glearBoxToken') ? getCookie('glearBoxToken') : ''; 
        var data = projectIdFn(data);               	
    	data.token = token;
        socket.onopen = function () {
            socket.send(JSON.stringify(data))
        };
        socket.onmessage = function (e) {
            $('.js_logsContent').append('<p>' + e.data + '</p>')
            if($('.js_logsContent p').length>500){
            	$('.js_logsContent p').first().remove();
            }
        };
        // Call onopen directly if socket is already open
        if (socket.readyState == WebSocket.OPEN) socket.onopen();
        window.s = socket;
    };	
	function projectIdFn (data){
		var data  = data ? data:{};
		var projectId = sspaasMemory.get('currentProjectInfo') ? sspaasMemory.get('currentProjectInfo').project_id : '';
		var userData = sspaasMemory.get('userMsg') ? sspaasMemory.get('userMsg') : '';
		data.user_name = userData.username;
		data.current_items_id = projectId;
		data.user_id = userData.user_id;
		return data;
	};
}]);
app.directive('repeatFinish',function(){
    return {
        link: function(scope,element,attr){
            if(scope.$last == true){
                $('.scrollDiv').slimScroll('','#f1f1f1');
                $('.scrollBar').slimScroll('','transparent');
            }
        }
    }
})
