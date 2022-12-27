/* eslint-disable react-hooks/rules-of-hooks */

import { auth } from "./routes/auth"
import { sidebar } from "./routes/sidebar"

import { useNavigate } from "react-router-dom"

function goBack(navigate) {
    return () => navigate(-1)
}

const navigators = (navigate) => ({
    auth: auth(navigate),
    sidebar: sidebar(navigate)
})

export function getNavigate(name) {
    const navigate = useNavigate();
    return { navigate: navigators(navigate)[name], goBack: goBack(navigate) }
}