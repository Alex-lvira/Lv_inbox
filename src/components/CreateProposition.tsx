import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { supabase } from '../libs/supabase/supabaseClient';

export const CreateProposition = ({
    setContent,
    refresh
}: {
    setContent: (content: number) => void;
    refresh: () => void;
}) => {
    const [summary, setSummary] = useState('');
    const [url, setUrl] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [sentBy, setSentBy] = useState('');
    const [date, setDate] = useState<Date | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const validateImageUrl = (url: string) => {
        return /\.(png|webp|gif|jpeg|jpg)$/.test(url);
    };

    const handleSend = async () => {
        setError(false);
        setErrorMessage('');

        if (!validateImageUrl(url)) {
            setError(true);
            setErrorMessage('Bildlänk måste vara i formaten .png, .webp, .gif eller .jpeg');
            return;
        }

        const links = url.split(',').map((link) => link.trim());
        const propositionData = {
            type: 1,
            proposition: summary,
            date: date ? date.toISOString() : null,
            jeopardyType: null,
            reporter: sentBy,
            image: links[0] ? links[0] : null,
            standing: checked,
            links: links
        };

        try {
            const { error } = await supabase.from('Proposition').insert([propositionData]);
            if (error) {
                console.error('Error inserting data:', error);
                throw error;
            } else {
                refresh();
                setContent(1);
            }
            // Optionally, clear the form or show a success message
        } catch (error) {
            console.error('Error inserting data:', error);
        }
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
                    sx={{ width: '235px' }}
                    color="secondary"
                    value={url}
                    label="Bildlänk"
                    error={error}
                    helperText={error ? errorMessage : ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setUrl(event.target.value);
                    }}
                />
                <FormControl sx={{ mt: 2, width: '235px' }}>
                    <InputLabel>Inskickare</InputLabel>
                    <Select
                        value={sentBy}
                        onChange={(e) => setSentBy(e.target.value)}
                        label="Inskickare"
                    >
                        {[
                            'Samuel',
                            'Alex',
                            'Hanna',
                            'Jonas',
                            'Jessica',
                            'Jenny',
                            'Christopher',
                            'Jacob'
                        ].map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        ml: '93px'
                    }}
                >
                    <DatePicker
                        disabled={checked}
                        sx={{ width: '235px' }}
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                    />
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
                    onClick={handleSend}
                >
                    Skicka!
                </Button>
            </Box>
        </Box>
    );
};
