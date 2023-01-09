import React from 'react';

const Plus = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M3.59998 10.8H20.4V13.2H3.59998V10.8Z' fill={fill} />
    <path d='M10.8 3.60001H13.2V20.4H10.8V3.60001Z' fill={fill} />
  </svg>
);

export default Plus;
