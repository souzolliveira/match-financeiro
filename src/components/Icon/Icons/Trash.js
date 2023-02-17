import React from 'react';

const Trash = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path
      d='M21.6 5.99999H2.39999V8.39999H4.79999V22.8L19.2 22.8V8.39999H21.6L21.6 5.99999ZM16.8 20.4H7.19999V8.39999H16.8V20.4ZM5.99999 4.79999V2.39999H18V4.79999H5.99999Z'
      fill={fill}
    />
  </svg>
);

export default Trash;
