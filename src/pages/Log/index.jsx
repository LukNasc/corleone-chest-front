import React, { useEffect, useState } from "react";

import { Table, TableCell, TableRow, TableHead, TableBody, TextField, Box, Typography, Button, Avatar, TablePagination, Icon } from "@mui/material";
import LogsController from "../../controllers/Logs";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";

import { Assets } from "../../utils/Assets";
import TitlePage from "../../components/TitlePage";
import LogsFilter from "./components/LogsFilter";


const headers = ["Passaporte", "Nome", "Item", "Ação", "Quantidade", "Data/Hora"]

function Log() {

    const [logs, setLogs] = useState([]);

    const [filter, setFilter] = useState([]);
    const [filters, setFilters] = useState({})
    const [search, setSearch] = useState("");

    const [openFilter, setOpenFilter] = useState(false);

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

    const onChangeSearch = ({ target: { value } }) => {
        setSearch(value);
        if (value === "") {
            handleFilter(filters);
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


    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setOpenFilter(open);
    };

    const handleFilter = (filters) => {
        setSearch("");
        setFilters(filters)
        if (Object.keys(filters).length === 0) {
            setFilter([]);
            return;
        }

        let filteredList = logs;

        if (filters.items) filteredList = filteredList.filter(log => filters.items.includes(log.item));
        if (filters.action) filteredList = filteredList.filter(log => filters.action === log.action);
        if (filters.member) filteredList = filteredList.filter(log => log.member.name === filters.member)

        setFilter(filteredList)
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
                    value={search}
                    onChange={onChangeSearch}
                    InputProps={{
                        disableUnderline: true, startAdornment: <Icon>search</Icon>
                    }} />
                <Button variant="text" color="secondary" onClick={toggleDrawer(true)} endIcon={<Icon>filter_list</Icon>}>Mais Filtros</Button>
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
            <LogsFilter open={openFilter} onFilter={handleFilter} toggleDrawer={toggleDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)} />
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