const apiHost = 'https://localhost'

export default {

    async login(phoneNumber, pin) {
        try {
            const response = await fetch(apiHost + '/api/v1/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {'mobile_no': phoneNumber, 'password': pin}
                )
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async createRechargeRequest(accessToken, type, reference_number, amount) {
        try {
            const response = await fetch(apiHost + '/api/v1/user-requests', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify(
                    {reference_number: reference_number, type: type, amount: amount}
                )
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async getRequestDetails(admin, accessToken, requestId) {
        try {
            const api = admin ? 'admin' : 'api';
            const response = await fetch(apiHost + `/${api}/v1/user-requests/` + requestId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async getRechargeRequests(admin, accessToken, page, status) {

        try {
            const api = admin ? 'admin' : 'api';
            const path = `/${api}/v1/user-requests?page=${page}&status=${status}`
            console.log(path)
            const response = await fetch(apiHost + path, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async getTransactions(accessToken, page) {

        try {
            const response = await fetch(apiHost + `/api/v1/transactions?page=${page}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async getMe(accessToken) {

        try {
            const response = await fetch(apiHost + '/api/v1/me', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            const responseJson = await response.json();
            console.log(responseJson)
            if (response.ok) {
                return responseJson;
            }
            return { error: 'Response eeror'}
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async cancelRechargeRequest(accessToken, requestId) {

        try {
            const response = await fetch(apiHost + `/api/v1/user-requests/${requestId}/cancel`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async rejectRechargeRequest(accessToken, requestId, comments) {

        try {
            const response = await fetch(apiHost + `/admin/v1/user-requests/${requestId}/reject`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify(
                    {comments: comments}
                )
            });
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async completeRechargeRequest(accessToken, requestId, image) {

        try {

            let body = new FormData();
            let imageName = image.split("/").pop();

            body.append('media', {
                uri: image,
                name: image.split("/").pop(),
                type: 'image/' + imageName.split('.').pop()
            });

            console.log(body)

            const response = await fetch(apiHost + `/admin/v1/user-requests/${requestId}/sent`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: body
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async getTopupRequests(admin, accessToken, page) {

        try {
            const api = admin ? 'admin' : 'api';
            const path = `/${api}/v1/topup-requests?page=${page}`
            console.log(path)
            const response = await fetch(apiHost + path, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error, Try again',
            }
        }
    },

    async createTopupRequest(admin, accessToken, amount) {

        try {
            const api = admin ? 'admin' : 'api';
            const path = `/${api}/v1/topup-requests`
            console.log(apiHost + path)
            const response = await fetch(apiHost + path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body : JSON.stringify({
                    amount: amount
                })
            });

            const responseJson = await response.json();

            if (response.ok) {
                return responseJson;
            }
            
            return {
                error: responseJson.message ?? 'Server error, Try again',
            }
        } catch (error) {
            console.log(error);
            return {
                error: error.message ?? 'Server error, Try again',
            }
        }
    },
};
