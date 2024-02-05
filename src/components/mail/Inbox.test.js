import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Inbox from './Inbox';

test('renders Inbox component without crashing', () => {
  render(
    <MemoryRouter>
      <Inbox />
    </MemoryRouter>
  );
});

const mockedData = {
  senderName: 'userName',
  recipientName: 'test@gmail.com',
  subject: 'Test Subject',
  emailBody: 'Test email body',
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
  render(
    <MemoryRouter>
      <Inbox />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/mail.json'));
  });
});

test('markAsRead function updates the email status to read', async () => {
  render(
    <MemoryRouter>
      <Inbox />
    </MemoryRouter>
  );

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  userEvent.click(screen.getByText('Test Subject'));

  await waitFor(() => expect(screen.getByText('Test email body')).toBeInTheDocument());

  global.fetch.mockResolvedValueOnce({
    ok: true,
  });

  userEvent.click(screen.getByText('Mark as Read'));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

  expect(global.fetch).toHaveBeenCalledWith(
    'https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app/mail/email1.json',
    {
      method: 'PUT',
      body: JSON.stringify({
        date: '2024-02-05',
        emailBody: 'Test email body',
        read: true,
        recipientName: 'test@gmail.com',
        senderName: 'sender@gmail.com',
        subject: 'Test Subject',
        time: '10:00 AM',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  await waitFor(() => expect(screen.getByText('Inbox')).toBeInTheDocument());

  expect(screen.getByText('Test Subject')).toHaveClass('read-email');
});
