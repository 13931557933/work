app.controller("platformLogCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
	
	/*获取列表方法*/
	platList(1,10,'','');
	function platList(page,rows,start,end){
		var url = $rootScope.gearBoxfIp +"/logs";
		var data = {
			page:page,
			rows:rows,
			searchname:$('.searchBox').val(),
			start_time:start,
			end_time:end
		};
		apiService.axjxGet(url,data).then(function(json){
			if(json.code == 200){
				$scope.platLogPage = json.result.page_count;
				$scope.platLogList = json.result.logs;
				$scope.platLogCount = json.result.total_data;
				Page({
				    num:$scope.platLogPage,    //页码数
				    startnum:page,             //指定页码
				    elem:$('#page2'),       //指定的元素
				    callback:function(n){   //回调函数
				    	var data = $('#date1').text();
				    	if(!data){
			    			platList(n,10,'','');
				    	}else{
				    	var data = $('#date1').text().split(' - ');
				    		platList(n,10,data[0],data[1]);
				    	}
				    }
				});			
			}else{
				layer.alert(json.message,{icon:7});
			}
		})			
	}
	/*获取列表方法結束*/
  	/*时间段选择*/
	var dateRange1 = new pickerDateRange('date1', {
		isTodayValid : true,
		/*startDate : '2018-06-14',
		endDate : '2018-07-10',*/
		needCompare : false,
		defaultText : ' - ',
		autoSubmit : true,
		theme : 'ta',
		success : function(obj) {
			$("#dCon2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
			platList(1,10,obj.startDate,obj.endDate)
		}
	});
  	/*时间段选择结束*/
  	/*查询*/
  	$scope.platSearchFn = function(){
  		var time = $('#date1').val();
  		if(time){
  			time = time.split(" - ");
  			platList(1,10,time[0],time[1])
  		}else{
  			platList(1,10,'','');
  		}
  	}
  	/*查询结束*/
}])
app.filter('types',function(){
	return function(type){
		var map={
			"1":'创建',
			"2":'更新',
			"3":'删除',
		}
	return map[type] ? map[type] : type
	}
});
