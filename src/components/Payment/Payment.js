import React from 'react';

import { useTranslation } from 'react-i18next';

import paymentTypes from 'constants/paymentTypes';

import Select from 'components/Select';

import styles from './Payment.module.scss';

const Payment = ({ payment, setPayment, setCard, setInstallments }) => {
  const { t } = useTranslation();

  const handleChange = value => {
    setPayment(value);
    setCard('');
    setInstallments('');
  };

  return (
    <div className={styles.payment}>
      <span className={styles.payment__label}>{t('FILTERS.TRANSACTION_PAYMENT')}:</span>
      <Select value={payment} onChange={e => handleChange(e.target.value)}>
        <option value='' disabled>
          {t('SELECT')}
        </option>
        <option value={paymentTypes.CASH}>{t('FILTERS.CASH')}</option>
        <option value={paymentTypes.BILLET}>{t('FILTERS.BILLET')}</option>
        <option value={paymentTypes.PIX}>{t('FILTERS.PIX')}</option>
        <option value={paymentTypes.DEBT}>{t('FILTERS.DEBT')}</option>
        <option value={paymentTypes.CREDIT}>{t('FILTERS.CREDIT')}</option>
      </Select>
    </div>
  );
};

export default Payment;
