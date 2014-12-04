/* Source: ../src/app.js */
'use strict';
var app = angular.module('lab', [
    'ui.router',
    'ui.bootstrap'
  ]).config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('');
      $stateProvider.state('home', {
        url: '',
        templateUrl: 'view',
        controller: 'MainController'
      }).state('login', {
        url: '/login',
        templateUrl: 'login',
        controller: 'LoginController'
      });
      ;
    }
  ]);
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
app.controller('MainController', function ($scope) {
});
app.controller('LoginController', function ($scope) {
});
/* Source: ../src/templates.js */
angular.module('lab').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('login', '<div><p>Please login using your Google Account</p><div>Google</div></div>');
    $templateCache.put('view', '<button class="btn btn-default" ng-click="isCollapsed = !isCollapsed">Toggle collapse</button><hr><div collapse=isCollapsed><div class="well well-lg">Some content</div></div>');
  }
]);