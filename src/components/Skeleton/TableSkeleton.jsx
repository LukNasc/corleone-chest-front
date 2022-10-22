import React from "react";

import { TableCell, TableRow, Skeleton } from "@mui/material"

function TableSkeleton({ rows, columns }) {
    return (

        Array.from({ length: rows }).map(() => (
            <TableRow>
                {Array.from({ length: columns }).map(() => (
                    <TableCell><Skeleton variant="text" width="100%" height="40px" /></TableCell>
                ))}
            </TableRow>
        ))

    )
}

export default TableSkeleton;