import * as React from 'react';

import { Table, TableBody, TableCell, TableRow, Chip } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Download } from '@mui/icons-material';
import { Box, Collapse, Button, IconButton, Typography } from '@mui/material';

import InfoChip from '../chip/InfoChip';
import Textarea from '../textArea/TextArea';
import { transformDate } from '../../utils/converter/dateConverter';
import { useNavigate } from 'react-router';

const statuses = {
    Pending: 'default',
    Approved: 'success',
    Rejected: 'error',
};

const statusName = {
    Pending: 'На проверке',
    Approved: 'Одобрен',
    Rejected: 'Отклонен',
};

const passBgColor = {
    Pending: '#f6f7f9',
    Approved: '#effae9',
    Rejected: '#ffebeb',
};

const reason = {
    Sick: 'Болезнь',
    Family: 'Семейные обстоятельства',
    Academic: 'Учебная',
};

export default function HistoryItem(props) {
    const { row } = { ...props };
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();
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
                            <KeyboardArrowUp sx={{ color: '#9caab6' }} />
                        ) : (
                            <KeyboardArrowDown sx={{ color: '#9caab6' }} />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell>{row.studentName}</TableCell>
                <TableCell align='right'>
                    <InfoChip title={statusName[row.status]} color={statuses[row.status]} />
                </TableCell>
                <TableCell align='right'>
                    <InfoChip title={transformDate(row?.group)} color={'info'} />
                </TableCell>
                <TableCell align='center'>{transformDate(row?.createdAt)}</TableCell>
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
                            <Table size='small'>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: '500' }}>
                                            {'Причина: '}
                                            {reason[row.type]}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <Chip
                                size='medium'
                                label='Открыть детали'
                                color='primary'
                                variant='outlined'
                                sx={{ margin: '10px 0 0 10px', padding: '4px', cursor: 'pointer' }}
                                onClick={() => {
                                    navigate(`/absences/${row.id}`);
                                }}
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
