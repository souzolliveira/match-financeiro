import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import categoryService from 'services/category.service';

import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';

import styles from './EditCategory.module.scss';

const EditCategory = ({ isEditCategoryModalVisible, setIsEditCategoryModalVisible, category, setCategory, fetchCategories }) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [name, setName] = useState('');

  useEffect(() => {
    setName(category?.category_name);
  }, [category]);

  const handleModalClose = () => {
    setIsEditCategoryModalVisible(false);
    setName('');
    setCategory({});
  };

  const handleSave = e => {
    e.preventDefault();
    if (category?.category_name === name) {
      handleModalClose();
      return;
    }
    setIsLoading(true);
    categoryService
      .updateCategory({
        id: category.id,
        name,
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('CATEGORIES.EDIT.SUCCESS'),
          type: 'success',
        });
        await fetchCategories();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('CATEGORIES.EDIT.ERROR'),
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
      title={t(`CATEGORIES.EDIT`)}
      top={null}
      visible={isEditCategoryModalVisible}
      width='300px'
    >
      <form className={styles.modal__content} onSubmit={e => handleSave(e)}>
        <div className={styles.modal__body}>
          <span className={styles.modal__label}>{t('CATEGORIES.EDIT.DESCRIPTION')}</span>
          <Input className={styles.modal__input} onChange={e => setName(e.target.value)} value={name} required />
        </div>
        <div className={styles.modal__footer}>
          <Button type='button' kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button type='submit' kind='primary' size='md' onClick={() => {}} disabled={isLoading}>
            {t('SAVE')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCategory;
