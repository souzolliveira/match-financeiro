import React from 'react';

const Close = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M17.0912 5.21177L18.7882 6.90883L6.90883 18.7882L5.21178 17.0912L17.0912 5.21177Z' fill={fill} />
    <path d='M6.90883 5.21177L18.7882 17.0912L17.0912 18.7882L5.21178 6.90883L6.90883 5.21177Z' fill={fill} />
  </svg>
);

export default Close;
