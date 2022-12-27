import React, { useState } from "react";

import { Box, Tabs, Tab, Grid, Typography } from "@mui/material";

import useStyles from "./dashboard-styles"
import TabPanel from "../../components/TabPanel";

//Tabs
import Members, { MemeberDescription } from "./tab/Members";
import Request from "./tab/Request";
import Settings from "./tab/Settings";
import RequestDescription from "./tab/Request/description";

const tabs = ["Membros", "Solicitações", "Configurações Avançadas"]
const descriptions = {
    membros: <MemeberDescription />,
    solicitacoes: <RequestDescription />,
    configuracoes_avancadas: "Configure o bot no discord, aqui você consegue personalizar, escolher qual o canal de logs e mais."
}

function Dashboard() {
    const [tab, setTab] = useState(0);

    const setters = { setTab }

    const handleChange = (setter) => ({ target: { tabIndex } }) => setters[setter](tabIndex);

    const formatText = (text) => text.replace(" ", "_").replace(/ç|Ç/g, "c").replace(/õ|Õ/g, "o").toLowerCase();

    const styles = useStyles();
    return (
        <Grid container spacing={10}>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                <Typography variant="h3">{tabs[tab].toUpperCase()}</Typography>
                <br />
                {
                    typeof descriptions[formatText(tabs[tab])] === "string" ? (
                        <span dangerouslySetInnerHTML={{ __html: descriptions[formatText(tabs[tab])] }} />
                    ) : (
                        descriptions[formatText(tabs[tab])]
                    )
                }
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <Box className={styles.tabsSection}>
                    <Tabs value={tab} onChange={handleChange("setTab")}>
                        {tabs.map((item, index) => (
                            <Tab key={index} label={item} tabIndex={index} />
                        ))}
                    </Tabs>
                    <TabPanel view={<Members />} tab={0} value={tab} />
                    <TabPanel view={<Request />} tab={1} value={tab} />
                    <TabPanel view={<Settings />} tab={2} value={tab} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Dashboard