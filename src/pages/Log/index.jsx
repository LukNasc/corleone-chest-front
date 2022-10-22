import React, { useEffect, useState } from "react";

import { Table, TableCell, TableRow, TableHead, TableBody, TextField, Box, MenuItem, Typography, Button, Avatar, TablePagination } from "@mui/material";


import LogsController from "../../controllers/Logs";
import MembersController from "../../controllers/Members";
import DateUtils from "../../utils/DateUtils";
import { ArrowDownward, ArrowUpward, ReplayOutlined } from "@mui/icons-material";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";


const headers = ["Item", "Ação", "Quantidade", "Membro", "Data", "Hora"]

function Log() {

    const [logs, setLogs] = useState([]);
    const [members, setMembers] = useState([]);

    const [filter, setFilter] = useState([]);
    const [textFilter, setTextFilter] = useState("");

    const [groupByMember, setGroupByMember] = useState("nobody");
    const [groupByDate, setGroupByDate] = useState();

    const [isLoading, setIsLoading] = useState(true)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => callServices(), []);

    const callServices = () => {
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
        if (item.includes("Token")) return "tokenpt"
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
            <Box display="flex" justifyContent="space-between" marginBottom={5} padding={1} borderRadius={2}>
                <Button endIcon={<ReplayOutlined />} onClick={() => {
                    handleClearFilters();
                    callServices();
                }}>Recarregar</Button>
                <TextField placeholder="Buscar" onChange={onChangeFilter} value={textFilter} color="secondary" />
                <TextField value={groupByMember} defaultValue="nobody" onChange={onChangeGroupByMember} select label="Agrupar por membro">
                    <MenuItem value="nobody">Nenhum</MenuItem>
                    {members.map((member) => <MenuItem key={member.passaport} value={member} >{member.name} || {member.passaport}</MenuItem>)}
                </TextField>
                <TextField type="date" onChange={onChangeGroupByDate} value={groupByDate} color="secondary" />
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
                    {paginate(filter.length > 0 ? filter : logs, rowsPerPage, page).map(({ member: { name, passaport }, _id, item, ammount, date, action, hours }) => (
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