import React, { useState, useEffect } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, IconButton, Icon, Checkbox } from "@mui/material"

import TableSkeleton from "../../../../components/Skeleton/TableSkeleton";
import { TableService } from "../../../../services/TableService";
import EmptyState from "../../../../components/EmptyState";

import MembersController from "../../../../controllers/Members";

const headers = ["Passaporte", "Nome"]


function Members() {
    const [members, setMembers] = useState([])

    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([MembersController.list()]).then(([members]) => {
            setMembers(members);
            setIsLoading(false);
        }).finally(() => setIsLoading(false))
    }, [])

    const updateMemberPosition = (member) => async (e) => {
        try {
            await MembersController.updateById(member);
            const memberUpdated = members.find(item => {
                if (item._id === member._id) {
                    item.isAdmin = member.isAdmin;
                    return item;
                }
            });
            const lstMembersUpdated = members.filter(item => item._id !== member._id)
            lstMembersUpdated.push(memberUpdated);
            setMembers(lstMembersUpdated)

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {headers.map(header => (<TableCell key={header}>{header}</TableCell>))}
                        <TableCell padding="checkbox">ADM</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.length === 0 && !isLoading && (
                        <TableRow>
                            <TableCell colSpan={4} style={{ textAlign: "center" }}>
                                <EmptyState height={400} />
                            </TableCell>
                        </TableRow>
                    )}
                    {isLoading && <TableSkeleton columns={4} rows={5} />}
                    {TableService.paginate(members, rowsPerPage, page).map(({ _id, passaport, name, isAdmin }) => (
                        <TableRow key={_id} hover >
                            <TableCell>{passaport}</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>
                                <Checkbox checked={isAdmin} onClick={updateMemberPosition({ _id, isAdmin: !isAdmin })} />
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
                count={members.length}
                rowsPerPageOptions={[5, 10, 15]}
                onRowsPerPageChange={({ target: { value } }) => setRowsPerPage(value)}
                onPageChange={(e, newPage) => setPage(newPage)}
                page={page}
            />
        </>
    )
}

export default Members;