import React from 'react';
import { ListItem } from '@mui/material';
import { Close } from '@mui/icons-material';
import './index.scss';

const FileItem = ({ id, fileName = 'name.png', onDelete }) => {
    return (
        <ListItem key={id} className='files-list__list-item'>
            <span>{fileName}</span>
            <Close className='close-btn' onClick={onDelete} />
        </ListItem>
    );
};

export default FileItem;
