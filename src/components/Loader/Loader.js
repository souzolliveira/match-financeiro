import React from 'react';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__spinner} />
    </div>
  );
};

export default Loader;
