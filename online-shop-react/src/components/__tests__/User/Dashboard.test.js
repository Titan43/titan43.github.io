import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dashboard from '../../User/Dashboard';

describe('Dashboard', () => {
  let mockUserRole;
  let mockHandleViewOrders;
  let mockHandleUserGetForm;
  let mockHandleUserUpdateForm;
  let mockHandleUserDelete;

  beforeEach(() => {
    mockUserRole = 'MANAGER';
    mockHandleViewOrders = jest.fn();
    mockHandleUserGetForm = jest.fn();
    mockHandleUserUpdateForm = jest.fn();
    mockHandleUserDelete = jest.fn();
  });

  it('renders buttons for manager role', () => {
    const { getByText, queryByText } = render(
      <Dashboard
        userRole={mockUserRole}
        handleViewOrders={mockHandleViewOrders}
        handleUserGetForm={mockHandleUserGetForm}
        handleUserUpdateForm={mockHandleUserUpdateForm}
        handleUserDelete={mockHandleUserDelete}
      />
    );

    expect(getByText('View Orders')).toBeInTheDocument();
    expect(getByText('View user data')).toBeInTheDocument();
    expect(getByText('Change data')).toBeInTheDocument();
    expect(getByText('Delete account')).toBeInTheDocument();
    expect(queryByText('Update Acc')).toBeNull();
  });

  it('handles click events', () => {
    const { getByText } = render(
      <Dashboard
        userRole={mockUserRole}
        handleViewOrders={mockHandleViewOrders}
        handleUserGetForm={mockHandleUserGetForm}
        handleUserUpdateForm={mockHandleUserUpdateForm}
        handleUserDelete={mockHandleUserDelete}
      />
    );

    const viewOrdersButton = getByText('View Orders');
    const viewUserDataButton = getByText('View user data');
    const changeDataButton = getByText('Change data');
    const deleteAccountButton = getByText('Delete account');

    fireEvent.click(viewOrdersButton);
    fireEvent.click(viewUserDataButton);
    fireEvent.click(changeDataButton);
    fireEvent.click(deleteAccountButton);

    expect(mockHandleViewOrders).toHaveBeenCalledTimes(1);
    expect(mockHandleUserGetForm).toHaveBeenCalledTimes(1);
    expect(mockHandleUserUpdateForm).toHaveBeenCalledTimes(1);
    expect(mockHandleUserDelete).toHaveBeenCalledTimes(1);
  });
});
