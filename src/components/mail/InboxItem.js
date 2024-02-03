import React from "react";

const InboxItem = ({ email, onClick, markAsRead }) => {
  console.log(email)
  const handleItemClick = () => {
    onClick(email);
    markAsRead(email);
  };
  return (
    <>
      <div
        style={{ display: "flex", marginLeft: "130px", alignItems: "center" }}
        onClick={handleItemClick}
      >
        {!email.read && (
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              backgroundColor: "rgb(4, 123, 203)",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          ></span>
        )}
        <span style={{ fontWeight: "bold", width: "20%" }}>
          {email.senderName}
        </span>
        <span style={{ fontWeight: "bold", width: "20%" }}>
          {email.subject}
        </span>
        <span>{email.emailBody}</span>
      </div>
      <hr style={{ marginLeft: "130px" }} />
    </>
  );
};

export default InboxItem;
