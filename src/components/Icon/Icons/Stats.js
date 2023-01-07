import React from 'react';

const Stats = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M3.59998 21.6V13.2H5.99998V21.6H3.59998Z' fill={fill} />
    <path d='M8.40002 21.6V9.60001H10.8V21.6H8.40002Z' fill={fill} />
    <path d='M18 21.6V2.39999H20.4V21.6H18Z' fill={fill} />
    <path d='M13.2 21.6V6H15.6V21.6H13.2Z' fill={fill} />
  </svg>
);

export default Stats;
