import React from "react";
import {
    Box,
    Stack,
    Button,
} from "@mui/material";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export default function FilterLabel({ title }) {
    return (
        <Box
            sx={{
                position: 'relative',
                paddingRight: '25px'
            }}
        >
            {title}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                }}
            >
                <Stack
                    direction='column'
                    width='25px'
                >
                    <Button
                        variant="text"
                        sx={{
                            minWidth: '10px',
                            height: '10px',
                        }}
                    >
                        <ArrowDropUpIcon sx={{ color: '#000' }} />
                    </Button>
                    <Button
                        variant="text"
                        sx={{
                            minWidth: '10px',
                            height: '10px',
                        }}
                    >
                        <ArrowDropDownIcon sx={{ color: '#000' }} />
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}