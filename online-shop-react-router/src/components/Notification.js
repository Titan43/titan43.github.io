import { useState, useEffect } from 'react';
import '../stylesheets/notification.css';

const Notification = ({ message, type, notificationUpdateTime }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 4900);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [message, notificationUpdateTime]);

  const backgroundColor = type === 'error' ? '#8b0000' : 'green';

  return (
    <div
      className={show ? `notification ${type}` : 'hidden'}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <p>{message}</p>
      {show && (
        <div className="timer">
          <div className="bar" />
        </div>
      )}
    </div>
  );
};

export default Notification;
