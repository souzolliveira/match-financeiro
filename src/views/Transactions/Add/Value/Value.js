import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import transactionTypes from 'constants/transactionTypes';
import useHiddenStep from 'hooks/useHiddenStep';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';

import styles from './Value.module.scss';

const Value = ({ transactionValue, setTransactionValue, step, setStep, transactionType }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.VALUE, step });

  const [focused, setFocused] = useState(false);
  const [isChangedStep, setIsChangedStep] = useState(false);

  const handleChange = value => {
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseFloat(value))) {
      setTransactionValue(state => (state * 10 + parseFloat(value) / 100).toFixed(2));
    }
  };

  const handleNextStep = () => {
    if (step !== steps.VALUE) return;
    if (transactionType === transactionTypes.EXPENSE) {
      setStep(steps.PAYMENT);
    } else {
      setStep(steps.OBSERVATION);
      const valueInput = document.getElementById('transaction-observation');
      if (valueInput) valueInput.focus();
    }
    setIsChangedStep(true);
  };

  const handleKeyDown = e => {
    if (focused)
      if (e.key === 'Backspace') {
        setTransactionValue(state => (state / 10).toFixed(2));
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        handleNextStep();
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
      <div className={`${styles.value} ${hidden ? styles.value__bottom : ''} ${isChangedStep ? styles.value__top : ''}`}>
        <span className={styles.value__label}>{t('VALUE.LABEL')}</span>
        <div className={styles.value__inputcontainer}>
          <Input
            className={styles.value__input}
            id='transaction-value'
            name='transaction-value'
            type='number'
            value=''
            onInput={e => handleChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <div className={styles.value__showcontainer}>
            <span className={styles.value__show}>{transactionValue.replace('.', ',')}</span>
            <div className={focused ? styles.value__cursor : ''} />
          </div>
          <Button
            className={styles.value__next}
            type='button'
            size='lg'
            kind='outline'
            onClick={() => handleNextStep()}
            disabled={transactionValue === (0).toFixed(2)}
          >
            <Icon name='arrow-right' width={24} height={24} fill='var(--gold-darkest)' />
          </Button>
        </div>
      </div>
      <div className={isChangedStep ? styles.value__selected : styles.value__unselected}>
        <span className={styles.value__label}>{t('VALUE')}</span>
        <div className={styles.value__inputcontainer}>
          <Input
            className={styles.value__input}
            type='number'
            name='transaction-value'
            value=''
            onInput={e => handleChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <div className={styles.value__showcontainer}>
            <span className={styles.value__show}>{transactionValue.replace('.', ',')}</span>
            <div className={focused ? styles.value__cursor : ''} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Value;
