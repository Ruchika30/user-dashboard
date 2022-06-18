
import axios from 'axios';
import { API_ROUTES } from '../network/apiRoutes'
import { getToken } from '../network/storage'



const NeedAuthToken = [
    API_ROUTES.createOrder
]

const getAuthToken = (url) => {
    if (NeedAuthToken.includes(url)) {
        return true
    }

    return false
}

// eslint-disable-next-line no-unused-vars
export async function api({ type, requestURL, data, pageNo, pagesize }) {
    const headers = {
        Accept: '*/*',
        'Content-Type': 'application/json',
        pageno: pageNo || null,
        pagesize: pagesize || 20,
        authorization: getAuthToken(requestURL) && `Bearer ${getToken()}`
    };

    if (type === 'GET') {
        return axios({
            method: type,
            baseURL: process.env.REACT_APP_BE_URL,
            url: requestURL,
            responseType: 'json',
            headers
        })
            .then(response => response.data)
            .catch(async error => {
                throw Error(error)
            });
    }

    if (type === 'DELETE') {
        return axios({
            method: type,
            baseURL: process.env.REACT_APP_BE_URL,
            url: requestURL,
            responseType: 'json',
            headers
        })
            .then(response => true)
            .catch(async error => {
                throw Error(error)
            });
    }

    return axios({
        method: type,
        baseURL: process.env.REACT_APP_BE_URL,
        url: requestURL,
        data,
        responseType: 'json',
        headers
    })
        .then(response => response.data)
        .catch(async error => {
            const { data } = error.response
            throw Error(data.error)
            // return data.error
        });
}

