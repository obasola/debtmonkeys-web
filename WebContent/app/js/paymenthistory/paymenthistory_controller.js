'use strict';

/**
 * Controller for PaymentHistory
 **/
paymentHistoryModule.controller('PaymentHistoryCtrl', ['PaymentHistory',  'Account', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(PaymentHistory, Account, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Account',     // edition mode
    $scope.mode = null;
    
	// list of paymentHistorys
    $scope.paymentHistorys = [];
	// paymentHistory to edit
    $scope.paymentHistory = null;

	// referencies entities
	$scope.items = {};
    // accounts
	$scope.items.accounts = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Account.getAllAsListItems().then(
				function(success) {
        	        $scope.items.accounts = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh paymentHistorys list
     */
    $scope.refreshPaymentHistoryList = function() {
    	try {
			$scope.paymentHistorys = [];
        	PaymentHistory.getAll().then(
				function(success) {
        	        $scope.paymentHistorys = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh paymentHistory
     */
    $scope.refreshPaymentHistory = function(idpaymentHistory) {
    	try {
        	$scope.paymentHistory = null;
	        PaymentHistory.get(idpaymentHistory).then(
				function(success) {
        	        $scope.paymentHistory = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the paymentHistorys list page
     */
    $scope.goToPaymentHistoryList = function() {
        $scope.refreshPaymentHistoryList();
        $location.path('/paymentHistory');
    }
    /**
     * Go to the paymentHistory edit page
     */
    $scope.goToPaymentHistory = function(idpaymentHistory) {
        $scope.refreshPaymentHistory(idpaymentHistory);
        $location.path('/paymentHistory/'+idpaymentHistory);
    }

    // Actions

    /**
     * Save paymentHistory
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = PaymentHistory.create;
			} else {
				save = PaymentHistory.update;
			}
			save($scope.paymentHistory).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.paymentHistory = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete paymentHistory
     */
    $scope.delete = function(idpaymentHistory) {
	    try {
			MessageHandler.cleanMessage();
    	    PaymentHistory.delete(idpaymentHistory).then(
				function(success) {
                	$scope.goToPaymentHistoryList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.paymentHistory = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.idpaymentHistory != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPaymentHistory($routeParams.idpaymentHistory);
    } else {
        // List page
        $scope.refreshPaymentHistoryList();
    }
    
    
}]);
