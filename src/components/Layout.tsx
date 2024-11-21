import { Box } from '@mui/material';

export const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            {children}
        </Box>
    );
};
