import React from "react";

import { Box, Typography } from "@mui/material";
import useStyles from "./style";
import Chart from "react-google-charts";


function ItemList({ name, passaport }) {

    const data = [
        [
            {
                type: "date",
                id: "Date",
            },
            {
                type: "number",
                id: "Won/Loss",
            },
        ],
        [new Date(2022, 9, 1), 2],
        [new Date(2022, 9, 2), 1],
        [new Date(2022, 9, 3), 4],
        [new Date(2022, 9, 9), 5],
        [new Date(2022, 9, 13), 2],
        [new Date(2022, 9, 14), 1],
        [new Date(2022, 9, 15), 3],
        [new Date(2022, 9, 6), 1],
    ];


    const options = {
        title: "Rotações",
        colorAxis: { minValue: 0, colors: ['#FECAD1', '#A70B21'] },
        calendar: {
            daysOfWeek:"DSTQQSS"
        }
    };

    const styles = useStyles();
    return (
        <Box className={styles.content}>
            <Box className={styles.profile}>
                <img src="/img/skull.png" alt="corleone skull" className={styles.img_profile} />
                <Box>
                    <Typography variant="h5"><b>{name} || {passaport}</b></Typography>
                    <br />
                    <Typography variant="body1">Quant. rotação de hoje: 25</Typography>
                    <Typography variant="body1">Atividade no baú:  10</Typography>
                </Box>
            </Box>
            <Box className={styles.timeline} >
                <Chart
                    chartType="Calendar"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
            </Box>
        </Box >
    )
}

export default ItemList;