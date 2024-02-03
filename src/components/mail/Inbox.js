import React, { useState, useEffect } from "react";
import InboxItem from "./InboxItem";

const Inbox = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const databaseUrl =
        "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app";
      const response = await fetch(`${databaseUrl}/mail.json`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data);

      const filteredData = Object.values(data).filter(
        (item) => item.recipientName === "test@gmail.com"
      );

      console.log(filteredData);
      setEmails(filteredData)
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    // Fetch emails from your API or data source
    // For demonstration, using dummy data

    fetchEmails();
  }, []);

  return (
    <div className="inbox-container">
      <h2 className="inbox-header">Inbox</h2>

      {emails.map((email) => (
        <InboxItem email={email} />
        //   <li key={email.id} className="email-item">
        //     <div className="sender-info">
        //       <strong>{email.senderName}</strong>
        //     </div>
        //     <div className="email-content">
        //       <p className="email-subject">{email.subject}</p>
        //       <p className="email-body">{email.emailBody}</p>
        //     </div>
        //   </li>
      ))}
    </div>
  );
};

export default Inbox;
