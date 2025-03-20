import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import './index.scss';

export default function PaginationComponent({ count = 10 }) {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination
                count={count}
                className='pagination'
                page={page}
                sx={{ paddingTop: '10px' }}
                shape='rounded'
                onChange={handleChange}
                size='large'
                renderItem={(item) => (
                    <PaginationItem sx={{ fontSize: '16px', fontWeight: '500' }} {...item} />
                )}
            />
        </Stack>
    );
}
