import { fetchOrders } from '../../Product/LoadOrders';
import { ORDER_LINK } from '../../constants';

describe('fetchOrders', () => {
  let mockIsEmptyRef;
  let mockCurrentPage;
  let mockCookies;
  let mockSetItems;
  let mockLoadPrevItems;
  let mockSetLoading;
  let mockHandleMessage;

  beforeEach(() => {
    mockIsEmptyRef = { current: false };
    mockCurrentPage = 1;
    mockCookies = { token: 'mockToken' };
    mockSetItems = jest.fn();
    mockLoadPrevItems = jest.fn();
    mockSetLoading = jest.fn();
    mockHandleMessage = jest.fn();
  });

  test('fetches orders successfully when there are items', async () => {
    const mockData = ['order1', 'order2'];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    await fetchOrders(
      mockIsEmptyRef,
      mockCurrentPage,
      mockCookies,
      mockSetItems,
      mockLoadPrevItems,
      mockSetLoading,
      mockHandleMessage
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `${ORDER_LINK}/allOrders?page=${mockCurrentPage}&count=9`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockCookies.token}`,
        },
      }
    );
    expect(mockSetItems).toHaveBeenCalledWith(mockData);
    expect(mockHandleMessage).not.toHaveBeenCalled();
    expect(mockLoadPrevItems).not.toHaveBeenCalled();
    expect(mockIsEmptyRef.current).toBe(false);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  test('handles error and sets isEmptyRef.current to true when no items are available', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([]),
    });

    await fetchOrders(
      mockIsEmptyRef,
      mockCurrentPage,
      mockCookies,
      mockSetItems,
      mockLoadPrevItems,
      mockSetLoading,
      mockHandleMessage
    );

    expect(mockSetItems).not.toHaveBeenCalled();
    expect(mockHandleMessage).toHaveBeenCalledWith(
      "Can't load more items(CODE 404)",
      'error'
    );
    expect(mockLoadPrevItems).toHaveBeenCalled();
    expect(mockIsEmptyRef.current).toBe(false);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  test('handles error and sets isEmptyRef.current to true on fetch failure', async () => {
    const mockErrorMessage = 'Failed to fetch orders';

    global.fetch = jest.fn().mockRejectedValueOnce(new Error(mockErrorMessage));

    await fetchOrders(
      mockIsEmptyRef,
      mockCurrentPage,
      mockCookies,
      mockSetItems,
      mockLoadPrevItems,
      mockSetLoading,
      mockHandleMessage
    );

    expect(mockSetItems).not.toHaveBeenCalled();
    expect(mockHandleMessage).toHaveBeenCalledWith(mockErrorMessage, 'error');
    expect(mockIsEmptyRef.current).toBe(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });
});
