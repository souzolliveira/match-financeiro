import React from 'react';

const Cash = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path
      d='M2.39999 6H21.6V18H2.39999V6ZM6.66666 8C6.66666 8.53043 6.4419 9.03914 6.04182 9.41421C5.64174 9.78929 5.09912 10 4.53333 10V14C5.09912 14 5.64174 14.2107 6.04182 14.5858C6.4419 14.9609 6.66666 15.4696 6.66666 16H17.3333C17.3333 15.4696 17.5581 14.9609 17.9582 14.5858C18.3582 14.2107 18.9009 14 19.4667 14V10C18.9009 10 18.3582 9.78929 17.9582 9.41421C17.5581 9.03914 17.3333 8.53043 17.3333 8H6.66666Z'
      fill={fill}
    />
    <path
      d='M14.4 12C14.4 13.3255 13.3255 14.4 12 14.4C10.6745 14.4 9.59999 13.3255 9.59999 12C9.59999 10.6745 10.6745 9.6 12 9.6C13.3255 9.6 14.4 10.6745 14.4 12Z'
      fill={fill}
    />
  </svg>
);

export default Cash;