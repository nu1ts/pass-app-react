import React from 'react';
import { ListItem } from '@mui/material';
import { Close } from '@mui/icons-material';
import './index.scss';

const FileItem = ({ id, fileName, setFile }) => {
    const removeFile = () => {
        setFile((prev) => {
            return [...prev].filter((file, index) => index !== id);
        });
    };
    return (
        <ListItem key={id} className='files-list__list-item'>
            <span>{fileName}</span>
            <Close className='close-btn' onClick={removeFile} />
        </ListItem>
    );
};

export default FileItem;
