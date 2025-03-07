import * as React from 'react';

import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Download } from '@mui/icons-material';
import { Box, Collapse, Button, IconButton, Typography } from '@mui/material';

import InfoChip from '../chip/InfoChip';
import DeleteModal from '../modal/DeleteModal';
import { transformDate } from '../../utils/converter/dateConverter';

const statuses = {
    Pending: 'default',
    Approved: 'success',
    Rejected: 'error',
};

const passBgColor = {
    Pending: '#f6f7f9',
    Approved: '#effae9',
    Rejected: '#ffebeb',
};

export default function AbsenceItem(props) {
    const { row } = { ...props };
    const [open, setOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleClose = () => {
        setModalOpen(false);
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
                <TableCell>{row.owner.fullName}</TableCell>
                <TableCell align='right'>
                    <InfoChip title={row.status} color={statuses[row.status]} />
                </TableCell>
                <TableCell align='right'>
                    <InfoChip title={transformDate(row?.owner?.group)} color={'info'} />
                </TableCell>
                <TableCell align='center'>{transformDate(row?.date)}</TableCell>
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
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: '500' }}>
                                            {'Причина: '}
                                            {row.details.reason}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Button
                                sx={{
                                    margin: '16px 0 0 0',
                                    textTransform: 'none',
                                }}
                            >
                                {'Документ'}
                                <Download
                                    sx={{
                                        width: '24px',
                                        height: '24px',
                                        color: '#0072bb',
                                        boxSizing: 'border-box',
                                        marginLeft: '4px',
                                    }}
                                />
                            </Button>
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
