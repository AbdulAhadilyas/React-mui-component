import React, { useState } from "react";
import { Box, InputLabel, FormHelperText, TextField } from "@mui/material";
import myTranslator from "../../helpers/myTranslator";
import { useSelector } from "react-redux";

export default function InputField({
  labelTop = "",
  initValue = null,
  handleChange = (e) => { },
  styles,
  name = "",
  type = "text",
  error = "",
  multiline = false,
  rows = "",
  ...props
}) {
  const [value, setValue] = useState("");
  const { selectedLang, translation } = useSelector((state) => state.storeReducer);

  React.useEffect(() => {
    if (!!initValue) {
      setValue(initValue);
    } else {
      setValue("");
    }
  }, [initValue]);

  return (
    <Box sx={styles}>
      {labelTop && (
        <InputLabel
          htmlFor={name}
          sx={{
            marginBottom: "5px",
            color: "#000",
          }}
        >
          {myTranslator(translation, selectedLang, labelTop)}
        </InputLabel>
      )}
      <TextField
        error={Boolean(error !== '')}
        type={type}
        name={name}
        value={value}
        multiline={multiline}
        rows={rows}
        color="success"
        onChange={(event) => {
          setValue(event.target.value);
          handleChange(event);
        }}
        {...props}
      />
      {error !== "" && (
        <FormHelperText sx={{ color: "red", mt: "0 !important" }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}
