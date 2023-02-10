import React from "react";
import {
  Box,
  Paper,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Stack,
  Menu,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import useMediaQuery from "@mui/material/useMediaQuery";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import ImageRenderer from "../image-renderer/image-renderer";
import API from "../../axios";
import myTranslator from "../../helpers/myTranslator";

export default function TopBar() {
  const medium = useMediaQuery("(min-width:900px)");
  const sm = useMediaQuery("(min-width:600px)");
  const orgID = useSelector((state) => state.storeReducer.user.organization_id);
  const _userRole = useSelector((state) => state.storeReducer.user.role);
  const [status, setStatus] = React.useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      let { data } = await API(`${_userRole}/projects/${id}`, "get");
      setStatus(data?.project_status || null);
    } catch (err) {}
  };

  return (
    <Box
      component="div"
      sx={{
        padding: "10px 25px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.151)",
        clipPath: "inset(0px 0px -150px 0px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing="10px"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: "center", md: "flex-start" }}
          spacing="10px"
          sx={
            !medium
              ? {
                  width: "100%",
                }
              : {}
          }
        >
          <DropDown />
          <Box
            component="div"
            style={{
              display: "block",
              width: "1px",
              height: "15px",
              marginLeft: "0px",
              backgroundColor: "#969696",
            }}
          ></Box>
          {sm ? <BtnGroup /> : <BasicMenu />}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing="10px"
          sx={
            !medium
              ? {
                  width: "100%",
                }
              : {}
          }
        >
          <Box
            component="div"
            sx={{
              width: "fit-content",
              fontSize: "14px",
              display: "flex",
            }}
          >
            Status:
            {!!status ? (
              <Box style={{ textTransform: "capitalize" }}>
                {status.replace("_", " ")}
              </Box>
            ) : (
              "-"
            )}
          </Box>
          <ImageRenderer
            url={`organization-logo/${orgID}`}
            width={75}
            height={45}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

const BtnGroup = () => {
  const { selectedLang, translation } = useSelector(
    (state) => state.storeReducer
  );
  const sm = useMediaQuery("(min-width:600px)");
  const themeBtn = {
    color: "#000",
    textTransform: "none",
    fontWeight: "400",
    justifyContent: "space-between",
  };
  const _url = "/projects/123456";
  const navigate = useNavigate();

  return (
    <Box
      sx={
        !sm
          ? {
              display: "flex",
              flexDirection: "column",
            }
          : {}
      }
    >
      <Button variant="text" disableElevation sx={themeBtn}>
        {myTranslator(
          translation,
          selectedLang,
          "org_project_top_bar_btn_variants"
        )}
      </Button>
      <Button
        variant="text"
        disableElevation
        sx={themeBtn}
        onClick={() => navigate(_url + "/documents")}
      >
        {myTranslator(
          translation,
          selectedLang,
          "org_project_top_bar_btn_document"
        )}
      </Button>
      <Button variant="text" disableElevation sx={themeBtn}>
        {myTranslator(
          translation,
          selectedLang,
          "org_project_top_bar_btn_deal_history"
        )}
      </Button>
    </Box>
  );
};
const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="text"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "#000",
        }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <BtnGroup />
      </Menu>
    </div>
  );
};

const DropDown = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { selectedLang, translation } = useSelector(
    (state) => state.storeReducer
  );
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Button
        variant="text"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        disableElevation
        onClick={handleToggle}
        ref={anchorRef}
        endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        sx={{
          color: "#000",
          textTransform: "none",
          fontWeight: "400",
          justifyContent: "space-between",
        }}
      >
       {myTranslator(
          translation,
          selectedLang,
          "org_project_top_bar_btn_bohemia"
        )}
      </Button>
      <Popper
        open={!!open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{
          zIndex: 1,
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    width: "200px",
                  }}
                >
                  <MenuItem onClick={handleClose}>Link 1</MenuItem>
                  <MenuItem onClick={handleClose}>Link 2</MenuItem>
                  <MenuItem onClick={handleClose}>Link 3</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
