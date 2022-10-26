import React, { useState } from "react";

import { Box, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import DateUtils from "../../utils/DateUtils";

const dateSeparator = "-";

function DateRangePicker({ value, onChange = () => { } }) {
    const [dateInit, setDateInit] = useState("");
    const [dateEnd, setDateEnd] = useState("");

    useEffect(() => {
        // caso todas as datas sejam nulas
        if (!dateInit && !dateEnd) return;
        // casp apenas a primeira data seja selecionada
        if (!dateEnd) {
            const formatDateInit = new Date(...dateInit.split(dateSeparator));
            formatDateInit.setMonth(formatDateInit.getMonth() - 1);
            
            onChange([DateUtils.parseDateToString({ date: formatDateInit, split: "-" })])
            return;
        }


        //formatando a data de string para um tipo date
        const formatDateInit = new Date(...dateInit.split(dateSeparator));
        const formatDateEnd = new Date(...dateEnd.split(dateSeparator));

        //corrigindo o mês das datas
        formatDateEnd.setMonth(formatDateEnd.getMonth() - 1);
        formatDateInit.setMonth(formatDateInit.getMonth() - 1);

        //calculando a quantidade de dias que existe entre as datas selecionadas
        const differenceDates = Math.abs(formatDateInit.getTime() - formatDateEnd.getTime());
        let totalDays = Math.ceil(differenceDates / (1000 * 3600 * 24));

        //inserindo a primeira data no array de datas
        const selectedDates = [DateUtils.parseDateToString({ date: formatDateInit, split: "-" })];

        let index = 1;
        while (index !== totalDays) {
            const date = new Date(formatDateInit.getFullYear(), formatDateInit.getMonth(), formatDateInit.getDate() + index);
            selectedDates.push(DateUtils.parseDateToString({ date, split: "-" }));
            index++;
        }
        // inserindo ultima data no array
        selectedDates.push(DateUtils.parseDateToString({ date: formatDateEnd, split: "-" }))
        //chamando callback
        onChange(selectedDates)
    }, [dateInit, dateEnd])



    const onChangeDateInit = ({ target: { value } }) => setDateInit(value)


    const onChangeDateEnd = (e) => {
        const { target: { value } } = e;
        //formatando a data de string para um tipo date
        const formatDateInit = new Date(...dateInit.split(dateSeparator));
        const dateIniInMilliseconds = formatDateInit.setMonth(formatDateInit.getMonth() - 1);

        if (new Date(value).getTime() <= dateIniInMilliseconds) {
            e.preventDefault();
            alert('Selecione uma data posterior a data inicial');
        } else
            setDateEnd(value);
    }


    return (
        <Box display="flex" alignItems="center" gap={2}>
            <TextField type="date" value={dateInit} onChange={onChangeDateInit} />
            <Typography variant="body1">até</Typography>
            <TextField type="date" value={dateEnd} onChange={onChangeDateEnd} disabled={!dateInit} />
        </Box>
    )
}

export default DateRangePicker;