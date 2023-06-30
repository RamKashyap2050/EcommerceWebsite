import React from "react";
import { BeatLoader } from "react-spinners";

const Spinner = () => {
  const cssOverride = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "72vh",
  };

  return (
    <>
      <BeatLoader
        color="rgba(20, 49, 213, 1)"
        cssOverride={cssOverride}
        margin={10}
        size={15}
        speedMultiplier={1}
      />
    </>
  );
};

export default Spinner;
