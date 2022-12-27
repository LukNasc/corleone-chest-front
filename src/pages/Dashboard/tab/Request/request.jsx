import React, { useState } from "react";

import { Typography, Box, TablePagination } from "@mui/material"

import NotificationCard from "../../../../components/NotificationCard";
import NotificationCardSkeleton from "../../../../components/Skeleton/NotificationCardSkeleton";
import { TableService } from "../../../../services/TableService";
import EmptyState from "../../../../components/EmptyState";



function Request() {
    const [request, setRequest] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [page, setPage] = useState(0);

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {request.length === 0 && !isLoading &&
                <EmptyState height={400} />
            }
            {isLoading && <NotificationCardSkeleton length={3} />}
            {TableService.paginate(request, rowsPerPage, page).map(req => (
                <NotificationCard key={req.passaport} title="Solicitação de acesso" description={
                    <>
                        <Typography variant="body1"><b>Nome</b>: {req.name}</Typography>
                        <Typography variant="body1"><b>Passaporte</b>: {req.passaport}</Typography>
                    </>
                } />
            ))}
            <TablePagination
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={"Linhas por página"}
                labelDisplayedRows={({ count, from, to }) => `${from}-${to} de ${count}`}
                component="div"
                count={request.length}
                rowsPerPageOptions={[3, 6, 9]}
                onRowsPerPageChange={({ target: { value } }) => setRowsPerPage(value)}
                onPageChange={(e, newPage) => setPage(newPage)}
                page={page}
            />
        </Box>
    )
}

export default Request;