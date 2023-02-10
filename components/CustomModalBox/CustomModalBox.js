import React from "react";
import { Box } from "@mui/material";
function CustomModal({ children, width, handleClose }) {
  React.useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);
  return (
    <Box>
      <Box sx={modalWrapper} component="button" onClick={handleClose} />
      <Box sx={[modalBody, { maxWidth: width }]} component="div">
        <Box sx={modalContent}>{children}</Box>
      </Box>
    </Box>
  );
}
const modalWrapper = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100vh",
  zIndex: 999,
  backgroundColor: "#0009",
  border: 0,
};
const modalBody = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "250px",
  width: "100%",
  zIndex: 1000,
  p: 1,
};
const modalContent = {
  position: "relative",
  p: 2,
  pt: 5,
  backgroundColor: "#fff",
  borderRadius: "10px",
  maxHeight: "90vh",
  overflowY: "auto",
};


CustomModal.defaultProps = {
  handleClose: () => {},
  width: "450px",
};
export default CustomModal;
