import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import logo from "../../assets/images/logo.png";
import myTranslator from "../../helpers/myTranslator";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import ProcessLog from "../../helpers/log-function";

const Card = ({ name, count, path, title, description }) => {
  const { selectedLang, translation } = useSelector(
    (state) => state.storeReducer
  );

  return (
    <Grid
      item
      lg={4}
      sm={4}
      xs={12}
      onClick={() => title && description && ProcessLog(title, description)}
    >
      <Link to={path} style={{ textDecoration: "none", color: "black" }}>
        <Box sx={cardContainer}>
          <Box
            sx={[
              cardStyle,
              {
                backgroundImage: `url(${logo})`,
                backgroundSize: "250px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              },
            ]}
          ></Box>
          <Box sx={cardFoo}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box>
                <img
                  style={smallLogo}
                  alt="logo"
                  width="40px"
                  height="40px"
                  src={logo}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "5px",
                }}
              >
                <Typography
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                  variant="small"
                >
                  {myTranslator(translation, selectedLang, name)}
                </Typography>

                <Typography
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                  variant="small"
                >
                  <CountUp end={count} duration={0.2} />
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
};

export default Card;

const cardAnimation = {
  transition: "all 150ms ease",
  boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 4px 2px",
  zIndex: 99,
  transform: "scale(1.006)",
};

const cardContainer = {
  boxShadow: "rgba(0, 0, 0, 0.4) 1px 1px 4px 1px",
  borderRadius: "12px",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  height: "100%",
  minWidth: "250px",
  width: "100%",
  "&:hover": cardAnimation,
};
const cardStyle = {
  width: "100%",
  minHeight: "200px",
  display: "flex",
  justifyContent: "flex-end",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const cardFoo = {
  backgroundColor: "#fff",
  px: 1,
  py: 3,
};
const smallLogo = {
  width: "auto",
  height: "24px",
};

//   /* <Container maxWidth="false" sx={{ pt: 3, pb: 3 }}>
// <Grid container spacing={2}>
//   {isLoading ? (
//     <Grid item xs={12}>
//       <Box sx={{ textAlign: "center" }}>
//         <CircularProgress size={22} />
//       </Box>
//     </Grid>
//   ) : (
//     !!categories &&
//     categories?.map((v, i) => {
//       return (
//         <Grid item lg={4} sm={6} xs={12} key={i}>
//           <Box sx={cardContainer}>
//             <Box
//               sx={[
//                 cardStyle,
//                 {
//                   backgroundImage: user.image_url
//                     ? `url(${user.image_url})`
//                     : `url(${v.bg_url})`,
//                 },
//               ]}
//               onClick={() => {
//                 dispatch(setProStatus(user?.project_status?.title));
//                 navigate("/project/category", {
//                   state: {
//                     id: user.id,
//                     category_id: v.id,
//                     progress: user?.project_status
//                       ? user?.project_status?.progress
//                       : 0,
//                   },
//                 });
//               }}
//             >

//             </Box>
//             <Box sx={cardFoo}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Box>
//                   <img
//                     style={smallLogo}
//                     src={v.image_url}
//                     alt="logo"
//                     width="40px"
//                     height="40px"
//                   />
//                 </Box>
//                 <Typography
//                   sx={{ fontSize: 20, fontWeight: "bold" }}
//                   variant="small"
//                 >
//                   {v.name}
//                 </Typography>
//               </Stack>
//             </Box>
//           </Box>
//         </Grid>
//       );
//     })
//   )}
// </Grid>
// </Container > */
