import React from "react";
import Sidebar from "./SideBar";
import Inbox from "./Inbox";
import OpenedMail from "./OpenedMail";
import { Outlet } from "react-router-dom";

const MailContainer = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default MailContainer;
