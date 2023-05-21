import { CreateProduct } from '../../Product/CreateProduct';
import { PRODUCT_LINK } from '../../constants';

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  text: jest.fn().mockResolvedValue('Success'),
});

describe('CreateProduct', () => {
    let formData;
    let cookies;
    let handleMessage;
    let toggleEmpty;
  
    beforeEach(() => {
      formData = {}; 
      cookies = {}; 
      handleMessage = jest.fn();
      toggleEmpty = jest.fn();
    });
  
    it('calls fetch with the correct parameters', async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve('Success') });
  
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
      global.fetch = jest.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve('Success') });
  
      await CreateProduct(formData, cookies, handleMessage, toggleEmpty);
  
      expect(toggleEmpty).toHaveBeenCalled();
    });
  
    it('calls handleMessage with the response text when the response is successful', async () => {
      const message = 'Success';
      global.fetch = jest.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(message) });
  
      await CreateProduct(formData, cookies, handleMessage, toggleEmpty);
  
      expect(handleMessage).toHaveBeenCalledWith(message);
    });
  
    it('calls handleMessage with the error message when the response is not successful', async () => {
      const errorMessage = 'Request failed';
      global.fetch = jest.fn().mockResolvedValue({ ok: false, text: () => Promise.resolve(errorMessage) });
  
      await CreateProduct(formData, cookies, handleMessage, toggleEmpty);
  
      expect(handleMessage).toHaveBeenCalledWith(errorMessage, 'error');
    });
  });