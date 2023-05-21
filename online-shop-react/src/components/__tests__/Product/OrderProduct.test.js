import { orderProduct } from '../../Product/OrderProduct';
import { ORDER_LINK } from '../../constants';

describe('orderProduct', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should send a request to order a product with the provided quantity', async () => {
    const cookies = { token: 'mockToken' };
    const productId = 123;
    const quantity = 5;
    const handleMessage = jest.fn();

    const mockResponse = { ok: true, text: jest.fn(() => Promise.resolve('Order successful')) };
    global.fetch.mockResolvedValue(mockResponse);

    await orderProduct(cookies, productId, quantity, handleMessage);

    expect(global.fetch).toHaveBeenCalledWith(
        `${ORDER_LINK}/orderProduct/123?quantity=5`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mockToken',
        },
      }
    );

    expect(handleMessage).toHaveBeenCalledWith('Order successful');
  });

  it('should handle error if the response is not ok', async () => {
    const cookies = { token: 'mockToken' };
    const productId = 123;
    const quantity = 5;
    const handleMessage = jest.fn();

    const mockResponse = { ok: false, text: jest.fn(() => Promise.resolve('Error message')) };
    global.fetch.mockResolvedValue(mockResponse);

    await orderProduct(cookies, productId, quantity, handleMessage);

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/api/v1/order/orderProduct/123?quantity=5", 
        {"headers": {"Authorization": "Bearer mockToken", "Content-Type": "application/json"}, "method": "GET"});

    expect(handleMessage).toHaveBeenCalledWith('Error message', 'error');
  });

  it('should handle network errors', async () => {
    const cookies = { token: 'mockToken' };
    const productId = 123;
    const quantity = 5;
    const handleMessage = jest.fn();

    const error = new Error('Network error');
    global.fetch.mockRejectedValue(error);

    await orderProduct(cookies, productId, quantity, handleMessage);

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/api/v1/order/orderProduct/123?quantity=5",
     {"headers": {"Authorization": "Bearer mockToken", "Content-Type": "application/json"}, "method": "GET"});

    expect(handleMessage).toHaveBeenCalledWith('Network error', 'error');
  });
});
