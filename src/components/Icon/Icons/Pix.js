import React from 'react';

const Pix = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path
      d='M15.45 16.52L12.44 13.51C12.33 13.4 12.2 13.38 12.13 13.38C12.06 13.38 11.93 13.4 11.82 13.51L8.80003 16.53C8.46003 16.87 7.93003 17.42 6.16003 17.42L9.87003 21.12C10.4325 21.6818 11.195 21.9973 11.99 21.9973C12.785 21.9973 13.5475 21.6818 14.11 21.12L17.83 17.41C16.92 17.41 16.16 17.23 15.45 16.52ZM8.80003 7.46998L11.82 10.49C11.9 10.57 12.02 10.62 12.13 10.62C12.24 10.62 12.36 10.57 12.44 10.49L15.43 7.49998C16.14 6.75998 16.95 6.58998 17.86 6.58998L14.14 2.87998C13.5775 2.31818 12.815 2.00262 12.02 2.00262C11.225 2.00262 10.4625 2.31818 9.90003 2.87998L6.19003 6.57998C7.95003 6.57998 8.49003 7.15998 8.80003 7.46998Z'
      fill={fill}
    />
    <path
      d='M21.11 9.84998L18.86 7.58998H17.6C17.06 7.58998 16.52 7.80998 16.15 8.19998L13.15 11.2C12.87 11.48 12.5 11.62 12.13 11.62C11.749 11.6146 11.3844 11.4644 11.11 11.2L8.09005 8.16998C7.71005 7.78998 7.19005 7.56998 6.64005 7.56998H5.17005L2.88005 9.86998C2.31824 10.4325 2.00269 11.195 2.00269 11.99C2.00269 12.785 2.31824 13.5475 2.88005 14.11L5.17005 16.41H6.65005C7.19005 16.41 7.71005 16.19 8.10005 15.81L11.12 12.79C11.4 12.51 11.77 12.37 12.14 12.37C12.51 12.37 12.88 12.51 13.16 12.79L16.17 15.8C16.55 16.18 17.07 16.4 17.62 16.4H18.88L21.13 14.14C21.6942 13.5673 22.0088 12.7947 22.005 11.9909C22.0013 11.187 21.6795 10.4173 21.11 9.84998Z'
      fill={fill}
    />
  </svg>
);

export default Pix;
