'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('paymentHistory.module'));
  
  describe('PaymentHistory', function(){
	var $httpBackend, PaymentHistory, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	PaymentHistory = $injector.get('PaymentHistory');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/paymentHistory').respond("test");
    	PaymentHistory.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/paymentHistory').respond("test");
    	PaymentHistory.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/paymentHistory/1').respond("test");
    	PaymentHistory.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		PaymentHistory.create({idpaymentHistory:null,name:'paymentHistory'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('paymentHistory.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/paymentHistory').respond("test");
    	PaymentHistory.create({idpaymentHistory:'1',name:'paymentHistory'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		PaymentHistory.update({idpaymentHistory:null,name:'paymentHistory'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('paymentHistory.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/paymentHistory/1').respond("test");
    	PaymentHistory.update({idpaymentHistory:'1',name:'paymentHistory'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/paymentHistory/1').respond("test");
    	PaymentHistory.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});