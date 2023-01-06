import React from 'react';

import Expense from './Icons/Expense';
import Income from './Icons/Income';

const Icon = ({ name, width, height, fill, className }) => {
  switch (name) {
    case 'expense':
      return <Expense fill={fill} width={width} height={height} className={className} />;
    case 'income':
      return <Income fill={fill} width={width} height={height} className={className} />;
    default:
      return <div />;
  }
};

export default Icon;
