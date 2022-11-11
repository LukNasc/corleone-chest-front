import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Log from "../tabs/Log";
import Chest from "../tabs/Chest";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Home() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Log do Baú" {...a11yProps(0)} />
                <Tab label="Baú" {...a11yProps(1)} />
                <Tab label="Gráfico de rotações" disabled {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Log />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Chest />
            </TabPanel>
        </>
    )
}

export default Home;