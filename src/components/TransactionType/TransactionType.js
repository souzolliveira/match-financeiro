import React from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import transactionTypes from 'constants/transactionTypes';

import Button from 'components/Button/Button';

import styles from './TransactionType.module.scss';

const TransactionType = ({ transactionType, setTransactionType, setStep }) => {
  const { t } = useTranslation();

  const handleChange = value => {
    setTransactionType(value);
    setStep(steps.DATE);
  };

  return (
    <div className={`${styles.transactionType} ${transactionType ? styles.selected : ''}`}>
      <span className={styles.transactionType__label}>{t('TRANSACTION_TYPE.LABEL')}</span>
      <div className={styles.buttons}>
        <Button type='button' size='lg' onClick={() => handleChange(transactionTypes.INCOME)}>
          {transactionTypes.INCOME}
        </Button>
        <Button type='button' size='lg' onClick={() => handleChange(transactionTypes.EXPENSE)}>
          {transactionTypes.EXPENSE}
        </Button>
      </div>
    </div>
  );
};

export default TransactionType;
