'use strict';

/**
 * Controller for AccountOwner
 **/
accountOwnerModule.controller('AccountOwnerCtrl', ['AccountOwner',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(AccountOwner, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of accountOwners
    $scope.accountOwners = [];
	// accountOwner to edit
    $scope.accountOwner = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh accountOwners list
     */
    $scope.refreshAccountOwnerList = function() {
    	try {
			$scope.accountOwners = [];
        	AccountOwner.getAll().then(
				function(success) {
        	        $scope.accountOwners = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh accountOwner
     */
    $scope.refreshAccountOwner = function(id) {
    	try {
        	$scope.accountOwner = null;
	        AccountOwner.get(id).then(
				function(success) {
        	        $scope.accountOwner = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the accountOwners list page
     */
    $scope.goToAccountOwnerList = function() {
        $scope.refreshAccountOwnerList();
        $location.path('/accountOwner');
    }
    /**
     * Go to the accountOwner edit page
     */
    $scope.goToAccountOwner = function(id) {
        $scope.refreshAccountOwner(id);
        $location.path('/accountOwner/'+id);
    }

    // Actions

    /**
     * Save accountOwner
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = AccountOwner.create;
			} else {
				save = AccountOwner.update;
			}
			save($scope.accountOwner).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.accountOwner = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete accountOwner
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    AccountOwner.delete(id).then(
				function(success) {
                	$scope.goToAccountOwnerList();
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
        $scope.accountOwner = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshAccountOwner($routeParams.id);
    } else {
        // List page
        $scope.refreshAccountOwnerList();
    }
    
    
}]);
