import { Spin } from "antd";
import React from "react";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-main">
        <Spin size="large" />
      </div>
    </div>
  );
};

export default Loader;
