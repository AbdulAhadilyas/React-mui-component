import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export default function MyNavItem({handleClick=()=>{},focus='',title='Title',pathname='',icon}) {
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={handleClick} selected={pathname === focus ? true : false}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItemButton>
        </ListItem>
    );
}