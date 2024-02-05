import React from "react";
import { render, waitFor } from "@testing-library/react";
import Sent from "./Sent";

test("renders Sent component without crashing", () => {
  render(<Sent />);
});

test("fetches emails and renders them in Sent component", async () => {
  // Mocking localStorage getItem
  const mockLocalStorage = {
    getItem: jest.fn().mockReturnValue("mockedUserName"),
  };
  global.localStorage = mockLocalStorage;

  // Mocking fetch
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        email1: {
          senderName: "userName",
          recipientName: "test@gmail.com",
          subject: "Test Subject",
          emailBody: "Test email body",
        },
        email2: {
          senderName: "userName",
          recipientName: "test@gmail.com",
          subject: "Test Subject",
          emailBody: "Test email body",
        },
      }),
  });

  render(<Sent />);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/mail.json")
    );
  });
});
