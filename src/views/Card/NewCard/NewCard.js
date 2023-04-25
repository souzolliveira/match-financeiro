import React from 'react';

import { useTranslation } from 'react-i18next';

import cardTypes from 'constants/cardTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import cardService from 'services/card.service';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import Select from 'components/Select/Select';

import styles from './NewCard.module.scss';

const NewCard = ({ isNewCardModalVisible, setIsNewCardModalVisible, newCard, setNewCard, defaultCard, fetchCards }) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const handleModalClose = () => {
    setIsNewCardModalVisible(false);
    setNewCard(defaultCard);
  };

  const handleCreateCard = () => {
    setIsLoading(true);
    cardService
      .createCard({ ...newCard, handleError })
      .then(async () => {
        addToast({
          content: t('CARDS.NEW.SUCCESS'),
          type: 'success',
        });
        await fetchCards();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('CARDS.NEW.ERROR', { card: newCard.name }),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewCard({
      ...newCard,
      [name]: value,
    });
  };

  return (
    <Modal canClose onClose={() => handleModalClose()} title={t('CARDS.NEW')} top={null} visible={isNewCardModalVisible} width='300px'>
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CARDS.NAME')}</span>
            <Input name='name' className={styles.modal__input} onChange={e => handleChange(e)} value={newCard.name} />
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CARDS.EXPIRATION')}</span>
            <Input
              name='expirationDay'
              type='number'
              min={1}
              max={30}
              className={styles.modal__input}
              onChange={e => handleChange(e)}
              value={newCard.expirationDay}
            />
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CARDS.PAYMENT')}</span>
            <Input
              name='paymentDay'
              type='number'
              min={1}
              max={30}
              className={styles.modal__input}
              onChange={e => handleChange(e)}
              value={newCard.paymentDay}
            />
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CARDS.TYPE')}</span>
            <Select name='type' className={styles.modal__select} onChange={e => handleChange(e)} value={newCard.type}>
              <option value=''>{t('SELECT')}</option>
              <option value={cardTypes.DEBIT}>{t('CARDS.DEBIT')}</option>
              <option value={cardTypes.CREDIT}>{t('CARDS.CREDIT')}</option>
              <option value={cardTypes.BOTH}>{t('CARDS.BOTH')}</option>
            </Select>
          </div>
        </div>
        <div className={styles.modal__footer}>
          <Button kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button kind='primary' size='md' onClick={() => handleCreateCard()} disabled={isLoading}>
            {t('CREATE')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewCard;
