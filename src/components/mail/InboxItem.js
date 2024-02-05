import React from "react";
import DeleteIc from "../assets/DeleteIc";

const InboxItem = ({ email, onClick, markAsRead, handleDelete }) => {
  const handleItemClick = (event) => {
    event.stopPropagation();
    onClick(email);
    if (markAsRead) {
      markAsRead(email);
    }
  };

  const onDelete = (event) => {
    event.stopPropagation();
    console.log("Delete Clicked!");
    handleDelete(email);
  };

  return (
    <>
      <div
        style={{ display: "flex", marginLeft: "130px", alignItems: "center" }}
        onClick={handleItemClick}
      >
        {!email.read && markAsRead && (
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
        <span
          style={{
            width: "50%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxHeight: "3.6em",
          }}
        >
          {email.emailBody}
        </span>{" "}
        <DeleteIc handleDelete={onDelete} />
      </div>
      <hr style={{ marginLeft: "130px" }} />
    </>
  );
};

export default InboxItem;
