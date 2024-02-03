import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./ComposeMail.css"; // Create a CSS file for styling

const ComposeMail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");

  const handleEditorStateChange = (state) => {
    setEditorState(state);
  };

  const fetchData = async () => {
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
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  fetchData();

  fetchData();

  const sendEmail = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    // Extracting text content
    const emailBodyText = rawContentState.blocks
      .map((block) => block.text)
      .join("\n");

    const userName = await localStorage.getItem("userName");
    const data = {
      senderName: userName,
      recipientName: recipient,
      subject: subject,
      emailBody: emailBodyText,
    };

    // Add your email sending logic here
    const url =
      "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app/mail.json";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("posting mail failed:", errorData.error.message);
        return;
      }

      const jsonData = await response.json(); // Store the result in a variable
      console.log("posting mail successful:", jsonData);

      setEditorState("");
      setRecipient("");
      setSubject("");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const toolbarOptions = {
    options: ["inline", "blockType", "list", "textAlign", "link", "emoji"],
    inline: {
      options: ["bold", "italic", "underline"],
    },
    blockType: {
      options: ["Normal", "H1", "H2", "H3", "Blockquote"],
    },
    list: {
      options: ["unordered", "ordered"],
    },
    textAlign: {
      options: ["left", "center", "right"],
    },
    emoji: {
      //   icon: emoji,
      className: undefined,
      component: undefined,
      popupClassName: undefined,
      emojis: [
        "😀",
        "😁",
        "😂",
        "😃",
        "😉",
        "😋",
        "😎",
        "😍",
        "😗",
        "🤗",
        "🤔",
        "😣",
        "😫",
        "😴",
        "😌",
        "🤓",
        "😛",
        "😜",
        "😠",
        "😇",
        "😷",
        "😈",
        "👻",
        "😺",
        "😸",
        "😹",
        "😻",
        "😼",
        "😽",
        "🙀",
        "🙈",
        "🙉",
        "🙊",
        "👼",
        "👮",
        "🕵",
        "💂",
        "👳",
        "🎅",
        "👸",
        "👰",
        "👲",
        "🙍",
        "🙇",
        "🚶",
        "🏃",
        "💃",
        "⛷",
        "🏂",
        "🏌",
        "🏄",
        "🚣",
        "🏊",
        "⛹",
        "🏋",
        "🚴",
        "👫",
        "💪",
        "👈",
        "👉",
        "👉",
        "👆",
        "🖕",
        "👇",
        "🖖",
        "🤘",
        "🖐",
        "👌",
        "👍",
        "👎",
        "✊",
        "👊",
        "👏",
        "🙌",
        "🙏",
        "🐵",
        "🐶",
        "🐇",
        "🐥",
        "🐸",
        "🐌",
        "🐛",
        "🐜",
        "🐝",
        "🍉",
        "🍄",
        "🍔",
        "🍤",
        "🍨",
        "🍪",
        "🎂",
        "🍰",
        "🍾",
        "🍷",
        "🍸",
        "🍺",
        "🌍",
        "🚑",
        "⏰",
        "🌙",
        "🌝",
        "🌞",
        "⭐",
        "🌟",
        "🌠",
        "🌨",
        "🌩",
        "⛄",
        "🔥",
        "🎄",
        "🎈",
        "🎉",
        "🎊",
        "🎁",
        "🎗",
        "🏀",
        "🏈",
        "🎲",
        "🔇",
        "🔈",
        "📣",
        "🔔",
        "🎵",
        "🎷",
        "💰",
        "🖊",
        "📅",
        "✅",
        "❎",
        "💯",
      ],
    },
  };

  return (
    <Container fluid className="compose-mail-container">
      <Row>
        <Col md={12}>
          <Form>
            <Form.Group controlId="recipient" className="left-aligned">
              <Form.Label className="label-style">To:</Form.Label>
              <Form.Control
                type="email"
                placeholder="test@gmail.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="input-style"
                style={{ width: "97%" }}
                required
              />
            </Form.Group>
            <hr />

            <Form.Group controlId="subject" className="left-aligned">
              <Form.Control
                type="text"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: "100%" }}
                className="input-style"
              />
            </Form.Group>
            <hr />

            <Form.Group controlId="emailBody">
              <Editor
                toolbarOnFocus
                editorState={editorState}
                wrapperClassName="compose-mail-editor-wrapper"
                editorClassName="compose-mail-editor"
                onEditorStateChange={handleEditorStateChange}
                toolbar={toolbarOptions}
                required
              />
            </Form.Group>

            <Button variant="primary" onClick={sendEmail} className="btn-send">
              Send Email
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ComposeMail;
