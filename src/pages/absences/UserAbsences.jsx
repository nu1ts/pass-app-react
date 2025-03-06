import React from 'react';
import Fab from '@mui/material/Fab';
import PostAddIcon from '@mui/icons-material/PostAdd';
import './index.scss';
import { HistoryFilters } from '../../components/filters/AbsencesFilter';
import AbsencesTable from '../../components/table/AbsencesTable';
import { useSelector } from 'react-redux';

const AbsencesHistoryPage = () => {
    const { historyAbsences } = useSelector((state) => state.absences);
    return (
        <>
            <div className='absences-page'>
                <HistoryFilters />
                <div className='inner'>
                    <AbsencesTable history={historyAbsences} />
                </div>
            </div>
            <div className='absolute'>
                <Fab sx={{ width: '70px', height: '70px' }} color='primary'>
                    <PostAddIcon />
                </Fab>
            </div>
        </>
    );
};

export default AbsencesHistoryPage;
