import React from 'react';
import { NavLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Icon from 'components/Icon/Icon';

import './Navbar.scss';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <div className='navbar'>
      <NavLink exact to='/' activeclassname='navbar__navlink--active' className='navbar__navlink'>
        <Icon name='home' width={24} height={24} fill='var(--color-highlight)' />
        {t('NAVBAR.HOME')}
      </NavLink>
      <NavLink to='/transactions' activeclassname='navbar__navlink--active' className='navbar__navlink'>
        <Icon name='transactions' width={24} height={24} fill='var(--color-highlight)' />
        {t('NAVBAR.TRANSACTIONS')}
      </NavLink>
      <NavLink to='/stats' activeclassname='navbar__navlink--active' className='navbar__navlink'>
        <Icon name='stats' width={24} height={24} fill='var(--color-highlight)' />
        {t('NAVBAR.STATS')}
      </NavLink>
    </div>
  );
};

export default Navbar;
