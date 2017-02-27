'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('accountOwner.module'));
  
  describe('AccountOwnerCtrl', function(){
    var AccountOwnerCtrl, AccountOwner,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// AccountOwner service
    	AccountOwner = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'accountOwner1'});
    			return deferred.promise;
    		}
    	};
		
				AccountOwnerCtrl = $controller('AccountOwnerCtrl', {
    		'AccountOwner': AccountOwner,
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
    	expect($scope.accountOwner).toBeNull();
    	expect($scope.accountOwners).toBe('accountOwner1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshAccountOwnerList', function() {
    	// given
    	AccountOwner.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountOwner2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccountOwnerList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.accountOwners).toBe('accountOwner2');
    });
    
    it('refreshAccountOwner', function() {
    	// given
    	AccountOwner.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'accountOwner'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccountOwner('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.accountOwner).toBe('accountOwner'+'1');
    });
    
	it('goToAccountOwnerList', function() {
    	// given
    	spyOn($scope, "refreshAccountOwnerList");
    	
    	// when
    	$scope.goToAccountOwnerList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccountOwnerList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/accountOwner');
    });
    
    it('goToAccountOwner', function() {
    	// given
    	spyOn($scope, "refreshAccountOwner");
    	var id = 1;
    	
    	// when
    	$scope.goToAccountOwner(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccountOwner).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/accountOwner'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.accountOwner = {id:'1', name:'accountOwner'};
    	
    	$scope.mode = 'create';
    	AccountOwner.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountOwnerSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.accountOwner).toBe('accountOwnerSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.accountOwner = {id:'1', name:'accountOwner'};
    	
    	$scope.mode = 'update';
    	AccountOwner.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountOwnerSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.accountOwner).toBe('accountOwnerSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	AccountOwner.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToAccountOwnerList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToAccountOwnerList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : accountOwner create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/accountOwner/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.accountOwner).toBeNull();
    	expect($scope.accountOwners).toBe('accountOwner1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});