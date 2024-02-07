import React from "react";

const OpenedMail = ({ email, onBackToInbox }) => {
  const handleClick = ()=>{
    onBackToInbox()
  }
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
        <p style={{ marginLeft: "0" }}>
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
      <button
        style={{
          marginTop: "13px",
          color: "white",
          fontWeight: "bold",
          backgroundColor: "rgb(4, 123, 203)",
          border: "0px",
          borderRadius: "2px",
          height: "30px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        onClick={handleClick}
      >
        close
      </button>
    </div>
  );
};

export default OpenedMail;
