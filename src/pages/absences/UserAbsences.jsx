import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import PostAddIcon from '@mui/icons-material/PostAdd';
import './index.scss';
import { HistoryFilters } from '../../components/filters/AbsencesFilter';
import AbsencesTable from '../../components/table/AbsencesTable';
import { useSelector } from 'react-redux';
import ExportModal from '../../components/modal/ExportModal';
import EmptyResult from '../../components/emptyResult/EmptyResult';

const AbsencesHistoryPage = () => {
    const [open, setOpen] = useState(false);
    const { historyAbsences } = useSelector((state) => state.absences);
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        console.log(historyAbsences);
    }, [historyAbsences]);
    return (
        <>
            <ExportModal isOpen={open} handleClose={handleClose} />
            <div className='absences-page'>
                <HistoryFilters />
                <div className='inner'>
                    {historyAbsences.length > 0 ? (
                        <AbsencesTable history={historyAbsences} />
                    ) : (
                        <EmptyResult />
                    )}
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
