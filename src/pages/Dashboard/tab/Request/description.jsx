import React from "react";

import { Box, Typography, Icon } from "@mui/material"

function RequestDescription() {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography variant="body1">
                Essa aba serve como uma área de notificações, aqui você consegue ver quem mandou uma solicitação para ter acesso ao sistema, podendo recusar ou não.
            </Typography>
            <br />
            <br />
            <img src="/img/svg/request.svg" alt="request" width={300} />
            <Box display="flex" justifyContent="space-between" width="100%" marginTop={10}>
                <Box display="flex" gap={2}>
                    <Icon style={{ color: "green" }}>
                        done
                    </Icon>
                    <Typography variant="body1"><b>Aceitar acesso ao sistema</b></Typography>
                </Box>
                <Box display="flex" gap={2}>
                    <Icon style={{ color: "red" }}>
                        close
                    </Icon>
                    <Typography variant="body1"><b>Negar acesso ao sistema</b></Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default RequestDescription;