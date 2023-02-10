import React, { useState } from 'react';
import {
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import myTranslator from '../../helpers/myTranslator';

export default function PasswordInputField({
    labelTop = '',
    initValue = '',
    handleChange = (e) => { },
    name = '',
    error = '',
    ...props }) {
    const [value, setValue] = useState('');
    const [secureEntry, setSecureEntry] = React.useState(true);
    const { selectedLang, translation } = useSelector((state) => state.storeReducer);

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
                    {labelTop !== '' && myTranslator(translation, selectedLang, labelTop)}
                </InputLabel>
            }
            <TextField
                type={secureEntry ? "password" : "text"}
                name={name}
                error={Boolean(error !== '')}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                    handleChange(event);
                }}
                color='success'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setSecureEntry(!secureEntry)}
                            >
                                {secureEntry ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                {...props}
            />
            {error !== '' && <FormHelperText sx={{ color: 'red', mt: '0 !important' }} >{error}</FormHelperText>}
        </div>
    );
}