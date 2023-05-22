import { UserCreate } from '../../User/UserCreate';
import { USER_LINK } from '../../constants';

describe('UserCreate', () => {
  let mockFormData;
  let mockLoginUser;
  let mockSetCookie;
  let mockSetIsLoggedIn;
  let mockPreviousSectionURL;
  let mockNavigate;
  let mockHandleMessage;
  let mockResponse;

  beforeEach(() => {
    mockFormData = { username: 'testuser', password: 'password' };
    mockLoginUser = jest.fn();
    mockSetCookie = jest.fn();
    mockSetIsLoggedIn = jest.fn();
    mockPreviousSectionURL = '/previous-section';
    mockNavigate = jest.fn();
    mockHandleMessage = jest.fn();
    mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue('User created successfully'),
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('creates user successfully', async () => {
    await UserCreate(
      mockFormData,
      mockLoginUser,
      mockSetCookie,
      mockSetIsLoggedIn,
      mockPreviousSectionURL,
      mockNavigate,
      mockHandleMessage
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      USER_LINK+'/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockFormData),
      }
    );
  });

  it('handles error during user creation', async () => {
    const errorMessage = 'Failed to create user';

    mockResponse.ok = false;
    mockResponse.text.mockResolvedValueOnce(errorMessage);

    await UserCreate(
      mockFormData,
      mockLoginUser,
      mockSetCookie,
      mockSetIsLoggedIn,
      mockPreviousSectionURL,
      mockNavigate,
      mockHandleMessage
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      USER_LINK+'/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockFormData),
      }
    );

    expect(mockLoginUser).not.toHaveBeenCalled();
  });
});
