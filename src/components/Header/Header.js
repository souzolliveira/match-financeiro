import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from 'components/Icon/Icon';

import Logo from 'assets/logo.png';

import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <img alt='Match Financeiro Logo' src={Logo} className={styles.header__logo} />
      <button type='button' onClick={() => navigate('/user')} className={styles.header__settings}>
        <Icon name='user' width={32} height={32} fill='#fff' />
      </button>
    </div>
  );
};

export default Header;
