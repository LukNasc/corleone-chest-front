import React from "react";

import { Box, Typography } from "@mui/material"

function EmptyState({ width = "100%", height = 450, title = "Nenhum dado foi encontrado", description = "Tente realizar novas operações" }) {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width={width} height={height}>
            <img src="/img/svg/empty.svg" alt="empty state" width={300} />
            <br />
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{description}</Typography>

        </Box>
    )
}

export default EmptyState;