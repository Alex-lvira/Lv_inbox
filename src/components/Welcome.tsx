import { Box, Fade, Typography } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { ContentSwitch } from './ContentSwitch';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const Welcome = () => {
    const [propositions, setPropositions] = useState<any[]>([]);
    const [content, setContent] = useState<number>(0);

    const updateLikes = async (id: string, likes: number) => {
        const { error } = await supabase.from('Proposition').update({ likes: likes }).eq('id', id);
        console.log(error);
        getpropositions();
    };

    useEffect(() => {
        getpropositions();
    }, []);

    console.log(propositions);

    async function getpropositions() {
        const { data } = await supabase.from('Proposition').select();
        if (data) setPropositions(data);
    }

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
                        Lvira's Partybox
                        <img
                            style={{ marginLeft: '2rem' }}
                            src="/Lv_inbox/512.webp"
                            alt="🥳"
                            width="100"
                            height="100"
                        ></img>
                    </Typography>
                )}
                <ContentSwitch
                    page={content}
                    setContent={(c: number) => setContent(c)}
                    propositions={propositions}
                    updateLikes={updateLikes}
                />
            </Box>
        </Fade>
    );
};
