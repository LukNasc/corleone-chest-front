import React, { useEffect, useState } from "react";

import { Table, TableCell, TableRow, TableHead, TableBody, TextField, Box, MenuItem, Typography, Button, Avatar, TablePagination, Icon } from "@mui/material";
import { ArrowDownward, ArrowUpward, ReplayOutlined } from "@mui/icons-material";

import LogsController from "../../controllers/Logs";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import DateRangePicker from "../../components/DateRangePicker";

import { Assets } from "../../utils/Assets";
import TitlePage from "../../components/TitlePage";


const headers = ["Passaporte", "Nome", "Item", "Ação", "Quantidade", "Data/Hora"]

const rotation_items = ["cobre", "alumínio", "titânio", "borracha", "plástico"]

function Log() {

    const [logs, setLogs] = useState([]);

    const [filter, setFilter] = useState([]);
    const [textFilter, setTextFilter] = useState("");

    const [groupByMember, setGroupByMember] = useState("nobody");
    const [_, setGroupByDates] = useState();
    const [filterRotationItems, setFilterRotationItems] = useState("all");


    const [isLoading, setIsLoading] = useState(true)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => callServices(), []);

    const callServices = () => {
        setIsLoading(true);
        Promise.all([LogsController.list()]).then(([logs]) => {
            setLogs(logs);
            setIsLoading(false);
        })
    }

    const onChangeFilter = ({ target: { value } }) => {
        setTextFilter(value);
        if (value === "") {
            setFilter([]);
            return;
        };

        value = value.toUpperCase();

        const logsFiltered = (filter.length > 0 ? filter : logs).filter(({ member: { name, passaport }, action, item }) =>
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
        setFilterRotationItems("all")
        setGroupByMember("nobody");
        setGroupByDates("")
    }


    const onCallLogsAggregate = async ({ dates, member }) => {
        try {
            setIsLoading(true);


            const aggregate = await LogsController.listAggregate(member._id, dates);

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

    const onChangeFilterByRotationsItems = ({ target: { value } }) => {
        setFilterRotationItems(value);
        if (value === "all") { setFilter([]); return; }
        const filteredLogs = (filter.length > 0 ? filter : logs).filter(({ item }) => rotation_items.includes(item.toLowerCase()))
        setFilter(filteredLogs)
    }

    const onChangeGroupByDates = (dates) => {
        setGroupByDates(dates);
        const member = groupByMember === "nobody" ? "" : groupByMember
        onCallLogsAggregate({ dates, member });
    }


    const paginate = (array, pageSize, pageNumber) => array.slice((pageNumber) * pageSize, (pageNumber + 1) * pageSize);


    return (
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
            <TitlePage title={"HISTÓRICO DE LOGS"} logo="history" />
            <Box display="flex" justifyContent="space-between" marginBottom="15px">
                <TextField
                    variant="filled"
                    placeholder="Buscar"
                    style={{ width: 394 }}
                    value={textFilter}
                    onChange={onChangeFilter}
                    InputProps={{
                        disableUnderline: true, startAdornment: <Icon>search</Icon>
                    }} />
            </Box>
            <Table size="small" >
                <TableHead>
                    <TableRow>
                        {headers.map((head) => <TableCell key={head}>{head}</TableCell>)}
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
                            <TableCell>{passaport}</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>
                                <Box display="flex" gap="20px" alignItems="center">
                                    <Avatar src={`/img/materials/${Assets.getAssetName(item)}.png`} />
                                    {item}
                                </Box>
                            </TableCell>
                            <TableCell style={{ color: action === "Retirou" ? "#a00" : "#0a0" }}>{action}</TableCell>
                            <TableCell>{ammount}</TableCell>
                            <TableCell>{date} {hours}</TableCell>
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