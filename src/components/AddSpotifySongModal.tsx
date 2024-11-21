import {
    Modal,
    Fade,
    Box,
    Typography,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    SxProps
} from '@mui/material';
import { useState } from 'react';
import { supabase } from '../libs/supabase/supabaseClient';

interface ErrorSpecific {
    errorDescription: string;
}

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '6px',
    boxShadow: 24,
    p: 4
};

const spotifyValidation = (url: string) => {
    const spotifyBaseUrl = 'https://open.spotify.com/track/';
    return url.startsWith(spotifyBaseUrl);
};

export const AddSpotifySongModal = ({
    open,
    handleClose,
    refreshSongs
}: {
    open: boolean;
    handleClose: () => void;
    refreshSongs: () => void;
}) => {
    const [spotifyUrl, setSpotifyUrl] = useState('');
    const [sentBy, setSentBy] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState<ErrorSpecific[]>([]);

    const handleSend = async () => {
        setLoading(true);
        setIsError(false);
        setErrors([]);

        if (!spotifyValidation(spotifyUrl)) {
            setIsError(true);
            setErrors([{ errorDescription: 'Invalid Spotify URL' }]);
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('SongsOfTheWeek')
                .insert([{ link: spotifyUrl, sentBy: sentBy }]);
            if (error) {
                setErrors([{ errorDescription: 'Error inserting data into database' }]);
                throw error;
            }
            handleClose();
            refreshSongs();
        } catch (error) {
            setErrors([{ errorDescription: 'Error inserting data into database' }]);
            console.error('Error inserting data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition sx={{ border: 'none' }}>
            <Fade in={open}>
                <Box sx={style}>
                    <Typography sx={{ fontFamily: 'Gilroy-Medium' }} variant="h5" component="span">
                        Skicka in musik
                    </Typography>
                    <Typography sx={{ mt: 2, fontFamily: 'Gilroy-Medium', fontSize: '16px' }}>
                        Här kan du skicka in din favoritmusik för veckan.
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            sx={{
                                fontFamily: 'Gilroy-Regular',
                                color: 'darkgreen',
                                fontSize: '12px'
                            }}
                        >
                            e.g:
                        </Typography>
                        <Typography
                            fontStyle={'italic'}
                            sx={{
                                fontFamily: 'Gilroy-Regular',
                                color: 'grey',
                                fontSize: '12px',
                                ml: '4px',
                                fontStyle: 'italic'
                            }}
                        >
                            https://open.spotify.com/track/ + id{' '}
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        label="Spotify URL"
                        value={spotifyUrl}
                        onChange={(e) => setSpotifyUrl(e.target.value)}
                        sx={{ mt: 2 }}
                        error={isError}
                        helperText={isError ? errors[0].errorDescription : ''}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Inskickare</InputLabel>
                        <Select
                            value={sentBy}
                            onChange={(e) => setSentBy(e.target.value)}
                            label="Sent By"
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
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Button
                            variant="contained"
                            onClick={handleSend}
                            sx={{
                                mt: 2,
                                backgroundColor: '#273036',
                                textTransform: 'none',
                                fontFamily: 'Gilroy-Medium',
                                fontSize: '12px',
                                marginLeft: 'auto'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Skickar...' : 'Skicka'}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};
