import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchAbsenceById, loadAbsenceDocuments } from '../../api/absences/absencesService';
import InfoChip from '../../components/chip/InfoChip';
import { transformDateHHMM, transformDate } from '../../utils/converter/dateConverter';
import { CLIENT_ERROR, SERVER_ERROR } from '../../utils/constants/errorCode';
import { ErrorToast, SuccessToast } from '../../utils/notifications/notifications';
import { useDispatch } from 'react-redux';
import { clearSession } from '../../store/actions/authAction';

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadFiles = async () => {
        for (let i = 0; i < details.documents.length; i++) {
            await loadAbsenceDocuments(details.documents[i].id)
                .then((response) => {
                    if (!response) {
                        return ErrorToast(CLIENT_ERROR);
                    }
                    if (!response.ok) {
                        if (response.status === 403) {
                            navigate('/forbidden');
                            return;
                        }
                        if (response.status === 401) {
                            dispatch(clearSession());
                            navigate('/login');
                            return;
                        } else {
                            return ErrorToast(SERVER_ERROR);
                        }
                    }
                    const contentType = response.headers.get('Content-Type');
                    let filename = 'download';
                    let extension = '';

                    if (contentType) {
                        switch (contentType) {
                            case 'application/pdf':
                                extension = '.pdf';
                                break;
                            case 'image/jpeg':
                                extension = '.jpg';
                                break;
                            case 'image/png':
                                extension = '.png';
                                break;
                            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                                extension = '.xlsx';
                                break;
                            case 'application/msword':
                                extension = '.doc';
                                break;
                            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                extension = '.docx';
                                break;
                            case 'text/plain':
                                extension = '.txt';
                                break;
                            case 'text/csv':
                                extension = '.csv';
                                break;
                            case 'application/zip':
                                extension = '.zip';
                                break;
                            default:
                                const contentDisposition =
                                    response.headers.get('Content-Disposition');
                                if (contentDisposition) {
                                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                                    const matches = filenameRegex.exec(contentDisposition);
                                    if (matches != null && matches[1]) {
                                        filename = matches[1].replace(/['"]/g, '');
                                    }
                                    const dotIndex = filename.lastIndexOf('.');
                                    if (dotIndex > -1) {
                                        extension = filename.substring(dotIndex);
                                        filename = filename.substring(0, dotIndex);
                                    }
                                } else {
                                    console.warn('Unknown content type:', contentType);
                                }
                        }
                    }
                    if (extension) {
                        filename += extension;
                    }

                    return response.blob().then((blob) => ({ blob, filename }));
                })
                .then(({ blob, filename }) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);

                    return SuccessToast('Файл получен');
                });
        }
    };

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
                            {details.documents && details?.documents.length > 0 && (
                                <Button
                                    variant='outlined'
                                    sx={{ marginTop: '10px', maxWidth: '200px', width: 1 }}
                                    onClick={loadFiles}
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
