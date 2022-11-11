import React, { useEffect, useState } from "react";

import { Table, TableCell, TableRow, TableHead, TableBody, Box, Typography, Avatar, TablePagination } from "@mui/material";

import TableSkeleton from "../../../components/Skeleton/TableSkeleton";

import Api from "../../../service/axios.config";
import { Assets } from "../../../utils/Assets";

const headers = ["Item", "Quantidade", "Ultima atualização"]


function Chest() {
    const [chest, setChest] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await Api.get("/chest/list");
                setChest(data)
            } catch (e) {
                console.error(e);
                alert(e.message);
            } finally {
                setLoading(false);
            }
        })()
    }, [])

    const paginate = (array, pageSize, pageNumber) => array.slice((pageNumber) * pageSize, (pageNumber + 1) * pageSize);

    return (
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
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
                    {(chest).length === 0 && !isLoading && (
                        <TableRow>
                            <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                <Typography variant="h5">Não há nada para exibir</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && paginate(chest, rowsPerPage, page).map(({ _id, item, currentAmmount, lastUpdate }) => (
                        <TableRow key={_id} hover>
                            <TableCell>
                                <Box display="flex" gap="20px" alignItems="center">
                                    <Avatar src={`/img/materials/${Assets.getAssetName(item)}.png`} />
                                    {item}
                                </Box>
                            </TableCell>
                            <TableCell><b>{currentAmmount}</b></TableCell>
                            <TableCell ><b>{lastUpdate}</b></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={"Linhas por página"}
                labelDisplayedRows={({ count, from, to }) => `${from}-${to} de ${count}`}
                component="div"
                count={chest.length}
                rowsPerPageOptions={[5, 10, 15]}
                onRowsPerPageChange={({ target: { value } }) => setRowsPerPage(value)}
                onPageChange={(e, newPage) => setPage(newPage)}
                page={page}
            />
        </Box>
    )
}

export default Chest;