import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import useHiddenStep from 'hooks/useHiddenStep';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';

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
    <>
      <div
        className={`${styles.observation} ${hidden ? styles.observation__bottom : ''} ${
          transactionObservation ? styles.observation__top : ''
        }`}
      >
        <span className={styles.observation__label}>{t('OBSERVATION.LABEL')}</span>
        <div className={styles.observation__inputcontainer}>
          <Input
            id='transaction-observation'
            name='transaction-observation'
            type='text'
            value={intermediateValue}
            onChange={e => handleChange(e)}
          />
          <Button type='button' kind='outline' onClick={() => handleApply(intermediateValue)}>
            <Icon name='arrow-right' width={20} height={20} fill='var(--gold-dark)' />
          </Button>
        </div>
      </div>
      <div className={transactionObservation ? styles.observation__selected : styles.observation__unselected}>
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
