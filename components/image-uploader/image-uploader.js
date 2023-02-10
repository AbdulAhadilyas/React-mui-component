import React from "react";
import { Avatar, Box, IconButton, Skeleton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import ApiImage from "../../hooks/fetch-image";
import { generateKey } from "../../helpers/generate-key";

const _id = "input-" + generateKey();

function ImageUploader({ url, handleImage = (e) => {} }) {
  const image = ApiImage(url);
  const [src, setSrc] = React.useState(null);
  return (
    <>
      <Box position="relative" width="fit-content">
        {image ? (
          <Avatar
            alt=""
            src={!src ? image : src}
            sx={{ width: 276, height: 150 }}
            variant="square"
          />
        ) : (
          <Skeleton variant="rectangular" width={276} height={150} sx={{ bgcolor: 'grey.200' }}/>
        )}
        <IconButton
          sx={{ position: "absolute", bottom: 0, right: 0 }}
          onClick={() => document.getElementById(_id).click()}
        >
          <CameraAltIcon />
        </IconButton>
      </Box>
      <input
        hidden
        onChange={(e) => {
          setSrc(URL.createObjectURL(e.target.files[0]));
          handleImage(e);
        }}
        type="file"
        accept="image/*"
        id={_id}
      />
    </>
  );
}

export default ImageUploader;
