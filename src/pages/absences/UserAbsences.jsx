import React from 'react';

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
        </>
    );
};

export default AbsencesHistoryPage;
