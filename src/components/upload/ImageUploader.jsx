import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 10,
    background: "#fff",
    textTransform: "capitalize",
    backgroundSize: "cover",
    fontSize: 12,
    "&:hover": {
      backgroundSize: "cover",
      background: "#fff",
    },
    "&:active": {
      backgroundSize: "cover",
      background: "#fff",
    },
  },
}));

const ImageUploader = ({
  width,
  height,
  onUpload,
  src,
  variant = "outlined",
}) => {
  const [imageUrl, setImageUrl] = useState(src);
  const inputEl = useRef(null);
  const classes = useStyles();

  const handleClick = () => {
    inputEl.current.click();
  };

  const handleFileChanged = (e) => {
    const { files } = e.target;
    if (files[0]) {
      onUpload(files[0]);
      const fileReader = new FileReader();
      fileReader.addEventListener("load", (e) => {
        setImageUrl(e.target.result);
      });
      fileReader.readAsDataURL(files[0]);
    }
  };

  return (
    <Button
      variant={variant}
      className={classes.root}
      style={{
        width: width,
        height: height,
        backgroundImage: `url('${imageUrl}')`,
      }}
      onClick={handleClick}
    >
      Image
      <input
        ref={inputEl}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChanged}
      />
    </Button>
  );
};

export default ImageUploader;
