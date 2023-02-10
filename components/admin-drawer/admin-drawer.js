import React, { Fragment, useState } from "react";

import {
  Box,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Groups3Icon from "@mui/icons-material/Groups3";
import LogoutIcon from "@mui/icons-material/Logout";
import AppsIcon from "@mui/icons-material/Apps";
import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import FactoryIcon from "@mui/icons-material/Factory";
import TranslateIcon from "@mui/icons-material/Translate";
import GridViewIcon from "@mui/icons-material/GridView";
import DvrIcon from "@mui/icons-material/Dvr";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import SettingsIcon from "@mui/icons-material/Settings";
import SendIcon from "@mui/icons-material/Send";
import CreateIcon from "@mui/icons-material/Create";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleMenu } from "../../store/reducer";
import { logo2 } from "../../assets";
import API from "../../axios";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import myTranslator from "../../helpers/myTranslator";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import ProcessLog from "../../helpers/log-function";

const routes = [
  {
    label: "sa_aside_home",
    url: "/admin",
    routeName: "/admin",
    icon: <HomeIcon />,
    children: [],
  },
  {
    label: "sa_aside_organizations",
    url: "/admin/organizations",
    routeName: "/admin/organizations",
    icon: <Groups3Icon />,
    children: [],
  },

  {
    label: "sa_aside_components",
    icon: <AppsIcon />,
    children: [
      {
        label: "sa_aside_component_types",
        url: "/admin/component-types",
        routeName: "/admin/component-types",
        icon: <GridViewIcon />,
      },
      {
        label: "sa_aside_manufacturers",
        url: "/admin/manufacturer",
        routeName: "/admin/manufacturer",
        icon: <FactoryIcon />,
      },
      {
        label: "sa_aside_models",
        url: "/admin/models",
        routeName: "/admin/models",
        icon: <AutoAwesomeMotionIcon />,
      },
      {
        label: "sa_aside_components_components",
        url: "/admin/components",
        routeName: "/admin/components",
        icon: <DvrIcon />,
      },
    ],
  },
  {
    label: "sa_aside_energy_tariffs",
    url: "/admin/energy-tariffs",
    routeName: "/admin/energy-tariffs",
    icon: <ElectricBoltIcon />,
    children: [],
  },
  {
    label: "sa_aside_power_consumptions",
    url: "/admin/power-consumptions",
    routeName: "/admin/power-consumptions",
    icon: <ElectricalServicesIcon />,
    children: [],
  },

  {
    label: "sa_aside_translation",
    url: "/admin/translation",
    routeName: "/admin/translation",
    icon: <TranslateIcon />,
    children: [],
  },
  {
    label: "Settings",
    routeName: "/settings",
    url: "/admin/settings",
    icon: <SettingsIcon />,
    children: [
      {
        label: "sa_aside_send_form_email",
        url: "/admin/send-from-email",
        routeName: "/admin/send-from-email",
        icon: <SendIcon />,
      },
      {
        label: "sa_aside_account_creation",
        routeName: "/admin/account-creation",
        url: "/admin/account-creation",
        icon: <CreateIcon />,
      },
      {
        label: "sa_aside_account_activation",
        routeName: "/admin/account-activation",
        url: "/admin/account-activation",
        icon: <PersonAddRoundedIcon />,
      },
      {
        label: "sa_aside_account_suspension",
        routeName: "/admin/account-suspension",
        url: "/admin/account-suspension",
        icon: <PersonRemoveIcon />,
      },
      {
        label: "sa_aside_update_project",
        routeName: "/admin/update-project-status",
        url: "/admin/update-project-status",
        icon: <SystemUpdateAltIcon />,
      },
      {
        label: "sa_aside_reset_password",
        routeName: "/admin/reset-password-email",
        url: "/admin/reset-password-email",
        icon: <RestartAltIcon />,
      },
    ],
  },
];

export default function AdminDrawer() {
  const matches = useMediaQuery("(min-width:900px)");
  const anchorRef = React.useRef(null);
  const _openMenu = useSelector((state) => state.storeReducer.openMenu);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    dispatch(toggleMenu(false));
  };

  const logoutUser = async () => {
    ProcessLog("logout", "Super admin logout");
    setIsLoading(true);
    try {
      let { data } = await API("logout", "post");
      dispatch(logout(data));
    } finally {
      setIsLoading(false);
    }
  };

  const drawer = (
    <Box>
      <List
        sx={{
          "& .MuiListItemIcon-root": {
            color: "#000",
          },
        }}
      >
        {routes.map((v, i) => (
          <Fragment key={i}>
            {v.children.length ? (
              <CollapseMenuItem
                title={v.label}
                item={v.children}
                icon={v.icon}
              ></CollapseMenuItem>
            ) : (
              <NavItem key={i} item={v} childRoutes={v.childRoutes} />
            )}
          </Fragment>
        ))}

        <Divider sx={{ mt: 3, mb: 3 }} />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => logoutUser()}
            disabled={isLoading}
            selected={isLoading}
          >
            <ListItemIcon>
              {isLoading ? (
                <CircularProgress size={18} sx={{ color: "#000" }} />
              ) : (
                <LogoutIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <div
        className={_openMenu ? "overlay_ue0 open" : "overlay_ue0"}
        onClick={handleClick}
      ></div>
      <aside
        className={_openMenu ? "primary-navigation open" : "primary-navigation"}
        ref={anchorRef}
      >
        <Box
          sx={{
            position: "relative",
            borderBottom: "1px solid #ccc",
            textAlign: "center",
            padding: "25px 15px",
          }}
        >
          <Link to={"/admin"}>
            <img src={logo2} width="150px" alt="site logo" />
          </Link>
          {!matches ? (
            <Box
              component="div"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <IconButton onClick={handleClick}>
                <CloseIcon />
              </IconButton>
            </Box>
          ) : null}
        </Box>
        {drawer}
      </aside>
    </>
  );
}

const NavItem = ({ item, childRoutes }) => {
  const { selectedLang, translation } = useSelector(
    (state) => state.storeReducer
  );
  const navigate = useNavigate();
  let routeArray = window.location.pathname.split("/");
  const routeName = routeArray[1] + "/" + routeArray[2];
  var selected = false;
  let array = item.routeName.split("/");
  if (routeName === array[1] + "/" + array[2]) selected = true;

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => navigate(item.url)} selected={selected}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={myTranslator(translation, selectedLang, item.label)}
        />
      </ListItemButton>
    </ListItem>
  );
};

const CollapseMenuItem = ({ title, item, icon }) => {
  var routeName = window.location.pathname;
  const [open, setOpen] = React.useState();
  const navigate = useNavigate();
  const { selectedLang, translation } = useSelector(
    (state) => state.storeReducer
  );

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primary={myTranslator(translation, selectedLang, title)}
          />
          {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {item.map((_item, _i) => (
          <List component="div" key={_i} disablePadding>
            <ListItemButton
              sx={{ pl: "72px", pt: 0, pb: 0 }}
              onClick={() => navigate(_item.url)}
              selected={_item.routeName === routeName}
            >
              <ListItemIcon>{_item.icon}</ListItemIcon>
              <ListItemText
                primary={myTranslator(translation, selectedLang, _item.label)}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "15px",
                  },
                }}
              />
            </ListItemButton>
          </List>
        ))}
      </Collapse>
    </>
  );
};
