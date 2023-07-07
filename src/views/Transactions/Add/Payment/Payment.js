import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import paymentTypes from 'constants/paymentTypes';
import stepPosition from 'constants/stepPosition';
import steps from 'constants/steps';
import transactionTypes from 'constants/transactionTypes';
import useHiddenStep from 'hooks/useHiddenStep';

import Button from 'components/Button/Button';
import Select from 'components/Select/Select';

import styles from './Payment.module.scss';

const Payment = ({ transactionPayment, setTransactionPayment, setTransactionCard, transactionType, step, setStep }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.PAYMENT, step });
  const roles = transactionType === transactionTypes.EXPENSE;

  const [isChangedStep, setIsChangedStep] = useState(false);
  const [unusedStep, setUnusedStep] = useState(false);

  const handleChange = value => {
    setTransactionPayment(value);
    setTransactionCard('');
    if (step !== steps.PAYMENT) return;
    if (value === paymentTypes.DEBT || value === paymentTypes.CREDIT) {
      setStep(steps.CARD);
    } else {
      setStep(steps.OBSERVATION);
    }
    setIsChangedStep(true);
  };

  useEffect(() => {
    if (stepPosition[steps.PAYMENT] < stepPosition[step] && !isChangedStep && roles) setUnusedStep(false);
    else setUnusedStep(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, step, isChangedStep]);

  return (
    <>
      <div
        className={`${styles.paymentType} 
          ${hidden && !isChangedStep ? styles.paymentType__bottom : ''} 
          ${isChangedStep ? styles.paymentType__top : ''}
        `}
      >
        <span className={styles.paymentType__label}>{t('TRANSACTION_PAYMENT.LABEL')}</span>
        <div className={styles.paymentType__buttons}>
          <Button type='button' size='lg' kind='secondary' onClick={() => handleChange(paymentTypes.CASH)}>
            {t(`PAYMENT_TYPE.${paymentTypes.CASH}`)}
          </Button>
          <Button type='button' size='lg' kind='secondary' onClick={() => handleChange(paymentTypes.BILLET)}>
            {t(`PAYMENT_TYPE.${paymentTypes.BILLET}`)}
          </Button>
          <Button type='button' size='lg' kind='secondary' onClick={() => handleChange(paymentTypes.PIX)}>
            {t(`PAYMENT_TYPE.${paymentTypes.PIX}`)}
          </Button>
          <Button type='button' size='lg' kind='secondary' onClick={() => handleChange(paymentTypes.DEBT)}>
            {t(`PAYMENT_TYPE.${paymentTypes.DEBT}`)}
          </Button>
          <Button type='button' size='lg' kind='secondary' onClick={() => handleChange(paymentTypes.CREDIT)}>
            {t(`PAYMENT_TYPE.${paymentTypes.CREDIT}`)}
          </Button>
        </div>
      </div>
      <div
        className={`
          ${roles && (!unusedStep || isChangedStep) ? styles.paymentType__selected : styles.paymentType__unselected}
        `}
      >
        <span className={styles.paymentType__label}>{t('FILTERS.TRANSACTION_PAYMENT')}:</span>
        <Select className={styles.paymentType__select} value={transactionPayment} onChange={e => handleChange(e.target.value)}>
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
    </>
  );
};

export default Payment;
