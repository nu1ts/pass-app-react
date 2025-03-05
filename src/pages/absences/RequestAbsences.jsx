import React, { useEffect } from 'react';

import './index.scss';
import { AbsencesFilters } from '../../components/filters/AbsencesFilter';
import PassTable from '../../components/table/PassTable';
import { useSelector } from 'react-redux';

const RequestAbsences = () => {
    return (
        <>
            <div className='absences-page'>
                <AbsencesFilters />
                <div className='inner'>
                    <PassTable />
                </div>
            </div>
        </>
    );
};

export default RequestAbsences;
