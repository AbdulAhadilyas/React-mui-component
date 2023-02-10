import { CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SelectBox1 from "../input-field/select-box-1";
import API from "../../axios";
import { openPopUp } from "../../store/reducer";
import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

function ComponentType({ url, initValue, getData = () => { } }) {
  const dispatch = useDispatch();
  const [componentsType, setComponentType] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();
  const [search, setSearch] = useState('');
  useEffect(() => {
    getComponentsType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  const getComponentsType = async () => {
    search === null && setIsLoading(true);
    try {
      const res = await API(url + `&search=${search}`, "get", { cancelToken: source.token });

      console.log("🚀 ~ file: component-types.js:25 ~ getComponentsType ~ res", res)
      let array = [];
      res?.data?.data?.length &&
        res?.data?.data.map((value, index) => {
          array.push({
            label: value?.title ? value.title : value?.manufacturer,
            value: value.id,
          });
        });

      if (array.length) {
        setValue(array[0].value);
        initValue === 0 ? getData(array[0].value) : getData(initValue);
      }

      setIsLoading(false);
      setComponentType(array);
    } catch (err) {
      setIsLoading(false);
      let obj = {
        message: err?.response?.message,
        type: "error",
      };
      dispatch(openPopUp(obj));
    }
  };

  return (
    <>
      {isLoading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress size={30} />
        </Box>
      ) : (
        <SelectBox1
          items={componentsType}
          initValue={initValue == 0 ? value : initValue}
          label="Select"
          size="small"
          handleChange={(e) => getData(e.target.value)}
          styles={{ marginBottom: "15px" }}
          search={(e) => { e.length >= 2 && setSearch(e) }}
        />
      )}
    </>
  );
}

export default ComponentType;
