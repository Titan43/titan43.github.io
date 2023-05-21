import { CreateProduct } from '../../Product/CreateProduct';
import { PRODUCT_LINK } from '../../constants';

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  text: jest.fn().mockResolvedValue('Success'),
});

describe('CreateProduct', () => {
  const formData = {
    name: 'Test Product',
    price: 9.99,
    quantity: 10,
    description: 'Test description',
    image: 'test image',
  };
  const cookies = { token: 'mockToken' };
  const handleMessage = jest.fn();
  const toggleEmpty = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetch with the correct parameters', async () => {
    await CreateProduct(formData, cookies, handleMessage, toggleEmpty);

    expect(fetch).toHaveBeenCalledWith(PRODUCT_LINK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(formData),
    });
  });

  it('calls toggleEmpty when the response is successful', async () => {
    const message = 'Success';
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValue(message),
    });
    await CreateProduct(formData, cookies, handleMessage, toggleEmpty);

    expect(toggleEmpty).toHaveBeenCalled();
  });

  it('calls handleMessage with the response text when the response is successful', async () => {
    const message = 'Success';
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValue(message),
    });

    await CreateProduct(formData, cookies, handleMessage, toggleEmpty);
    await delay();

    expect(handleMessage).toHaveBeenCalledWith(message);
  });

  it('calls handleMessage with the error message when the response is not successful', async () => {
    const errorMessage = 'Request failed';
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValue(errorMessage),
    });

    await CreateProduct(formData, cookies, handleMessage, toggleEmpty);
    await delay(); 

    expect(handleMessage).toHaveBeenCalledWith(errorMessage, 'error');
  });

  it('calls handleMessage with the error message if response text is empty', async () => {
    const errorMessage = '';
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValue(''),
    });

    await CreateProduct(formData, cookies, handleMessage, toggleEmpty);
    await delay(); 

    expect(handleMessage).toHaveBeenCalledWith(errorMessage, 'error');
  });

  it('calls handleMessage with the error message if fetch fails', async () => {
    const errorMessage = 'Fetch failed';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await CreateProduct(formData, cookies, handleMessage, toggleEmpty);
    await delay(); 

    expect(handleMessage).toHaveBeenCalledWith(errorMessage, 'error');
  });
});

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
