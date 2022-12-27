import React from "react";
import { Box, Button, Typography } from "@mui/material";

import useStyles from "./landingpage-styles"
import { getNavigate } from "../../services/navigation";

function LandingPage() {

    const { navigate } = getNavigate("auth");

    const styles = useStyles();
    return (
        <Box className={styles.container}>
            <Box className={styles.containerHeader}>
                <Box className={styles.content}>
                    <img src="/img/logo_org.svg" className={styles.logo} alt="logo" />
                    <Box className={styles.contentTitle}>
                        <Typography variant="h2">Gerencie sua organização de <b>GTA RP</b> de uma maneira mais fácil</Typography>
                    </Box>
                    <Box className={styles.groupButtons}>
                        <a href="https://discord.com/api/oauth2/authorize?client_id=1031399327563792444&permissions=2147560448&scope=bot%20applications.commands" target="_blank" rel="noreferrer">
                            <Button variant="contained" color="primary">
                                Adicionar ao discord
                            </Button>
                        </a>

                        <Button variant="outlined" onClick={navigate.navigateToLogin}>
                            Ir para o painel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default LandingPage;