import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Login from '../../../pages/Login';
import { loginUser } from '../../User/Auth';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../User/Auth', () => ({
  loginUser: jest.fn(),
}));

const setCookie = jest.fn();
const setIsLoggedIn = jest.fn();
const removeCookie = jest.fn();
const setUserId = jest.fn();
const setSectionName = jest.fn();
const previousSectionURL = '/';
const handleMessage = jest.fn();

describe('Login', () => {
  test('renders the Login component', () => {
    render(<Login removeCookie={removeCookie}
                setSectionName={setSectionName}
                setUserId={setUserId}
                />);
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('calls the loginUser function when submitting the form', () => {

    const username = 'testuser';
    const password = 'testpassword';

    render(
      <Login
        setCookie={setCookie}
        setIsLoggedIn={setIsLoggedIn}
        removeCookie={removeCookie}
        setUserId={setUserId}
        setSectionName={setSectionName}
        previousSectionURL={previousSectionURL}
        handleMessage={handleMessage}
      />
    );

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: username } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: password } });

    fireEvent.click(screen.getByText('Sign in'));

    expect(loginUser).toHaveBeenCalledWith(
      username,
      password,
      setCookie,
      setIsLoggedIn,
      previousSectionURL,
      useNavigate(),
      handleMessage
    );
  });

  test('navigates to register page when clicking on the Register button', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <Login
      setCookie={setCookie}
      setIsLoggedIn={setIsLoggedIn}
      removeCookie={removeCookie}
      setUserId={setUserId}
      setSectionName={setSectionName}
      previousSectionURL={previousSectionURL}
      handleMessage={handleMessage}
      />
    );

    fireEvent.click(screen.getByText('Register'));

    expect(navigate).toHaveBeenCalledWith('/register');
  });
});
