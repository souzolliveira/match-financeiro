import React from 'react';

import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './DeleteSubcategory.module.scss';

const DeleteSubcategory = ({
  isDeleteSubcategoryModalVisible,
  setIsDeleteSubcategoryModalVisible,
  selectedSubcategory,
  setSelectedSubcategory,
}) => {
  const { t } = useTranslation();

  const handleModalClose = () => {
    setIsDeleteSubcategoryModalVisible(false);
    setSelectedSubcategory(null);
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
            {t('SUBCATEGORIES.DELETE.DESCRIPTION', {
              subcategory: selectedSubcategory?.subcategory_name,
              category: selectedSubcategory?.category_name,
              transactionType: t(`TRANSACTION_TYPE.${selectedSubcategory?.transaction_type}`),
            })}
          </span>
        </div>
        <div className={styles.modal__footer}>
          <Button kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button kind='danger' size='md'>
            {t('DELETE')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteSubcategory;
