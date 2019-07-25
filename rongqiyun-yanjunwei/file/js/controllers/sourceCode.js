app.controller("sourceCodeCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
  var loading = null; 
  $scope.islabTrue = true;
  $scope.ishubTrue = true;
  /*选择github或者gitlab的执行方法*/
	$scope.hubLabFn = function(e){
		var $index = $(e.target).parent('.js_pFather').index();
    if($index ==0){
      $scope.isToken("2")    
    }else{
      $scope.isToken("1")     
    };
		$(e.target).removeClass('hidd');
		$(e.target).parent('.js_pFather').siblings().children().addClass('hidd');
		$('.js_btnsGroup').eq($index).show().siblings('.js_btnsGroup').hide();
	}
  /*选择github或者gitlab的执行方法结束*/
  /*判断token*/
  $scope.isToken = function(data){
    loading = layer.load(0, {
      shade: [0.1,'#fff']
    }); 
    var url = $rootScope.gearBoxcIp + '/integration/git/token';
    var data1 = {
          get_github_or_github_token:data
    };
    apiService.axjxGet(url,data1).then(function(json){
      if(json.code == 200 && data=='1'){
        if(json.data.token=="1"){
          $scope.islabTrue = false;
          $scope.islab = true;
          downSourceCodeFn(1,7,"gitlab")        
        }else{
           noData();        
        }
      };    
      if(json.code == 200 && data=="2"){
        if(json.data.token=="1"){
          $scope.ishubTrue = false;
          $scope.ishub = true;
          downSourceCodeFn(1,7,"github")        
        }else{
          noData()          
        }
      };
      
    });
  };
  /*判断token结束*/
  /*判断github的code*/
  function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  };
  $scope.isCode = function(){
    if(GetQueryString("code")){
      var url = $rootScope.gearBoxcIp + '/integration/github/get_token';
      var data = {code:GetQueryString("code")};
      apiService.axjxGet(url,data).then(function(json){
        if(json.code==200){
          $scope.isToken("2");         
        }
      });
    }else{
      $scope.isToken("2");     
    }
  }
  $scope.isCode();  
  /*判断github的code结束*/
	/*gitlab添加码库弹窗*/
	$scope.addSourceCodeModelFn = function(){
		apiService.Show('520px','.js_sourceCode')		
	}
	/*gitlab添加码库弹窗结束*/
  /*gitlab弹窗判断以及接口*/
  $scope.extendFn = function(e){
    if(!$("#gitlabUrl").val() || !$("#gitlabToken").val()){
        layer.alert('仓库地址或者private token不能为空',{icon:7})
        return false
    };
    if($rootScope.regular($("#gitlabUrl").val())){
        layer.alert('仓库地址请以http(s)://开头',{icon:7});
        return false
    };
    $(e.target).attr("disabled",true);   
    var url  = $rootScope.gearBoxcIp + "/integration/gitlab/info" ;
    var data = {
          gitlab_url:$("#gitlabUrl").val(),
          private_token:$("#gitlabToken").val()
        };
    apiService.axjxPost(url,data).then(function(json){
        if(json.code == 200){
          var git = 'gitlab';            
          downSourceCodeFn(1,7,git);
          $("#gitlabUrl").val('');
          $("#gitlabToken").val('');
          $scope.closeFn();
          $scope.islab = true;
          $scope.islabTrue = false;
          $(e.target).attr("disabled",false);    
        }else{
           layer.alert(json.message,{icon:7});
          $(e.target).attr("disabled",false);    
        }
    });
  };
  /*gitlab弹窗判断以及接口结束*/
  /*下载gitLab公用方法*/
  function downSourceCodeFn(page,rows,git){
    var url = $rootScope.gearBoxcIp + '/integration/repository/code';
    var data = {
      project_type:git, 
      page: page,
      rows:rows,      
    };
    apiService.axjxGet(url,data).then(function(json){
      if(json.code ==200){
         hasData(json,page,git)         
        }
    })
  }
  function hasData(json,page,git){
    layer.closeAll('loading');
    $scope.sourceCodeData = json.data.data;
    $scope.sourceCodePageCount = json.data.page_count;
    $scope.sourceCodeTotalData = json.data.total_number;
    Page({
        num:$scope.sourceCodePageCount,    //页码数
        startnum:page,             //指定页码
        elem:$('#page2'),       //指定的元素
        callback:function(n){   //回调函数
        downSourceCodeFn(n,7,git);            
        }
    });    
  }
  function noData(){
    layer.closeAll('loading');
    $scope.sourceCodeData = '';
    $scope.sourceCodePageCount = "0";
    $scope.sourceCodeTotalData = "0";
    Page({
        num:$scope.sourceCodePageCount,    //页码数
        startnum:1,             //指定页码
        elem:$('#page2'),       //指定的元素
        callback:function(n){   //回调函数       
        }
    });    
  }  
  /*下载gitLab公用方法结束*/
  /*注销gitLab或gitHub*/
  $scope.delGitFn = function(e){
    var attr = $(e.target).attr('data-attr');
    var url = $rootScope.gearBoxcIp + '/integration/token/delete';
    var data = {section:attr};
    apiService.axjxGet(url,data).then(function(json){
      if(json.code == 200){
          layer.alert("注销成功",{icon:1},function(){
              window.location.reload();
          })
      }else{
          layer.alert(json.message,{icon:7})
      }
    });
  }
  /*注销gitLab或gitHub结束*/
  /*刷新*/
  $scope.gitRefreshFn = function(e){
    loading = layer.load(0, {
      shade: [0.1,'#fff']
    });     
    var attr = $(e.target).attr('data-attr');
    var url = $rootScope.gearBoxcIp + '/integration/git/update';
    var data = {
      section:attr,
      page:'1',
      rows:'7'
    };
    apiService.axjxGet(url,data).then(function(json){
      if(json.code == 200){
        hasData(json,1,attr);
      }else{
          layer.alert(json.message,{icon:7})
      }
    });       
  }
  /*刷新结束*/
  /*添加github*/
  $scope.addGithubFn = function(){
    var url = $rootScope.gearBoxcIp + '/integration/github/request';
    apiService.axjxGet(url,'').then(function(json){
      if(json.code ==200){
           window.location.href = json.data.github_address;
      }
    });
  }  
  /*添加github结束*/
  /*分支下拉*/
  $scope.gitDropDataFn = function(e){
    var $txt =  $(e.target).parent('.js_dropList');
    $txt.siblings('.js_frame').text($(e.target).text());
    $txt.siblings('.js_frame').removeClass('on')      
    $txt.hide();
  }
  /*分支下拉结束*/
  /*激活*/
  $scope.codeActivationFn = function(e,data,num){
    var numData = $(e.target).parents(".oneDataTxt").find('.js_frame').text(); 
    var url = $rootScope.gearBoxcIp + '/integration/git/activation';
    var data = {
        project_name:data.project_name,
        project_type:data.project_type,
        branch:numData,
        is_activation:num        
    }
    apiService.axjxGet(url,data).then(function(json){
      if(json.code == 200){
        $state.go('continuousIntegration')     
      }else{
        layer.alert(json.message,{icon:7})
      }      
    });       
  }
  /*激活结束*/
}])