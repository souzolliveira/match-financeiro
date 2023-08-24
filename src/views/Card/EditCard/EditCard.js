import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import cardTypes from 'constants/cardTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import cardService from 'services/card.service';

import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Select from 'components/Select';

import styles from './EditCard.module.scss';

const EditCard = ({ isEditCardModalVisible, setIsEditCardModalVisible, card, defaultCard, fetchCards }) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [editedCard, setEditedCard] = useState(defaultCard);

  useEffect(() => {
    setEditedCard(card);
  }, [card]);

  const handleModalClose = () => {
    setIsEditCardModalVisible(false);
    setEditedCard(defaultCard);
  };

  const handleEditCard = () => {
    setIsLoading(true);
    cardService
      .update({ id: card.id, card: editedCard, handleError })
      .then(async () => {
        addToast({
          content: t('CARDS.EDIT.SUCCESS'),
          type: 'success',
        });
        await fetchCards();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('CARDS.EDIT.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedCard({
      ...editedCard,
      [name]: value,
    });
  };

  return (
    <Modal canClose onClose={() => handleModalClose()} title={t('CARDS.EDIT')} top={null} visible={isEditCardModalVisible} width='300px'>
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CARDS.NAME')}</span>
            <Input name='name' className={styles.modal__input} onChange={e => handleChange(e)} value={editedCard.name} />
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CARDS.EXPIRATION')}</span>
            <Input name='expirationDay' type='number' min={1} max={30} className={styles.modal__input} onChange={e => handleChange(e)} value={editedCard.expirationDay} />
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CARDS.PAYMENT')}</span>
            <Input name='paymentDay' type='number' min={1} max={30} className={styles.modal__input} onChange={e => handleChange(e)} value={editedCard.paymentDay} />
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CARDS.TYPE')}</span>
            <Select name='type' className={styles.modal__select} onChange={e => handleChange(e)} value={editedCard.type}>
              <option value=''>{t('SELECT')}</option>
              <option value={cardTypes.DEBT}>{t('CARDS.DEBT')}</option>
              <option value={cardTypes.CREDIT}>{t('CARDS.CREDIT')}</option>
              <option value={cardTypes.BOTH}>{t('CARDS.BOTH')}</option>
            </Select>
          </div>
        </div>
        <div className={styles.modal__footer}>
          <Button kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button kind='primary' size='md' onClick={() => handleEditCard()} disabled={isLoading}>
            {t('EDIT')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditCard;
