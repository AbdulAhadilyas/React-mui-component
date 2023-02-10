import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { langSetter } from "../../store/reducer";

export default function LangSelector() {
  const dispatch = useDispatch();
  const { selectedLang } = useSelector((state) => state.storeReducer);

  const changeLanguage = (value) => {
    dispatch(langSetter(value));
    localStorage.setItem("@gamaLang", value);
  };

  return (
    <select
      value={selectedLang}
      onChange={(e) => changeLanguage(e.target.value)}
      style={{
        height: "24px",
        borderRadius: "6px",
        width: "71px",
      }}
    >
      <option value="english">En</option>
      <option value="german">De</option>
      <option value="other">Other</option>
    </select>
  );
}
