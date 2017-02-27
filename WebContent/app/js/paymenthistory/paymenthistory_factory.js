'use strict';

/**
 * Factory for PaymentHistory
 */
paymentHistoryModule.factory('PaymentHistory', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage paymentHistory
    var entityURL = restURL + '/paymentHistory';
	
	/**
     * Validate paymentHistory
     * @param paymentHistory paymentHistory
     * @throws validation exception
     */
	var validate = function (paymentHistory) {
		var errors = [];
        if( paymentHistory.idpaymentHistory == null || paymentHistory.idpaymentHistory == '' ) {
			errors.push('paymentHistory.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all paymentHistorys as list items
         * @return all paymentHistorys as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/paymentHistory');
    	},

        /**
         * Get all paymentHistorys
         * @return all paymentHistorys
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get paymentHistory
         * @param idpaymentHistory idpaymentHistory
         * @return paymentHistory
         */
    	get: function(idpaymentHistory) {
    	    var url = entityURL + '/' + idpaymentHistory;
        	return $http.get(url);
    	},

        /**
         * Create a new paymentHistory
         * @param paymentHistory paymentHistory
         * @return paymentHistory saved
         */
		create: function(paymentHistory) {
			validate(paymentHistory)
			var url = entityURL;
			return $http.post(url, paymentHistory);
    	},

        /**
         * Update paymentHistory
         * @param paymentHistory paymentHistory
         * @return paymentHistory saved
         */
    	update: function(paymentHistory) {
			validate(paymentHistory)
			var url = entityURL + '/' + paymentHistory.idpaymentHistory;
			return $http.put(url, paymentHistory);
    	},

		/**
         * Delete paymentHistory
         * @param idpaymentHistory idpaymentHistory
         */
    	delete: function(idpaymentHistory) {
        	var url = entityURL + '/' + idpaymentHistory;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

