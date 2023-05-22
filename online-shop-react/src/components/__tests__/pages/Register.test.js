import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from '../../../pages/Register';
import { UserCreate } from '../../User/UserCreate';
import { loginUser } from '../../User/Auth';
import { BrowserRouter } from 'react-router-dom';


jest.mock('../../User/UserCreate', () => ({
  UserCreate: jest.fn(),
}));

jest.mock('../../User/Auth', () => ({
  loginUser: jest.fn(),
}));

describe('Register', () => {
  let mockRemoveCookie;
  let mockSetSectionName;
  let mockSetUserId;
  let mockSetCookie;
  let mockSetIsLoggedIn;
  let mockPreviousSectionURL;
  let mockHandleMessage;
  let mockNavigate;

  beforeEach(() => {
    mockRemoveCookie = jest.fn();
    mockSetSectionName = jest.fn();
    mockSetUserId = jest.fn();
    mockSetCookie = jest.fn();
    mockSetIsLoggedIn = jest.fn();
    mockPreviousSectionURL = '/';
    mockHandleMessage = jest.fn();
    mockNavigate = jest.fn();
  });

  it('renders the Register component', async () => {
    const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <Register
        removeCookie={mockRemoveCookie}
        setSectionName={mockSetSectionName}
        setUserId={mockSetUserId}
        setCookie={mockSetCookie}
        setIsLoggedIn={mockSetIsLoggedIn}
        previousSectionURL={mockPreviousSectionURL}
        handleMessage={mockHandleMessage}
        navigate={mockNavigate}
      />
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText('Firstname:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Lastname:'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Username:'), { target: { value: 'johndoe' } });
    fireEvent.change(getByLabelText('Phone number:'), { target: { value: '1234567890' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Date of birth:'), { target: { value: '1990-01-01' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password' } });

    fireEvent.click(getByText('Register'));

    await waitFor(() =>
      expect(UserCreate).toHaveBeenCalledWith(
        {
          fname: 'John',
          sname: 'Doe',
          username: 'johndoe',
          phoneNumber: '1234567890',
          email: 'john@example.com',
          dob: '1990-01-01',
          password: 'password',
        },
        loginUser,
        mockSetCookie,
        mockSetIsLoggedIn,
        mockPreviousSectionURL,
        expect.any(Function),
        mockHandleMessage
      )
    );

  });
});
