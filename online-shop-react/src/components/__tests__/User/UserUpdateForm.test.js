import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UpdateUserForm from '../../User/UserUpdateForm';
import { UserUpdate } from '../../User/UserUpdate';

jest.mock('../../User/UserUpdate', () => ({
  UserUpdate: jest.fn().mockResolvedValue(),
}));

describe('UpdateUserForm', () => {
  let mockUsername;
  let mockCookies;
  let mockHandleMessage;
  let mockHandleUserObtain;
  let mockHandleUserUpdateForm;

  beforeEach(() => {
    mockUsername = 'testuser';
    mockCookies = {};
    mockHandleMessage = jest.fn();
    mockHandleUserObtain = jest.fn();
    mockHandleUserUpdateForm = jest.fn();
  });

  it('submits user update form', async () => {
    const { getByLabelText, getByText } = render(
      <UpdateUserForm
        username={mockUsername}
        cookies={mockCookies}
        handleMessage={mockHandleMessage}
        handleUserObtain={mockHandleUserObtain}
      />
    );

    const firstNameInput = getByLabelText('First Name:');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    const submitButton = getByText('Update User');
    fireEvent.click(submitButton);

    expect(UserUpdate).toHaveBeenCalledTimes(1);
    expect(UserUpdate).toHaveBeenCalledWith(
      mockUsername,
      {
        phoneNumber: '',
        dob: '',
        password: '',
        fname: 'John',
        sname: '',
      },
      mockCookies,
      mockHandleMessage
    );
  });

  it('cancels user update', () => {
    const { getByText } = render(
      <UpdateUserForm
        username={mockUsername}
        cookies={mockCookies}
        handleMessage={mockHandleMessage}
        handleUserObtain={mockHandleUserObtain}
        handleUserUpdateForm={mockHandleUserUpdateForm}
      />
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockHandleUserUpdateForm).toHaveBeenCalledTimes(1);
  });
});
