import React from 'react';
import { RequestFilters } from '../../components/filters/AbsencesFilter';
import PassTable from '../../components/table/PassTable';
import './index.scss';

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
