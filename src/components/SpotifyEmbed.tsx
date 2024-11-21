import { Box, Button, CircularProgress, List, ListItem, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import '../css/card.css';
import { useState } from 'react';
import { AddSpotifySongModal } from './AddSpotifySongModal';

export interface SpotifyEmbed {
    link: string;
    sentBy: string;
}

const openInSpotify = (url: string) => {
    return window.open(url, '_blank');
};

export const SpotifyEmbeds = ({
    props,
    refreshSongs
}: {
    props: SpotifyEmbed[];
    refreshSongs: () => void;
}) => {
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState<boolean[]>(Array(props.length).fill(false));

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleIframeLoad = (index: number) => {
        setLoaded((prevLoaded) => {
            const newLoaded = [...prevLoaded];
            newLoaded[index] = true;
            return newLoaded;
        });
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '350px',
                overflowY: 'auto',
                backgroundColor: '#273036',
                padding: '1rem'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    mb: '1rem'
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
                <MusicNoteIcon
                    className="rainbow-icon"
                    sx={{ mt: '6px', color: '#fff', marginLeft: 'auto' }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '1rem'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Gilroy-Regular',
                        fontSize: '11px',
                        color: '#fff',
                        mt: '-18px',
                        opacity: 0.7,
                        ml: '2px'
                    }}
                >
                    Blandar och visar låtar som skickats in denna vecka
                </Typography>
            </Box>
            <List>
                {props.map((embed: SpotifyEmbed, index: number) => (
                    <ListItem key={index} sx={{ padding: 0, marginBottom: '0rem' }}>
                        <Box sx={{ width: '100%', position: 'relative' }}>
                            {!loaded[index] && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '80px',
                                        backgroundColor: '#1e1e1e',
                                        borderRadius: '6px'
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
                                style={{
                                    border: 'none',
                                    display: loaded[index] ? 'block' : 'none'
                                }}
                                onLoad={() => handleIframeLoad(index)}
                            ></iframe>
                            <Box
                                justifyContent={'space-between'}
                                sx={{ width: '100%', display: 'flex', mt: '6px' }}
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
                                <button
                                    onClick={() => openInSpotify(embed.link)}
                                    className="pulses"
                                    style={{ textTransform: 'none', color: '#fff' }}
                                >
                                    <Typography
                                        sx={{ fontFamily: 'Gilroy-Medium', fontSize: '12px' }}
                                    >
                                        Öppna
                                    </Typography>
                                </button>
                            </Box>
                        </Box>
                    </ListItem>
                ))}
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
                <Button
                    variant="contained"
                    sx={{
                        color: '#273036',
                        textTransform: 'none',
                        fontFamily: 'Gilroy-Medium',
                        fontSize: '16px',
                        backgroundColor: '#fff',
                        '&:hover': { color: 'green' },
                        '&:focus': { color: '#273036' }
                    }}
                    onClick={handleOpen}
                    endIcon={<img src="/Lv_inbox/spotify_green.png" height="16px" width="16px" />}
                >
                    Skicka in musik
                </Button>
            </Box>
            <AddSpotifySongModal
                open={open}
                refreshSongs={refreshSongs}
                handleClose={handleClose}
            />
        </Box>
    );
};

export default SpotifyEmbeds;

export const extractSpotifyId = (url: string): string | null => {
    const regex = /(?:https:\/\/open\.spotify\.com\/track\/)([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
