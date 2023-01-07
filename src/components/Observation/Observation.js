import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import useHiddenStep from 'hooks/useHiddenStep';

import styles from './Observation.module.scss';

const Observation = ({ transactionObservation, setTransactionObservation, step, setStep }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.OBSERVATION, step });

  const [intermediateValue, setIntermediateValue] = useState('');

  const handleChange = e => {
    setIntermediateValue(e.target.value);
  };

  const handleApply = value => {
    setIntermediateValue('');
    setTransactionObservation(value);
    setStep(steps.CONFIRM);
  };

  return (
    <div className={`${styles.observation} ${hidden ? styles.hidden : ''} ${transactionObservation ? styles.selected : ''}`}>
      <span className={styles.observation__label}>{t('OBSERVATION.LABEL')}</span>
      <input type='text' name='transaction-observation' value={intermediateValue} onChange={e => handleChange(e)} />
      <button type='button' onClick={() => handleApply(intermediateValue)}>
        &gt;
      </button>
    </div>
  );
};

export default Observation;
