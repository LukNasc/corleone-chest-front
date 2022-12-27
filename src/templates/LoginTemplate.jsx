import React from "react";

import { Box, Typography } from "@mui/material"

function LoginTemplate({ children }) {
    return (
        <Box padding="20px" display="flex" flexDirection="column" alignItems="center" marginTop="100px">
            <img src="/img/logo_org.svg" alt="log" width={100} />
            <Typography variant="h2">Gerenciador de Organizações de <b>GTA RP</b></Typography>
            {children}
        </Box>
    )
}

export default LoginTemplate