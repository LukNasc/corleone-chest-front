import React, { useState } from "react";

import { TextField,Box,Select, FilledInput, MenuItem, Icon } from "@mui/material"

function Settings() {
    const [channels, setChannels] = useState([])
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Select
                input={<FilledInput disableUnderline startAdornment={<Icon>sync</Icon>} />}
                fullWidth
                value={-1}
            >
                <MenuItem value={-1} >
                    Selecione o canal onde recebe os logs do baú
                </MenuItem>
                {channels.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
            <TextField fullWidth variant="filled" placeholder="ID do bot que envia os logs" InputProps={{ disableUnderline: true }} />
        </Box>
    )
}

export default Settings;