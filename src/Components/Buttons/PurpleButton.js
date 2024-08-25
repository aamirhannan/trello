import { Button, CircularProgress, Skeleton } from "@mui/material";
import React from "react";
import "./button.css";
function PurpleBtn(props) {
  const btnText = props.btnText;
  const btnClick = props.btnClick;
  const disabled = props.disabled;
  const extraClass = props.className ? props.className : "";
  const isLoading = props.isLoading ? props.isLoading : false;

  if (isLoading) {
    return (
      <Button className={`purple-btn ${extraClass}`}>
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
      className={`purple-btn ${extraClass}`}
      onClick={btnClick}
      disabled={disabled}
    >
      {btnText}
    </Button>
  );
}

export default PurpleBtn;
