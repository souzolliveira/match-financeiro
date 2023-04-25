import React from 'react';

import { useTranslation } from 'react-i18next';

import transactionTypes from 'constants/transactionTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import categoryService from 'services/category.service';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import Select from 'components/Select/Select';

import styles from './NewCategory.module.scss';

const NewCategory = ({
  isNewCategoryModalVisible,
  setIsNewCategoryModalVisible,
  newCategoryType,
  setNewCategoryType,
  newCategoryName,
  setNewCategoryName,
  fetchCategories,
}) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const handleModalClose = () => {
    setIsNewCategoryModalVisible(false);
    setNewCategoryType('');
    setNewCategoryName('');
  };

  const handleCreateCategory = () => {
    setIsLoading(true);
    categoryService
      .createCategory({ name: newCategoryName, transactionType: newCategoryType, handleError })
      .then(async () => {
        addToast({
          content: t('CATEGORIES.NEW.SUCCESS'),
          type: 'success',
        });
        await fetchCategories();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('CATEGORIES.NEW.ERROR', { category: newCategoryName }),
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
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('TRANSACTION_TYPE.LABEL')}</span>
            <Select className={styles.modal__select} onChange={e => setNewCategoryType(e.target.value)} value={newCategoryType}>
              <option value=''>{t('SELECT')}</option>
              <option value={transactionTypes.INCOME}>{t('TRANSACTION_TYPE.INCOME')}</option>
              <option value={transactionTypes.EXPENSE}>{t('TRANSACTION_TYPE.EXPENSE')}</option>
              <option value={transactionTypes.INVESTIMENT}>{t('TRANSACTION_TYPE.INVESTIMENT')}</option>
            </Select>
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CATEGORIES.EDIT.DESCRIPTION')}</span>
            <Input className={styles.modal__input} onChange={e => setNewCategoryName(e.target.value)} value={newCategoryName} />
          </div>
        </div>
        <div className={styles.modal__footer}>
          <Button kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button kind='primary' size='md' onClick={() => handleCreateCategory()} disabled={isLoading}>
            {t('CREATE')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewCategory;
