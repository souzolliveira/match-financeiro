import React, { useEffect, useState } from 'react';

import { useTranslation, Trans } from 'react-i18next';

import handleParams from 'helpers/handleParams';
import { useAuth } from 'hooks/useAuth';
import useDate from 'hooks/useDate';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import categoryService from 'services/category.service';

import Button from 'components/Button';
import Modal from 'components/Modal';

import styles from './DeleteCategory.module.scss';

const DeleteCategory = ({
  isDeleteCategoryModalVisible,
  setIsDeleteCategoryModalVisible,
  category,
  setCategory,
  subcategories,
  fetchCategories,
}) => {
  const { formatDateFromFrontToAPI } = useDate();
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [hasSubcategories, setHasSubcategories] = useState(false);

  useEffect(() => {
    if (subcategories.filter(subcategory => subcategory.category_id === category.id)?.length > 0) setHasSubcategories(true);
    else setHasSubcategories(false);
  }, [category, subcategories]);

  const handleModalClose = () => {
    setIsDeleteCategoryModalVisible(false);
    setCategory({});
    setHasSubcategories(false);
  };

  const handleDelete = () => {
    setIsLoading(true);
    categoryService
      .deleteCategory({
        params: handleParams({ id: category.id }, formatDateFromFrontToAPI),
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('CATEGORIES.DELETE.SUCCESS'),
          type: 'success',
        });
        await fetchCategories();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('CATEGORIES.DELETE.ERROR'),
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
      title={t(`CATEGORIES.DELETE`)}
      top={null}
      visible={isDeleteCategoryModalVisible}
      width='300px'
    >
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <span className={styles.modal__label}>
            {!hasSubcategories ? (
              <Trans
                i18nKey='CATEGORIES.DELETE.DESCRIPTION'
                values={{
                  category: category?.category_name,
                  transactionType: t(`TRANSACTION_TYPE.${category?.transaction_type}`),
                }}
              />
            ) : (
              <Trans
                i18nKey='CATEGORIES.DELETE.FORBIDDEN'
                values={{
                  category: category?.category_name,
                  transactionType: t(`TRANSACTION_TYPE.${category?.transaction_type}`),
                }}
              />
            )}
          </span>
        </div>
        {!hasSubcategories ? (
          <div className={styles.modal__footer}>
            <Button kind='outline' size='md' onClick={() => handleModalClose()}>
              {t('CANCEL')}
            </Button>
            <Button kind='danger' size='md' onClick={() => handleDelete()} disabled={isLoading}>
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
