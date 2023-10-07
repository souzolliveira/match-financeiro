import React from 'react';

const Income = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M4.80002 13.2H2.40002V19.2H21.6V13.2H19.2V16.8H4.80002V13.2Z' fill={fill} />
    <path d='M13.2 2.39999H10.8V10.8H8.40002L12 14.4L15.6 10.8H13.2V2.39999Z' fill={fill} />
  </svg>
);

export default Income;
