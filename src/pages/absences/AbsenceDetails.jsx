import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchAbsenceById } from '../../api/absences/absencesService';
import InfoChip from '../../components/chip/InfoChip';
import { transformDateHHMM, transformDate } from '../../utils/converter/dateConverter';

const statuses = {
    Pending: 'default',
    Approved: 'success',
    Rejected: 'error',
};
const statusName = {
    Pending: 'На проверке',
    Approved: 'Одобрен',
    Rejected: 'Отклонен',
};

const reason = {
    Sick: 'Болезнь',
    Family: 'Семейные обстоятельства',
    Academic: 'Учебная',
};

const AbsenceDetails = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});

    const getDetails = async () => {
        const response = await fetchAbsenceById(id);
        if (response.ok) {
            let data = await response.json();
            console.log(data);
            setDetails(data);
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
                        <div className='flex column-d justify-content-sb w-100 '>
                            <div className='flex row-d align-items-center justify-content-sb w-100 '>
                                <h1>Детали пропуска</h1>
                                <InfoChip
                                    title={statusName[details?.status]}
                                    color={statuses[details?.status]}
                                />
                            </div>
                            <div className='absence-details'>
                                <span>Причина: {reason[details?.type]}</span>
                                {details?.startDate && (
                                    <span>Дата начала: {transformDate(details?.startDate)}</span>
                                )}
                                {details?.endDate && (
                                    <span>Дата окончания: {transformDate(details?.endDate)}</span>
                                )}
                                <span>
                                    Заявление в деканат:{' '}
                                    {details?.declarationToDean ? 'Есть' : 'Нет'}
                                </span>
                                {details.rejectionReason && (
                                    <span>Комментарий: {details?.rejectionReason}</span>
                                )}
                            </div>
                            {details?.documents && (
                                <Button
                                    variant='outlined'
                                    sx={{ marginTop: '10px', maxWidth: '200px', width: 1 }}
                                >
                                    Скачать документы
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AbsenceDetails;
