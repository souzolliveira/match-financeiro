import React from 'react';

const Home = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path d='M3.60001 21.6V9.60001H4.80001H6.00001V19.2H18V9.60001H20.4V21.6H3.60001Z' fill={fill} />
    <path d='M1.20001 9.60001H6.00001L12 4.80001L18 9.60001H22.8L12 1.20001L1.20001 9.60001Z' fill={fill} />
  </svg>
);

export default Home;
