import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const CreateProposition = () => {
    const [summary, setSummary] = React.useState('');
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (name: any) => {
        console.log(name);
        setAnchorEl(null);
    };

    function setValidUrl(url: any) {
        setUrl(url);
        try {
            if (!url.includes('https')) {
                new URL('https://' + url);
            } else {
                new URL(url);
            }
            return setError(false);
        } catch (err) {
            return setError(true);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                justifyContent: 'center',
                justifyItems: 'center'
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontSize: '48px',
                        color: '#273036',
                        fontWeight: 700,
                        fontFamily: 'Gilroy-Regular'
                    }}
                >
                    Skapa ett förslag!
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TextField
                    sx={{ width: '235px' }}
                    multiline
                    color="secondary"
                    value={summary}
                    label="Summering"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSummary(event.target.value);
                    }}
                />
                <TextField
                    color="secondary"
                    value={url}
                    label="Länk"
                    error={error}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setValidUrl(event.target.value);
                    }}
                />
                <TextField
                    sx={{ width: '235px' }}
                    label="Länk"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value);
                    }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClick}>
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        ml: '93px'
                    }}
                >
                    <DatePicker disabled={checked} sx={{ width: '235px' }} />
                    <Box>
                        <Switch checked={checked} onChange={handleChange} />
                        <Typography sx={{ fontFamily: 'Gilroy-Regular', color: '#273036' }}>
                            Stående
                        </Typography>
                    </Box>
                </Box>
                <Button
                    sx={{
                        width: '100px',
                        backgroundColor: '#273036',
                        textTransform: 'none',
                        fontFamily: 'Gilroy-Regular'
                    }}
                    variant="contained"
                >
                    Skicka!
                </Button>
            </Box>
        </Box>
    );
};
