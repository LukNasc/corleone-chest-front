import React, { useState } from "react";

import { Box, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

function DateRangePicker({ value, onChange = () => { } }) {
    const [dateInit, setDateInit] = useState();
    const [dateEnd, setDateEnd] = useState();

    useEffect(() => {
        if (!dateInit && !dateEnd) return;
        if (!dateEnd) {
            onChange([dateInit])
            return;
        }

        const formatDateInit = new Date(dateInit);
        const formatDateEnd = new Date(dateEnd);

        const differenceDates =  Math.abs(formatDateInit.getTime() - formatDateEnd.getTime());
        let TotalDays = Math.ceil(differenceDates / (1000 * 3600 * 24));

        console.log(TotalDays)

        console.log(formatDateInit);
        console.log(formatDateEnd);
    }, [dateInit, dateEnd])


    const onChangeDateInit = ({ target: { value } }) => setDateInit(value)


    const onChangeDateEnd = ({ target: { value } }) => setDateEnd(value)


    return (
        <Box display="flex" alignItems="center" gap={2}>
            <TextField type="date" onChange={onChangeDateInit} />
            <Typography variant="body1">até</Typography>
            <TextField type="date" onChange={onChangeDateEnd} disabled={!dateInit} />
        </Box>
    )
}

export default DateRangePicker;