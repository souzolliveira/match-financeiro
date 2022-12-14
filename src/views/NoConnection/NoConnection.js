import React from 'react';

import { useTranslation } from 'react-i18next';

import styles from './NoConnection.module.scss';

const NoConnection = () => {
  const { t } = useTranslation();

  return <div className={styles.noConnectionContainer} />;
};

export default NoConnection;
