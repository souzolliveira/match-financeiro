import React from 'react';

import { useAuth } from 'hooks/useAuth';

import Icon from 'components/Icon/Icon';

import Logo from 'assets/logo.png';

import styles from './Header.module.scss';

const Header = () => {
  const { signOut } = useAuth();
  return (
    <div className={styles.header}>
      <img alt='Match Financeiro Logo' src={Logo} className={styles.header__logo} />
      <button type='button' onClick={() => signOut()} className={styles.header__logout}>
        <Icon name='logout' width={24} height={24} fill='#fff' />
      </button>
    </div>
  );
};

export default Header;
