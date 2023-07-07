import React from 'react';

const BarCode = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path
      d='M2.40002 2.39999H4.01252V18.4125H2.40002V2.39999ZM8.81252 18.4125V2.39999H5.58752V18.4125H8.81252ZM10.3875 2.39999H12V18.4125H10.3875V2.39999ZM13.6125 2.39999H15.1875V18.4125H13.6125V2.39999ZM2.40002 19.9875H21.6V21.6H2.40002V19.9875ZM19.9875 2.39999H18.4125V18.4125H21.6V2.39999H19.9875Z'
      fill={fill}
    />
  </svg>
);

export default BarCode;
