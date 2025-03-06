import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import AbsenceItem from './AbsenceItem';

export default function AbsencesTable({ absences = [] }) {
    return (
        <TableContainer sx={{ padding: '20px 40px' }}>
            <Table sx={{ overflow: 'scroll' }}>
                <TableBody sx={{ border: '1px solid #d9d9d9', borderRadius: '8px' }}>
                    {absences.map((row, index) => (
                        <AbsenceItem key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
