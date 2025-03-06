import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import PassTableItem from './PassTableItem';

export default function PassTable({ absences = [] }) {
    return (
        <TableContainer sx={{ padding: '20px 40px' }}>
            <Table sx={{ overflow: 'scroll' }}>
                <TableBody sx={{ border: '1px solid #d9d9d9', borderRadius: '8px' }}>
                    {absences.map((row, index) => (
                        <PassTableItem key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function createData(fullName, status, date) {
    return {
        fullName,
        status,
        date,
        details: [
            {
                start_date: '05/01/2020',
                end_date: '01/02/2020',
                reason: 'Болезнь',
                customerId: '11091700',
            },
        ],
    };
}

const rows = [
    createData('Иванов Иван Иванович', 'На проверке', '01/01/2020'),
    createData('Иванов Иван Иванович', 'На проверке', '01/01/2020'),
    createData('Иванов Иван Иванович', 'На проверке', '01/01/2020'),
    createData('Иванов Иван Иванович', 'Одобрен', '01/01/2020'),
    createData('Иванов Иван Иванович', 'Одобрен', '01/01/2020'),
    createData('Иванов Иван Иванович', 'Отклонен', '01/01/2020'),
];
