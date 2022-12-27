import React, { useState } from "react";
import { TextField, Typography, Button } from "@mui/material"

import { getNavigate } from "../../../services/navigation"

function LoginForm() {
    const [userInput, setUserInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [userError, setUserError] = useState(false);
    const [passError, setPassError] = useState(false);
    const { navigate } = getNavigate("auth");

    const setters = { setUserError, setPassError, setUserInput, setPassInput }
    const handleOnChange = (setter) => ({ target: { value } }) => {
        setters[setter](value)
        for (const set in setters) {
            if (set === "setPassError" || set === "setUserError") setters[set](false)
        }
    }

    const validateInputsValues = () => {
        if (!userInput || userInput === "") setUserError(true)
        if (!passInput || passInput === "") setPassError(true)
    }
    const callLoginService = async () => {
        try {
            const isValid = validateInputsValues();
            if (isValid) {
                navigate.navigateToLoggedArea()
            }
        } catch (e) {
            console.error(e)
        }
    }

    return <>
        <Typography variant="h6" color="black">Login</Typography>
        <TextField variant="outlined" label="Usuário" color="primary" required value={userInput} onChange={handleOnChange("setUserInput")} error={userError} helperText={userError && "Campo obrigatório"} />
        <TextField variant="outlined" label="Senha" type="password" required value={passInput} onChange={handleOnChange("setPassInput")} error={passError} helperText={passError && "Campo obrigatório"} />
        <Button variant="contained" onClick={callLoginService}>Entrar</Button>
        <Button variant="outlined" onClick={navigate.navigateToRegister}>Solicitar Acesso</Button></>
}

export default LoginForm