import React from "react";
import { Box } from "@mui/material";

function TabPanel({ view, tab, value }) {
    if (value === tab) return <Box width="100%" marginTop={5}>{view}</Box>
}

export default TabPanel