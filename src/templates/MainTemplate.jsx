import React from 'react';
import { Router } from 'react-router-dom';

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
            {children}
        </Sidebar>

    )
}

export default MainTemplate