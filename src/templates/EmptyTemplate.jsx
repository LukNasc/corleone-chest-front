import React from "react";

import { Box } from "@mui/material"

function EmptyTemplate({ children }) {
    return (
        <Box padding="20px">
            {children}
        </Box>)

}

export default EmptyTemplate