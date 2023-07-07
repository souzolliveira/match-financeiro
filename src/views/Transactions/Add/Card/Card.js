import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import cardTypes from 'constants/cardTypes';
import paymentTypes from 'constants/paymentTypes';
import stepPosition from 'constants/stepPosition';
import steps from 'constants/steps';
import transactionTypes from 'constants/transactionTypes';
import useHiddenStep from 'hooks/useHiddenStep';
import { useTransactions } from 'hooks/useTransactions';

import NewCard from 'views/Card/NewCard/NewCard';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Select from 'components/Select/Select';

import styles from './Card.module.scss';

const Card = ({ transactionPayment, transactionCard, setTransactionCard, transactionType, step, setStep }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.CARD, step });
  const { cards, fetchCards } = useTransactions();
  const roles =
    transactionType === transactionTypes.EXPENSE &&
    (transactionPayment === paymentTypes.CREDIT || transactionPayment === paymentTypes.DEBT);

  const defaultCard = {
    name: '',
    expirationDay: '',
    paymentDay: '',
    type: '',
  };
  const [newCard, setNewCard] = useState(defaultCard);
  const [isNewCardModalVisible, setIsNewCardModalVisible] = useState(false);
  const [isChangedStep, setIsChangedStep] = useState(false);
  const [unusedStep, setUnusedStep] = useState(false);

  const handleChange = value => {
    setTransactionCard(value);
    if (step !== steps.CARD) return;
    if (transactionPayment === paymentTypes.CREDIT) {
      setStep(steps.INSTALLMENTS);
    } else {
      setStep(steps.OBSERVATION);
    }
    setIsChangedStep(true);
  };

  useEffect(() => {
    if (stepPosition[steps.CARD] < stepPosition[step] && !isChangedStep && roles) setUnusedStep(false);
    else setUnusedStep(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, step]);

  return (
    <>
      <div
        className={`${styles.card} 
          ${hidden && !isChangedStep ? styles.card__bottom : ''} 
          ${isChangedStep ? styles.card__top : ''}
        `}
      >
        <span className={styles.card__label}>{t('CARD.LABEL')}</span>
        <div className={styles.card__buttons}>
          {cards
            .filter(card => card.type === transactionPayment || card.type === cardTypes.BOTH)
            .map((item, index) => {
              return (
                <Button
                  key={index}
                  type='button'
                  size='lg'
                  kind='secondary'
                  className={styles.card__button}
                  onClick={() => handleChange(item.id)}
                >
                  {item.name}
                </Button>
              );
            })}
          <Button
            type='button'
            size='lg'
            kind='secondary'
            className={styles.card__button}
            onClick={() => {
              setIsNewCardModalVisible(true);
            }}
          >
            <Icon name='plus' width={18} height={18} fill='var(--gold-darker)' />
            {t('CARD.CREATE')}
          </Button>
        </div>
      </div>
      <div
        className={`
          ${roles && (!unusedStep || isChangedStep) ? styles.card__selected : styles.card__unselected}
        `}
      >
        <span className={styles.card__label}>{t('FILTERS.CARD')}:</span>
        <Select
          className={styles.card__select}
          value={transactionCard}
          onChange={e => {
            const { value } = e.target;
            if (value === 'CREATE') {
              setIsNewCardModalVisible(true);
            } else {
              handleChange(value);
            }
          }}
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {cards
            .filter(card => card.type === transactionPayment || card.type === cardTypes.BOTH)
            .map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          <option value='CREATE'>{t('CARD.CREATE')}</option>
        </Select>
      </div>
      <NewCard
        isNewCardModalVisible={isNewCardModalVisible}
        setIsNewCardModalVisible={setIsNewCardModalVisible}
        newCard={newCard}
        setNewCard={setNewCard}
        defaultCard={defaultCard}
        fetchCards={fetchCards}
      />
    </>
  );
};

export default Card;
