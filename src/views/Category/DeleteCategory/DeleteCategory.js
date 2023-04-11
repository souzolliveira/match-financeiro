import React from 'react';

import { useTranslation, Trans } from 'react-i18next';

import handleParams from 'helpers/handleParams';
import { useAuth } from 'hooks/useAuth';
import useDate from 'hooks/useDate';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import categoryService from 'services/category.service';

import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './DeleteCategory.module.scss';

const DeleteCategory = ({
  isDeleteCategoryModalVisible,
  setIsDeleteCategoryModalVisible,
  selectedCategory,
  setSelectedCategory,
  fetchCategories,
  hasSubcategories,
  setHasSubcategories,
}) => {
  const { formatDateFromFrontToAPI } = useDate();
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();
  const { t } = useTranslation();

  const handleModalClose = () => {
    setIsDeleteCategoryModalVisible(false);
    setSelectedCategory(null);
    setHasSubcategories(false);
  };

  const handleDelete = () => {
    setIsLoading(true);
    categoryService
      .deleteCategory({
        params: handleParams(
          { transaction_type: selectedCategory.transaction_type, name: selectedCategory.category_name },
          formatDateFromFrontToAPI
        ),
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
          content: t('CATEGORIES.DELETE.SUCCESS'),
          type: 'success',
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
        {!hasSubcategories ? (
          <div className={styles.modal__footer}>
            <Button kind='outline' size='md' onClick={() => handleModalClose()}>
              {t('CANCEL')}
            </Button>
            <Button kind='danger' size='md' onClick={() => handleDelete()}>
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
