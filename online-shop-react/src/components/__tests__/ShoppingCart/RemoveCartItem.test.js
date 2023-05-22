import { RemoveCartItem } from '../../ShoppingCart/RemoveCartItem';
import { ORDER_LINK } from '../../constants';

describe('RemoveCartItem', () => {
  const mockCookies = { token: 'abc123' };
  const mockProductId = '123';
  const mockHandleMessage = jest.fn();

  afterEach(() => {
    mockHandleMessage.mockClear();
  });

  it('sends a DELETE request to remove the item from the cart', async () => {
    const mockResponse = { ok: true, text: jest.fn().mockResolvedValue('Item removed') };
    const mockFetch = jest.fn().mockResolvedValue(mockResponse);
    global.fetch = mockFetch;

    await RemoveCartItem(mockCookies, mockProductId, mockHandleMessage);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${ORDER_LINK}/removeOrdered/${mockProductId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${mockCookies.token}`,
      },
    });

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith('Item removed');
  });

  it('throws an error and calls handleMessage on failure', async () => {
    const mockResponse = { ok: false, text: jest.fn().mockResolvedValue('Item removal failed') };
    const mockFetch = jest.fn().mockResolvedValue(mockResponse);
    global.fetch = mockFetch;

    await RemoveCartItem(mockCookies, mockProductId, mockHandleMessage);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${ORDER_LINK}/removeOrdered/${mockProductId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${mockCookies.token}`,
      },
    });

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith('Item removal failed', 'error');
  });

  it('calls handleMessage with error message on network error', async () => {
    const mockError = new Error('Network error');
    const mockFetch = jest.fn().mockRejectedValue(mockError);
    global.fetch = mockFetch;

    await RemoveCartItem(mockCookies, mockProductId, mockHandleMessage);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${ORDER_LINK}/removeOrdered/${mockProductId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${mockCookies.token}`,
      },
    });

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith('Network error', 'error');
  });
});
