import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import useHiddenStep from 'hooks/useHiddenStep';

import styles from './Value.module.scss';

const Value = ({ transactionValue, setTransactionValue, step, setStep }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.VALUE, step });

  const [intermediateValue, setIntermediateValue] = useState('');

  const handleChange = e => {
    setIntermediateValue(e.target.value);
  };

  const handleApply = value => {
    setIntermediateValue('');
    setTransactionValue(value);
    setStep(steps.OBSERVATION);
    const valueInput = document.getElementById('transaction-observation');
    if (valueInput) valueInput.focus();
  };

  return (
    <div className={`${styles.value} ${hidden ? styles.hidden : ''} ${transactionValue ? styles.selected : ''}`}>
      <span className={styles.value__label}>{t('VALUE.LABEL')}</span>
      <input id='transaction-value' name='transaction-value' type='number' value={intermediateValue} onChange={e => handleChange(e)} />
      <button type='button' onClick={() => handleApply(intermediateValue)}>
        &gt;
      </button>
    </div>
  );
};

export default Value;
