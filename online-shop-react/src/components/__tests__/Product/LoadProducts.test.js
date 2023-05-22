import { fetchProducts } from '../../Product/LoadProducts';
import { PRODUCT_LINK } from '../../constants';

describe('fetchProducts', () => {
  let mockIsEmptyRef;
  let mockCurrentPage;
  let mockSetItems;
  let mockLoadPrevItems;
  let mockSetLoading;
  let mockHandleMessage;

  beforeEach(() => {
    mockIsEmptyRef = { current: false };
    mockCurrentPage = 1;
    mockSetItems = jest.fn();
    mockLoadPrevItems = jest.fn();
    mockSetLoading = jest.fn();
    mockHandleMessage = jest.fn();
  });

  test('fetches products successfully when there are items', async () => {
    const mockData = ['product1', 'product2'];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    await fetchProducts(
      mockIsEmptyRef,
      mockCurrentPage,
      mockSetItems,
      mockLoadPrevItems,
      mockSetLoading,
      mockHandleMessage
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `${PRODUCT_LINK}/products?page=${mockCurrentPage}&count=9`
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

    await fetchProducts(
      mockIsEmptyRef,
      mockCurrentPage,
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

  test('handles error on fetch failure', async () => {
    const mockErrorMessage = 'Failed to fetch products';

    global.fetch = jest.fn().mockRejectedValueOnce(mockErrorMessage);

    await fetchProducts(
      mockIsEmptyRef,
      mockCurrentPage,
      mockSetItems,
      mockLoadPrevItems,
      mockSetLoading,
      mockHandleMessage
    );

    expect(mockSetItems).not.toHaveBeenCalled();
    expect(mockHandleMessage).toHaveBeenCalledWith(mockErrorMessage, 'error');
    expect(mockIsEmptyRef.current).toBe(false);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });
});
