'use strict';

/**
 * Factory for AccountType
 */
accountTypeModule.factory('AccountType', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage accountType
    var entityURL = restURL + '/accountType';
	
	/**
     * Validate accountType
     * @param accountType accountType
     * @throws validation exception
     */
	var validate = function (accountType) {
		var errors = [];
        if( accountType.id == null || accountType.id == '' ) {
			errors.push('accountType.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all accountTypes as list items
         * @return all accountTypes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/accountType');
    	},

        /**
         * Get all accountTypes
         * @return all accountTypes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get accountType
         * @param id id
         * @return accountType
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new accountType
         * @param accountType accountType
         * @return accountType saved
         */
		create: function(accountType) {
			validate(accountType)
			var url = entityURL;
			return $http.post(url, accountType);
    	},

        /**
         * Update accountType
         * @param accountType accountType
         * @return accountType saved
         */
    	update: function(accountType) {
			validate(accountType)
			var url = entityURL + '/' + accountType.id;
			return $http.put(url, accountType);
    	},

		/**
         * Delete accountType
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

