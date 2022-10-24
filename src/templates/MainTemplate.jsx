import React from 'react';

import { Box, Container } from "@mui/material"

function MainTemplate({ children }) {
    return (
        <Container maxWidth="xl">
            <Box width="100%" display="flex" justifyContent="center" marginTop={8}>
                <img src="/img/logo.png" alt="logo_corleone" />
            </Box>
            <br />
            <br />
            {children}
        </Container>
    )
}

export default MainTemplate