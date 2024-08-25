import { Button, CircularProgress, Skeleton } from "@mui/material";
import React from "react";
import "./button.css";

function SecondaryBtn(props) {
  const btnIcon2 = props.btnIcon2;
  const btnIcon = props.btnIcon;
  const btnText = props.btnText;
  const btnClick = props.btnClick;
  const disabled = props.disabled;
  const extraClass = props.className ? props.className : "";
  const variant = props.variant || "";
  const isLoading = props.isLoading ? props.isLoading : false;
  if (isLoading) {
    return (
      <Button className={`primary-btn ${extraClass}`}>
        <span className="skeleton-btn">
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          <CircularProgress />
        </span>
        {btnText}
      </Button>
    );
  }
  return (
    <Button
      className={`secondary-btn ${extraClass} ${variant}`}
      onClick={btnClick}
      startIcon={btnIcon}
      endIcon={btnIcon2}
      disabled={disabled}
    >
      {btnText}
    </Button>
  );
}

export default SecondaryBtn;
