import * as React from 'react';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import DownloadIcon from '@mui/icons-material/Download';

import { transformDate } from '../../utils/converter/dateConverter';
import InfoChip from '../chip/InfoChip';
import Textarea from '../textArea/TextArea';

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

export default function HistoryItem(props) {
    const { row } = { ...props };
    const [open, setOpen] = React.useState(false);
    console.log(row);
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
                    {row.owner.fullName}
                </TableCell>
                <TableCell align='center'>
                    <InfoChip title={row.status} color={statuses[row.status]} />
                </TableCell>
                <TableCell align='center'>{row?.date || ''}</TableCell>
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
                            {row.status === 'Rejected' && row.comment && (
                                <Textarea comment={row?.comment} />
                            )}
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
