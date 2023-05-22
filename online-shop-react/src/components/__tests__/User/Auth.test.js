import { loginUser } from '../../User/Auth';

jest.mock('../../constants', () => ({
  AUTH_LINK: 'mock-auth-link',
}));

describe('loginUser', () => {
  let mockSetCookie;
  let mockSetIsLoggedIn;
  let mockNavigate;
  let mockHandleMessage;

  beforeEach(() => {
    mockSetCookie = jest.fn();
    mockSetIsLoggedIn = jest.fn();
    mockNavigate = jest.fn();
    mockHandleMessage = jest.fn();
    jest.clearAllMocks();
  });

  it('logs in user successfully', async () => {
    const mockUsername = 'mock-username';
    const mockPassword = 'mock-password';
    const mockUserToken = { token: 'mock-token' };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockUserToken),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await loginUser(
      mockUsername,
      mockPassword,
      mockSetCookie,
      mockSetIsLoggedIn,
      'mock-previous-url',
      mockNavigate,
      mockHandleMessage
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('mock-auth-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: mockUsername, password: mockPassword }),
    });

    expect(mockSetCookie).toHaveBeenCalledTimes(1);
    expect(mockSetCookie).toHaveBeenCalledWith('token', mockUserToken.token);

    expect(mockSetIsLoggedIn).toHaveBeenCalledTimes(1);
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('mock-previous-url');

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith('Successfully logged in(CODE 200)');
  });

  it('handles login error', async () => {
    const mockUsername = 'mock-username';
    const mockPassword = 'mock-password';
    const mockError = 'Login error';
    const mockResponse = {
      ok: false,
      text: jest.fn().mockResolvedValue(mockError),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await loginUser(
      mockUsername,
      mockPassword,
      mockSetCookie,
      mockSetIsLoggedIn,
      'mock-previous-url',
      mockNavigate,
      mockHandleMessage
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('mock-auth-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: mockUsername, password: mockPassword }),
    });

    expect(mockSetCookie).not.toHaveBeenCalled();

    expect(mockSetIsLoggedIn).not.toHaveBeenCalled();

    expect(mockNavigate).not.toHaveBeenCalled();

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith(mockError, 'error');
  });
});
