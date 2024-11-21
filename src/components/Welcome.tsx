import { Box, Fade, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { ContentSwitch } from './ContentSwitch';
import { SpotifyEmbeds } from './SpotifyEmbed';
import { supabase } from '../libs/supabase/supabaseClient';
import { startOfWeek, endOfWeek } from 'date-fns';

export const Welcome = () => {
    const [propositions, setPropositions] = useState<any[]>([]);
    const [embeds, setEmbeds] = useState<any[]>([]);
    const [content, setContent] = useState(0);

    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Assuming the week starts on Monday
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

    const updateLikes = async (id: string, likes: number) => {
        const { error } = await supabase.from('Proposition').update({ likes: likes }).eq('id', id);
        console.error(error);
        getpropositions();
    };

    useEffect(() => {
        getpropositions();
        getEmbeds();
    }, []);

    async function getEmbeds() {
        const { data, error } = await supabase
            .from('SongsOfTheWeek')
            .select()
            .gte('created_at', startOfCurrentWeek.toISOString())
            .lte('created_at', endOfCurrentWeek.toISOString());

        if (data) {
            const shuffledData = data.sort(() => 0.5 - Math.random());
            const limitedData = shuffledData.slice(0, 7);
            setEmbeds(limitedData);
        }
        if (error) console.error(error);
    }

    async function getpropositions() {
        const { data } = await supabase.from('Proposition').select();
        if (data) setPropositions(data);
    }

    const refreshSongs = async () => {
        await getEmbeds();
    };

    return (
        <Fade in={true} timeout={2000}>
            <Box
                sx={{
                    minWidth: 1200,
                    minHeight: 1000,
                    backgroundColor: 'rgba(255,255,255,0.0)',
                    borderRadius: '6px',
                    boxShadow: '0px 26px 43px -38px rgba(0,0,0,0.0)',
                    padding: '4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <img
                    src="/Lv_inbox/lvira.png"
                    width="158"
                    height="74"
                    style={{
                        position: 'absolute',
                        zIndex: 100,
                        right: 0,
                        bottom: 0,
                        margin: '2rem'
                    }}
                />
                {content === 0 && (
                    <Typography
                        variant="h1"
                        sx={{
                            textAlign: 'center',
                            color: '#273036',
                            display: 'flex',
                            fontFamily: 'Gilroy-SemiBold'
                        }}
                    >
                        Lvira's Partyhub
                        <img
                            style={{ marginLeft: '2rem' }}
                            src="/Lv_inbox/512.webp"
                            alt="🥳"
                            width="100"
                            height="100"
                        ></img>
                    </Typography>
                )}
                {content === 0 && <SpotifyEmbeds refreshSongs={refreshSongs} props={embeds} />}
                <ContentSwitch
                    refresh={() => getpropositions()}
                    page={content}
                    setContent={(c: number) => setContent(c)}
                    propositions={propositions}
                    updateLikes={updateLikes}
                />
            </Box>
        </Fade>
    );
};
