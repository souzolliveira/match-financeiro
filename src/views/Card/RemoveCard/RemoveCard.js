import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import cardService from 'services/card.service';

import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './RemoveCard.module.scss';

const RemoveCard = ({ isRemoveCardModalVisible, setIsRemoveCardModalVisible, card, defaultCard, fetchCards }) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [removeCard, setRemoveCard] = useState(defaultCard);

  useEffect(() => {
    setRemoveCard(card);
  }, [card]);

  const handleModalClose = () => {
    setIsRemoveCardModalVisible(false);
    setRemoveCard(defaultCard);
  };

  const handleRemoveCard = () => {
    setIsLoading(true);
    cardService
      .removeCard({ id: removeCard?.id, handleError })
      .then(async () => {
        addToast({
          content: t('CARDS.REMOVE.SUCCESS'),
          type: 'success',
        });
        await fetchCards();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('CARDS.REMOVE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      canClose
      onClose={() => handleModalClose()}
      title={t('CARDS.REMOVE')}
      top={null}
      visible={isRemoveCardModalVisible}
      width='300px'
    >
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <span className={styles.modal__text}>{t('CARDS.REMOVE.CONFIRM', { card: removeCard?.name })}</span>
        </div>
        <div className={styles.modal__footer}>
          <Button kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button kind='primary' size='md' onClick={() => handleRemoveCard()} disabled={isLoading}>
            {t('REMOVE')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveCard;
