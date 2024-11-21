import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    IconButton,
    Divider,
    Box
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState } from 'react';
import '../css/dot.css';
import '../css/card.css';
import { isToday } from 'date-fns';

const urlShortener = (url: string): string => {
    let simplified = url.replace(/^(?:https?:\/\/)?(?:www\.)?/, '');
    simplified = simplified.split('.')[0];
    return simplified;
};

export const PropositionCard = ({
    content,
    image,
    links,
    date,
    reporter,
    likes,
    standing,
    id,
    updateLikes
}: {
    content: string;
    image: string | null;
    links: string[];
    date: any;
    reporter: string;
    likes: number;
    id: string;
    standing: boolean;
    updateLikes: (id: string, likes: number) => void;
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const update = () => {
        if (!isLiked) {
            setIsLiked(true);
            updateLikes(id, likes + 1);
        } else {
            setIsLiked(false);
            updateLikes(id, likes - 1);
        }
    };

    const isDateToday = isToday(new Date(date));

    return (
        <Card
            className={isDateToday ? 'pulse-animation' : ''}
            sx={{ maxWidth: 345, minHeight: '349px' }}
            elevation={3}
        >
            {image ? (
                <CardMedia component="img" height="140" image={image} />
            ) : (
                <CardMedia component="img" height="140" image={'/513.webp'} />
            )}
            <CardContent sx={{ minHeight: '113px' }}>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontFamily: 'Gilroy-SemiBold' }}
                >
                    {content}
                </Typography>
                <Divider variant="fullWidth" sx={{ mt: '1rem', mb: '0.3rem' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '8px' }}>
                    {standing ? (
                        <>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: '600',
                                    fontFamily: 'Gilroy-SemiBold'
                                }}
                            >
                                Stående
                            </Typography>
                            <div className="ring-container">
                                <div className="ringring"></div>
                                <div className="circle"></div>
                            </div>
                        </>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                width: '100%'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: '600',
                                        fontFamily: 'Gilroy-SemiBold'
                                    }}
                                >
                                    När?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: '800',
                                        fontFamily: 'Gilroy-Bold'
                                    }}
                                >
                                    {isDateToday ? 'Idag' : date}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        color: 'text.secondary',
                                        fontWeight: '600',
                                        fontFamily: 'Gilroy-Bold'
                                    }}
                                >
                                    Skapad av:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: '800',
                                        fontFamily: 'Gilroy-Bold'
                                    }}
                                >
                                    {reporter}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <Divider />
                {links &&
                    links.map((l, i) => (
                        <Button
                            onClick={() => window.open(l, '_blank')}
                            variant="contained"
                            key={i}
                            size="small"
                            sx={{
                                textTransform: 'none',
                                fontSize: '9px',
                                backgroundColor: '#273036'
                            }}
                        >
                            {urlShortener(l)}
                        </Button>
                    ))}

                <Box
                    sx={{
                        marginLeft: 'auto',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{ marginLeft: 'auto', fontWeight: '600', fontSize: '18px', mt: '5px' }}
                    >
                        {likes}
                    </Typography>
                    <IconButton onClick={() => update()} sx={{ marginLeft: 'auto' }}>
                        {isLiked ? (
                            <ThumbUpIcon sx={{ color: '#273036' }} />
                        ) : (
                            <ThumbUpOutlinedIcon sx={{ color: '#273036' }} />
                        )}
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
};
