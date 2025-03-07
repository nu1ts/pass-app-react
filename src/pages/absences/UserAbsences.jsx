import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import PostAddIcon from '@mui/icons-material/PostAdd';
import './index.scss';
import { HistoryFilters } from '../../components/filters/AbsencesFilter';
import AbsencesTable from '../../components/table/AbsencesTable';
import { useSelector } from 'react-redux';
import ExportModal from '../../components/modal/ExportModal';

const AbsencesHistoryPage = () => {
    const [open, setOpen] = useState(false);
    const { historyAbsences } = useSelector((state) => state.absences);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ExportModal isOpen={open} handleClose={handleClose} />
            <div className='absences-page'>
                <HistoryFilters />
                <div className='inner'>
                    <AbsencesTable history={historyAbsences} />
                </div>
            </div>
            <div className='absolute'>
                <Fab
                    sx={{ width: '70px', height: '70px' }}
                    color='primary'
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <PostAddIcon />
                </Fab>
            </div>
        </>
    );
};

export default AbsencesHistoryPage;
