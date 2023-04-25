import React from 'react';

import { useTranslation } from 'react-i18next';

import costingTypes from 'constants/costingTypes';
import transactionTypes from 'constants/transactionTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import subcategoryService from 'services/subcategory.service';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import Select from 'components/Select/Select';

import styles from './NewSubcategory.module.scss';

const NewSubcategory = ({
  isNewSubcategoryModalVisible,
  setIsNewSubcategoryModalVisible,
  newSubcategoryType,
  setNewSubcategoryType,
  categories,
  newSubcategoryCategory,
  setNewSubcategoryCategory,
  newSubcategoryCosting,
  setNewSubcategoryCosting,
  newSubcategoryName,
  setNewSubcategoryName,
  fetchSubcategories,
}) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const handleModalClose = () => {
    setIsNewSubcategoryModalVisible(false);
    setNewSubcategoryType('');
    setNewSubcategoryCategory('');
    setNewSubcategoryName('');
    setNewSubcategoryCosting('');
  };

  const handleCreateSubcategory = () => {
    setIsLoading(true);
    subcategoryService
      .createSubcategory({
        category: newSubcategoryCategory,
        costing: newSubcategoryCosting,
        name: newSubcategoryName,
        transactionType: newSubcategoryType,
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('SUBCATEGORIES.NEW.SUCCESS'),
          type: 'success',
        });
        await fetchSubcategories();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('SUBCATEGORIES.NEW.ERROR', { subcategory: newSubcategoryName }),
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
      title={t(`SUBCATEGORIES.NEW`)}
      top={null}
      visible={isNewSubcategoryModalVisible}
      width='300px'
    >
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('TRANSACTION_TYPE.LABEL')}</span>
            <Select
              className={styles.modal__select}
              onChange={e => {
                setNewSubcategoryType(e.target.value);
                setNewSubcategoryCategory(null);
              }}
              value={newSubcategoryType}
            >
              <option value=''>{t('SELECT')}</option>
              <option value={transactionTypes.INCOME}>{t('TRANSACTION_TYPE.INCOME')}</option>
              <option value={transactionTypes.EXPENSE}>{t('TRANSACTION_TYPE.EXPENSE')}</option>
              <option value={transactionTypes.INVESTIMENT}>{t('TRANSACTION_TYPE.INVESTIMENT')}</option>
            </Select>
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CATEGORIES.EDIT.DESCRIPTION')}</span>
            <Select
              className={styles.modal__input}
              onChange={e => setNewSubcategoryCategory(e.target.value)}
              value={newSubcategoryCategory}
            >
              <option value=''>{t('SELECT')}</option>
              {categories
                .filter(category => category.transaction_type === newSubcategoryType)
                .map(category => {
                  return (
                    <option key={category.category_name} value={category.category_name}>
                      {category.category_name}
                    </option>
                  );
                })}
            </Select>
          </div>
          {newSubcategoryType === transactionTypes.EXPENSE && (
            <div className={styles.modal__inputGroup}>
              <span className={styles.modal__label}>{t('SUBCATEGORIES.COSTING')}</span>
              <Select
                className={styles.modal__input}
                onChange={e => setNewSubcategoryCosting(e.target.value)}
                value={newSubcategoryCosting}
              >
                <option value=''>{t('SELECT')}</option>
                <option value={costingTypes.FIXED}>{t(`SUBCATEGORIES.COSTING.${costingTypes.FIXED}`)}</option>
                <option value={costingTypes.VARIABLE}>{t(`SUBCATEGORIES.COSTING.${costingTypes.VARIABLE}`)}</option>
              </Select>
            </div>
          )}
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('SUBCATEGORIES.NAME')}</span>
            <Input className={styles.modal__input} onChange={e => setNewSubcategoryName(e.target.value)} value={newSubcategoryName} />
          </div>
        </div>
        <div className={styles.modal__footer}>
          <Button kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button kind='primary' size='md' onClick={() => handleCreateSubcategory()} disabled={isLoading}>
            {t('CREATE')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewSubcategory;
