import React from 'react';

import Transactions from 'views/Transactions/Transactions';

import Summary from './Summary/Summary';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <Summary />
      <Transactions isHome />
    </div>
  );
};

export default Home;
