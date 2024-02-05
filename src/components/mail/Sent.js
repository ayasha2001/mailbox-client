import React, { useEffect, useState } from "react";
import InboxItem from "./InboxItem";
import OpenedMail from "./OpenedMail";

const Sent = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    fetchEmails();
  }, []);
  const fetchEmails = async () => {
    try {
      const databaseUrl =
        "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app";
      const response = await fetch(`${databaseUrl}/mail.json`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const senderName = await localStorage.getItem("userName");

      const data = await response.json();

      const filteredData = Object.entries(data)
        .filter(([key, item]) => item.senderName === senderName)
        .map(([id, item]) => ({ id, ...item }));

      console.log(filteredData);
      setEmails(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  if (selectedEmail) {
    console.log(selectedEmail);
    return <OpenedMail email={selectedEmail} />;
  }
  return (
    <div className="inbox-container">
      <h2 className="inbox-header">Sent</h2>
      {emails.map((email) => (
        <InboxItem key={email.id} email={email} onClick={handleEmailClick} />
      ))}
    </div>
  );
};

export default Sent;
