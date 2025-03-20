import { createTheme } from '@mui/material/styles';

const appTheme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                background: { default: '#ffffff', paper: '#0072bb' },
            },
        },
        
    },
    textColor: {
        main: '#fff',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

export default appTheme