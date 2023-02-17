import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';

import styles from './EditCategory.module.scss';

const EditCategory = ({ isEditCategoryModalVisible, setIsEditCategoryModalVisible, selectedCategory, setSelectedCategory }) => {
  const { t } = useTranslation();

  const [intermediateValue, setIntermediateValue] = useState(null);

  useEffect(() => {
    setIntermediateValue(selectedCategory?.category_name);
  }, [selectedCategory]);

  const handleModalClose = () => {
    setIsEditCategoryModalVisible(false);
    setSelectedCategory(null);
  };

  return (
    <Modal
      canClose
      onClose={() => handleModalClose()}
      title={t(`CATEGORIES.EDIT`)}
      top={null}
      visible={isEditCategoryModalVisible}
      width='300px'
    >
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <span className={styles.modal__label}>{t('CATEGORIES.EDIT.DESCRIPTION')}</span>
          <Input className={styles.modal__input} onChange={e => setIntermediateValue(e.target.value)} value={intermediateValue} />
        </div>
        <div className={styles.modal__footer}>
          <Button kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button kind='primary' size='md'>
            {t('SAVE')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditCategory;
