import React, { useState } from 'react';
import {
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';

import myTranslator from '../../helpers/myTranslator';

export default function SearchBox({
    labelTop = '',
    initValue = '',
    handleChange = (e) => { },
    name = '',
    ...props }) {

    const [value, setValue] = useState('');
    const { selectedLang, translation } = useSelector(
        (state) => state.storeReducer
    );

    React.useEffect(() => {
        if (initValue !== '') {
            setValue(initValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {labelTop &&
                <InputLabel htmlFor={name}
                    sx={{
                        marginBottom: '5px',
                        color: '#000'
                    }}>
                    {myTranslator(translation, selectedLang, labelTop)}
                </InputLabel>
            }
            <TextField
                type="text"
                name={name}
                value={value}
                color='success'
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                type='button'
                                onClick={() => handleChange(value)}
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                {...props}
            />
        </div>
    );
}