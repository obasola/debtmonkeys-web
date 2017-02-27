'use strict';

/* Module for AccountType */

var accountTypeModule = angular.module('accountType.module', ['myApp']);

/**
 * Module for accountType
 */
accountTypeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/accountType',    {templateUrl: 'partials/accounttype/accounttype_list.html', controller: 'AccountTypeCtrl'});
    $routeProvider.when('/accountType/new', {templateUrl: 'partials/accounttype/accounttype_form.html', controller: 'AccountTypeCtrl'});
    $routeProvider.when('/accountType/:id', {templateUrl: 'partials/accounttype/accounttype_form.html', controller: 'AccountTypeCtrl'});
}]);
