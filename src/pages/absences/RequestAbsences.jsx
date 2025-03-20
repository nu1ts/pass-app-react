import React, { useEffect } from 'react';
import Fab from '@mui/material/Fab';
import EditNoteIcon from '@mui/icons-material/EditNote';
import './index.scss';
import { AbsencesFilters } from '../../components/filters/AbsencesFilter';
import AbsencesTable from '../../components/table/AbsencesTable';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmptyResult from '../../components/emptyResult/EmptyResult';
import Pagination from '../../components/pagination/Pagination';
import PaginationComponent from '../../components/pagination/Pagination';

const AbsencesPage = () => {
    const navigate = useNavigate();
    const { absences } = useSelector((state) => state.absences);
    return (
        <>
            <div className='absences-page'>
                <AbsencesFilters />
                <div className='inner'>
                    {absences.length > 0 ? <AbsencesTable absences={absences} /> : <EmptyResult />}
                    <PaginationComponent />
                </div>
            </div>
            <div className='absolute'>
                <Fab
                    sx={{ width: '70px', height: '70px' }}
                    color='primary'
                    onClick={() => {
                        navigate('/absences/create');
                    }}
                >
                    <EditNoteIcon />
                </Fab>
            </div>
        </>
    );
};

export default AbsencesPage;
