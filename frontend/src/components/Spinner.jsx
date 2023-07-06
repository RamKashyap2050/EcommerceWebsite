import React from "react";
import { Spin } from "antd";

const Spinner = () => {
  const spinSize = 600; // Adjust the size as needed

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "72vh",
      }}
    >
      <Spin size="large" tip="Loading" />
    </div>
  );
};

export default Spinner;
