'use strict';

/**
 * Controller for AccountType
 **/
accountTypeModule.controller('AccountTypeCtrl', ['AccountType',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(AccountType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of accountTypes
    $scope.accountTypes = [];
	// accountType to edit
    $scope.accountType = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh accountTypes list
     */
    $scope.refreshAccountTypeList = function() {
    	try {
			$scope.accountTypes = [];
        	AccountType.getAll().then(
				function(success) {
        	        $scope.accountTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh accountType
     */
    $scope.refreshAccountType = function(id) {
    	try {
        	$scope.accountType = null;
	        AccountType.get(id).then(
				function(success) {
        	        $scope.accountType = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the accountTypes list page
     */
    $scope.goToAccountTypeList = function() {
        $scope.refreshAccountTypeList();
        $location.path('/accountType');
    }
    /**
     * Go to the accountType edit page
     */
    $scope.goToAccountType = function(id) {
        $scope.refreshAccountType(id);
        $location.path('/accountType/'+id);
    }

    // Actions

    /**
     * Save accountType
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = AccountType.create;
			} else {
				save = AccountType.update;
			}
			save($scope.accountType).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.accountType = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete accountType
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    AccountType.delete(id).then(
				function(success) {
                	$scope.goToAccountTypeList();
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
        $scope.accountType = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshAccountType($routeParams.id);
    } else {
        // List page
        $scope.refreshAccountTypeList();
    }
    
    
}]);
