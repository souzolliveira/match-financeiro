import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import cardService from 'services/card.service';

import Fill from 'components/Fill/Fill';
import Icon from 'components/Icon/Icon';

import NewCard from './NewCard/NewCard';

import styles from './Card.module.scss';

const Card = () => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [cards, setCards] = useState([]);
  const defaultCard = {
    name: '',
    expirationDay: '',
    paymentDay: '',
    type: '',
  };
  const [newCard, setNewCard] = useState(defaultCard);
  const [isNewCardModalVisible, setIsNewCardModalVisible] = useState(false);

  const fetchCards = () => {
    setIsLoading(true);
    cardService
      .getCards({ handleError })
      .then(data => data.data)
      .then(data => setCards(data))
      .catch(() => {
        addToast({
          content: t('CARDS.FETCH.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <button type='button' onClick={() => navigate('/settings')} className={styles.card__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.card__returnicon} />
        </button>
        <span className={styles.card__title}>{t('CARDS')}</span>
        <Fill />
        <button type='button' onClick={() => setIsNewCardModalVisible(true)}>
          <Icon name='plus' width={24} height={24} fill='white' />
        </button>
      </div>
      <Fill />
      <div className={styles.card__list}>
        <div className={styles.card__image} />
        {cards.length > 0 ? (
          cards?.map(card => {
            return <span>{card.name}</span>;
          })
        ) : (
          <div className={styles.card__emptyContainer}>
            <span className={styles.card__empty}>{t('CARDS.EMPTY')}</span>
            <div className={styles.card__addContainer}>
              <span className={styles.card__empty}>{t('CARDS.ADD')}</span>
              <button type='button' className={styles.card__add} onClick={() => setIsNewCardModalVisible(true)}>
                {t('CARDS.CLICK')}
              </button>
            </div>
          </div>
        )}
      </div>
      <NewCard
        isNewCardModalVisible={isNewCardModalVisible}
        setIsNewCardModalVisible={setIsNewCardModalVisible}
        defaultCard={defaultCard}
        newCard={newCard}
        setNewCard={setNewCard}
        fetchCards={fetchCards}
      />
    </div>
  );
};

export default Card;
