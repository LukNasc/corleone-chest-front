import React from 'react';

import { Alert, IconButton, Icon } from '@mui/material';

import Sidebar from "../components/Sidebar"
import TitlePage from '../components/TitlePage';
import { useState } from 'react';

const pages = [
    {
        title: "Dashboard",
        to: "/dashboard",
        icon: "dashboard",
        admin: true,
        disable: false
    },
    {
        title: "Histórico de logs",
        to: "/logs",
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

function ActionCloseAlert({ color, onClick }) {
    return (
        <IconButton color={color} size='small' onClick={onClick} >
            <Icon>
                close
            </Icon>
        </IconButton>
    )
}


function SidebarTemplate({ children, titlePage, logoPage }) {

    const [alerSystemIsVisible, setAlertSystemIsVisible] = useState(true);
    const [alertAdminIsVisible, setAlertAdminIsVisible] = useState(true);

    const toggleSystemAlert = () => setAlertSystemIsVisible(state => !state);
    const toggleAdminAlert = () => setAlertAdminIsVisible(state => !state);

    return (
        <Sidebar
            pages={pages}
            dataSession={{
                logo: "logo.png",
                title: "",
                user: "Calan",
                passaport: 1045
            }}>
            {
                alerSystemIsVisible && (
                    <Alert severity="info" title='Mensagem do Sistema' action={<ActionCloseAlert color={"primary"} onClick={toggleSystemAlert} />}>
                        Essa versão do sistema ainda está sendo desenvolvida, pode aconter alguns bugs e algumas funcionalidades ainda não estão presentes
                    </Alert>
                )
            }
            {
                alertAdminIsVisible && (
                    <span>
                        <br />
                        <Alert severity="info" title='Mensagem do Administrador' action={<ActionCloseAlert color={"primary"} onClick={toggleAdminAlert} />}>
                            Essa versão do sistema ainda está sendo desenvolvida, pode aconter alguns bugs e algumas funcionalidades ainda não estão presentes
                        </Alert>
                    </span>
                )
            }
            <br />
            <TitlePage title={titlePage} logo={logoPage} />
            <br />
            {children}
        </Sidebar>

    )
}

export default SidebarTemplate