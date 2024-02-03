import React from "react";

const OpenedMail = ({ email }) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        width: "700px",
        margin: "auto",
        borderRadius: "2px",
        padding: "10px",
      }}
    >
      <div>
        <p style={{ marginLeft: "0" }}>
          <strong>{email.senderName}</strong>
        </p>
        <p style={{ marginLeft: "0"}}>
          <span style={{ color: "gray" }}>To:</span> {email.recipientName}
        </p>
        <p style={{ marginLeft: "0" }}>
          <strong>Time:</strong> {email.time}
        </p>
        <p style={{ marginLeft: "0" }}>
          <strong>Date:</strong> {email.date}
        </p>
        <div>{email.emailBody}</div>
      </div>
    </div>
  );
};

export default OpenedMail;
