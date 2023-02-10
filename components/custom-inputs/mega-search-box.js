import React, { useState } from "react";
import {
  Box,
  InputLabel,
  FormHelperText,
  TextField,
  MenuItem,
  Paper,
  Divider,
  Typography,
  Stack
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector } from "react-redux";

import API from "../../axios";
import myTranslator from "../../helpers/myTranslator";

function MegaSearchBox({
  labelTop,
  url,
  handleChange,
  styles,
  objLabel,
  obj,
  error,
  ...props
}) {
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [listItems, setListItems] = useState([]);
  const { selectedLang, translation } = useSelector(
    (state) => state.storeReducer
  );

  React.useEffect(() => {
    if (!!obj) {
      setListItems([{ ...obj }]);
      setSelected(obj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  const getRecord = async (_search = '') => {
    setIsLoading(true);
    try {
      let { data } = await API(url + `search=${_search}`, "get");
      setListItems(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSearchInput = (v) => {
    setSearch(v);
    getRecord(v);
  };

  const handleItem = (v, i) => {
    setOpenList(false);
    setSelected(v);
    handleChange(v);
  };

  const inputID = `input-${Math.ceil(Math.random())}`;

  return (
    <Box sx={[styles, { position: "relative" }]}>
      {labelTop && (
        <InputLabel
          htmlFor={inputID}
          sx={{
            marginBottom: "5px",
            color: "#000",
          }}
        >
          {myTranslator(translation, selectedLang, labelTop)}
        </InputLabel>
      )}
      <Box
        sx={{
          border: '1px solid',
          borderColor: Boolean(error !== '') ? 'red' : '#ccc',
          borderRadius: '4px'
        }}
      >
        <MenuItem
          onClick={() => {
            if (!listItems.length) {
              getRecord();
            }
            setOpenList(!openList)
          }}
        >
          <Stack
            direction='row'
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent='space-between'
            alignItems='center'
            width='100%'
          >
            <MyLabel
              text={selected?.componenttypes?.title}
              pr={1}
            />
            <MyLabel
              text={selected[objLabel]}
              px={1}
            />
            <MyLabel
              text={selected?.item_number}
              pl={1}
            />
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              {openList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </Stack>
        </MenuItem>
      </Box>
      <Box
        component={Paper}
        sx={[
          dropDownMenu,
          {
            visibility: openList ? "visible" : "hidden",
            zIndex: openList ? 25 : -1000,
          },
        ]}
      >
        <Box
          p={1}
        >
          <TextField
            type="text"
            value={search}
            id={inputID}
            color="success"
            onChange={(event) => handleSearchInput(event.target.value)}
            {...props}
          />
        </Box>
        <Box
          sx={{
            maxHeight: '250px',
            overflowY: 'auto'
          }}
        >
          {isLoading ? (
            <Box px={2} py={1}>
              <FormHelperText sx={{ textAlign: "center", mt: "0 !important" }}>
                ...Loading
              </FormHelperText>
            </Box>
          ) : listItems.length ? (
            listItems.map((v, i) => (
              <MenuItem
                key={i}
                selected={selected.id === v.id ? true : false}
                onClick={() => handleItem(v, i)}
              >
                <Stack
                  direction='row'
                  divider={<Divider orientation="vertical" flexItem />}
                  justifyContent='space-between'
                  width='100%'
                >
                  <MyLabel
                    text={v?.componenttypes?.title}
                    pr={1}
                  />
                  <MyLabel
                    text={v[objLabel]}
                    px={1}
                  />
                  <MyLabel
                    text={v?.item_number}
                    pl={1}
                  />
                </Stack>
              </MenuItem>
            ))
          ) : (
            <Box px={2} py={1}>
              <FormHelperText sx={{ textAlign: "center", mt: "0 !important" }}>
                Does not match any record!
              </FormHelperText>
            </Box>
          )}
        </Box>
      </Box>
      {error !== "" && (
        <FormHelperText sx={{ color: "red", mt: "0 !important" }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}

const MyLabel = ({ text, ...props }) => {
  return (
    <Box width='33.333%' {...props}>
      <Typography variant="p"
        display='block'
        textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap'
      >{text || '-'}</Typography>
    </Box>
  )
}

const dropDownMenu = {
  position: "absolute",
  width: "100%",
  backgroundColor: "#fff"
};

MegaSearchBox.defaultProps = {
  labelTop: "",
  handleChange: (e) => { },
  styles: {},
  error: "",
  objLabel: "title",
};

export default MegaSearchBox;
