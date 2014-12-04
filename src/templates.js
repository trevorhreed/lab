angular.module('lab').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('login',
    "<div><p>Please login using your Google Account</p><div>Google</div></div>"
  );


  $templateCache.put('view',
    "<button class=\"btn btn-default\" ng-click=\"isCollapsed = !isCollapsed\">Toggle collapse</button><hr><div collapse=isCollapsed><div class=\"well well-lg\">Some content</div></div>"
  );

}]);
