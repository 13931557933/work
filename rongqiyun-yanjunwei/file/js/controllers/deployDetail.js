app.controller("deployDetailCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
	
	$scope.mirrorDetailData = sspaasMemory.get('repositoryMirrorName') ? sspaasMemory.get('repositoryMirrorName') :'';
	/*详情信息*/
	$scope.deployDetailMsg = function(){
		var url = $rootScope.gearBoxeIp + "/repository/details/image";
		var data = {
			repo_name:$scope.mirrorDetailData.name
		};		
		apiService.axjxPost(url,data).then(function(json){
			if(json.code == 200){
				$scope.mirrorDetailList = json.data
			}else{
				layer.alert(json.message,{icon:7})			
			}
		})				
	}
	$scope.deployDetailMsg();
	/*详情信息结束*/
	/*复制*/
	$scope.copyMirrorFn = function(){
      var text = document.getElementById("js_copy").innerText;
      var input = document.getElementById("js_copyTxt");
      input.value = text; // 修改文本框的内容
      input.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      layer.alert('复制成功')
	}	
	/*详情里边菜单跳转*/
	$(".js_detailMenu li").click(function(){
		var ind = $(this).index();
		$(this).addClass('add').siblings().removeClass('add');
		$('.js_detailContent').children().eq(ind).show().siblings().hide();
	})
	/*详情里边菜单跳转结束*/ 

}])