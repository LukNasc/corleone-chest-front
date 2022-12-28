import { useState } from "react";

import Api from "../../api/axios.config"

/**
 * 
 * @param {string} endpoint 
 * @param {import("axios").AxiosRequestConfig} options 
 * @returns {[(options)=>{}, {data:Object, isFetching: boolean, error: any}]}
 */
export function useLazyFetch(endpoint, options) {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    /**
     * 
     * @param {import("axios").AxiosRequestConfig} options 
     */
    const fetch = async (headers = options) => {
        try {
            const result = Api.get(endpoint, headers);
            setData(result);
        } catch (e) {
            setError(e);
        } finally {
            setIsFetching(false);
            return { data, error, isFetching };
        }
    }


    return [fetch, { data, isFetching, error }]
}