import { UserUpdate } from '../../User/UserUpdate';
import { USER_LINK } from '../../constants';

describe('UserUpdate', () => {
  let mockUsername;
  let mockNewData;
  let mockCookies;
  let mockHandleMessage;
  let mockResponse;

  beforeEach(() => {
    mockUsername = 'testuser';
    mockNewData = { role: 'VENDOR' };
    mockCookies = { token: 'mock-token' };
    mockHandleMessage = jest.fn();
    mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue('User data updated successfully.'),
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('updates user data successfully', async () => {
    await UserUpdate(mockUsername, mockNewData, mockCookies, mockHandleMessage);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${USER_LINK}?username=${mockUsername}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockCookies.token}`,
        },
        body: JSON.stringify(mockNewData),
      }
    );

    expect(mockResponse.text).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith('User data updated successfully.');
  });

  it('handles error when updating user data', async () => {
    const errorMessage = 'Failed to update user data';

    mockResponse.ok = false;
    mockResponse.text = jest.fn().mockResolvedValueOnce(errorMessage);

    await UserUpdate(mockUsername, mockNewData, mockCookies, mockHandleMessage);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        `${USER_LINK}?username=${mockUsername}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockCookies.token}`,
        },
        body: JSON.stringify(mockNewData),
      }
    );

    expect(mockResponse.text).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith(errorMessage, 'error');
  });
});
