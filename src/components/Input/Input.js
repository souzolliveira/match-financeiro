/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';

import styles from './Input.module.scss';

const Input = ({
  defaultValue,
  type,
  name,
  value,
  className,
  placeholder,
  size,
  width,
  maxLength,
  min,
  max,
  onChange,
  onPaste,
  onInput,
  onBlur,
  onKeyUp,
  disabled,
  autoFocus,
}) => {
  return (
    <input
      defaultValue={defaultValue}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      min={min}
      max={max}
      onChange={onChange}
      onPaste={onPaste}
      onInput={onInput}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      className={`${className} ${styles.input} ${size ? styles[size] : ''}`}
      style={width ? { width } : null}
      disabled={disabled}
      autoFocus={!!autoFocus}
    />
  );
};
export default Input;
