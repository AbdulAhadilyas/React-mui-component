import React from "react";
import {
    Box,
    Stack,
    Button,
} from "@mui/material";
import ImageRenderer from "../image-renderer/image-renderer";
import { useSelector } from "react-redux";
import { logo2 } from "../../assets";

function FilterWrapper({ tableFilters, clearFilters, isApplied, btn, filters,defaultImg=false }) {
    const orgID = useSelector((state) => state.storeReducer.user.organization_id);

    const tableFiltersContainer = () => {
        return (
            <Stack direction="row" alignItems="flex-start" spacing={1}
                sx={{
                    "& > div": { width: { md: "fit-content !important", xs: "50% !important" } },
                }}
            >
                {tableFilters}
            </Stack>
        )
    }

    const useFilters = () => {
        return (
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
            >
                <Box width='100%'>
                    <Box width='100%'>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            justifyContent={{ xs: "center", md: "flex-start" }}
                            alignItems={{ xs: "center", md: "flex-end" }}
                            spacing={1}
                            flexWrap="wrap"
                            sx={{
                                "& > div,& > button": { mt: "10px !important" },
                                "& > div": { width: { md: "fit-content !important", xs: "100% !important" } },
                            }}
                        >
                            {filters}
                            {btn}
                            {isApplied &&
                                <Button
                                    variant="contained"
                                    onClick={clearFilters}
                                    sx={{ borderRadius: "25px", textTransform: "none", width: { md: "fit-content", xs: "100%" } }}
                                >
                                    Clear
                                </Button>
                            }
                        </Stack>
                    </Box>
                    <Box mt={2} display={{ xs: 'none', md: 'block' }}>
                        {tableFiltersContainer()}
                    </Box>
                </Box>
                <Box sx={{ display: { md: "block", xs: "none" } }}>
                    {defaultImg ?
                        <img src={logo2} width='150px' height='75px' alt='' />
                        :
                        <ImageRenderer url={`organization-logo/${orgID}`} width={150} height={75} />
                    }
                </Box>
            </Stack>
        );
    };

    return (
        <>
            {useFilters()}
            <Box display={{ xs: 'block', md: 'none' }} mb={2}>
                {tableFiltersContainer()}
            </Box>
        </>
    )
}
export default FilterWrapper;