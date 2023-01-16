import React from 'react';

const ChevronTop = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z' fill={fill} />
  </svg>
);

export default ChevronTop;
