import React, { useEffect, useState } from "react";

import { Table, TableCell, TableRow, TableHead, TableBody, TextField, Box, MenuItem, Typography, Button, Avatar, TablePagination } from "@mui/material";
import { ArrowDownward, ArrowUpward, ReplayOutlined } from "@mui/icons-material";

import LogsController from "../../controllers/Logs";
import MembersController from "../../controllers/Members";
import DateUtils from "../../utils/DateUtils";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import DateRangePicker from "../../components/DateRangePicker";


const headers = ["Item", "Ação", "Quantidade", "Membro", "Data", "Hora"]

function Log() {

    const [logs, setLogs] = useState([]);
    const [members, setMembers] = useState([]);

    const [filter, setFilter] = useState([]);
    const [textFilter, setTextFilter] = useState("");

    const [groupByMember, setGroupByMember] = useState("nobody");
    const [groupByDate, setGroupByDate] = useState();
    const [dateInit, setDateInit] = useState();
    const [dateEnd, setDateEnd] = useState();

    const [isLoading, setIsLoading] = useState(true)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => callServices(), []);

    const callServices = () => {
        setIsLoading(true);
        Promise.all([LogsController.list(), MembersController.list()]).then(([logs, members]) => {
            setLogs(logs);
            setMembers(members)
            setIsLoading(false);
        })
    }

    const onChangeFilter = ({ target: { value } }) => {
        setTextFilter(value);
        if (value === "") setFilter([]);

        value = value.toUpperCase();

        const logsFiltered = logs.filter(({ member: { name, passaport }, action, item }) =>
            String(passaport).includes(value) ||
            String(name).toUpperCase().includes(value) ||
            String(action).toUpperCase().includes(value) ||
            String(item).toUpperCase().includes(value)
        )

        return setFilter(logsFiltered);
    }

    const handleClearFilters = () => {
        setFilter([]);
        setTextFilter("");
        setGroupByMember("nobody");
        setGroupByDate("")
    }


    const onCallLogsAggregate = async ({ date, member }) => {
        try {
            setIsLoading(true);


            const formatedDate = DateUtils.parseDateToString({ date: new Date(date) });
            const aggregate = await LogsController.listAggregate(member._id, date && formatedDate);

            const formatedLog = [];
            let index = 0;
            for (const { _id: { item, action }, member, ammount, hours, date } of aggregate) {
                formatedLog.push({ _id: index, member, item, ammount, action, hours, date })
                index++;
            }
            return setLogs(formatedLog);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const onChangeGroupByMember = ({ target: { value: member } }) => {
        setGroupByMember(member);
        onCallLogsAggregate({ member, date: groupByDate });
    }

    const onChangeGroupByDate = ({ target: { value: date } }) => {
        setGroupByDate(date);
        const member = groupByMember === "nobody" ? "" : groupByMember
        onCallLogsAggregate({ date, member });
    }

    const getAssetName = (item) => {
        if (item.includes("Token")) return "token_azul"
        return item.replace("-", "")
            .replace(/[çÇ]/g, "C")
            .replace(/[íÍ]/g, "I")
            .replace(/[ÀÁÂÃÄÅàáâãäå]/g, "A")
            .replace(/[ÈÉÊËéèê]/g, "E")
            .replace(/\s/g, '').toLowerCase().trim()
    };

    const paginate = (array, pageSize, pageNumber) => array.slice((pageNumber) * pageSize, (pageNumber + 1) * pageSize);


    return (
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
            <Box display="flex" justifyContent="space-between" padding={1} borderRadius={2}>
                <TextField placeholder="Buscar" onChange={onChangeFilter} value={textFilter} color="secondary" />
                <Button endIcon={<ReplayOutlined />} onClick={() => {
                    handleClearFilters();
                    callServices();
                }}>Recarregar</Button>
            </Box>
            <iframe width="1280" height="720" src="https://rr3---sn-gpv7dne6.c.drive.google.com/videoplayback?expire=1666584438&ei=NtdVY9DLI_SdlAPFzJ2QAQ&ip=2804:29b8:512a:102:a170:5ffb:5ad0:9fc0&cp=QVRLWEZfU1RRSVhPOm93M1JhS2hOa2ZqTmhDWDctM2JqdFFtVVJUUGdSSUJ3R2p2bnp3aDJvVlU&id=31b35ecbd5df728a&itag=22&source=webdrive&requiressl=yes&mh=Pf&mm=32&mn=sn-gpv7dne6&ms=su&mv=m&mvi=3&pl=48&ttl=transient&susc=dr&driveid=1Zj_Ha37RZ6BzoLfDt2axcRD-rFxfFpQS&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=174.335&lmt=1666419323280832&mt=1666569645&subapp=DRIVE_WEB_FILE_VIEWER&txp=0011224&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRQIhANK0ZbFlVqgwz_UMOjifc7BDIO5YY4kzbZ2o1bqQkGwxAiBjDFjuQCTQXUtIJvTgApuwleHdHwdozESJJOch4vsB7g==&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAMJmkDVfuSgJ89a0-cGYVSkwNmqdGwKK5VK-_76H5fxHAiBsJMxjfg3FqnV97SPGvfVkGLGnDEckiN0d2VO4NP4P_A==&cpn=6k9YjSFM-8sOm1Cm&c=WEB_EMBEDDED_PLAYER&cver=1.20221018.01.00" title="Perdi o Controle do Meu Show!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <Box display="flex" marginBottom={5} padding={1} borderRadius={2}>
                <TextField value={groupByMember} defaultValue="nobody" onChange={onChangeGroupByMember} select label="Agrupar por membro" style={{ marginRight: 10 }}>
                    <MenuItem value="nobody">Nenhum</MenuItem>
                    {members.map((member) => <MenuItem key={member.passaport} value={member} >{member.name} || {member.passaport}</MenuItem>)}
                </TextField>
                <DateRangePicker onChange={(dates) => console.log(dates)} />
            </Box>

            <Table size="small" >
                <TableHead>
                    <TableRow>
                        {headers.map((head) => <TableCell key={head}>{head}</TableCell>)}
                        <TableCell padding="checkbox" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading && (
                        <TableSkeleton rows={5} columns={7} />
                    )}
                    {(logs).length === 0 && filter.length === 0 && !isLoading && (
                        <TableRow>
                            <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                <Typography variant="h5">Não há nada para exibir</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && paginate(filter.length > 0 ? filter : logs, rowsPerPage, page).map(({ member: { name, passaport }, _id, item, ammount, date, action, hours }) => (
                        <TableRow key={_id} hover>
                            <TableCell>
                                <Box display="flex" gap="20px" alignItems="center">
                                    <Avatar src={`/img/materials/${getAssetName(item)}.png`} />
                                    {item}
                                </Box>
                            </TableCell>
                            <TableCell style={{ color: action === "Retirou" ? "#a00" : "#0a0" }}><b>{action}</b></TableCell>
                            <TableCell style={{ color: action === "Retirou" ? "#a00" : "#0a0" }}><b>{ammount}</b></TableCell>
                            <TableCell>{name} || {passaport}</TableCell>
                            <TableCell>{date}</TableCell>
                            <TableCell>{hours}</TableCell>
                            <TableCell padding="checkbox">
                                <Box borderRadius={1} width="30px" height="30px" display="flex" justifyContent="center" alignItems="center" backgroundColor={action === "Retirou" ? "#A70B21" : "#090"}>
                                    {action === "Retirou" ? <ArrowUpward /> : <ArrowDownward />}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={"Linhas por página"}
                labelDisplayedRows={({ count, from, to }) => `${from}-${to} de ${count}`}
                component="div"
                count={filter.length > 0 ? filter.length : logs.length}
                rowsPerPageOptions={[5, 10, 15]}
                onRowsPerPageChange={({ target: { value } }) => setRowsPerPage(value)}
                onPageChange={(e, newPage) => setPage(newPage)}
                page={page}
            />
        </Box>
    )
}

export default Log;