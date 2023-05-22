import { UserDelete } from '../../User/UserDelete';
import { USER_LINK } from '../../constants';

describe('UserDelete', () => {
  let mockUsername;
  let mockCookies;
  let mockNavigate;
  let mockHandleMessage;

  beforeEach(() => {
    mockUsername = 'mock-username';
    mockCookies = { token: 'mock-token' };
    mockNavigate = jest.fn();
    mockHandleMessage = jest.fn();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('deletes user and navigates to login', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce('User deleted successfully'),
    });

    await UserDelete(mockUsername, mockCookies, mockNavigate, mockHandleMessage);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        `${USER_LINK}?username=${mockUsername}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockCookies.token}`,
        },
      }
    );
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockHandleMessage).toHaveBeenCalledWith('User deleted successfully');
  });

  it('handles error when deleting user', async () => {
    const errorMessage = 'Failed to delete user';

    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValueOnce(errorMessage),
    });

    await UserDelete(mockUsername, mockCookies, mockNavigate, mockHandleMessage);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        `${USER_LINK}?username=${mockUsername}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockCookies.token}`,
        },
      }
    );
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockHandleMessage).toHaveBeenCalledWith(errorMessage, 'error');
  });
});
