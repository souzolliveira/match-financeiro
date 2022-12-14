/* eslint-disable no-bitwise */
import React, { createContext, useContext, useEffect, useState } from 'react';

import Notification from 'components/Notification/Notification';
import Toast from 'components/Notification/Toast/Toast';

const NotificationContext = createContext({});

const NotificationProvider = ({ children, position }) => {
  const [notification, setNotification] = useState({
    position,
    toasts: [],
  });

  useEffect(() => {
    setNotification({ ...notification, position });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const uuid = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

  const removeToast = id => {
    const index = notification.toasts.findIndex(item => item.id === id);
    notification.toasts.splice(index, 1);
    setNotification({ ...notification, toasts: notification.toasts });
  };

  const addToast = ({ content, type, timeout }) => {
    const t = timeout || 5;
    const id = uuid();
    notification.toasts.push({
      id,
      content,
      type: type || 'default',
      timeout: t,
    });
    setNotification({ ...notification, toasts: notification.toasts });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NotificationContext.Provider value={{ notification, setNotification, addToast }}>
      {children}
      <Notification position={notification.position}>
        {notification.toasts.map(toast => (
          <Toast key={toast.id} id={toast.id} content={toast.content} type={toast.type} timeout={toast.timeout} removeToast={removeToast} />
        ))}
      </Notification>
    </NotificationContext.Provider>
  );
};

function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('use context must be used within a NotificationProvider');

  return context;
}

export { useNotification, NotificationProvider };
