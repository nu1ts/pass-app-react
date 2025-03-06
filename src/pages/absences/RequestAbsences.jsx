import React, { useEffect } from 'react';

import './index.scss';
import { AbsencesFilters } from '../../components/filters/AbsencesFilter';
import PassTable from '../../components/table/PassTable';
import { useSelector } from 'react-redux';

const AbsencesPage = () => {
    const { absences } = useSelector((state) => state.absences);
    return (
        <>
            <div className='absences-page'>
                <AbsencesFilters />
                <div className='inner'>
                    <PassTable absences={absences} />
                </div>
            </div>
        </>
    );
};

export default AbsencesPage;
