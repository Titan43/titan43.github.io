import { fetchOrder } from '../../Product/FetchOrder';
import { ORDER_LINK } from '../../constants';

jest.mock('node-fetch');
const setOrder = jest.fn();
const handleMessage = jest.fn();

describe('fetchOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch order successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ orderId: '123', status: 'completed' }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const orderId = '123';
    const cookies = { token: 'mockToken' };

    await fetchOrder(orderId, cookies, setOrder, handleMessage);

    expect(global.fetch).toHaveBeenCalledWith(`${ORDER_LINK}/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`,
      },
    });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(setOrder).toHaveBeenCalledWith({ orderId: '123', status: 'completed' });
    expect(handleMessage).not.toHaveBeenCalled();
  });

  it('should handle error when fetching order', async () => {
    const mockResponse = {
      ok: false,
      text: jest.fn().mockResolvedValue('Not found'),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const orderId = '123';
    const cookies = { token: 'mockToken' };

    await fetchOrder(orderId, cookies, setOrder, handleMessage);

    expect(global.fetch).toHaveBeenCalledWith(`${ORDER_LINK}/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`,
      },
    });
    expect(mockResponse.text).toHaveBeenCalled();
    expect(setOrder).not.toHaveBeenCalled();
    expect(handleMessage).toHaveBeenCalledWith('Not found', 'error');
  });
});
