import React from 'react';

import { useTranslation } from 'react-i18next';

import styles from './Stats.module.scss';

const Stats = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.stats}>
      <span className={styles.stats__message}>{t('STATS.MESSAGE')}</span>
      <div className={styles.stats__image} />
    </div>
  );
};

export default Stats;
