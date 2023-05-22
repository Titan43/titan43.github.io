import { render, waitFor, screen } from '@testing-library/react';
import Orders from '../../../pages/Orders';
import { BrowserRouter } from 'react-router-dom';

test('renders Orders component', async () => {
  const props = {
    setSectionName: jest.fn(),
    handleMessage: jest.fn(),
    validateToken: jest.fn(),
    setPreviousSectionURL: jest.fn(),
    role: 'MANAGER',
    cookies: {},
  };
  const navigate = jest.fn();

  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue([
      { id: 1, username: 'Order1', totalCost: 5, date: '2023-05-22', confirmed: true },
      { id: 2, username: 'Order2', totalCost: 5, date: '2023-05-22', confirmed: true },
      { id: 3, username: 'Order3', totalCost: 5, date: '2023-05-22', confirmed: false },
    ]),
  });

  render(
    <BrowserRouter>
      <Orders {...props} navigate={navigate} />
    </BrowserRouter>
  );

  expect(props.setSectionName).toHaveBeenCalledWith('Orders');

  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});
