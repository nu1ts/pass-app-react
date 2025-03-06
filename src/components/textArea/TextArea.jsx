import * as React from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

export default function Textarea({ comment }) {
    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    font-family: Roboto, sans-serif;
    padding: 8px 12px;
    margin-top: 20px;
    border-radius: 4px;
    color: #323548;
    background: inherit;
    border: 1px solid #d9d9d9;
  `,
    );

    return (
        <Textarea
            minRows={3}
            maxRows={6}
            placeholder='Комментарий'
            readOnly={true}
            value={comment}
        />
    );
}
