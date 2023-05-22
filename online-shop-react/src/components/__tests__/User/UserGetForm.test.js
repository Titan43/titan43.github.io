import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserGetForm from '../../User/UserGetForm';
import { UserData } from '../../User/UserData';

jest.mock('../../User/UserData', () => ({
  UserData: jest.fn().mockResolvedValue(),
}));

describe('UserGetForm', () => {
  let mockCookies;
  let mockSetUser;
  let mockHandleMessage;
  let mockUsername;
  let mockHandleUserGetForm;

  beforeEach(() => {
    mockCookies = {};
    mockSetUser = jest.fn();
    mockHandleMessage = jest.fn();
    mockUsername = 'testuser';
    mockHandleUserGetForm = jest.fn();
  });

  it('submits user get form', () => {
    const { getByLabelText, getByText } = render(
      <UserGetForm
        cookies={mockCookies}
        setUser={mockSetUser}
        handleMessage={mockHandleMessage}
        handleUserGetForm={mockHandleUserGetForm}
      />
    );

    const usernameInput = getByLabelText('Enter username:');
    fireEvent.change(usernameInput, { target: { value: mockUsername } });

    const submitButton = getByText('Get User');
    fireEvent.click(submitButton);

    expect(UserData).toHaveBeenCalledTimes(1);
    expect(UserData).toHaveBeenCalledWith(
      mockCookies,
      mockSetUser,
      mockHandleMessage,
      mockUsername
    );
  });

  it('cancels user get form', () => {
    const { getByText } = render(
      <UserGetForm
        cookies={mockCookies}
        setUser={mockSetUser}
        handleMessage={mockHandleMessage}
        handleUserGetForm={mockHandleUserGetForm}
      />
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockHandleUserGetForm).toHaveBeenCalledTimes(1);
    
  });
});
