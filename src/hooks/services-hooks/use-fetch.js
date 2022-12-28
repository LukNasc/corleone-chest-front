import { useState, useEffect } from "react";

import Api from "../../api/axios.config"

/**
 * 
 * @param {string} endpoint 
 * @param {import("axios").AxiosRequestConfig} options 
 * @returns {{data: Object, isFetching: boolean, error:any}}
 */
export function useFetch(endpoint, options) {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Api.get(endpoint, options)
            .then(result => setData(result))
            .catch(error => setError(error))
            .finally(() => setIsFetching(false));
    });

    return { data, isFetching, error }
}