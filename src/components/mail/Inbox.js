import React from "react";
import InboxItem from "./InboxItem";
import OpenedMail from "./OpenedMail";
import { useNavigate } from "react-router-dom";
import useMailApi from "../../hooks/useMailApi";

const Inbox = () => {
  const { emails, unreadCount, markAsRead, deleteEmail } = useMailApi();
  const [selectedEmail, setSelectedEmail] = React.useState(null);
  const navigate = useNavigate();

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    markAsRead(email);
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
    navigate("/mail");
  };

  if (selectedEmail) {
    return (
      <OpenedMail email={selectedEmail} onBackToInbox={handleBackToInbox} />
    );
  }

  return (
    <div className="inbox-container">
      <h2 className="inbox-header">Inbox </h2>

      {emails.map((email) => (
        <InboxItem
          key={email.id}
          email={email}
          onClick={handleEmailClick}
          markAsRead={() => markAsRead(email.id)}
          handleDelete={() => deleteEmail(email.id)}
        />
      ))}
    </div>
  );
};

export default Inbox;
