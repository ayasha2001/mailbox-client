import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import useMailApi from "../../hooks/useMailApi";

const Sidebar = () => {
  const nav = useNavigate();
  const { unreadCount } = useMailApi();

  const handleClick = () => {
    nav("/compose");
  };

  const handleInbox = () => {
    nav("/mail");
  };

  return (
    <Nav className="col-md-4 d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <Nav.Item>
          <button
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "rgb(4, 123, 203)",
              border: "0px",
              borderRadius: "2px",
              height: "30px",
              paddingLeft: "10px",
              paddingRight: "10px",
              // fontSize:"10px"
            }}
            onClick={handleClick}
          >
            Compose
          </button>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={NavLink} activeClassName="active" onClick={handleInbox}>
            <i className="fas fa-inbox"></i> Inbox {unreadCount}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/mail/sent" activeClassName="active">
            <i className="fas fa-paper-plane"></i> Sent
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/drafts" activeClassName="active">
            <i className="fas fa-file-alt"></i> Drafts
          </Nav.Link>
        </Nav.Item>
        {/* Add more sections as needed */}
      </div>
    </Nav>
  );
};

export default Sidebar;
