/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
import React from 'react';

import styles from './Button.module.scss';

const Button = ({
  id,
  type,
  name,
  children,
  className,
  kind,
  size,
  onClick,
  onFocus,
  onBlur,
  onMouseOver,
  onMouseLeave,
  onMouseDown,
  onMouseOut,
  onMouseUp,
  disabled,
  autoFocus,
  tooltip,
  tooltipflow,
}) => {
  const classes = [styles.btn, className, styles[kind], styles[`btn-${[size]}`]].join(' ');

  return (
    <button
      id={id}
      type={type}
      name={name}
      className={classes}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseOut={onMouseOut}
      onMouseUp={onMouseUp}
      disabled={disabled}
      tooltip={tooltip}
      tooltipflow={tooltipflow}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={!!autoFocus}
    >
      {children}
    </button>
  );
};
export default Button;
