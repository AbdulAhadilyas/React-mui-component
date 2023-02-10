import React from "react";

import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import BatteryCharging80Icon from "@mui/icons-material/BatteryCharging80";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LayersIcon from "@mui/icons-material/Layers";
import DownloadIcon from "@mui/icons-material/Download";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/reducer";
import {
  economicScreens,
  eleSolarScreens,
  initialPositionScreens,
  partListScreens,
  pvModuleScreens,
  reqScreens,
} from "./data";
import MyDropDown from "./my-dropdown";
import MyNavItem from "./my-navitem";
import myTranslator from "../../helpers/myTranslator";

export default function SideNavigation() {
  const matches = useMediaQuery("(min-width:900px)");
  const anchorRef = React.useRef(null);
  const _openMenu = useSelector((state) => state.storeReducer.openMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const pathname = window.location.pathname.split("/")[3];
  const { selectedLang, translation } = useSelector(
    (state) => state.storeReducer
  );

  const _url = `/projects/${id}`;

  const handleClick = () => {
    dispatch(toggleMenu(false));
  };

  const drawer = (
    <div>
      <List
        sx={{
          "& .MuiListItemIcon-root": {
            color: "#000",
          },
        }}
      >
        {!matches ? (
          <ListItem disablePadding>
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                paddingRight: "25px",
              }}
            >
              <IconButton onClick={handleClick}>
                <CloseIcon />
              </IconButton>
            </Box>
          </ListItem>
        ) : null}
        <MyNavItem
          focus="customer"
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_customer"
          )}
          handleClick={() => navigate(_url + "/customer", { id: id })}
          pathname={pathname}
          icon={<AccountCircleIcon />}
        />
        <MyNavItem
          focus="project-settings"
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_project_settings"
          )}
          handleClick={() => navigate(_url + "/project-settings", { id: id })}
          pathname={pathname}
          icon={<SettingsIcon />}
        />
        <MyDropDown
          _url={_url}
          pathname={pathname}
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_initial_position"
          )}
          data={initialPositionScreens}
          icon={<DownloadIcon />}
        />
        <Box mt={2} mb={2}>
          <Divider />
        </Box>
        <MyDropDown
          _url={_url}
          pathname={pathname}
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_pv"
          )}
          data={pvModuleScreens}
          icon={<DownloadIcon />}
        />
        <MyNavItem
          focus="battery-storage"
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_battery_storage"
          )}
          handleClick={() => navigate(_url + "/battery-storage", { id: id })}
          pathname={pathname}
          icon={<BatteryCharging80Icon />}
        />
        <MyDropDown
          _url={_url}
          pathname={pathname}
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_requirements"
          )}
          icon={<LocalOfferIcon />}
          data={reqScreens}
        />
        <MyDropDown
          _url={_url}
          pathname={pathname}
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_economics"
          )}
          icon={<TrendingUpIcon />}
          data={economicScreens}
        />
        <MyDropDown
          _url={_url}
          pathname={pathname}
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_part_list"
          )}
          icon={<LayersIcon />}
          data={partListScreens}
        />
        <MyNavItem
          focus="patch-pv"
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_financing_patch_pv"
          )}
          handleClick={() => navigate(_url + "/patch-pv", { id: id })}
          pathname={pathname}
          icon={<BatteryCharging80Icon />}
        />
        <MyDropDown
          _url={_url}
          pathname={pathname}
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_project_analysis"
          )}
          icon={<LayersIcon />}
          data={eleSolarScreens}
        />
        <MyNavItem
          focus="ele-form-solar"
          title={myTranslator(
            translation,
            selectedLang,
            "org_project_side_nav_electroform_solar"
          )}
          handleClick={() => navigate(_url + "/ele-form-solar", { id: id })}
          pathname={pathname}
          icon={<BatteryCharging80Icon />}
        />
      </List>
    </div>
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
        {drawer}
      </aside>
    </>
  );
}
