import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import cardService from 'services/card.service';

import Fill from 'components/Fill';
import Icon from 'components/Icon';

import EditCard from './EditCard/EditCard';
import NewCard from './NewCard/NewCard';
import RemoveCard from './RemoveCard/RemoveCard';

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
  const [selectedCard, setSelectedCard] = useState(defaultCard);
  const [isEditCardModalVisible, setIsEditCardModalVisible] = useState(false);
  const [isRemoveCardModalVisible, setIsRemoveCardModalVisible] = useState(false);

  const fetchCards = async () => {
    setIsLoading(true);
    await cardService
      .list({ handleError })
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
    <div className={styles.cards}>
      <div className={styles.cards__header}>
        <button type='button' onClick={() => navigate('/settings')} className={styles.cards__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.cards__returnicon} />
        </button>
        <span className={styles.cards__title}>{t('CARDS')}</span>
        <Fill />
        <button type='button' onClick={() => setIsNewCardModalVisible(true)}>
          <Icon name='plus' width={24} height={24} fill='white' />
        </button>
      </div>
      <Fill />
      <div className={styles.cards__list}>
        {cards.length > 0 ? (
          cards?.map(card => {
            return (
              <div key={card.name} className={styles.cards__card}>
                <div className={styles.cards__cardHeader}>
                  <div className={styles.cards__cardTitle}>
                    <span className={styles.cards__cardName}>{card.name}</span>
                    <span className={styles.cards__cardType}>{t(`CARDS.${card.type}`)}</span>
                  </div>
                  <div className={styles.cards__cardActions}>
                    <button
                      type='button'
                      onClick={() => {
                        setIsEditCardModalVisible(true);
                        setSelectedCard(card);
                      }}
                    >
                      <Icon name='edit' width={24} height={24} fill='var(--gold-darker)' />
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        setIsRemoveCardModalVisible(true);
                        setSelectedCard(card);
                      }}
                    >
                      <Icon name='trash' width={24} height={24} fill='var(--gold-darker)' />
                    </button>
                  </div>
                </div>
                <div className={styles.cards__cardInfo}>
                  <div>
                    <span className={styles.cards__cardLabel}>{t('CARDS.EXPIRATION_DAY')}</span>
                    <span className={styles.cards__cardValue}>{card.expirationDay}</span>
                  </div>
                  <div>
                    <span className={styles.cards__cardLabel}>{t('CARDS.PAYMENT_DAY')}</span>
                    <span className={styles.cards__cardValue}>{card.paymentDay}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.cards__emptyContainer}>
            <div className={styles.cards__image} />
            <span className={styles.cards__empty}>{t('CARDS.EMPTY')}</span>
            <div className={styles.cards__addContainer}>
              <span className={styles.cards__empty}>{t('CARDS.ADD')}</span>
              <button type='button' className={styles.cards__add} onClick={() => setIsNewCardModalVisible(true)}>
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
      <EditCard
        isEditCardModalVisible={isEditCardModalVisible}
        setIsEditCardModalVisible={setIsEditCardModalVisible}
        card={selectedCard}
        defaultCard={defaultCard}
        fetchCards={fetchCards}
      />
      <RemoveCard
        isRemoveCardModalVisible={isRemoveCardModalVisible}
        setIsRemoveCardModalVisible={setIsRemoveCardModalVisible}
        card={selectedCard}
        defaultCard={defaultCard}
        fetchCards={fetchCards}
      />
    </div>
  );
};

export default Card;
