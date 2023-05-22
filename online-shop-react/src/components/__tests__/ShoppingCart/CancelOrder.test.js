import { CancelOrder } from '../../ShoppingCart/CancelOrder';
import { ORDER_LINK } from '../../constants';

describe('CancelOrder', () => {
  const mockCookies = {
    token: 'abc123',
  };

  const mockHandleMessage = jest.fn();

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('Order canceled successfully'),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
    mockHandleMessage.mockClear();
  });

  it('cancels the order and handles success response', async () => {
    await CancelOrder(mockCookies, mockHandleMessage);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${ORDER_LINK}/cancel`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${mockCookies.token}`,
      },
    });

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith('Order canceled successfully');
  });

  it('handles error response', async () => {
    const errorMessage = 'Failed to cancel order';
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve(errorMessage),
      })
    );

    await CancelOrder(mockCookies, mockHandleMessage);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${ORDER_LINK}/cancel`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${mockCookies.token}`,
      },
    });

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith(errorMessage, 'error');
  });

  it('handles network error', async () => {
    const networkErrorMessage = 'Network error occurred';
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error(networkErrorMessage)));

    await CancelOrder(mockCookies, mockHandleMessage);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${ORDER_LINK}/cancel`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${mockCookies.token}`,
      },
    });

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith(networkErrorMessage, 'error');
  });
});
