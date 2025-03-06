import { Stack } from '@mui/system';
import { Typography, Chip } from '@mui/material';

import imgSrc from '../../assets/logo.png';

export function CustomAppTitle() {
    return (
        <Stack direction='row' alignItems='center' spacing={1} sx={{ marginLeft: '20px' }}>
            <img src={imgSrc} width={39} height={42} alt='TSU logo' />
            <Typography
                variant='h6'
                sx={{ color: '#fff', fontWeight: '600', textShadow: '0 2px 2px #4b4b4b' }}
            >
                TSU.PASS
            </Typography>
            <Chip size='small' label='БЕТА' color='info' />
        </Stack>
    );
}
