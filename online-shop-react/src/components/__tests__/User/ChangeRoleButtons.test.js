import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChangeRoleButtons from '../../User/ChangeRoleButtons';
import { UserUpdate } from '../../User/UserUpdate';

jest.mock('../../User/UserUpdate', () => ({
  UserUpdate: jest.fn().mockResolvedValue(),
}));

describe('ChangeRoleButtons', () => {
  let mockUsername;
  let mockRole;
  let mockCookies;
  let mockHandleMessage;
  let mockHandleUserObtain;

  beforeEach(() => {
    mockUsername = 'mock-username';
    mockRole = 'BUYER';
    mockCookies = {};
    mockHandleMessage = jest.fn();
    mockHandleUserObtain = jest.fn();
  });

  it('renders change role buttons', () => {
    const { getByText, queryByText } = render(
      <ChangeRoleButtons
        username={mockUsername}
        role={mockRole}
        cookies={mockCookies}
        handleMessage={mockHandleMessage}
        handleUserObtain={mockHandleUserObtain}
      />
    );

    expect(getByText('Change user role to:')).toBeInTheDocument();
    expect(queryByText('Buyer')).toBeNull();
    expect(getByText('Vendor')).toBeInTheDocument();
    expect(getByText('Manager')).toBeInTheDocument();
  });

  it('handles role change to Buyer', () => {
    const { getByText } = render(
      <ChangeRoleButtons
        username={mockUsername}
        role={'VENDOR'}
        cookies={mockCookies}
        handleMessage={mockHandleMessage}
        handleUserObtain={mockHandleUserObtain}
      />
    );

    const buyerButton = getByText('Buyer');
    fireEvent.click(buyerButton);

    expect(UserUpdate).toHaveBeenCalledTimes(1);
    expect(UserUpdate).toHaveBeenCalledWith(
      mockUsername,
      { role: 'BUYER' },
      mockCookies,
      mockHandleMessage
    );
  });

  it('handles role change to Vendor', () => {
    const { getByText } = render(
      <ChangeRoleButtons
        username={mockUsername}
        role={'BUYER'}
        cookies={mockCookies}
        handleMessage={mockHandleMessage}
        handleUserObtain={mockHandleUserObtain}
      />
    );

    const vendorButton = getByText('Vendor');
    fireEvent.click(vendorButton);

    expect(UserUpdate).toHaveBeenCalledTimes(1);
    expect(UserUpdate).toHaveBeenCalledWith(
      mockUsername,
      { role: 'VENDOR' },
      mockCookies,
      mockHandleMessage
    );
    expect(mockHandleUserObtain).toHaveBeenCalledTimes(0);
  });

  it('handles role change to Manager', () => {
    const { getByText } = render(
      <ChangeRoleButtons
        username={mockUsername}
        role={mockRole}
        cookies={mockCookies}
        handleMessage={mockHandleMessage}
        handleUserObtain={mockHandleUserObtain}
      />
    );

    const managerButton = getByText('Manager');
    fireEvent.click(managerButton);

    expect(UserUpdate).toHaveBeenCalledTimes(1);
    expect(UserUpdate).toHaveBeenCalledWith(
      mockUsername,
      { role: 'MANAGER' },
      mockCookies,
      mockHandleMessage
    );
    expect(mockHandleUserObtain).toHaveBeenCalledTimes(0);
  });
});
