import React from 'react';

import styles from './Input.module.scss';

const Input = ({
  id,
  defaultValue,
  type,
  name,
  value,
  className,
  placeholder,
  width,
  maxLength,
  min,
  max,
  onChange,
  onPaste,
  onInput,
  onFocus,
  onBlur,
  onKeyUp,
  disabled,
  readOnly,
}) => {
  return (
    <input
      id={id}
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
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      className={`${className} ${styles.input}`}
      style={width ? { width } : null}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};
export default Input;
