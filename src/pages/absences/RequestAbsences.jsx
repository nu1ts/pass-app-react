import React, { useEffect } from 'react';
import Fab from '@mui/material/Fab';
import EditNoteIcon from '@mui/icons-material/EditNote';
import './index.scss';
import { AbsencesFilters } from '../../components/filters/AbsencesFilter';
import AbsencesTable from '../../components/table/AbsencesTable';
import { useSelector } from 'react-redux';

const AbsencesPage = () => {
    const { absences } = useSelector((state) => state.absences);
    return (
        <>
            <div className='absences-page'>
                <AbsencesFilters />
                <div className='inner'>
                    <AbsencesTable absences={absences} />
                </div>
            </div>
            <div className='absolute'>
                <Fab sx={{ width: '70px', height: '70px' }} color='primary'>
                    <EditNoteIcon />
                </Fab>
            </div>
        </>
    );
};

export default AbsencesPage;
