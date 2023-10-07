import React from 'react';

const Expense = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M4.80002 13.2H2.40002V19.2H21.6V13.2H19.2V16.8H4.80002V13.2Z' fill={fill} />
    <path d='M10.8 14.4L13.2 14.4L13.2 5.99999L15.6 5.99999L12 2.39999L8.39998 5.99999L10.8 5.99999L10.8 14.4Z' fill={fill} />
  </svg>
);

export default Expense;
