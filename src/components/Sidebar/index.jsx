import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Box, Button, Icon, Typography } from "@mui/material";

import useStyles from "./sidebar-styles"
import clsx from "clsx";



function Sidebar({ children, pages = [], dataSession = {} }) {
    const { logo, title, user, passaport } = dataSession;

    const location = useLocation();
    const navigate = useNavigate();
    const styles = useStyles();

    const redirect = ({ to }) => navigate(to);

    return (
        <Box className={styles.container}>
            <Box className={styles.menu}>
                <Box className={styles.header}>
                    <img src={`/img/${logo}`} alt="logo" className={styles.logo} />
                    <Typography variant="h3">{title.toUpperCase()}</Typography>
                    {/* <Typography variant="body1"><b>Bem vindo, </b>{user} || {passaport}</Typography> */}
                </Box>
                <Box>
                    {
                        pages.map((item) => (
                            <Button
                                key={item.to}
                                onClick={() => redirect(item)}
                                className={clsx({ [styles.menuItem]: true, selected: location.pathname === item.to })}
                                disabled={item.disable}
                                startIcon={<Icon style={{ fontSize: 24 }}>{item.icon}</Icon>}
                            >{item.title}</Button>
                        ))
                    }
                </Box>

            </Box>
            <Box className={styles.content}>
                {children}
            </Box>
        </Box >
    )
}

export default Sidebar;