import React, { useEffect, useState } from "react";

import { Table, TableCell, TableRow, TableHead, TableBody, TextField, Box, MenuItem, Typography, Button, Avatar } from "@mui/material";

import LogsController from "../../controllers/Logs";
import MembersController from "../../controllers/Members";
import DateUtils from "../../utils/DateUtils";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";


const headers = ["Item", "Ação", "Quantidade", "Membro", "Data", "Hora"]

function Log() {

    const [logs, setLogs] = useState([]);
    const [members, setMembers] = useState([]);

    const [filter, setFilter] = useState([]);
    const [textFilter, setTextFilter] = useState("");

    const [groupByMember, setGroupByMember] = useState("nobody");
    const [groupByDate, setGroupByDate] = useState(DateUtils.parseDateToString({ date: new Date(), format: "us" }));

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Promise.all([LogsController.list(), MembersController.list()]).then(([logs, members]) => {
            setLogs(logs);
            setMembers(members)
            setIsLoading(false);
        })
    }, []);


    const fetchLogs = async () => {
        setIsLoading(true);
        const data = await LogsController.list();
        setLogs(data);
        setIsLoading(false);
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
        fetchLogs()
        setFilter([]);
        setTextFilter("");
        setGroupByMember("nobody");
        setGroupByDate(DateUtils.parseDateToString({ date: new Date(), format: "us" }))
    }


    const handlePressButton = async () => {
        try {
            setIsLoading(true);

            const formatedDate = DateUtils.parseDateToString({ date: new Date(groupByDate) });
            const aggregate = await LogsController.listAggregate(groupByMember._id, formatedDate);

            const formatedLog = [];

            let index = 0;
            for (const { member, _id: { item, action }, ammount, hours } of aggregate.logs) {
                formatedLog.push({ _id: index, member, item, ammount, action, date: aggregate.date.replaceAll("-", "/"), hours })
                index++;
            }
            return setLogs(formatedLog);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <Box display="flex" justifyContent="space-between" marginBottom={5} padding={1} borderRadius={2}>
                <TextField placeholder="Buscar" onChange={onChangeFilter} value={textFilter} color="secondary" />
                <TextField value={groupByMember} defaultValue="nobody" onChange={({ target: { value } }) => setGroupByMember(value)} select label="Agrupar por membro">
                    <MenuItem value="nobody">Nenhum</MenuItem>
                    {members.map((member) => <MenuItem key={member.passaport} value={member} >{member.name} || {member.passaport}</MenuItem>)}
                </TextField>
                <TextField type="date" onChange={({ target: { value } }) => setGroupByDate(value)} value={groupByDate} color="secondary" />
                <Button onClick={handlePressButton} disabled={groupByMember === "nobody"}>Filtrar</Button>
                <Button onClick={handleClearFilters} disabled={groupByMember === "nobody" && !groupByDate && !textFilter}>Limpar</Button>
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
                    {(logs).length === 0 && !isLoading && (
                        <TableRow>
                            <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                <Typography variant="h5">Não há nada para exibir</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                    {(filter.length > 0 ? filter : logs).map(({ member: { name, passaport }, _id, item, ammount, date, action, hours }) => (
                        <TableRow key={_id} hover>
                            <TableCell>
                                <Box display="flex" gap="20px" alignItems="center">
                                    <Avatar src={`/img/materials/${item.toLowerCase()}.png`} />
                                    {item}
                                </Box>
                            </TableCell>
                            <TableCell>{action}</TableCell>
                            <TableCell>{ammount}</TableCell>
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
        </>
    )
}

export default Log;