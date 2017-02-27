'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('accountType.module'));
  
  describe('AccountTypeCtrl', function(){
    var AccountTypeCtrl, AccountType,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// AccountType service
    	AccountType = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'accountType1'});
    			return deferred.promise;
    		}
    	};
		
				AccountTypeCtrl = $controller('AccountTypeCtrl', {
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
    	expect($scope.accountType).toBeNull();
    	expect($scope.accountTypes).toBe('accountType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshAccountTypeList', function() {
    	// given
    	AccountType.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountType2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccountTypeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.accountTypes).toBe('accountType2');
    });
    
    it('refreshAccountType', function() {
    	// given
    	AccountType.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'accountType'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccountType('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.accountType).toBe('accountType'+'1');
    });
    
	it('goToAccountTypeList', function() {
    	// given
    	spyOn($scope, "refreshAccountTypeList");
    	
    	// when
    	$scope.goToAccountTypeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccountTypeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/accountType');
    });
    
    it('goToAccountType', function() {
    	// given
    	spyOn($scope, "refreshAccountType");
    	var id = 1;
    	
    	// when
    	$scope.goToAccountType(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccountType).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/accountType'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.accountType = {id:'1', name:'accountType'};
    	
    	$scope.mode = 'create';
    	AccountType.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.accountType).toBe('accountTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.accountType = {id:'1', name:'accountType'};
    	
    	$scope.mode = 'update';
    	AccountType.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.accountType).toBe('accountTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	AccountType.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToAccountTypeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToAccountTypeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : accountType create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/accountType/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.accountType).toBeNull();
    	expect($scope.accountTypes).toBe('accountType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});