import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import useHiddenStep from 'hooks/useHiddenStep';

import Input from 'components/Input/Input';

import styles from './Observation.module.scss';

const Observation = ({ transactionObservation, setTransactionObservation, step, setStep }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.OBSERVATION, step });

  const [focused, setFocused] = useState(false);
  const [isChangedStep, setIsChangedStep] = useState(false);

  const handleChange = e => {
    setTransactionObservation(e.target.value);
  };

  const handleKeyDown = e => {
    if (focused && (e.key === 'Enter' || e.key === 'Tab')) {
      setStep(steps.CONFIRM);
      setIsChangedStep(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <>
      <div className={`${styles.observation} ${hidden ? styles.observation__bottom : ''} ${isChangedStep ? styles.observation__top : ''}`}>
        <span className={styles.observation__label}>{t('OBSERVATION.LABEL')}</span>
        <Input
          id='transaction-observation'
          name='transaction-observation'
          type='text'
          value={transactionObservation}
          onChange={e => handleChange(e)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      <div className={isChangedStep ? styles.observation__selected : styles.observation__unselected}>
        <span className={styles.observation__label}>{t('OBSERVATION')}</span>
        <Input
          className={styles.observation__input}
          type='text'
          name='transaction-observation'
          value={transactionObservation}
          onChange={e => setTransactionObservation(e.target.value)}
        />
      </div>
    </>
  );
};

export default Observation;
