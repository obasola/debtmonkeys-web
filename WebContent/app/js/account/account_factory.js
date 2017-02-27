'use strict';

/**
 * Factory for Account
 */
accountModule.factory('Account', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage account
    var entityURL = restURL + '/account';
	
	/**
     * Validate account
     * @param account account
     * @throws validation exception
     */
	var validate = function (account) {
		var errors = [];
        if( account.id == null || account.id == '' ) {
			errors.push('account.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all accounts as list items
         * @return all accounts as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/account');
    	},

        /**
         * Get all accounts
         * @return all accounts
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get account
         * @param id id
         * @return account
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new account
         * @param account account
         * @return account saved
         */
		create: function(account) {
			validate(account)
			var url = entityURL;
			return $http.post(url, account);
    	},

        /**
         * Update account
         * @param account account
         * @return account saved
         */
    	update: function(account) {
			validate(account)
			var url = entityURL + '/' + account.id;
			return $http.put(url, account);
    	},

		/**
         * Delete account
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

