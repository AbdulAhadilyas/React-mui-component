import React from 'react';

import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import myTranslator from '../../helpers/myTranslator';

export default function MyDropDown({ _url, title = 'Title', pathname, data,icon }) {
    const [open, setOpen] = React.useState();
    const navigate = useNavigate();
    const { selectedLang, translation } = useSelector(
        (state) => state.storeReducer
      );
    
    let _flag = data.filter(x => x.focus === pathname);


    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setOpen(!open)} selected={Boolean(_flag.length)}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={title} />
                    {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {data.map((_item, _i) => (
                    <List component="div" key={_i} disablePadding>
                        <ListItemButton sx={{ pl: '72px', pt: 0, pb: 0 }}
                            onClick={() => navigate(`${_url + _item.url}`)}
                            selected={pathname === _item.focus ? true : false}
                        >
                            <ListItemText primary={myTranslator(translation,selectedLang,_item.text)} sx={{
                                '& .MuiTypography-root': {
                                    fontSize: '12px'
                                }
                            }} />
                        </ListItemButton>
                    </List>
                ))}
            </Collapse>
        </>
    );
}