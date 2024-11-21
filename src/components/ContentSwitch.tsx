import { Fade, Box, Button, Badge } from '@mui/material';
import Grid from '@mui/material/Grid2';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PropositionCard } from './PropositionCard';
import { CreateProposition } from './CreateProposition';

export const ContentSwitch = ({
    page,
    propositions,
    setContent,
    updateLikes,
    refresh
}: {
    page: number;
    propositions: any[];
    setContent: (c: number) => void;
    updateLikes: (id: string, likes: number) => void;
    refresh: () => void;
}) => {
    switch (page) {
        case 0:
            return (
                <Fade style={{ height: '100%' }} in={true} timeout={2000}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            onClick={() => setContent(1)}
                            endIcon={
                                <Badge
                                    variant="dot"
                                    slotProps={{
                                        badge() {
                                            return { sx: { backgroundColor: 'limegreen' } };
                                        }
                                    }}
                                    invisible={propositions.length === 0}
                                >
                                    <InboxIcon sx={{ fontSize: '48px', ml: '10px' }} />
                                </Badge>
                            }
                            size="large"
                            sx={{
                                textTransform: 'none',
                                backgroundColor: '#273036',
                                fontSize: '32px',
                                width: '265px',
                                borderRadius: '10px',
                                fontFamily: 'Gilroy-Regular'
                            }}
                            variant="contained"
                        >
                            Aktiviteter
                        </Button>
                        <Button
                            onClick={() => setContent(2)}
                            endIcon={
                                <>
                                    <MailIcon sx={{ fontSize: '48px !important' }} />
                                </>
                            }
                            size="medium"
                            sx={{
                                textTransform: 'none',
                                backgroundColor: '#273036',
                                fontSize: '40px',
                                width: '265px',
                                height: '72px',
                                borderRadius: '10px',
                                fontFamily: 'Gilroy-Regular'
                            }}
                            variant="contained"
                        >
                            Föreslå
                        </Button>
                    </Box>
                </Fade>
            );
        case 1:
            return (
                <Box
                    sx={{
                        minWidth: 1000,
                        minHeight: 850,
                        backgroundColor: 'rgba(255,255,255,1)',
                        borderRadius: '6px',
                        boxShadow: '0px 26px 43px -38px rgba(0,0,0,0.99)',
                        padding: '4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {propositions.map((p, i) => (
                            <Grid key={i} size={3}>
                                <PropositionCard
                                    content={p.proposition}
                                    image={p.image}
                                    reporter={p.reporter}
                                    links={p.links}
                                    date={p.date}
                                    likes={p.likes}
                                    standing={p.standing}
                                    id={p.id}
                                    updateLikes={updateLikes}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        sx={{
                            textTransform: 'none',
                            backgroundColor: '#273036',
                            width: '125px',
                            marginTop: 'auto',
                            fontFamily: 'Gilroy-Regular'
                        }}
                        variant="contained"
                        onClick={() => setContent(0)}
                        endIcon={<ArrowBackIcon />}
                    >
                        Tillbaka
                    </Button>
                </Box>
            );
        case 2:
            return (
                <Box
                    sx={{
                        minWidth: 1000,
                        minHeight: 850,
                        backgroundColor: 'rgba(255,255,255,1)',
                        borderRadius: '6px',
                        boxShadow: '0px 26px 43px -38px rgba(0,0,0,0.65)',
                        padding: '4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start'
                    }}
                >
                    <CreateProposition setContent={setContent} refresh={refresh} />
                    <Button
                        sx={{
                            textTransform: 'none',
                            backgroundColor: '#273036',
                            width: '125px',
                            marginTop: 'auto',
                            fontFamily: 'Gilroy-Regular'
                        }}
                        variant="contained"
                        onClick={() => setContent(0)}
                        endIcon={<ArrowBackIcon />}
                    >
                        Tillbaka
                    </Button>
                </Box>
            );

        default:
            return <div></div>;
    }
};
