'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('accountOwner.module'));
  
  describe('AccountOwner', function(){
	var $httpBackend, AccountOwner, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	AccountOwner = $injector.get('AccountOwner');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/accountOwner').respond("test");
    	AccountOwner.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/accountOwner').respond("test");
    	AccountOwner.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/accountOwner/1').respond("test");
    	AccountOwner.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		AccountOwner.create({id:null,name:'accountOwner'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('accountOwner.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/accountOwner').respond("test");
    	AccountOwner.create({id:'1',name:'accountOwner'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		AccountOwner.update({id:null,name:'accountOwner'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('accountOwner.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/accountOwner/1').respond("test");
    	AccountOwner.update({id:'1',name:'accountOwner'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/accountOwner/1').respond("test");
    	AccountOwner.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});