import React, { useState, useEffect } from "react";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import myTranslator from "../../helpers/myTranslator";


export default function SelectBox({
  initValue = "",
  labelTop,
  label,
  items = [],
  name = "",
  error = "",
  addNew = false,
  styles = {},
  required,
  addHandle = () => { },
  search = () => { },
  handleChange = () => { },
  ...props
}) {
  const [selected, setSelected] = useState("");
  const rand = Math.ceil(Math.random());
  const { selectedLang, translation } = useSelector((state) => state.storeReducer);
  
  useEffect(() => {
    setSelected(initValue);
  }, [initValue]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    handleChange(e);
  };

  return (
    <Box sx={styles}>
      {labelTop && (
        <InputLabel
          id={`select${rand}`}
          sx={{
            marginBottom: "5px",
            color: "#000",
          }}
        >
          {myTranslator(translation, selectedLang, labelTop)}
        </InputLabel>
      )}
      <FormControl sx={{ minWidth: "150px" }} {...props}>
        {label && (
          <InputLabel
            id={`select${rand}`}
            sx={{ backgroundColor: "#fff" }}
          >
            {label}
          </InputLabel>
        )}
        <Select
          id={`select${rand}`}
          onChange={handleSelect}
          value={selected}
          name={name}
          color='success'
          required={required}
          error={Boolean(error !== '')}
        >
          {addNew && (
            <MenuItem value="" onClick={() => addHandle(true)}>
              Add New
            </MenuItem>
          )}
          {items.map((_v, _i) => {
            if (_v.label)
              return (
                <MenuItem key={_i} value={_v.value}>
                  {myTranslator(translation, selectedLang, _v.label)}
                </MenuItem>
              );
            return (
              <MenuItem key={_i} value={_v}>
                {_v}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {error !== "" && (
        <FormHelperText sx={{ color: "red", mt: "0 !important" }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}
