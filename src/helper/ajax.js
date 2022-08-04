import axios from "axios";

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

    async getRequestDetails(admin, accessToken, requestId) {
        try {
            const api = admin ? 'admin' : 'api';
            const response = await fetch(apiHost + `/${api}/v1/user-requests/` + requestId, {
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

    async getRechargeRequests(admin, accessToken, page, status) {

        try {
            const api = admin ? 'admin' : 'api';
            const path = `/${api}/v1/user-requests?page=${page}&status=${status}`
            console.log(path)
            const response = await fetch(apiHost + path, {
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
    },

    async rejectRechargeRequest(accessToken, requestId, comments) {
        
        try {
            const response = await fetch(apiHost + `/admin/v1/user-requests/${requestId}/reject` , {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    comments: comments
                })
            });
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return {
                'error': error
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
                type: 'image/' + imageName.split('.').pop(),
            });

            console.log(body)

            const response = await fetch(apiHost + `/admin/v1/user-requests/${requestId}/sent` , {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : 'Bearer ' + accessToken
                },
                body: body,
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