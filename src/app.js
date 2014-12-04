'use strict';
var app = angular.module('lab', ['ui.router','ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('');
  $stateProvider
    .state('home', {
      url: '',
      templateUrl: 'view',
      controller: 'MainController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login',
      controller: 'LoginController'
    })
  ;
}])
/*
.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push(['$q', function($q){
    return {
      'request': function(config){
        if(config.url[0] == '/'){
          if(!sessionStorage['access_token']){
            signIn();
          }
          config.headers = config.headers||{};
          config.headers.Authorization = 'Bearer '+ sessionStorage['access_token'];
        }
        return config || $q.when(config);
      },
      'responseError': function(rejection){
        if(rejection.status == 401){
          signIn();
        }
        if(rejection.status == 403){
          location.href='/access';
        }
        return $q.reject(rejection);
      }
    }
  }]);
}])
*/
;

app.controller('MainController', function($scope){});
app.controller('LoginController', function($scope){

});