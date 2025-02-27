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
import DownloadIcon from '@mui/icons-material/Download';

import InfoChip from '../chip/InfoChip';

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

export default function PassTableItem(props) {
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
                                    {row.details.map((detail) => (
                                        <TableRow key={detail.date}>
                                            <TableCell>{detail.start_date}</TableCell>
                                            <TableCell>{detail.end_date}</TableCell>
                                            <TableCell align='center'>{detail.reason}</TableCell>
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
