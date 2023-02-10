import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Box,
    IconButton,
    Stack
} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../../store/reducer';
import LangSelector from '../lang-selector/lang-selector';

export default function AdminHeader({ hideMenu }) {
    const matches = useMediaQuery('(min-width:900px)');
    const dispatch = useDispatch();

    return (
        <header>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                sx={{
                    backgroundColor: '#000',
                    p: '15px'
                }}
            >
                <div>
                    {!matches &&
                        !hideMenu &&
                        <IconButton
                            onClick={() => dispatch(toggleMenu(true))}
                        >
                            <ListIcon
                                sx={{
                                    color: '#fff'
                                }}
                            />
                        </IconButton>
                    }
                </div>
                <Box
                    component='div'
                >
                    <SideButtons />
                </Box>
            </Stack>
        </header>
    );
}

const SideButtons = () => {
    const renderBtn = (handleChange, icon) => {
        return <IconButton
            onClick={handleChange}
            size='small'
            sx={{
                color: '#000',
                backgroundColor: '#fff',
                transition: '0.2s all ease-in-out',
                '&:hover': {
                    backgroundColor: '#fff',
                    transform: 'scale(1.1)'
                }
            }}>
            {icon}
        </IconButton>
    }

    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent={{ sm: 'center', md: 'flex-end' }}
            spacing={2}
        >
            <LangSelector/>
            {renderBtn(() => { }, <PersonIcon />)}
        </Stack>
    )
}
