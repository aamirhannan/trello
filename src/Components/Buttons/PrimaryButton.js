import { Button, CircularProgress, Skeleton } from "@mui/material";
import React from "react";
import "./button.css";
function PrimaryBtn(props) {
  const btnIcon = props.btnIcon;
  const btnText = props.btnText;
  const btnClick = props.btnClick;
  const disabled = props.disabled;
  const extraClass = props.className ? props.className : "";
  const type = props.type ? props.type : "button";
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
      type={type}
      className={`primary-btn ${extraClass}`}
      onClick={btnClick}
      startIcon={btnIcon}
      disabled={disabled}
    >
      {btnText}
    </Button>
  );
}

export default PrimaryBtn;
