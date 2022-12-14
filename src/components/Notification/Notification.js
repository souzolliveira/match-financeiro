import React from 'react';

import styles from './Notification.module.scss';

const Notification = ({ children, position }) => {
  const className = [styles.notification];

  switch (position) {
    case 'top-right':
      className.push(styles.topRight);
      break;
    case 'top-left':
      className.push(styles.topLeft);
      break;
    case 'bottom-right':
      className.push(styles.bottomRight);
      break;
    case 'bottom-left':
      className.push(styles.bottomLeft);
      break;
    default:
      className.push(styles.topRight);
  }

  return <div className={className.join(' ')}>{children}</div>;
};

export default Notification;
