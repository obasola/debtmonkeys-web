'use strict';

/* Module for AccountOwner */

var accountOwnerModule = angular.module('accountOwner.module', ['myApp']);

/**
 * Module for accountOwner
 */
accountOwnerModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/accountOwner',    {templateUrl: 'partials/accountowner/accountowner_list.html', controller: 'AccountOwnerCtrl'});
    $routeProvider.when('/accountOwner/new', {templateUrl: 'partials/accountowner/accountowner_form.html', controller: 'AccountOwnerCtrl'});
    $routeProvider.when('/accountOwner/:id', {templateUrl: 'partials/accountowner/accountowner_form.html', controller: 'AccountOwnerCtrl'});
}]);
