import React from "react";

import { Box, Typography, Icon } from "@mui/material"

function TitlePage({ logo, title }) {
    return (
        <Box display="flex" gap="13px" marginBottom="94px">
            <Icon style={{ fontSize: 34 }}>{logo}</Icon>
            <Typography variant="h4">{title.toUpperCase()}</Typography>
        </Box>
    )
}

export default TitlePage