app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
   	$urlRouterProvider.otherwise("/overView");
    $stateProvider
    .state("overView",{
        url:"/overView",
        templateUrl:"secondary/overView.html",
        controller:"overViewCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([
                    "js/controllers/overView.js",
                    ]);
            }]
        }
    })
    .state("project",{
        url:"/project",
        templateUrl:"secondary/project.html",
        controller:"projectCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/project.css"
                },"js/controllers/project.js",
                ]);
            }]
        }
    })
    .state("projectDetail",{
        url:"/projectDetail",
        templateUrl:"secondary/projectDetail.html",
        controller:"projectDetailCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/projectDetail.css"
                },"js/controllers/projectDetail.js",
                ]);
            }]
        }
    })    
    .state("member",{
        url:"/member",
        templateUrl:"secondary/member.html",
        controller:"memberCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/member.css"

                },"js/controllers/member.js",
                ]);
            }]
        }
    })
    .state("role",{
        url:"/role",
        templateUrl:"secondary/role.html",
        controller:"roleCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/role.css"                    
                    },"js/controllers/role.js",
                    ]);
            }]
        }
    })
    .state("repositories",{
        url:"/repositories",
        templateUrl:"secondary/repositories.html",
        controller:"repositoriesCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/repositories.css"                    
                    },"js/controllers/repositories.js",
                    ]);
            }]
        }
    })
    .state("deployDetail",{
        url:"/deployDetail",
        templateUrl:"secondary/deployDetail.html",
        controller:"deployDetailCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/deployDetail.css"                    
                    },"js/controllers/deployDetail.js",
                    ]);
            }]
        }
    })  
    .state("hostComputer",{
        url:"/hostComputer",
        templateUrl:"secondary/hostComputer.html",
        controller:"hostComputerCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/hostComputer.css"                    
                    },"js/controllers/hostComputer.js",
                    ]);
            }]
        }
    })      
    .state("subGroup",{
        url:"/subGroup",
        templateUrl:"secondary/subGroup.html",
        controller:"subGroupCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/subGroup.css"                    
                    },"js/controllers/subGroup.js",
                    ]);
            }]
        }
    })     
    .state("hostDetails",{
        url:"/hostDetails",
        templateUrl:"secondary/hostDetails.html",
        controller:"hostDetailsCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/hostDetails.css"                    
                    },"js/controllers/hostDetails.js",
                    ]);
            }]
        }
    })
    .state("continuousIntegration",{
        url:"/continuousIntegration",
        templateUrl:"secondary/continuousIntegration.html",
        controller:"continuousIntegrationCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/continuousIntegration.css"                    
                    },"js/controllers/continuousIntegration.js",
                    ]);
            }]
        }
    })   
    .state("platformLog",{
        url:"/platformLog",
        templateUrl:"secondary/platformLog.html",
        controller:"platformLogCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/platformLog.css"                    
                    },"js/controllers/platformLog.js",
                    ]);
            }]
        }
    })   
    .state("personalCenter",{
        url:"/personalCenter",
        templateUrl:"secondary/personalCenter.html",
        controller:"personalCenterCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/personalCenter.css"                    
                    },"js/controllers/personalCenter.js",
                    ]);
            }]
        }
    })           
    .state("sourceCode",{
        url:"/sourceCode",
        templateUrl:"secondary/sourceCode.html",
        controller:"sourceCodeCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/sourceCode.css"                    
                    },"js/controllers/sourceCode.js",
                    ]);
            }]
        }
    })     
    .state("logRecord",{
        url:"/logRecord",
        templateUrl:"secondary/logRecord.html",
        controller:"logRecordCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/logRecord.css"                    
                    },"js/controllers/logRecord.js",
                    ]);
            }]
        }
    })     
    .state("useApply",{
        url:"/useApply",
        templateUrl:"secondary/useApply.html",
        controller:"useApplyCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/useApply.css"                    
                    },
                    "js/controllers/useApply.js",
                    "js/lib/term.js",
                    "js/lib/ws.js",
                    "js/lib/jquery.form.js",
                    "js/lib/main.js",
                    ]);
            }]
        }
    })     
    .state("appDetail",{
        url:"/appDetail",
        templateUrl:"secondary/appDetail.html",
        controller:"appDetailCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/appDetail.css"                    
                    },"js/controllers/appDetail.js",
                    ]);
            }]
        }
    })     
    .state("storageVolume",{
        url:"/storageVolume",
        templateUrl:"secondary/storageVolume.html",
        controller:"storageVolumeCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/rangeslider.css"   
                    },{
                    type: "css",
                    path: "css/secondary/storageVolume.css"                    
                    },"js/lib/rangeslider.min.js","js/controllers/storageVolume.js",
                    ]);
            }]
        }
    })     
    .state("netWork",{
        url:"/netWork",
        templateUrl:"secondary/netWork.html",
        controller:"netWorkCtrl",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load([{
                    type: "css",
                    path: "css/secondary/netWork.css"                    
                    },"js/controllers/netWork.js",
                    ]);
            }]
        }
    })                      
}]);