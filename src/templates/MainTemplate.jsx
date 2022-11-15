import React from 'react';

import { Alert } from '@mui/material';

import Sidebar from "../components/Sidebar"

const pages = [
    {
        title: "Histórico de logs",
        to: "/",
        icon: "history",
        disable: false
    },
    {
        title: "Items do baú",
        to: "/chest",
        icon: "view_in_ar_new",
        disable: false
    },
    {
        title: "Controle de rotações",
        to: "/rotations",
        icon: "show_chart",
        disable: true
    }
]

function MainTemplate({ children }) {
    return (
        <Sidebar
            pages={pages}
            dataSession={{
                logo: "skull.png",
                title: "Corleone",
                user: "Calan",
                passaport: 1045
            }}>
            <Alert severity="info">Essa versão do sistema ainda está sendo desenvolvida, pode aconter alguns bugs e algumas funcionalidades ainda não estão presentes </Alert>
            <br />
            {children}
        </Sidebar>

    )
}

export default MainTemplate