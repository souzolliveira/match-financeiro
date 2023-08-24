import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import costingTypes from 'constants/costingTypes';
import transactionTypes from 'constants/transactionTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import subcategoryService from 'services/subcategory.service';

import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Select from 'components/Select';

import styles from './EditSubcategory.module.scss';

const EditSubcategory = ({ isEditSubcategoryModalVisible, setIsEditSubcategoryModalVisible, subcategory, setSubcategory, fetchSubcategories }) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [costing, setCosting] = useState('');

  useEffect(() => {
    setName(subcategory?.subcategory_name);
    setCosting(subcategory?.costing);
  }, [subcategory]);

  const handleModalClose = () => {
    setIsEditSubcategoryModalVisible(false);
    setSubcategory({});
  };

  const handleSave = e => {
    e.preventDefault();
    if (subcategory?.subcategory_name === name && subcategory?.costing === costing) {
      handleModalClose();
      return;
    }
    setIsLoading(true);
    subcategoryService
      .updateSubcategory({
        id: subcategory.id,
        name,
        costing,
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('SUBCATEGORIES.EDIT.SUCCESS'),
          type: 'success',
        });
        await fetchSubcategories();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('SUBCATEGORIES.EDIT.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal canClose onClose={() => handleModalClose()} title={t(`SUBCATEGORIES.EDIT`)} top={null} visible={isEditSubcategoryModalVisible} width='300px'>
      <form className={styles.modal__content} onSubmit={e => handleSave(e)}>
        <div className={styles.modal__body}>
          {subcategory.transaction_type === transactionTypes.EXPENSE && (
            <div className={styles.modal__inputGroup}>
              <span className={styles.modal__label}>{t('SUBCATEGORIES.COSTING')}</span>
              <Select className={styles.modal__input} onChange={e => setCosting(e.target.value)} value={costing} required>
                <option value='' disabled>
                  {t('SELECT')}
                </option>
                <option value={costingTypes.FIXED}>{t(`SUBCATEGORIES.COSTING.${costingTypes.FIXED}`)}</option>
                <option value={costingTypes.VARIABLE}>{t(`SUBCATEGORIES.COSTING.${costingTypes.VARIABLE}`)}</option>
              </Select>
            </div>
          )}
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('SUBCATEGORIES.EDIT.DESCRIPTION')}</span>
            <Input className={styles.modal__input} onChange={e => setName(e.target.value)} value={name} required />
          </div>
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

export default EditSubcategory;
