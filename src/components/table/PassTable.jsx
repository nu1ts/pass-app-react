import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { padding } from '@mui/system';
import InfoChip from '../chip/InfoChip';

function createData(name, status, date) {
    return {
        name,
        status,
        date,
        history: [
            {
                start_date: '05/01/2020',
                end_date: '01/02/2020',
                reason: 'Болезнь',
                customerId: '11091700',
            },
        ],
    };
}

const statuses = {
    'На проверке': 'default',
    Одобрен: 'success',
    Отклонен: 'error',
};

const passBgColor = {
    'На проверке': '#f6f7f9',
    Одобрен: '#effae9',
    Отклонен: '#ffebeb',
};

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#4b4b4b',
                            ':hover': { backgroundColor: '#ebebeb' },
                        }}
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon sx={{ color: '#9caab6' }} />
                        ) : (
                            <KeyboardArrowDownIcon sx={{ color: '#9caab6' }} />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                    {row.name}
                </TableCell>
                <TableCell align='center'>
                    <InfoChip title={row.status} color={statuses[row.status]} />
                </TableCell>
                <TableCell align='center'>{row.date}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        backgroundColor: passBgColor[row.status],
                    }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 4 }}>
                            <Typography variant='h6' gutterBottom component='div'>
                                Детали пропуска
                            </Typography>
                            <Table size='medium'>
                                <TableHead>
                                    <TableCell align='left'>Дата начала</TableCell>
                                    <TableCell align='left'>Дата окончания</TableCell>
                                    <TableCell align='center'>Причина</TableCell>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell>{historyRow.start_date}</TableCell>
                                            <TableCell>{historyRow.end_date}</TableCell>
                                            <TableCell align='center'>
                                                {historyRow.reason}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button
                                sx={{
                                    margin: '16px 0 0 0',
                                    textTransform: 'none',
                                }}
                            >
                                {'Документ'}
                                <DownloadIcon
                                    sx={{
                                        width: '24px',
                                        height: '24px',
                                        color: '#0072bb',
                                        boxSizing: 'border-box',
                                        marginLeft: '4px',
                                    }}
                                />
                            </Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const rows = [
    createData('Иванов Иван Иванович', 'На проверке', '01/01/2020'),
    createData('Иванов Иван Иванович', 'На проверке', '01/01/2020'),
    createData('Иванов Иван Иванович', 'На проверке', '01/01/2020'),
    createData('Иванов Иван Иванович', 'Одобрен', '01/01/2020'),
    createData('Иванов Иван Иванович', 'Одобрен', '01/01/2020'),
    createData('Иванов Иван Иванович', 'Отклонен', '01/01/2020'),
];

export default function PassTable() {
    return (
        <TableContainer>
            <Table>
                <TableBody sx={{ border: '1px solid #d9d9d9' }}>
                    {rows.map((row, index) => (
                        <Row key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
