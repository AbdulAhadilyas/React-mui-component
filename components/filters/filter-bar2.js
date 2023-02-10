import React from "react";
import {
    Box,
    Stack,
    Button,
} from "@mui/material";

import SelectBox from "../custom-inputs/select-box";
import SearchBox from "../custom-inputs/select-box";

export default function FilterBar2({ type = '1' }) {
    return (
        <>
            <Box>
                <Stack
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='flex-end'
                    spacing="5px"
                    flexWrap='wrap'
                    sx={{ '& > div,& > button': { marginTop: '10px !important' } }}
                >
                    <SearchBox
                        size="small"
                        label="Search"
                    />

                    {type === '1' &&
                        <>
                            <SelectBox items={['All', 'other']} label='Technologies' size='small' />
                            <SelectBox items={['ge', 'en']} label='Language' size='small' />
                        </>
                    }
                    {type === '2' &&
                        <SelectBox items={['All', 'other']} label='component type' size='small' />
                    }
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#464646",
                            borderRadius: "25px",
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: "#464646",
                            }
                        }}
                    >
                        Use
                    </Button>
                </Stack>
            </Box>
            <Box sx={{ mt: '15px' }}>
                <Stack
                    direction='row'
                    alignItems='flex-start'
                    spacing='5px'
                >
                    <SelectBox items={['Alle', 'Alle']} label='Spalten' size='small' />
                    <SelectBox items={['Alle', 'Alle']} label='Gezeigt' size='small' />
                </Stack>
            </Box>
        </>
    )
}