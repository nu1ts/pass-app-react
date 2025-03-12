import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { List } from '@mui/material';

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

export default function InputFile() {
    const [files, setFiles] = React.useState([]);
    const handleFilesChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFiles([...e.target.files]);
        }
        console.log(files);
    };
    const removeFile = (id) => {
        setFiles((prev) => {
            prev.filter((file) => file.id !== id);
        });
    };
    return (
        <>
            <List className='files-list'>
                {files.map(({ name }, id) => {
                    return <FileItem fileName={name} id={id} />;
                })}
            </List>
            <Button
                component='label'
                variant='contained'
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                {'Загрузить документы'}
                <VisuallyHiddenInput
                    type='file'
                    onChange={handleFilesChange}
                    multiple={true}
                    accept='.png, .jpeg, image/*'
                />
            </Button>
        </>
    );
}
