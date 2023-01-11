import React from 'react';

import Logo from 'assets/logo.png';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <img alt='Match Financeiro Logo' src={Logo} className={styles.header__logo} />
    </div>
  );
};

export default Header;
