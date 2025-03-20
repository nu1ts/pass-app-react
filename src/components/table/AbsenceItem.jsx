import * as React from 'react';

import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Download } from '@mui/icons-material';
import { Box, Collapse, Button, IconButton, Typography } from '@mui/material';
import { Chip } from '@mui/material';
import InfoChip from '../chip/InfoChip';
import DeleteModal from '../modal/DeleteModal';
import { transformDate } from '../../utils/converter/dateConverter';
import { approveAbsence } from '../../api/absences/absencesService';
import { ErrorToast } from '../../utils/notifications/notifications';
import { ERROR_401, SERVER_ERROR } from '../../utils/constants/errorCode';
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

export default function AbsenceItem(props) {
    const { row } = { ...props };
    const [open, setOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setModalOpen(false);
    };
    const approve = async () => {
        const response = await approveAbsence(row.id);
        if (response.ok) {
        } else {
            if (response.status === 401) {
                ErrorToast(ERROR_401);
            } else {
                ErrorToast(SERVER_ERROR);
            }
        }
    };

    return (
        <>
            <DeleteModal isOpen={modalOpen} handleClose={handleClose} id={row.id} />
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
                    <InfoChip title={transformDate(row.group)} color={'info'} />
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
                                    {row.details?.start_date && row.details.end_date && (
                                        <>
                                            <TableRow key={row.details.date}>
                                                <TableCell sx={{ fontWeight: '500' }}>
                                                    {'Дата начала: '}
                                                    {transformDate(row.details.start_date)}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: '500' }}>
                                                    {'Дата окончания: '}
                                                    {transformDate(row.details.end_date)}
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )}
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: '500' }}>
                                            {'Причина: '}
                                            {reason[row.type]}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Chip
                                size='small'
                                label='Детали'
                                color='primary'
                                variant='outlined'
                                sx={{ padding: '4px', cursor: 'pointer' }}
                                onClick={() => {
                                    navigate(`/absences/${row.id}`);
                                }}
                            />

                            <TableRow
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'right',
                                    paddingTop: '10px',
                                }}
                            >
                                <Button
                                    variant='contained'
                                    color='success'
                                    sx={{
                                        marginRight: '10px',
                                        boxShadow: 'none',
                                        textTransform: 'none',
                                    }}
                                    onClick={approve}
                                >
                                    Одобрить
                                </Button>
                                <Button
                                    variant='contained'
                                    color='error'
                                    sx={{ boxShadow: 'none', textTransform: 'none' }}
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}
                                >
                                    Отклонить
                                </Button>
                            </TableRow>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
