app.controller("overViewCtrl", ["$rootScope", "$scope", "$state","apiService",function($rootScope,$scope,$state,apiService) { 
    /*镜像仓库列表*/
    $scope.MirrorCkList = function(){
        var url =   $rootScope.gearBoxeIp +'/repository/system/image';
        apiService.axjxPost(url).then(function(json){
            if(json.code == 200){
                $scope.mirrorWarehouse = json.data.name
            }else{
                $scope.mirrorWarehouse = ''             
            }
        })  
    }
    $scope.MirrorCkList();
    $scope.applyInfoMsg = function(){
        var url =   $rootScope.gearBoxdIp +'/application/application_pandect';
        apiService.axjxPost(url).then(function(json){
            if(json.code == 200){
                $scope.applyRun = json.data.running_count;
                $scope.applyOperation = json.data.operation_count;
                $scope.allApply = Number($scope.applyRun) + Number($scope.applyOperation);
                eCharts('apply',$scope.allApply,$scope.applyRun,$scope.applyOperation)
            }else{
                return false            
            }
        })  
    }
    $scope.applyInfoMsg();
    $scope.storageInfoMsg = function(){
        var url =   $rootScope.gearBoxdIp +'/volume/volume_quota';
        apiService.axjxPost(url).then(function(json){
            if(json.code == 200){
                $scope.storageUsable = json.data.available_quota;
                $scope.storageUsed = json.data.used_quota;
                $scope.allStorageMsg = Number($scope.storageUsable) + Number($scope.storageUsed);                
                eCharts('storage',$scope.allStorageMsg,$scope.storageUsed,$scope.storageUsable)
            }else{
            return false            
            }
        })  
    }
    $scope.storageInfoMsg();
    $scope.warnAlarm = function(){
        var url =   $rootScope.gearBoxbIp +'/alarm/component';
        apiService.axjxPost(url).then(function(json){
            if(json.code == 200){
                $scope.alarmDataList = json.result;
            }else{
                $scope.alarmDataList = ''           
            }
        })  
    }
    $scope.warnAlarm();   
    $scope.CICDdata = function(){
        var url =   $rootScope.gearBoxcIp +'/integration/system/cicd';
        apiService.axjxPost(url).then(function(json){
            if(json.code == 200){
                $scope.buildStatus = json.data;
            }else{
                $scope.buildStatus = ''           
            }
        })  
    }
    $scope.CICDdata();
    $scope.dailyRecord = function(){
        var url = $rootScope.gearBoxfIp +'/logs';
        var data = {
            page:'',
            rows:'',
            searchname:'',
            start_time:'',
            end_time:''
        };
        apiService.axjxGet(url,data).then(function(json){
            if(json.code == 200){
                $scope.logRecord = json.result.logs;
            }else{
                $scope.logRecord = ''           
            }
        })  
    }
    $scope.dailyRecord();
    $scope.pageView = function(){
        var url =$rootScope.gearBoxdIp + '/application/overview_pv';
        apiService.axjxPost(url).then(function(json){
            if(json.code == 200){
                $scope.pageViewList = json.data;
                const [pageViewTime,pageViewData] = [[],[]];
                for(let i = $scope.pageViewList.length-1 ; i>=0 ; i--){
                    pageViewTime.push($scope.pageViewList[i].time);
                    pageViewData.push($scope.pageViewList[i].pv_hour);
                }
                comChart("staticChart",staticColor,"","",pageViewData,"",pageViewTime)   
            }
        })  
    }
    $scope.pageView();                         
    /*环形图表*/
    /*环形图表方法*/
    function eCharts(name,text,data,data1){
	var chartName = echarts.init(document.getElementById(name));
    var option ={ 
        title: {
            text:data+"/"+text,
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: '#647083',//字体颜色
                fontSize: '20'
            }
        },
        series: [
        {
            type: 'pie',
            radius: ["55%", "85%"],
            startAngle:"-90",                
            data: [{
                value: 0,
                name: '',
                label:{
                    normal: {
                        show: true,
                        position: 'center',
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ffffff',
                        shadowBlur: 15,
                        shadowOffsetX:1,
                        shadowOffsetY:1,
                        shadowColor:'#f9f9f9',
                        show: false
                    }
                }
            }]
        },{
            type: 'pie',
            radius: ['55%', '85%'],
            clockWise: true,      //改变方向
            startAngle:"-90",

            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                }
            },
            hoverAnimation: false,   //移上去放大
            data: [{
                value:data,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                            {offset: 0, color:'#63bf58'},
                            {offset: 0.5, color:'#dce35b'},
                            {offset: 1, color:'#f8b553'}
                        ],false)
                    } 
                }
            },{
                value:data1,
                itemStyle: {
                    normal: {
                        color: '#eeeeee'
                    },
                    emphasis: {   //鼠标移上去突出显示的颜色  ，不设置，默认变色(#FFF)
                        color: '#eeeeee'
                    }
        },

            }]
        }]}
        chartName.setOption(option, true);
          window.addEventListener('resize',function(){
                chartName.resize();
            })  
    }
    var staticColor = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color:'#47b749'},{offset: 1, color:'#dae25b'}],false); 
    function comChart(id,myColor,myColor1,name,Data,Data1,time){
        var myChart = echarts.init(document.getElementById(id));
        var option = {
                title: {
                    text: name,
                    textStyle:{
                        color:'#333333',
                        fontWeight:"normal",
                        fontSize:22
                    },              
                    left:"center",
                },      
                xAxis: {
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#008acd',//左边线的颜色
                        }
                    },
                    axisLabel: {
                        rotate:-30,
                        textStyle: {
                        color: '#333333',//坐标值得具体的颜色
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color:"#f5f5f5"
                        }
                    },
                    data:time                                   
                },
                yAxis: {
                    splitArea: {
                        show: true,
                        areaStyle:{
                            color:['#fff','#fbfbfb']
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color:"#f5f5f5"
                        }
                    },      
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#008acd',//左边线的颜色
                        }
                    },
                    axisLabel: {
                        textStyle: {
                        color: '#333333',//坐标值得具体的颜色
                        },
                    },              
                },
                color:[myColor,myColor1],
                series: [{
                    symbolSize: 5,
                    name:"利用率",
                    data:Data,
                    type: 'line',
                    smooth: true,
                    itemStyle:{
                            normal : {
                                lineStyle:{
                                    width:5,//折线宽度
                                    color: myColor
                            },
                            borderColor: "#90dccb"  // 点边线的颜色
                        }
                    }           
                },
                {
                    symbolSize: 5,
                    name:"hh",
                    data:Data1,
                    type: 'line',
                    smooth: true,
                    itemStyle:{
                            normal : {
                                lineStyle:{
                                    width:5,//折线宽度
                                    color: myColor1
                            },
                            borderColor: "#90dccb"  // 点边线的颜色
                        }
                    }           
                }               
                ]
            };
        myChart.setOption(option);
          window.addEventListener('resize',function(){
                myChart.resize();
            })                
        return option ;         
    };
}])
