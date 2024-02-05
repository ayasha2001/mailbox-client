import React, { useState, useEffect } from "react";
import InboxItem from "./InboxItem";
import OpenedMail from "./OpenedMail";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const navigate = useNavigate();

  const fetchEmails = async () => {
    try {
      const databaseUrl =
        "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app";
      const response = await fetch(`${databaseUrl}/mail.json`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      const filteredData = Object.entries(data)
        .filter(([key, item]) => item.recipientName === "test@gmail.com")
        .map(([id, item]) => ({ id, ...item }));

      console.log(filteredData);
      setEmails(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
    navigate("/mail");
  };

  const markAsRead = async (email) => {
    const emailId = email.id;
    try {
      const databaseUrl =
        "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app";
      const data = {
        date: email.date,
        emailBody: email.emailBody,
        read: true,
        recipientName: email.recipientName,
        senderName: email.senderName,
        subject: email.subject,
        time: email.time,
      };

      const response = await fetch(`${databaseUrl}/mail/${emailId}.json`, {
        method: "PUT", // Change PATCH to PUT
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark email as read");
      }

      fetchEmails();
    } catch (error) {
      console.error("Error marking email as read:", error.message);
    }
  };

  const handleDelete = async (email) => {
    const emailId = email.id;
    try {
      const databaseUrl =
        "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app";

      const response = await fetch(`${databaseUrl}/mail/${emailId}.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete email");
      }

      fetchEmails();
    } catch (error) {
      console.error("Error deleting email:", error.message);
    }
  };

  if (selectedEmail) {
    console.log(selectedEmail);
    return (
      <OpenedMail email={selectedEmail} onBackToInbox={handleBackToInbox} />
    );
  }

  return (
    <div className="inbox-container">
      <h2 className="inbox-header">Inbox</h2>

      {emails.map((email) => (
        <InboxItem
          key={email.id}
          email={email}
          onClick={handleEmailClick}
          markAsRead={markAsRead}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Inbox;
