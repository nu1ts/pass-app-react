import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { List } from '@mui/material';
import { Add } from '@mui/icons-material';

import FileItem from './FileItem';
import './index.scss';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFile({ setDocuments = null }) {
    const [files, setFiles] = React.useState([]);

    const handleFilesChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            return setFiles((prev) => {
                return [...prev, ...e.target.files];
            });
        }
        return setFiles((prev) => [...prev]);
    };

    React.useEffect(() => {
        setDocuments(files);
    }, [files]);

    return (
        <>
            {files.length ? (
                <List className='files-list'>
                    {files.map((file, index) => {
                        return <FileItem fileName={file.name} id={index} setFile={setFiles} />;
                    })}
                </List>
            ) : (
                <div className='inner-info'>
                    {'Прикрепите файлы'}
                    {<Add sx={{ color: '#d9d9d9' }} />}
                </div>
            )}
            <Button
                component='label'
                variant='contained'
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ width: 1 }}
            >
                {'Загрузить документы'}
                <VisuallyHiddenInput
                    type='file'
                    accept='image/*'
                    onChange={handleFilesChange}
                    multiple
                />
            </Button>
        </>
    );
}
