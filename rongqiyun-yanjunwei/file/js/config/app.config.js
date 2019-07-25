var app = angular.module("gearBox", ["ui.router","oc.lazyLoad"]);
var cookieIp = location.hostname;
app.config(["$provide","$compileProvider","$controllerProvider","$filterProvider",
	function($provide,$compileProvider,$controllerProvider,$filterProvider){
		app.controller = $controllerProvider.register;
		app.directive = $compileProvider.directive;
		app.filter = $filterProvider.register;
		app.factory = $provide.factory;
		app.service = $provide.service;
		app.constant = $provide.constant;
	}]);
app.constant('Modules_Config', [
    {
        name: 'treeControl',
        serie: true,
        files: []
    }
]);
app.config(["$ocLazyLoadProvider","Modules_Config",routeFn]);
function routeFn($ocLazyLoadProvider,Modules_Config){
	$ocLazyLoadProvider.config({
		debug:false,
		events:false,
		mofules:Modules_Config
	})
};
// 包含函数，如果参数str包含参数substr就返回true；不包含就返回false；
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}