import React from 'react';

import { useTranslation, Trans } from 'react-i18next';

import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './DeleteCategory.module.scss';

const DeleteCategory = ({
  isDeleteCategoryModalVisible,
  setIsDeleteCategoryModalVisible,
  selectedCategory,
  setSelectedCategory,
  hasTransactions,
  setHasTransactions,
}) => {
  const { t } = useTranslation();

  const handleModalClose = () => {
    setIsDeleteCategoryModalVisible(false);
    setSelectedCategory(null);
    setHasTransactions(false);
  };

  return (
    <Modal
      canClose
      onClose={() => handleModalClose()}
      title={t(`CATEGORIES.DELETE`)}
      top={null}
      visible={isDeleteCategoryModalVisible}
      width='300px'
    >
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <span className={styles.modal__label}>
            {!hasTransactions ? (
              <Trans
                i18nKey='CATEGORIES.DELETE.DESCRIPTION'
                values={{
                  category: selectedCategory?.category_name,
                  transactionType: t(`TRANSACTION_TYPE.${selectedCategory?.transaction_type}`),
                }}
              />
            ) : (
              <Trans
                i18nKey='CATEGORIES.DELETE.FORBIDDEN'
                values={{
                  category: selectedCategory?.category_name,
                  transactionType: t(`TRANSACTION_TYPE.${selectedCategory?.transaction_type}`),
                }}
              />
            )}
          </span>
        </div>
        {!hasTransactions ? (
          <div className={styles.modal__footer}>
            <Button kind='outline' size='md' onClick={() => handleModalClose()}>
              {t('CANCEL')}
            </Button>
            <Button kind='danger' size='md'>
              {t('DELETE')}
            </Button>
          </div>
        ) : (
          <div className={styles.modal__close}>
            <Button kind='outline' size='md' onClick={() => handleModalClose()}>
              {t('CLOSE')}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DeleteCategory;
