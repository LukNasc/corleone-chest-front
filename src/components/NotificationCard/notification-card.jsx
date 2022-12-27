import React from "react";

import { Box, IconButton, Typography, Icon } from "@mui/material"

import useStyles from "./notification-card-style";

function NotificationCard({ title, description }) {
    const styles = useStyles();
    return (
        <Box className={styles.container}>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={1} width="100%">
                <Typography variant="h5" >{title || "Nova Notificação"}</Typography>
                <Box>
                    <IconButton size="small">
                        <Icon color="success">
                            done
                        </Icon>
                    </IconButton>
                    <IconButton size="small">
                        <Icon color="error">
                            close
                        </Icon>
                    </IconButton>
                </Box>
            </Box>
            {typeof description === "string" ? <Typography variant="body1" >{description}</Typography> : description}
        </Box>
    )
}

export default NotificationCard;