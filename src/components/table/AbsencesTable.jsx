import * as React from 'react';
import { Table, TableBody, TableContainer } from '@mui/material';

import AbsenceItem from './AbsenceItem';
import HistoryItem from './HistoryItem';

export default function AbsencesTable({ absences = null, history = null }) {
    return (
        <TableContainer sx={{ padding: '20px 40px' }}>
            <Table sx={{ overflow: 'scroll' }}>
                <TableBody sx={{ border: '1px solid #d9d9d9', borderRadius: '8px' }}>
                    {absences && absences.map((row) => <AbsenceItem key={row.id} row={row} />)}
                    {history &&
                        history.map((row, index) => {
                            if (row.status !== 'Pending') {
                                return <HistoryItem key={index} row={row} />;
                            }
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
