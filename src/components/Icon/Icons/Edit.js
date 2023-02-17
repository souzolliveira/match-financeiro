import React from 'react';

const Edit = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path
      d='M3.46179 20.5382H5.04504L14.799 10.7843L13.2157 9.20106L3.46179 18.955V20.5382ZM19.6335 9.14451L14.8272 4.39478L18.022 1.20001L22.8 5.97802L19.6335 9.14451ZM1.20001 22.8V17.9937L13.1874 6.00629L17.9937 10.8126L6.00629 22.8H1.20001ZM14.0073 9.99268L13.2157 9.20106L14.799 10.7843L14.0073 9.99268Z'
      fill={fill}
    />
  </svg>
);

export default Edit;
