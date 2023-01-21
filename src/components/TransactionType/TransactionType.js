import React from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import transactionTypes from 'constants/transactionTypes';

import Button from 'components/Button/Button';
import Select from 'components/Select/Select';

import styles from './TransactionType.module.scss';

const TransactionType = ({ transactionType, setTransactionType, setStep }) => {
  const { t } = useTranslation();

  const handleChange = value => {
    setTransactionType(value);
    setStep(steps.DATE);
  };

  return (
    <>
      <div className={`${styles.transactionType} ${transactionType ? styles.transactionType__top : ''}`}>
        <span className={styles.transactionType__label}>{t('TRANSACTION_TYPE.LABEL')}</span>
        <div className={styles.transactionType__buttons}>
          <Button type='button' size='lg' kind='secondary' onClick={() => handleChange(transactionTypes.INCOME)}>
            {t(`TRANSACTION_TYPE.${transactionTypes.INCOME}`)}
          </Button>
          <Button type='button' size='lg' kind='secondary' onClick={() => handleChange(transactionTypes.EXPENSE)}>
            {t(`TRANSACTION_TYPE.${transactionTypes.EXPENSE}`)}
          </Button>
          <Button type='button' size='lg' kind='secondary' onClick={() => handleChange(transactionTypes.INVESTIMENT)}>
            {t(`TRANSACTION_TYPE.${transactionTypes.INVESTIMENT}`)}
          </Button>
        </div>
      </div>
      <div className={transactionType ? styles.transactionType__selected : styles.transactionType__unselected}>
        <span className={styles.transactionType__label}>{t('FILTERS.TRANSACTION_TYPE')}:</span>
        <Select className={styles.transactionType__select} value={transactionType} onChange={e => setTransactionType(e.target.value)}>
          <option value='' disabled>
            {t('SELECT')}
          </option>
          <option value={transactionTypes.INCOME}>{t('FILTERS.INCOMES')}</option>
          <option value={transactionTypes.EXPENSE}>{t('FILTERS.EXPENSES')}</option>
          <option value={transactionTypes.INVESTIMENT}>{t('FILTERS.INVESTIMENTS')}</option>
        </Select>
      </div>
    </>
  );
};

export default TransactionType;
