import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Account from '../../../pages/Account';

describe('Account', () => {
  const mockCookies = {};

  test('renders Account component', async () => {
    const setSectionName = jest.fn();
    const handleMessage = jest.fn();
    const setPreviousSectionURL = jest.fn();
    const validateToken = jest.fn().mockReturnValue(true);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        role: 'MANAGER',
        fname: 'John',
        sname: 'Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        dob: '1990-01-01',
      }),
    });

    render(
      <BrowserRouter>
        <Account
          setSectionName={setSectionName}
          handleMessage={handleMessage}
          validateToken={validateToken}
          setPreviousSectionURL={setPreviousSectionURL}
          cookies={mockCookies}
        />
      </BrowserRouter>
    );

    expect(setSectionName).toHaveBeenCalledWith('Account');

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).toBeNull();
      expect(screen.getByText('MANAGER')).toBeInTheDocument();
      expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email: johndoe@example.com')).toBeInTheDocument();
      expect(screen.getByText('Phone number: 1234567890')).toBeInTheDocument();
      expect(screen.getByText('Date of Birth: 1990-01-01')).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });
});
