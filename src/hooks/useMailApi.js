import { useState, useEffect } from "react";

const useMailApi = () => {
  const [emails, setEmails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchEmails = async (userName) => {
    try {
      const databaseUrl =
        "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app";
      const response = await fetch(`${databaseUrl}/mail.json`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      const filteredData = Object.entries(data)
        .filter(([key, item]) => item.recipientName === userName)
        .map(([id, item]) => ({ id, ...item }));

      const unreadMails = filteredData.filter((email) => !email.read);

      setUnreadCount(unreadMails.length);

      return filteredData;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return [];
    }
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

      // Update emails after marking as read
      const updatedEmails = await fetchEmails();
      setEmails(updatedEmails);
    } catch (error) {
      console.error("Error marking email as read:", error.message);
    }
  };

  const deleteEmail = async (emailId) => {
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

      const updatedEmails = await fetchEmails();
      setEmails(updatedEmails);
    } catch (error) {
      console.error("Error deleting email:", error.message);
    }
  };

  useEffect(() => {
    // Initial fetch
    const userName = localStorage.getItem("userName");
    fetchEmails(userName).then((initialEmails) => setEmails(initialEmails));

    const intervalId = setInterval(() => {
      fetchEmails(userName).then((updatedEmails) => setEmails(updatedEmails));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    emails,
    unreadCount,
    markAsRead,
    deleteEmail,
  };
};

export default useMailApi;
