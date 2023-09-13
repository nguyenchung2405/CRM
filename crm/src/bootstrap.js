import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import moment from "moment";
import vi_VN from "antd/lib/locale/vi_VN";
moment.locale("vi");
ReactDOM.render(
  <ConfigProvider locale={vi_VN}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);
