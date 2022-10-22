import React from "react";
import ReactDOM from 'react-dom/client';

import { Box, Typography } from "@mui/material"

const ID_CONTAINER = "loading-container";

function Component() {
    return (
        <Box zIndex={10} backgroundColor="rgba(0,0,0,0.9)" position="absolute" display="flex" flexDirection="column" gap="10px" justifyContent="center" alignItems="center" width="100%" height="100vh" left={0} top={0}>
            <img src="/img/skull.png" alt="loading_skull" />
            <Typography variant="body1">Carregando...</Typography>
        </Box>)
}


const Loading = {
    show: () => {
        if (document.querySelector(`#${ID_CONTAINER}`) !== null) return;
        const loading = document.createElement("div");
        loading.setAttribute("id", ID_CONTAINER)
        document.body.appendChild(loading);
        const root = ReactDOM.createRoot(document.querySelector(`#${ID_CONTAINER}`));
        root.render(<Component />)
    },
    dismiss: () => {
        if (document.querySelector(`#${ID_CONTAINER}`) === null) return;
        document.body.removeChild(document.querySelector(`#${ID_CONTAINER}`))
    }
}

export default Loading;