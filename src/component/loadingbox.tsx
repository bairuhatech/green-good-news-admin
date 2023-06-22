import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
function Loadingbox() {
  return (
    <div className="LoadingBox">
      <CircularProgress style={{ color: "#1e88e5" }} />
      <br />
      <div>Loading . . .</div>
    </div>
  );
}

export default Loadingbox;
