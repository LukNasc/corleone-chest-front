import React, { useEffect, useState } from "react";

import { Table, TableCell, TableRow, TableHead, TableBody, Box, Typography, Avatar, TablePagination, Button, TextField, Icon } from "@mui/material";

import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import ChestController from "../../controllers/Chest";

import { Assets } from "../../utils/Assets";
import TitlePage from "../../components/TitlePage";
import ChestFilter from "./components/ChestFilter";

const headers = ["Item", "Quantidade", "Ultima atualização"]

function Chest() {
    const [chest, setChest] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({});
    const [openFilter, setOpenFilter] = useState(false);

    const [filter, setFilter] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    useEffect(() => {
        callServices()
    }, [])

    const paginate = (array, pageSize, pageNumber) => array.slice((pageNumber) * pageSize, (pageNumber + 1) * pageSize);

    const onChangeSearch = ({ target: { value } }) => {
        setSearch(value);
        if (value === "") {
            handleFilter(filters);
            return;
        };

        value = value.toUpperCase();

        const chestsFiltered = (filter.length > 0 ? filter : chest).filter(({ item }) =>
            String(item).toUpperCase().includes(value)
        )

        return setFilter(chestsFiltered);
    }


    const callServices = () => {
        setIsLoading(true);
        Promise.all([ChestController.list()]).then(([chest]) => {
            setChest(chest);
            setIsLoading(false);
        })
    }


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

        let filteredList = chest;

        if (filters.items) filteredList = filteredList.filter(log => filters.items.includes(log.item));

        setFilter(filteredList)
    }

    return (
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
            <TitlePage title="ITEMS DO BAÚ" logo="view_in_ar" />
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
                <Button onClick={toggleDrawer(true)} variant="text" color="secondary" endIcon={<Icon>filter_list</Icon>}>Mais Filtros</Button>
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
                    {(chest).length === 0 && filter.length === 0 && !isLoading && (
                        <TableRow>
                            <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                <Typography variant="h5">Não há nada para exibir</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && paginate(filter.length > 0 ? filter : chest, rowsPerPage, page).map(({ _id, item, currentAmmount, lastUpdate }) => (
                        <TableRow key={_id} hover>
                            <TableCell>
                                <Box display="flex" gap="20px" alignItems="center">
                                    <Avatar src={`/img/materials/${Assets.getAssetName(item)}.png`} />
                                    {item}
                                </Box>
                            </TableCell>
                            <TableCell>{currentAmmount}</TableCell>
                            <TableCell >{lastUpdate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={"Linhas por página"}
                labelDisplayedRows={({ count, from, to }) => `${from}-${to} de ${count}`}
                component="div"
                count={filter.length > 0 ? filter.length : chest.length}
                rowsPerPageOptions={[5, 10, 15]}
                onRowsPerPageChange={({ target: { value } }) => setRowsPerPage(value)}
                onPageChange={(e, newPage) => setPage(newPage)}
                page={page}
            />
            <ChestFilter open={openFilter} onFilter={handleFilter} toggleDrawer={toggleDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)} />
        </Box>
    )
}

export default Chest;