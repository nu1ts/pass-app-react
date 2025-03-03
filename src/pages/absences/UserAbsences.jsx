import React from 'react';
import AbsencesFilter from '../../components/filters/AbsencesFilter';
import PassTable from '../../components/table/PassTable';
import './index.scss';
const UserAbsences = () => {
    return (
        <>
            <div className='absences-page'>
                <AbsencesFilter />
                <div className='inner'>
                    <PassTable />
                </div>
            </div>
        </>
    );
};

export default UserAbsences;
