'use strict';

/* Module for PaymentHistory */

var paymentHistoryModule = angular.module('paymentHistory.module', ['myApp']);

/**
 * Module for paymentHistory
 */
paymentHistoryModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/paymentHistory',    {templateUrl: 'partials/paymenthistory/paymenthistory_list.html', controller: 'PaymentHistoryCtrl'});
    $routeProvider.when('/paymentHistory/new', {templateUrl: 'partials/paymenthistory/paymenthistory_form.html', controller: 'PaymentHistoryCtrl'});
    $routeProvider.when('/paymentHistory/:idpaymentHistory', {templateUrl: 'partials/paymenthistory/paymenthistory_form.html', controller: 'PaymentHistoryCtrl'});
}]);
