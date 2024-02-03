import React from "react";

const InboxItem = ({ email }) => {
  console.log(email);
  return (
    <>
      <div style={{ display: "flex", marginLeft: "130px" }}> 
        <span style={{ fontWeight: "bold", width: "20%" }}>
          {email.senderName}
        </span>
        <span style={{ fontWeight: "bold", width: "20%" }}>{email.subject}</span>
        <span>{email.emailBody}</span>
      </div>
      <hr style={{marginLeft: "130px"}}/>
    </>
  );
};

export default InboxItem;
