'use strict';

/**
 * Controller for Account
 **/
accountModule.controller('AccountCtrl', ['Account',  'AccountOwner', 'AccountType', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Account, AccountOwner, AccountType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'AccountOwner',  'AccountType',     // edition mode
    $scope.mode = null;
    
	// list of accounts
    $scope.accounts = [];
	// account to edit
    $scope.account = null;

	// referencies entities
	$scope.items = {};
    // accountOwners
	$scope.items.accountOwners = [];
    // accountTypes
	$scope.items.accountTypes = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		AccountOwner.getAllAsListItems().then(
				function(success) {
        	        $scope.items.accountOwners = success.data;
            	}, 
	            MessageHandler.manageError);
		AccountType.getAllAsListItems().then(
				function(success) {
        	        $scope.items.accountTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh accounts list
     */
    $scope.refreshAccountList = function() {
    	try {
			$scope.accounts = [];
        	Account.getAll().then(
				function(success) {
        	        $scope.accounts = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh account
     */
    $scope.refreshAccount = function(id) {
    	try {
        	$scope.account = null;
	        Account.get(id).then(
				function(success) {
        	        $scope.account = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the accounts list page
     */
    $scope.goToAccountList = function() {
        $scope.refreshAccountList();
        $location.path('/account');
    }
    /**
     * Go to the account edit page
     */
    $scope.goToAccount = function(id) {
        $scope.refreshAccount(id);
        $location.path('/account/'+id);
    }

    // Actions

    /**
     * Save account
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Account.create;
			} else {
				save = Account.update;
			}
			save($scope.account).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.account = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete account
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Account.delete(id).then(
				function(success) {
                	$scope.goToAccountList();
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
        $scope.account = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshAccount($routeParams.id);
    } else {
        // List page
        $scope.refreshAccountList();
    }
    
    
}]);
