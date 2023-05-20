import { useState, useEffect, useRef } from 'react';
import '../stylesheets/notification.css';

const Notification = ({ message, type, notificationUpdateTime }) => {
  const [show, setShow] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2900);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [message, notificationUpdateTime]);

  useEffect(() => {
    if (show) {
      barRef.current.style.animation = 'none';
      void barRef.current.offsetWidth;
      barRef.current.style.animation = 'timerAnimation 3s ease-out';
    }
  }, [show, notificationUpdateTime]);

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
          <div ref={barRef} className="bar" data-testid="timer-bar"/>
        </div>
      )}
    </div>
  );
};

export default Notification;