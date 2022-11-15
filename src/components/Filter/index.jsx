import React from "react";

import { Box, SwipeableDrawer, Typography, Button } from "@mui/material";


import useStyles from "./style";



function Filter(props) {
    const { onFilter, onCleanFilters, ...rest } = props;

    const styles = useStyles()

    return (
        <SwipeableDrawer {...rest} anchor="right">
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="20px">
                <Typography variant="body1" style={{ fontSize: 32 }}>Filtros</Typography>
                <Button variant="text" color="secondary" onClick={onCleanFilters}>Limpar filtros</Button>
            </Box>
            <Box display="flex" flexDirection="column" gap="20px" padding="20px">
                {props.children}
            </Box>
            <Button className={styles.filterButton} onClick={onFilter}>Filtrar</Button>
        </SwipeableDrawer >
    )
}

export default Filter;