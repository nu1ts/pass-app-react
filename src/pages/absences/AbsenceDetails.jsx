import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchAbsenceById } from '../../api/absences/absencesService';

const AbsenceDetails = () => {
    const { id } = useParams();
    const { details, setDetails } = useState({});
    const getDetails = async () => {
        const response = await fetchAbsenceById(id);
        if (response.ok) {
            console.log(await response.json());
        }
    };
    useEffect(() => {
        getDetails();
    }, []);
    return (
        <>
            <div className='absences-page'>
                <div className='flex column-d align-items-center'>
                    <form className='absence-create-form' action=''>
                        <h1>Детали пропуска</h1>
                        <div className='absence-details'>
                            <span>Причина: Болезнь</span>
                            <span>Дата начала: Болезнь</span>
                            <span>Дата окончания: Болезнь</span>
                            <span>Статус: Болезнь</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AbsenceDetails;
