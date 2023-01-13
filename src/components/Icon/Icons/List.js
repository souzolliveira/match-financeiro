import React from 'react';

const List = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <rect x='3.39999' y='3.39999' width='17.2' height='17.2' stroke={fill} strokeWidth='1' />
    <path d='M6 6H8.4V8.4H6V6Z' fill={fill} />
    <path d='M6 10.8H8.4V13.2H6V10.8Z' fill={fill} />
    <path d='M6 15.6H8.4V18H6V15.6Z' fill={fill} />
    <path d='M9.6 6H18V8.4H9.6V6Z' fill={fill} />
    <path d='M9.6 10.8H18V13.2H9.6V10.8Z' fill={fill} />
    <path d='M9.6 15.6H18V18H9.6V15.6Z' fill={fill} />
  </svg>
);

export default List;
