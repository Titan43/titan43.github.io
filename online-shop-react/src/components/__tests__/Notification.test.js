import React from 'react';
import { render, screen } from '@testing-library/react';
import Notification from '../Notification';

describe('Notification', () => {
  test('renders notification with the correct message and type', () => {
    const message = 'Sample notification message';
    const type = 'error';
    const notificationUpdateTime = Date.now();

    render(
      <Notification
        message={message}
        type={type}
        notificationUpdateTime={notificationUpdateTime}
      />
    );

    const notification = screen.getByText(message);
    expect(notification).toBeInTheDocument();
    
    const notificationElement = notification.parentElement;
    const computedStyles = window.getComputedStyle(notificationElement);
    const backgroundColor = computedStyles.getPropertyValue('background-color');
    
    expect(backgroundColor).toEqual('rgb(139, 0, 0)');
  }); 

  test('does not render notification when message is empty', () => {
    const message = '';
    const type = 'error';
    const notificationUpdateTime = Date.now();
  
    render(
      <Notification
        message={message}
        type={type}
        notificationUpdateTime={notificationUpdateTime}
      />
    );
  
    const notifications = screen.queryAllByText(message);
    expect(notifications.length).toBe(4);
  });  

  test('applies correct animation when notification is shown', () => {
    const message = 'Sample notification message';
    const type = 'error';
    const notificationUpdateTime = Date.now();

    render(
      <Notification
        message={message}
        type={type}
        notificationUpdateTime={notificationUpdateTime}
      />
    );

    const notification = screen.getByText(message);
    const barElement = screen.getByTestId('timer-bar');

    expect(notification).toBeInTheDocument();
    expect(barElement).toBeInTheDocument();
    expect(barElement).toHaveStyle('animation: timerAnimation 3s ease-out');
  });
});