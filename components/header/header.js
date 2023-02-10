import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Paper,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout, toggleMenu } from "../../store/reducer";
import API from "../../axios";
import LangSelector from "../lang-selector/lang-selector";
import myTranslator from "../../helpers/myTranslator";
import { useState } from "react";

export default function Header({ hideMenu }) {
  const matches = useMediaQuery("(min-width:900px)");
  const dispatch = useDispatch();

  return (
    <header>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ md: "space-between", xs: "space-between" }}
        sx={{
          backgroundColor: "#000",
          p: "15px",
        }}
      >
        {matches ? (
          <>
            <Box component="div">
              <Menu />
            </Box>
            <Box component="div">
              <SideButtons />
            </Box>
          </>
        ) : (
          <>
            <div>
              {!hideMenu && (
                <IconButton onClick={() => dispatch(toggleMenu(true))}>
                  <ListIcon
                    sx={{
                      color: "#fff",
                    }}
                  />
                </IconButton>
              )}
            </div>
            <div>
              <LangSelector />
              <DropDown />
            </div>
          </>
        )}
      </Stack>
    </header>
  );
}

const DropDown = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
        disableElevation
        onClick={handleToggle}
        ref={anchorRef}
        sx={{
          color: "#fff",
        }}
      >
        <MoreVertIcon />
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
                  <Menu />
                  <Box mt={2}>
                    <SideButtons />
                  </Box>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const Menu = () => {
  const pathname = window.location.pathname.split("/")[1];
  const { selectedLang, translation } = useSelector(
    (state) => state.storeReducer
  );
  const { role } = useSelector((state) => state.storeReducer.user) || "manager";

  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      alignItems="center"
      justifyContent="flex-start"
    >
      <NavLink to="/">
        {myTranslator(translation, selectedLang, "org_nav_link_home")}
      </NavLink>
      <NavLink
        to="/projects"
        className={pathname === "project" ? "focus_link" : ""}
      >
        {myTranslator(translation, selectedLang, "org_nav_link_projects")}
      </NavLink>
      <NavLink
        to="/library/components"
        className={pathname === "library" ? "focus_link" : ""}
      >
        {myTranslator(translation, selectedLang, "org_nav_link_library")}
      </NavLink>
      {role === "manager" && (
        <NavLink to="/users">
          {myTranslator(translation, selectedLang, "org_nav_link_users")}
        </NavLink>
      )}
    </Stack>
  );
};

const SideButtons = () => {
  const matches = useMediaQuery("(min-width:900px)");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const renderBtn = (handleChange, icon) => {
    return (
      <IconButton
        onClick={handleChange}
        size="small"
        sx={{
          color: matches ? "#000" : "#fff",
          backgroundColor: matches ? "#fff" : "#000",
          transition: "0.2s all ease-in-out",
          "&:hover": {
            backgroundColor: matches ? "#fff" : "#000",
            transform: "scale(1.1)",
          },
        }}
      >
        {icon}
      </IconButton>
    );
  };

  const dispatch = useDispatch();

  const logoutUser = async () => {
    setLoading(true);
    try {
      let { data } = await API("logout", "post");
      dispatch(logout(data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={{ sm: "center", md: "flex-end" }}
      spacing={2}
    >
      {matches && <LangSelector />}
      {renderBtn(() => {navigate("/setting");},<SettingsIcon />)}
      {renderBtn(
        logoutUser,
        loading ? (
          <CircularProgress
            size={23}
            sx={{ color: matches ? "#000" : "#fff" }}
          />
        ) : (
          <LogoutIcon />
        )
      )}
    </Stack>
  );
};
