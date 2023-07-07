import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import installments from 'constants/installmentTypes';
import paymentTypes from 'constants/paymentTypes';
import stepPosition from 'constants/stepPosition';
import steps from 'constants/steps';
import transactionTypes from 'constants/transactionTypes';
import useHiddenStep from 'hooks/useHiddenStep';

import Button from 'components/Button/Button';
import Select from 'components/Select/Select';

import styles from './Installments.module.scss';

const Installments = ({ transactionInstallments, setTransactionInstallments, transactionPayment, transactionType, step, setStep }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.INSTALLMENTS, step });
  const roles = transactionType === transactionTypes.EXPENSE && transactionPayment === paymentTypes.CREDIT;

  const [isChangedStep, setIsChangedStep] = useState(false);
  const [unusedStep, setUnusedStep] = useState(false);

  const handleChange = value => {
    setTransactionInstallments(value);
    if (step !== steps.INSTALLMENTS) return;
    setStep(steps.OBSERVATION);
    setIsChangedStep(true);
  };

  useEffect(() => {
    if (stepPosition[steps.INSTALLMENTS] < stepPosition[step] && !isChangedStep && roles) setUnusedStep(false);
    else setUnusedStep(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, step]);

  return (
    <>
      <div
        className={`${styles.installments} ${hidden ? styles.installments__bottom : ''} ${isChangedStep ? styles.installments__top : ''}`}
      >
        <span className={styles.installments__label}>{t('INSTALLMENTS.LABEL')}</span>
        <div className={styles.installments__items}>
          {installments.types.map((item, index) => {
            return (
              <Button
                key={index}
                type='button'
                size='lg'
                kind='secondary'
                className={styles.installments__button}
                onClick={() => handleChange(item)}
              >
                {t(installments.bind[item])}
              </Button>
            );
          })}
        </div>
      </div>
      <div className={roles && (!unusedStep || isChangedStep) ? styles.installments__selected : styles.installments__unselected}>
        <span className={styles.installments__label}>{t('FILTERS.INSTALLMENTS')}</span>
        <Select className={styles.installments__select} value={transactionInstallments} onChange={e => handleChange(e.target.value)}>
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {installments.types.map((item, index) => {
            return (
              <option key={index} value={item}>
                {t(installments.bind[item])}
              </option>
            );
          })}
        </Select>
      </div>
    </>
  );
};

export default Installments;
