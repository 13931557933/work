app.controller("logRecordCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {

	$scope.continuousIntegrationData = sspaasMemory.get("continuousIntegrationData") ? sspaasMemory.get("continuousIntegrationData") :'';
	$scope.logRecordShow = function(data){
		var logRecordData = data.execution_log;
		logRecordData = logRecordData.toString().replace(/\n/g,"<br/>");
		$('.js_rMessage').html(logRecordData);		
		apiService.Show('813px','.js_log');
	};
	/*获取信息*/ 
    $scope.Recordexe = function(start,end){
        var url = $rootScope.gearBoxcIp + '/integration/latest/logs';
        var data = {
            code_source: $scope.continuousIntegrationData.address,
        	start_time:start,
            end_time:end
        }
        apiService.axjxPost(url,data).then(function(json){
        	if(json.code == 200){
				$scope.recordsData = json.data.result;
        	}
        });
    };	
   	$scope.Recordexe('','');
	/*获取信息结束*/
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
		   	$scope.Recordexe(obj.startDate,obj.endDate);
		}
	});
  	/*时间段选择结束*/		
}])