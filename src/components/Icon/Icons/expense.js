import React from 'react';

const Expense = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M2.4 21.6V15.6H4.8V19.2H19.2V15.6H21.6V21.6H2.4Z' fill={fill} />
    <path d='M15.6 8.4L12 4.8L8.4 8.4H10.8L10.8 16.8H13.2L13.2 8.4H15.6Z' fill={fill} />
  </svg>
);

export default Expense;
