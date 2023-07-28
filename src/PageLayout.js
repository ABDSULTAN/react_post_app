import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <Layout className="layout">
      <Content className="page-layout">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default PageLayout;
