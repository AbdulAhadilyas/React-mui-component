
import {
    Stack,
    Typography,
    Tooltip
} from "@mui/material";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useSelector } from "react-redux";
import myTranslator from "../../helpers/myTranslator";

function InfoHeading({ containerSx, variant, iconColor, iconSize, infoText, text, ...props }) {
    const { selectedLang, translation } = useSelector((state) => state.storeReducer);

    return (
        <Stack
            direction="row"
            alignItems='center'
            spacing={1}
            sx={containerSx}
        >
            <Typography
                variant={variant}
                {...props}
            >
                {myTranslator(translation, selectedLang, text)}
            </Typography>
            <Tooltip title={infoText} color={iconColor} placement='top'>
                <InfoRoundedIcon sx={{ fontSize: iconSize }} />
            </Tooltip>
        </Stack>
    );
}

InfoHeading.defaultProps = {
    infoText: 'info',
    text: 'heading',
    containerSx: {},
    variant: 'p',
    iconSize: '20px',
    iconColor: 'default'
}

export default InfoHeading;