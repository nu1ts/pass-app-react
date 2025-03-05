import React from 'react';

import './index.scss';
import { HistoryFilters } from '../../components/filters/AbsencesFilter';
import PassTable from '../../components/table/PassTable';

const UserAbsences = () => {
    return (
        <>
            <div className='absences-page'>
                <HistoryFilters />
                <div className='inner'>
                    <PassTable />
                </div>
            </div>
        </>
    );
};

export default UserAbsences;
