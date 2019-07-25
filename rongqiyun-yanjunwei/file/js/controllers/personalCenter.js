app.controller("personalCenterCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
	/*修改密码*/
	$scope.modPawFn = function(e){
		var $input = $(e.target).siblings('input');
		$input.attr('disabled',false);
		$input.focus();
	}
	$scope.sureModFn = function(e){
		var $target = $(e.target).val().length;
		if($target<5 || $target>10){
			$(e.target).addClass('error');
			layer.alert('密码长度在5~10',{icon:7})
			return false
		};
		$(e.target).removeClass('error');
		var url = $rootScope.gearBoxIp + "/user/change_passwd";
		var data = {
				password:$(e.target).val()
		};
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.closeFn();
				layer.alert('修改成功',{icon:1})
			}else{
				layer.alert(json.message,{icon:7})					
			}
		})				
	}
	/*修改密码结束*/
	function centerMsg(){
		var url = $rootScope.gearBoxIp + "/user/one_info";
		apiService.axjxGet(url,'').then(function(json){
			if(json.code == 200){
				$scope.centerData = json.result
			}else{
				layer.alert(json.message,{icon:7})					
			}
		})				
	}
	centerMsg();
}])