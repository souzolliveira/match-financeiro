import React from 'react';

import Transactions from 'views/Transactions/Transactions';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <Transactions isHome />
    </div>
  );
};

export default Home;
