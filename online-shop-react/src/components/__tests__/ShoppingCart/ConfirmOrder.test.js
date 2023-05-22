import { ConfirmOrder } from '../../ShoppingCart/ConfirmOrder';
import { ORDER_LINK } from '../../constants';

describe('ConfirmOrder', () => {
  const mockCookies = { token: 'abc123' };
  const mockSetCartData = jest.fn();
  const mockHandleMessage = jest.fn();

  afterEach(() => {
    mockSetCartData.mockClear();
    mockHandleMessage.mockClear();
  });

  it('sends a POST request to confirm the order and clears cart data on success', async () => {
    const mockResponse = { ok: true, text: jest.fn().mockResolvedValue('Order confirmed') };
    const mockFetch = jest.fn().mockResolvedValue(mockResponse);
    global.fetch = mockFetch;

    await ConfirmOrder(mockCookies, mockSetCartData, mockHandleMessage);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${ORDER_LINK}/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mockCookies.token}`,
      },
    });

    expect(mockSetCartData).toHaveBeenCalledTimes(1);
    expect(mockSetCartData).toHaveBeenCalledWith(null);

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith('Order confirmed');
  });

  it('throws an error and calls handleMessage on failure', async () => {
    const mockResponse = { ok: false, text: jest.fn().mockResolvedValue('Order confirmation failed') };
    const mockFetch = jest.fn().mockResolvedValue(mockResponse);
    global.fetch = mockFetch;

    await ConfirmOrder(mockCookies, mockSetCartData, mockHandleMessage);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${ORDER_LINK}/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mockCookies.token}`,
      },
    });

    expect(mockSetCartData).not.toHaveBeenCalled();

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith('Order confirmation failed', 'error');
  });

  it('calls handleMessage with error message on network error', async () => {
    const mockError = new Error('Network error');
    const mockFetch = jest.fn().mockRejectedValue(mockError);
    global.fetch = mockFetch;

    await ConfirmOrder(mockCookies, mockSetCartData, mockHandleMessage);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${ORDER_LINK}/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mockCookies.token}`,
      },
    });

    expect(mockSetCartData).not.toHaveBeenCalled();

    expect(mockHandleMessage).toHaveBeenCalledTimes(1);
    expect(mockHandleMessage).toHaveBeenCalledWith('Network error', 'error');
  });
});
