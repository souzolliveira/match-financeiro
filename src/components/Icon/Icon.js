import React from 'react';

import ArrowRight from './Icons/ArrowRight';
import Expense from './Icons/Expense';
import Home from './Icons/Home';
import Income from './Icons/Income';
import Stats from './Icons/Stats';
import Transactions from './Icons/Transactions';

const Icon = ({ name, width, height, fill, className }) => {
  switch (name) {
    case 'arrow-right':
      return <ArrowRight fill={fill} width={width} height={height} className={className} />;
    case 'expense':
      return <Expense fill={fill} width={width} height={height} className={className} />;
    case 'home':
      return <Home fill={fill} width={width} height={height} className={className} />;
    case 'income':
      return <Income fill={fill} width={width} height={height} className={className} />;
    case 'stats':
      return <Stats fill={fill} width={width} height={height} className={className} />;
    case 'transactions':
      return <Transactions fill={fill} width={width} height={height} className={className} />;
    default:
      return <div />;
  }
};

export default Icon;
