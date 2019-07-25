app.controller("storageVolumeCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) {
    var loading =null;
    /*创建，扩容，删除弹窗*/
    $scope.addStorageFn = function(){
        apiService.Show('520px','.js_addStorage')
    }    
	$scope.volumeModel = function(data){
        $scope.exVolumeData = data;
        $scope.rangeSlider('#storageVolume [data-exrangeslider]','[data-exrangeslider]');        
        var value = data.pvc_capacity;
        var $inputRange = $('#storageVolume [data-exrangeslider]');        
        $('#storageVolume').find('.js_exrangeslider').attr('min',value);
        $('#storageVolume').find('.js_exNumber').attr('value',value);   
        var attributes = {
                min: value,
            };
        $inputRange.attr(attributes);        
        $inputRange.val(value).change();
        $inputRange.rangeslider('update', true);        
        apiService.Show('520px','.js_expendStorage');
    }
    $scope.delVolumeModel = function(data){
        $scope.delVolumeData = data
        apiService.Show('520px','.js_delStorage');
    }
    /*创建，扩容，删除弹窗结束*/
    $scope.rangeSlider = function(element,style){
        var $document = $(document);
        var selector = style;
        var $element = $(element);
        var minSize = 1;
        var maxSize = 10;
        function valueOutput(element) {
            var value = element.value;
            $(element).attr('value', value);
            $(element.parentNode).siblings('.number').attr('value', value);
        }
        $document.on('input', 'input[type="range"], ' + selector, function(e) {
            valueOutput(e.target);
        });

        $('.number').on('blur', function(e) {
            var $inputRange = $(selector, e.target.parentNode);
            var value = $('input[type="tel"]', e.target.parentNode)[0].value;
            minSize = $(e.target.parentNode).find('input[type="range"]').attr('min');

            if(parseInt(value) < parseInt(minSize)){
            	value = minSize;
            	$(this).val(minSize);
            }
            $inputRange.val(value).change();
        });
        $('.number').on('input',function () {
            var value = this.value;
            var max = $('input[type="range"]').attr('max');
            var re = /^0|\D/g;
            this.value = value.replace(re, '')
            if(parseInt(value) > parseInt(max)){
                $(this).val(maxSize);
            }
        });

        $element.rangeslider({
            // Deactivate the feature detection
            polyfill: false,
            onInit: function() {
                var value = this.$element[0].value;
                valueOutput(this.$element[0]);
                var el = $(this.$element[0]).parents('.js-rangeslider');
                //$scope.computedPrice(value, el);
            },
            // Callback function
            onSlide: function(position, value) {
            	var el = $(this.$element[0]).parents('.js-rangeslider');
            	//$scope.computedPrice(value, el);
            }
        });
    }
    $scope.rangeSlider('#storageVolume [data-rangeslider]','[data-rangeslider]');
    /*创建存储*/
    $scope.addSureStorageFn = function(e){
        $(e.target).attr('disabled',true)
        var url = $rootScope.gearBoxdIp + "/volume/create_volume";
        var data = {
            pvc_name:$('.js_volumeName').val(),
            pvc_capacity:$('.js_number').val()
        };      
        apiService.axjxPost(url,data).then(function(json){
            if(json.code == 200){
                $(e.target).attr('disabled',false)
                $scope.closeFn();
                $scope.storageList(1,7)                           
            }else{
                $(e.target).attr('disabled',false)
                layer.alert(json.message,{icon:7})          
            }
        })              
    }
    /*创建存储结束*/
    /*存储卷列表*/
    var timer = null ;
    $scope.storageList = function(page,rows){
        if($state.current.name.indexOf('storageVolume') != -1){
            clearTimeout(timer)        
            var url = $rootScope.gearBoxdIp + "/volume/volume_list";
            var data = {
                page_num:page, 
                page_limit:rows,
                search_keyword:$('.searchBox').val()
            };      
            apiService.axjxPost(url,data).then(function(json){
                if(json.code == 200){
                    layer.close(loading)
                    $scope.volumeLIst = json.data.volume_list;
                    $scope.volumePageCount = json.data.total_pages;
                    $scope.volumeTotalData = json.data.total_items;
                    Page({
                        num:$scope.volumePageCount,    //页码数
                        startnum:page,             //指定页码
                        elem:$('#page2'),       //指定的元素
                        callback:function(n){   //回调函数
                            $scope.storageList(n,7)                           
                        }
                    });
                }else{
                    layer.alert(json.message,{icon:7})          
                }
                for(var i = 0 ;i< $scope.volumeLIst.length;i++){
                    if($scope.volumeLIst[i].status ==0 || $scope.volumeLIst[i].status ==1){
                        timer = setTimeout(function(){
                            $scope.storageList(1,7);
                        },1500);
                        return false                    
                    }
                }             
            })          
        }
    }
    $scope.storageList(1,7)
    /*存储卷列表结束*/
    /*搜索*/
    $scope.volumeSearchFn = function(){
        $scope.storageList(1,7)       
    }
    /*搜索结束*/
    /*刷新*/
    $scope.volumeResearchFn = function(){
        loading=layer.load(0, {
                shade: [0.1,'#fff']
        });   
        $scope.storageList(1,7)     
    }
    /*刷新结束*/
    /*扩容存储*/
    $scope.volumeSureVolumeFn = function(e){
        $(e.target).attr('disabled',true)
        var url = $rootScope.gearBoxdIp + "/volume/expand_volume";
        var data = {
            pvc_id:$scope.exVolumeData.pvc_id,
            pvc_capacity:$('.js_exNumber').val()
        };      
        apiService.axjxPost(url,data).then(function(json){
            if(json.code == 200){
                $(e.target).attr('disabled',false)
                $scope.closeFn();
                $scope.storageList(1,7)                           
            }else{
                $(e.target).attr('disabled',false)
                layer.alert(json.message,{icon:7})          
            }
        })              
    }
    /*扩容存储结束*/
    /*删除存储*/
    $scope.delSureVolumeFn = function(e){
        $(e.target).attr('disabled',true)
        var url = $rootScope.gearBoxdIp + "/volume/delete_volume";
        var data = {
            pvc_id:$scope.delVolumeData.pvc_id,
        };      
        apiService.axjxPost(url,data).then(function(json){
            if(json.code == 200){
                $(e.target).attr('disabled',false)
                $scope.closeFn();
                $scope.storageList(1,7)                           
            }else{
                $(e.target).attr('disabled',false)
                layer.alert(json.message,{icon:7})          
            }
        })        
    }
    /*删除存储结束*/
}])
app.filter('storageStatu',function(){
    return function(data){
        var map = {
            0:'创建中',
            1:'扩容中',
            2:'创建成功',
            3:'扩容成功',
            4:'创建失败',
            5:'扩容失败'
        }
        return map[data] ? map[data] :'';
    }
})