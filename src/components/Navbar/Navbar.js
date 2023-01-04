import React from 'react';
import { NavLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import './Navbar.scss';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <div className='navbar'>
      <NavLink exact to='/' activeClassName='navbar__navlink--active' className='navbar__navlink'>
        {t('NAVBAR.HOME')}
      </NavLink>
      <NavLink to='/transactions' activeClassName='navbar__navlink--active' className='navbar__navlink'>
        {t('NAVBAR.TRANSACTIONS')}
      </NavLink>
      <NavLink to='/stats' activeClassName='navbar__navlink--active' className='navbar__navlink'>
        {t('NAVBAR.STATS')}
      </NavLink>
      <NavLink to='/budget' activeClassName='navbar__navlink--active' className='navbar__navlink'>
        {t('NAVBAR.BUDGET')}
      </NavLink>
    </div>
  );
};

export default Navbar;
