app.controller("loginCtrl", ["$rootScope", "$scope", "$state","$document","apiService",function($rootScope,$scope,$state,$document,apiService) {
	/*输入框，获得焦点，失去焦点*/
	$scope.getGroup = function(e){
		$(e.target).addClass('on')
	};
	$scope.outGroup = function(e){
		$(e.target).removeClass('on')
	};
	/*登录*/
	$scope.logIn = function(e){
		if(!$scope.userName || !$scope.pwd){
			$scope.tipsError = "用户名或密码不能为空";
			$scope.isError = true;
			return
		};
		var url = $rootScope.gearBoxIp + "/login";
		var data = {
				username:$scope.userName,
				password:jQuery.base64.encode($scope.pwd)
				};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				setCookie('glearBoxToken',json.result.token,'m30');
       		 	sspaasMemory.set('userMsg',json.result);
				window.location.href = '../index.html';
			}else{
				$scope.tipsError = json.message;
				$scope.isError = true;					
			}
		})		
	};
	/*Enter登录*/
	$document.bind("keypress", function(e) {
		$scope.$apply(function() {
			if (e.keyCode == 13) {
				$scope.logIn();
			}
		})
	});
	/**/
}]);