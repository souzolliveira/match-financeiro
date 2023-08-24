import React, { useEffect, useState } from 'react';

import { useTranslation, Trans } from 'react-i18next';

import handleParams from 'helpers/handleParams';
import { useAuth } from 'hooks/useAuth';
import useDate from 'hooks/useDate';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import subcategoryService from 'services/subcategory.service';

import Button from 'components/Button';
import Modal from 'components/Modal';

import styles from './DeleteSubcategory.module.scss';

const DeleteSubcategory = ({ isDeleteSubcategoryModalVisible, setIsDeleteSubcategoryModalVisible, transactions, subcategory, setSubcategory, fetchSubcategories }) => {
  const { addToast } = useNotification();
  const { formatDateFromFrontToAPI } = useDate();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [hasTransactions, setHasTransactions] = useState(false);

  useEffect(() => {
    if (transactions.filter(transaction => transaction.subcategory_id === subcategory.id)?.length > 0) setHasTransactions(true);
    else setHasTransactions(false);
  }, [subcategory, transactions]);

  const handleModalClose = () => {
    setIsDeleteSubcategoryModalVisible(false);
    setSubcategory({});
    setHasTransactions(false);
  };

  const handleDelete = () => {
    setIsLoading(true);
    subcategoryService
      .deleteSubcategory({
        params: handleParams(
          {
            id: subcategory.id,
          },
          formatDateFromFrontToAPI
        ),
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('SUBCATEGORIES.DELETE.SUCCESS'),
          type: 'success',
        });
        await fetchSubcategories();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('SUBCATEGORIES.DELETE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal canClose onClose={() => handleModalClose()} title={t(`SUBCATEGORIES.DELETE`)} top={null} visible={isDeleteSubcategoryModalVisible} width='300px'>
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <span className={styles.modal__label}>
            {!hasTransactions ? (
              <Trans
                i18nKey='SUBCATEGORIES.DELETE.DESCRIPTION'
                values={{
                  subcategory: subcategory?.subcategory_name,
                  category: subcategory?.category_name,
                  transactionType: t(`TRANSACTION_TYPE.${subcategory?.transaction_type}`),
                }}
              />
            ) : (
              <Trans
                i18nKey='SUBCATEGORIES.DELETE.FORBIDDEN'
                values={{
                  subcategory: subcategory?.subcategory_name,
                  category: subcategory?.category_name,
                  transactionType: t(`TRANSACTION_TYPE.${subcategory?.transaction_type}`),
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

export default DeleteSubcategory;
