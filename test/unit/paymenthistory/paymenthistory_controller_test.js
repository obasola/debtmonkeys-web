'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('paymentHistory.module'));
  
  describe('PaymentHistoryCtrl', function(){
    var PaymentHistoryCtrl, PaymentHistory, Account, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// PaymentHistory service
    	PaymentHistory = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'paymentHistory1'});
    			return deferred.promise;
    		}
    	};
		
				Account = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				PaymentHistoryCtrl = $controller('PaymentHistoryCtrl', {
    		'PaymentHistory': PaymentHistory,
						'Account': Account,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.paymentHistory).toBeNull();
    	expect($scope.paymentHistorys).toBe('paymentHistory1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPaymentHistoryList', function() {
    	// given
    	PaymentHistory.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentHistory2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPaymentHistoryList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.paymentHistorys).toBe('paymentHistory2');
    });
    
    it('refreshPaymentHistory', function() {
    	// given
    	PaymentHistory.get = function(idpaymentHistory) {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentHistory'+idpaymentHistory});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPaymentHistory('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.paymentHistory).toBe('paymentHistory'+'1');
    });
    
	it('goToPaymentHistoryList', function() {
    	// given
    	spyOn($scope, "refreshPaymentHistoryList");
    	
    	// when
    	$scope.goToPaymentHistoryList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPaymentHistoryList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/paymentHistory');
    });
    
    it('goToPaymentHistory', function() {
    	// given
    	spyOn($scope, "refreshPaymentHistory");
    	var idpaymentHistory = 1;
    	
    	// when
    	$scope.goToPaymentHistory(idpaymentHistory);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPaymentHistory).toHaveBeenCalledWith(idpaymentHistory);
    	expect($location.path).toHaveBeenCalledWith('/paymentHistory'+'/'+idpaymentHistory);
    });
    
    it('save : create', function() {
    	// given
    	$scope.paymentHistory = {idpaymentHistory:'1', name:'paymentHistory'};
    	
    	$scope.mode = 'create';
    	PaymentHistory.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentHistorySaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.paymentHistory).toBe('paymentHistorySaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.paymentHistory = {idpaymentHistory:'1', name:'paymentHistory'};
    	
    	$scope.mode = 'update';
    	PaymentHistory.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentHistorySaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.paymentHistory).toBe('paymentHistorySaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	PaymentHistory.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPaymentHistoryList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPaymentHistoryList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : paymentHistory create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/paymentHistory/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.paymentHistory).toBeNull();
    	expect($scope.paymentHistorys).toBe('paymentHistory1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});