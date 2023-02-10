import React from 'react';
import {
    Button,
    CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import myTranslator from '../../helpers/myTranslator';

function LoadingButton({
    loading = false,
    title = 'label',
    ...props
}) {
    const { selectedLang, translation } = useSelector(
        (state) => state.storeReducer
    );

    return (
        <Button
            {...props}
        >
            {loading ? (
                <CircularProgress
                    size={18}
                    sx={{ color: "#fff", mr: 1, size: "12px" }}
                />
            ) : null}
            {myTranslator(translation, selectedLang, title)}
        </Button>
    );
}

export default LoadingButton;