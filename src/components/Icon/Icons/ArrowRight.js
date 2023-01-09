import React from 'react';

const ArrowRight = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M12 20L10.575 18.6L16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20Z' fill={fill} />
  </svg>
);

export default ArrowRight;
