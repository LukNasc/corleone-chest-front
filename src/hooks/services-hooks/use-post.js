import { useState } from "react";

import Api from "../../api/axios.config"

/**
 * 
 * @param {string} endpoint 
 * @param {import("axios").AxiosRequestConfig} options 
 * @param {any} body 
 * @returns {[(options)=>{}, {data:Object, isFetching: boolean, error: any}]}
 */
export function usePost(endpoint, body, options) {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    /**
     * 
     * @param {import("axios").AxiosRequestConfig} _options 
     * @param {any} _body 
     */
    const fetch = async ({ _body = body, _options = options }) => {
        try {
            const result = await Api.post(endpoint, _body, _options);
            setData(result.data);
        } catch (e) {
            setError(e);
        } finally {
            setIsFetching(false);
            return { data, error, isFetching };
        }
    }


    return [fetch, { data, isFetching, error }]
}