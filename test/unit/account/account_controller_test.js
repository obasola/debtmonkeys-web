'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('account.module'));
  
  describe('AccountCtrl', function(){
    var AccountCtrl, Account, AccountOwner,  AccountType, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Account service
    	Account = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'account1'});
    			return deferred.promise;
    		}
    	};
		
				AccountOwner = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				AccountType = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				AccountCtrl = $controller('AccountCtrl', {
    		'Account': Account,
						'AccountOwner': AccountOwner,
						'AccountType': AccountType,
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
    	expect($scope.account).toBeNull();
    	expect($scope.accounts).toBe('account1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshAccountList', function() {
    	// given
    	Account.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'account2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccountList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.accounts).toBe('account2');
    });
    
    it('refreshAccount', function() {
    	// given
    	Account.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'account'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccount('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.account).toBe('account'+'1');
    });
    
	it('goToAccountList', function() {
    	// given
    	spyOn($scope, "refreshAccountList");
    	
    	// when
    	$scope.goToAccountList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccountList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/account');
    });
    
    it('goToAccount', function() {
    	// given
    	spyOn($scope, "refreshAccount");
    	var id = 1;
    	
    	// when
    	$scope.goToAccount(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccount).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/account'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.account = {id:'1', name:'account'};
    	
    	$scope.mode = 'create';
    	Account.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.account).toBe('accountSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.account = {id:'1', name:'account'};
    	
    	$scope.mode = 'update';
    	Account.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.account).toBe('accountSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Account.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToAccountList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToAccountList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : account create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/account/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.account).toBeNull();
    	expect($scope.accounts).toBe('account1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});