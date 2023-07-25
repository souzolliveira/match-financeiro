import React, { useEffect, useRef } from 'react';

import Icon from 'components/Icon';

import styles from './Modal.module.scss';

const Modal = ({ children, visible, canClose, onClose, title, top, fullscreen, width, height }) => {
  const modal = useRef(null);

  const handleClickOutside = event => {
    if (visible && canClose && modal.current && !modal.current.contains(event.target)) onClose();
  };

  const handleKeyDown = event => {
    if (visible && canClose && event.key === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    visible && (
      <div
        className={`${styles.modal} ${visible && styles.modal__visible}`}
        style={
          top && !fullscreen
            ? {
                paddingTop: top,
                alignItems: 'flex-start',
              }
            : {
                alignItems: 'center',
              }
        }
      >
        <div
          className={styles.modal__card}
          style={
            fullscreen
              ? {
                  width: '100%',
                  height: '100%',
                  borderRadius: 0,
                }
              : {
                  width,
                  height,
                }
          }
          ref={modal}
        >
          {title && (
            <div className={styles.modal__header}>
              <span className={styles.modal__title}>{title}</span>
              {canClose && (
                <button className={styles.modal__close} type='button' onClick={() => onClose()}>
                  <Icon name='close' width={24} height={24} fill='var(--gold-darker)' />
                </button>
              )}
            </div>
          )}
          <div
            className={styles.modal__body}
            style={
              title
                ? {
                    height: 'calc(100% - 60px)',
                    maxHeight: `calc(100vh - 60px - ${top})`,
                    marginTop: '60px',
                  }
                : {
                    height: '100%',
                    maxHeight: `calc(100vh - ${top})`,
                  }
            }
          >
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
