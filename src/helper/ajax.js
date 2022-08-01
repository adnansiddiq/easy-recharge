const apiHost = 'https://dev.skyimf.com'

export default {
    async login(phoneNumber, pin) {
        try {
            const response = await fetch(apiHost + '/api/v1/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'mobile_no' : phoneNumber,
                    'password' : pin 
                })
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },

    async createRechargeRequest(accessToken, type, reference_number, amount) {
        try {
            const response = await fetch(apiHost + '/api/v1/user-requests', {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    reference_number: reference_number,
                    type: type,
                    amount : amount,
                }),
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    },

    async getRequestDetails(accessToken, requestId) {
        try {
            const response = await fetch(apiHost + '/api/v1/user-requests/' + requestId, {
                method : 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    },

    async getRechargeRequests(accessToken, page) {

        try {
            const response = await fetch(apiHost + `/api/v1/user-requests?page=${page}`, {
                method : 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                },
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    },

    async getTransactions(accessToken, page) {

        try {
            const response = await fetch(apiHost + `/api/v1/transactions?page=${page}`, {
                method : 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                },
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    },

    async getMe(accessToken) {

        try {
            const response = await fetch(apiHost + '/api/v1/me', {
                method : 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                },
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    },

    async cancelRechargeRequest(accessToken, requestId) {
        
        try {
            const response = await fetch(apiHost + `/api/v1/user-requests/${requestId}/cancel` , {
                method : 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }
            });
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                'error': error
            }
        }
    }
};