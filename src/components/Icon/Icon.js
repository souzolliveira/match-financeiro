import React from 'react';

import ArrowRight from './Icons/ArrowRight';
import Check from './Icons/Check';
import ChevronTop from './Icons/ChevronTop';
import Close from './Icons/Close';
import Edit from './Icons/Edit';
import Expense from './Icons/Expense';
import Home from './Icons/Home';
import Income from './Icons/Income';
import List from './Icons/List';
import Logout from './Icons/Logout';
import Plus from './Icons/Plus';
import Stats from './Icons/Stats';
import Transactions from './Icons/Transactions';
import Trash from './Icons/Trash';
import User from './Icons/User';

const Icon = ({ name, width, height, fill, className }) => {
  switch (name) {
    case 'arrow-right':
      return <ArrowRight fill={fill} width={width} height={height} className={className} />;
    case 'check':
      return <Check fill={fill} width={width} height={height} className={className} />;
    case 'chevron-top':
      return <ChevronTop fill={fill} width={width} height={height} className={className} />;
    case 'close':
      return <Close fill={fill} width={width} height={height} className={className} />;
    case 'edit':
      return <Edit fill={fill} width={width} height={height} className={className} />;
    case 'expense':
      return <Expense fill={fill} width={width} height={height} className={className} />;
    case 'home':
      return <Home fill={fill} width={width} height={height} className={className} />;
    case 'income':
      return <Income fill={fill} width={width} height={height} className={className} />;
    case 'list':
      return <List fill={fill} width={width} height={height} className={className} />;
    case 'logout':
      return <Logout fill={fill} width={width} height={height} className={className} />;
    case 'plus':
      return <Plus fill={fill} width={width} height={height} className={className} />;
    case 'stats':
      return <Stats fill={fill} width={width} height={height} className={className} />;
    case 'transactions':
      return <Transactions fill={fill} width={width} height={height} className={className} />;
    case 'trash':
      return <Trash fill={fill} width={width} height={height} className={className} />;
    case 'user':
      return <User fill={fill} width={width} height={height} className={className} />;
    default:
      return <div />;
  }
};

export default Icon;
