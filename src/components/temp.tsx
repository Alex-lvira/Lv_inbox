import { useState } from 'react';
import {
    Box,
    List,
    ListItem,
    Typography,
    Button,
    Modal,
    Fade,
    Backdrop,
    CircularProgress
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import '../css/card.css'; // Ensure this file is imported

export interface SpotifyEmbed {
    link: string;
    sentBy: string;
}

const openInSpotify = (url: string) => {
    return window.open(url, '_blank');
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export const SpotifyEmbeds = ({ props }: { props: SpotifyEmbed[] }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box
            sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '350px', // Increased width
                overflowY: 'auto',
                backgroundColor: '#273036',
                padding: '1rem'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Gilroy-Regular',
                        fontSize: '24px',
                        color: '#fff'
                    }}
                >
                    Veckans mix:
                </Typography>
                <MusicNoteIcon className="rainbow-icon" sx={{ mt: '6px' }} />
            </Box>
            <List>
                {props.map((embed: SpotifyEmbed, index: number) => {
                    const [loaded, setLoaded] = useState(false);

                    return (
                        <ListItem key={index} sx={{ padding: 0, marginBottom: '0rem' }}>
                            <Box sx={{ width: '100%', position: 'relative' }}>
                                {!loaded && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '80px',
                                            backgroundColor: '#1e1e1e'
                                        }}
                                    >
                                        <CircularProgress />
                                    </Box>
                                )}
                                <iframe
                                    src={`https://open.spotify.com/embed/track/${extractSpotifyId(embed.link)}`}
                                    width="100%"
                                    height="80"
                                    allow="encrypted-media"
                                    loading="lazy"
                                    style={{ border: 'none', display: loaded ? 'block' : 'none' }}
                                    onLoad={() => setLoaded(true)}
                                ></iframe>
                                <Box
                                    justifyContent={'space-between'}
                                    sx={{ width: '100%', display: 'flex' }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginBottom: '1rem',
                                            fontSize: '12px',
                                            fontFamily: 'Gilroy-Medium',
                                            color: '#fff'
                                        }}
                                    >
                                        Inskickad av:{' '}
                                        <span style={{ fontFamily: 'Gilroy-Bold' }}>
                                            {embed.sentBy}
                                        </span>
                                    </Typography>
                                </Box>
                            </Box>
                            <button
                                onClick={() => openInSpotify(embed.link)}
                                className="pulses"
                                style={{ textTransform: 'none' }}
                            >
                                <Typography sx={{ fontFamily: 'Gilroy-Medium', fontSize: '12px' }}>
                                    Öppna
                                </Typography>
                            </button>
                        </ListItem>
                    );
                })}
            </List>
            <Box
                sx={{
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: '#273036',
                    padding: '1rem',
                    textAlign: 'center'
                }}
            >
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Skicka in musik
                </Button>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Skicka in musik
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Här kan du skicka in din favoritmusik för veckan.
                        </Typography>
                        {/* Add your form or input fields here */}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default SpotifyEmbeds;

export const extractSpotifyId = (url: string): string | null => {
    const regex = /(?:https:\/\/open\.spotify\.com\/track\/)([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
