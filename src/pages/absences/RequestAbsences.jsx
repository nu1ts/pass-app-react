import React from 'react';

import './index.scss';
import { RequestFilters } from '../../components/filters/AbsencesFilter';
import PassTable from '../../components/table/PassTable';

const RequestAbsences = () => {
    return (
        <>
            <div className='absences-page'>
                <RequestFilters />
                <div className='inner'>
                    <PassTable />
                </div>
            </div>
        </>
    );
};

export default RequestAbsences;
