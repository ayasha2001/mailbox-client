import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Inbox from './Inbox';

test('renders Inbox component without crashing', () => {
  render(<Inbox />);
});


const mockedData = {
    senderName: "userName",
    recipientName: "recipient",
    subject: "subject",
    emailBody: "emailBodyText",
  };

beforeAll(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockedData),
    ok: true,
  });
});

afterAll(() => {
  global.fetch.mockRestore();
});

test('fetches emails and renders them', async () => {
  render(<Inbox />);

  await waitFor(() => {
    // Add assertions based on your mocked data and component behavior
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/mail.json'));
    // Add more assertions based on your specific implementation
  });
});
