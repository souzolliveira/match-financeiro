import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from 'components/Icon';

import Logo from 'assets/logo.png';

import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <img alt='Match Financeiro Logo' src={Logo} className={styles.header__logo} />
      <div className={styles.header__buttons}>
        <button type='button' onClick={() => navigate('/settings')} className={styles.header__button}>
          <Icon name='settings' width={32} height={32} fill='#fff' />
        </button>
        <button type='button' onClick={() => navigate('/user')} className={styles.header__button}>
          <Icon name='user' width={32} height={32} fill='#fff' />
        </button>
      </div>
    </div>
  );
};

export default Header;
