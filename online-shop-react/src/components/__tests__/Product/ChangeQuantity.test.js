import { changeQuantityBy } from '../../Product/ChangeQuantity';
import { PRODUCT_LINK } from '../../constants';

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  text: jest.fn().mockResolvedValue('Success'),
});

describe('changeQuantityBy', () => {
  const cookies = { token: 'mockToken' };
  const productId = 'mockProductId';
  const quantity = 5;
  const handleMessage = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetch with the correct parameters', async () => {
    await changeQuantityBy(cookies, productId, quantity, handleMessage);

    expect(fetch).toHaveBeenCalledWith(
      `${PRODUCT_LINK}/${productId}`,
      expect.objectContaining({
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({ changeQuantityBy: quantity }),
      })
    );
  });

  it('calls handleMessage with the response text when the response is successful', async () => {
    const message = 'Success';
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValue(message),
    });
    await changeQuantityBy(cookies, productId, quantity, handleMessage);
    expect(handleMessage).toHaveBeenCalledWith('Success');
  });

  it('calls handleMessage with the error message when the response is not successful', async () => {
    const errorMessage = 'Request failed';
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValue(errorMessage),
    });

    await changeQuantityBy(cookies, productId, quantity, handleMessage);

    expect(handleMessage).toHaveBeenCalledWith(errorMessage, 'error');
  });
});
