import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import useHiddenStep from 'hooks/useHiddenStep';

import styles from './Value.module.scss';

const Value = ({ transactionValue, setTransactionValue, step, setStep }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.VALUE, step });

  const [intermediateValue, setIntermediateValue] = useState(0);

  const handleChange = e => {
    setIntermediateValue(e.target.value);
  };

  const handleApply = value => {
    setTransactionValue(value);
    setStep(steps.OBSERVATION);
  };

  return (
    <div className={`${styles.value} ${hidden ? styles.hidden : ''} ${transactionValue ? styles.selected : ''}`}>
      <span className={styles.value__label}>{t('VALUE.LABEL')}</span>
      <input type='number' name='transaction-value' value={intermediateValue} onChange={e => handleChange(e)} />
      <button type='button' onClick={() => handleApply(intermediateValue)}>
        &gt;
      </button>
    </div>
  );
};

export default Value;
