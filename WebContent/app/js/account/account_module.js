'use strict';

/* Module for Account */

var accountModule = angular.module('account.module', ['myApp']);

/**
 * Module for account
 */
accountModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/account',    {templateUrl: 'partials/account/account_list.html', controller: 'AccountCtrl'});
    $routeProvider.when('/account/new', {templateUrl: 'partials/account/account_form.html', controller: 'AccountCtrl'});
    $routeProvider.when('/account/:id', {templateUrl: 'partials/account/account_form.html', controller: 'AccountCtrl'});
}]);
