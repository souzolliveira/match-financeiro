import React from 'react';

const Income = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M2.4 21.6V15.6H4.8V19.2H19.2V15.6H21.6V21.6H2.4Z' fill={fill} />
    <path d='M8.4 13.2L12 16.8L15.6 13.2H13.2V4.8H10.8V13.2H8.4Z' fill={fill} />
  </svg>
);

export default Income;
