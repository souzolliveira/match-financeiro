import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import cardTypes from 'constants/cardTypes';
import paymentTypes from 'constants/paymentTypes';
import { useTransactions } from 'hooks/useTransactions';

import NewCard from 'views/Card/NewCard/NewCard';

import Select from 'components/Select';

import styles from './Card.module.scss';

const Card = ({ payment, card, setCard }) => {
  const { t } = useTranslation();
  const { cards, fetchCards } = useTransactions();

  const defaultCard = {
    name: '',
    expirationDay: '',
    paymentDay: '',
    type: '',
  };
  const [isNewCardModalVisible, setIsNewCardModalVisible] = useState(false);
  const [newCard, setNewCard] = useState(defaultCard);

  return (
    <>
      <div className={styles.card}>
        <span className={styles.card__label}>{t('FILTERS.CARD')}:</span>
        <Select
          value={card}
          onChange={e => {
            const value = parseInt(e.target.value, 10);
            if (value === 'CREATE') {
              setIsNewCardModalVisible(true);
            } else {
              setCard(value);
            }
          }}
          disabled={payment !== paymentTypes.DEBT && payment !== paymentTypes.CREDIT}
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {cards
            .filter(cd => cd.type === payment || cd.type === cardTypes.BOTH)
            .map((item, index) => {
              return (
                <option key={index} value={parseInt(item.id, 10)}>
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
