import React from "react";

import { TableCell, TableRow, Skeleton } from "@mui/material"

function TableSkeleton({ rows, columns }) {
    return (
        Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
                {Array.from({ length: columns }).map((_, index) => (
                    <TableCell key={index}><Skeleton variant="text" width="100%" height="40px" /></TableCell>
                ))}
            </TableRow>
        ))
    )
}

export default TableSkeleton;