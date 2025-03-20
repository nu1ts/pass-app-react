import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setPagination } from '../../store/reducers/absencesReducer';

export default function PaginationComponent({ count = 10 }) {
    const { pagination } = useSelector((state) => state.absences);
    const [page, setPage] = React.useState(pagination.current);
    const dispatch = useDispatch();
    const handleChange = (event, value) => {
        setPage(value);
    };
    React.useEffect(() => {
        dispatch(setPagination({ count: pagination.count, size: pagination.size, current: page }));
    }, [page]);

    return (
        <Stack spacing={2}>
            <Pagination
                count={
                    Math.ceil(pagination.count / pagination.size) > 1
                        ? Math.ceil(pagination.count / pagination.size)
                        : 0
                }
                className='pagination'
                page={page}
                sx={{
                    boxSizing: 'border-box',
                    padding: '10px 20px',
                    margin: '0 20px',
                }}
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
