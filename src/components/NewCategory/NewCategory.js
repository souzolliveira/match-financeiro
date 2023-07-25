import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import transactionTypes from 'constants/transactionTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import { useTransactions } from 'hooks/useTransactions';
import categoryService from 'services/category.service';

import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Select from 'components/Select';

import styles from './NewCategory.module.scss';

const NewCategory = ({ isNewCategoryModalVisible, setIsNewCategoryModalVisible, transactionType, setCategory = () => {} }) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();
  const { fetchCategories } = useTransactions();

  const [name, setName] = useState('');

  const handleModalClose = id => {
    setIsNewCategoryModalVisible(false);
    setName('');
    setCategory(id);
  };

  const handleCreateCategory = e => {
    e.preventDefault();
    setIsLoading(true);
    categoryService
      .createCategory({ name, transactionType, handleError })
      .then(async data => {
        addToast({
          content: t('CATEGORIES.NEW.SUCCESS'),
          type: 'success',
        });
        await fetchCategories();
        handleModalClose(data.id);
      })
      .catch(() => {
        addToast({
          content: t('CATEGORIES.NEW.ERROR', { category: name }),
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
      title={t(`CATEGORIES.NEW`)}
      top={null}
      visible={isNewCategoryModalVisible}
      width='300px'
    >
      <form className={styles.modal__content} onSubmit={e => handleCreateCategory(e)}>
        <div className={styles.modal__body}>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('TRANSACTION_TYPE')}</span>
            <Select className={styles.modal__select} onChange={() => {}} value={transactionType} disabled>
              <option value={transactionTypes[transactionType]}>{t(`TRANSACTION_TYPE.${transactionType}`)}</option>
            </Select>
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CATEGORIES.NAME')}</span>
            <Input className={styles.modal__input} onChange={e => setName(e.target.value)} value={name} required />
          </div>
        </div>
        <div className={styles.modal__footer}>
          <Button type='button' kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button type='submit' kind='primary' size='md' disabled={isLoading}>
            {t('CREATE')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewCategory;
