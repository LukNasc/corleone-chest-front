import React from 'react';
import { TextField, Typography, Button, MenuItem } from "@mui/material"

import {
    getNavigate
} from '../../../services/navigation';

function RegisterForm() {
    const { navigate, goBack } = getNavigate("auth");
    return (
        <>
            <Typography variant="h6" color="black">Cadastro</Typography>

            <TextField variant="outlined" label="Usuário" color="primary" />
            <TextField variant="outlined" label="Senha" type="password" />
            <TextField variant="outlined" label="Organização" select >
                <MenuItem>Complexo do Véio</MenuItem>
                <MenuItem>CDD</MenuItem>

            </TextField>
            <Button variant="contained" onClick={navigate.navigateToLoggedArea}>Solicitar Acesso</Button>
            <Button variant="outlined" onClick={goBack}>Voltar</Button></>
    )
}

export default RegisterForm;