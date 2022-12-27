import React from "react";

import { Box } from "@mui/material"

import { Navigate, useLocation } from "react-router-dom";

import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";

import useStyles from "./auth-styles";

const views = {
    login: <LoginForm />,
    register: <RegisterForm />
}

function Auth() {
    const styles = useStyles();

    const { search } = useLocation();

    return (
        <Box className={styles.container}>
            <Box className={styles.authCard}>
                {views[search.split("=")[1]] || <Navigate to="/404" />}
            </Box>
        </Box >
    )
}

export default Auth