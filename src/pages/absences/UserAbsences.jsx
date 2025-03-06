import React from 'react';

import './index.scss';
import { HistoryFilters } from '../../components/filters/AbsencesFilter';
import PassTable from '../../components/table/PassTable';
import { useSelector } from 'react-redux';

const AbsencesHistoryPage = () => {
    const { historyAbsences } = useSelector((state) => state.absences);
    return (
        <>
            <div className='absences-page'>
                <HistoryFilters />
                <div className='inner'>
                    <PassTable absences={historyAbsences} />
                </div>
            </div>
        </>
    );
};

export default AbsencesHistoryPage;
