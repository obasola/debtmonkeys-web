'use strict';

/**
 * Factory for AccountOwner
 */
accountOwnerModule.factory('AccountOwner', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage accountOwner
    var entityURL = restURL + '/accountOwner';
	
	/**
     * Validate accountOwner
     * @param accountOwner accountOwner
     * @throws validation exception
     */
	var validate = function (accountOwner) {
		var errors = [];
        if( accountOwner.id == null || accountOwner.id == '' ) {
			errors.push('accountOwner.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all accountOwners as list items
         * @return all accountOwners as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/accountOwner');
    	},

        /**
         * Get all accountOwners
         * @return all accountOwners
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get accountOwner
         * @param id id
         * @return accountOwner
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new accountOwner
         * @param accountOwner accountOwner
         * @return accountOwner saved
         */
		create: function(accountOwner) {
			validate(accountOwner)
			var url = entityURL;
			return $http.post(url, accountOwner);
    	},

        /**
         * Update accountOwner
         * @param accountOwner accountOwner
         * @return accountOwner saved
         */
    	update: function(accountOwner) {
			validate(accountOwner)
			var url = entityURL + '/' + accountOwner.id;
			return $http.put(url, accountOwner);
    	},

		/**
         * Delete accountOwner
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

