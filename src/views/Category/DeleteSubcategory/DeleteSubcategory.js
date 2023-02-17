import React from 'react';

import { useTranslation, Trans } from 'react-i18next';

import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './DeleteSubcategory.module.scss';

const DeleteSubcategory = ({
  isDeleteSubcategoryModalVisible,
  setIsDeleteSubcategoryModalVisible,
  selectedSubcategory,
  setSelectedSubcategory,
  hasTransactions,
  setHasTransactions,
}) => {
  const { t } = useTranslation();

  const handleModalClose = () => {
    setIsDeleteSubcategoryModalVisible(false);
    setSelectedSubcategory(null);
    setHasTransactions(false);
  };

  return (
    <Modal
      canClose
      onClose={() => handleModalClose()}
      title={t(`SUBCATEGORIES.DELETE`)}
      top={null}
      visible={isDeleteSubcategoryModalVisible}
      width='300px'
    >
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <span className={styles.modal__label}>
            {!hasTransactions ? (
              <Trans
                i18nKey='SUBCATEGORIES.DELETE.DESCRIPTION'
                values={{
                  subcategory: selectedSubcategory?.subcategory_name,
                  category: selectedSubcategory?.category_name,
                  transactionType: t(`TRANSACTION_TYPE.${selectedSubcategory?.transaction_type}`),
                }}
              />
            ) : (
              <Trans
                i18nKey='SUBCATEGORIES.DELETE.FORBIDDEN'
                values={{
                  subcategory: selectedSubcategory?.subcategory_name,
                  category: selectedSubcategory?.category_name,
                  transactionType: t(`TRANSACTION_TYPE.${selectedSubcategory?.transaction_type}`),
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

export default DeleteSubcategory;
