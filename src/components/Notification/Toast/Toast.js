import React, { useState } from 'react';

import Close from '../Icons/close.svg';
import Info from '../Icons/info.svg';
import Success from '../Icons/success.svg';
import Warning from '../Icons/warning.svg';

import styles from './Toast.module.scss';

const Toast = ({ id, content, type, timeout, removeToast }) => {
  const className = [styles.toast];
  let icon = Info;

  const toastRef = React.useRef();
  const [timeoutID, setTimeoutID] = useState(null);

  // Timeouts toast to remove it
  const timeoutToast = (toastID, secs) => {
    setTimeout(() => {
      removeToast(toastID);
    }, secs * 1000);
  };

  // Resets timeout
  const resetTimeout = () => {
    if (timeoutID) {
      clearTimeout(timeoutID);
      setTimeoutID(null);
    }
  };

  // Restarts timeout
  const restartTimeout = () => {
    if (!timeoutID && timeout > 0) setTimeoutID(timeoutToast(id, timeout));
  };

  // On mount, activate animation and timeout
  React.useEffect(() => {
    setTimeout(() => toastRef.current.classList.add(styles.animateIn));
    if (timeout > 0) setTimeoutID(timeoutToast(id, timeout));
    // eslint-disable-next-line
  }, []);

  // Select styles for type
  if (type === 'success') {
    className.push(styles.success);
    icon = Success;
  } else if (type === 'warning') {
    icon = Warning;
    className.push(styles.warning);
  } else if (type === 'danger') {
    className.push(styles.danger);
    icon = Warning;
  } else if (type === 'info') {
    className.push(styles.info);
    icon = Info;
  } else if (type === 'default') {
    className.push(styles.default);
    icon = Info;
  } else className.push(styles.default); // default style

  return (
    <div data-testid={`Toast_${type}`} className={className.join(' ')} ref={toastRef} onFocus={resetTimeout} onMouseOver={resetTimeout} onMouseLeave={restartTimeout}>
      <div className={styles.icon}>
        <img src={icon} alt='' />
      </div>
      <span className={styles.content}>{content}</span>
      <button type='button' className={styles.close} onClick={() => removeToast(id)}>
        <img src={Close} alt='Close' />
      </button>
    </div>
  );
};

export default Toast;
