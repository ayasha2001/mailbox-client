import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ComposeMail from "./ComposeMail";

test("renders ComposeMail component", () => {
  render(<ComposeMail />);
});

test("updates recipient and subject on user input", () => {
  render(<ComposeMail />);
  const recipientInput = screen.getByPlaceholderText("test@gmail.com");
  const subjectInput = screen.getByPlaceholderText("Enter email subject");

  userEvent.type(recipientInput, "newRecipient@test.com");
  userEvent.type(subjectInput, "Test Subject");

  expect(recipientInput.value).toBe("newRecipient@test.com");
  expect(subjectInput.value).toBe("Test Subject");
});

test("updates editor state on user input", () => {
  render(<ComposeMail />);
  const editor = screen.getByLabelText("Type here...");

  userEvent.type(editor, "This is a test email body.");

  // Assert the updated editor state or any other expected behavior
});

test("sends email on button click", () => {
  render(<ComposeMail />);
  const sendButton = screen.getByText("Send Email");

  userEvent.click(sendButton);

  // Implement assertions based on the expected behavior of the sendEmail function
});
