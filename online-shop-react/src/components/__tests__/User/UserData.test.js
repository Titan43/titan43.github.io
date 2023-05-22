import { UserData } from '../../User/UserData';
import { USER_LINK } from '../../constants';

describe('UserData', () => {
  let mockCookies;
  let mockSetUser;
  let mockHandleMessage;
  let mockUsername;
  let mockResponse;

  beforeEach(() => {
    mockCookies = { token: 'mock-token' };
    mockSetUser = jest.fn();
    mockHandleMessage = jest.fn();
    mockUsername = 'testuser';
    mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        username: 'testuser',
        email: 'testuser@example.com',
        role: 'BUYER',
      }),
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('fetches user data successfully', async () => {
    await UserData(mockCookies, mockSetUser, mockHandleMessage, mockUsername);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${USER_LINK}?username=${mockUsername}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockCookies.token}`,
        },
      }
    );

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledWith({
      username: 'testuser',
      password: null,
      email: 'testuser@example.com',
      role: 'BUYER',
    });
  });

  it('handles error when fetching user data', async () => {
    const errorMessage = 'Failed to fetch user data';

    mockResponse.ok = false;
    mockResponse.text = jest.fn().mockResolvedValueOnce(errorMessage);

    await UserData(mockCookies, mockSetUser, mockHandleMessage, mockUsername);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        `${USER_LINK}?username=${mockUsername}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockCookies.token}`,
        },
      }
    );

    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith(errorMessage, 'error');
  });

  it('fetches user data without username', async () => {
    await UserData(mockCookies, mockSetUser, mockHandleMessage, '');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      USER_LINK,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockCookies.token}`,
        },
      }
    );

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledWith({
      username: 'testuser',
      password: null,
      email: 'testuser@example.com',
      role: 'BUYER',
    });
  });
});
