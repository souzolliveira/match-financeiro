import React from 'react';

const Check = ({ width, height, fill, className }) => (
  <svg width={width} height={height} viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10.1924 0.292893C9.80188 -0.0976311 9.16871 -0.0976311 8.77819 0.292893L3.82843 5.24265L1.70711 3.12132C1.31658 2.7308 0.683417 2.7308 0.292893 3.12132C-0.0976311 3.51185 -0.097631 4.14501 0.292893 4.53554L3.12132 7.36397C3.34099 7.58364 3.63744 7.67974 3.92429 7.65228C4.11759 7.63377 4.30653 7.55916 4.46469 7.42843C4.48907 7.40827 4.51272 7.38678 4.53554 7.36396L10.1924 1.70711C10.5829 1.31658 10.5829 0.683417 10.1924 0.292893Z'
      fill={fill}
    />
  </svg>
);

export default Check;
