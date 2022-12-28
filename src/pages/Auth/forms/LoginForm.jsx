import React, { useState } from "react";
import { TextField, Typography, Button } from "@mui/material"

import { getNavigate } from "../../../services/navigation"
import { Validations } from "../../../utils/Validations"

import Loading from "../../../components/Loading";
import MembersController from "../../../controllers/Members";


function LoginForm() {
    const [passaportInput, setPassaportInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [passaportError, setPassaportError] = useState(false);
    const [passError, setPassError] = useState(false);
    const { navigate } = getNavigate("auth");

    const setters = { setPassaportError, setPassError, setPassaportInput, setPassInput }
    const handleOnChange = (setter, validation) => ({ target: { value } }) => {
        setters[setter](validation ? validation(value) : value)
        for (const set in setters) {
            if (set === "setPassError" || set === "setPassaportError") setters[set](false)
        }
    }

    const validateInputsValues = () => {
        if (!passaportInput || passaportInput === "") {
            setPassaportError(true)
            return false;
        }
        if (!passInput || passInput === "") {
            setPassError(true)
            return false;
        }
        return true;
    }
    const callLoginService = async () => {
        Loading.show();
        try {
            const isValid = validateInputsValues();
            if (isValid) {
                const data = await MembersController.login({ passaport: passaportInput, password: passInput })
                document.cookie = `JWT_TOKEN=${data.token}`
                navigate.navigateToLoggedArea();
            }
        } catch (e) {
            console.error(e)
        } finally {
            Loading.dismiss()
        }
    }

    return <>
        <Typography variant="h6" color="black">Login</Typography>
        <TextField variant="outlined" label="Passaporte" color="primary" required value={passaportInput} onChange={handleOnChange("setPassaportInput", Validations.onlyNumbers)} error={passaportError} helperText={passaportError && "Campo obrigatório"} />
        <TextField variant="outlined" label="Senha" type="password" required value={passInput} onChange={handleOnChange("setPassInput")} error={passError} helperText={passError && "Campo obrigatório"} />
        <Button variant="contained" onClick={callLoginService}>Entrar</Button>
        <Button variant="outlined" onClick={navigate.navigateToRegister}>Solicitar Acesso</Button></>
}

export default LoginForm