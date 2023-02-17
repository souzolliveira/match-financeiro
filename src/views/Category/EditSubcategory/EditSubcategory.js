import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import costingTypes from 'constants/costingTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import subcategoryService from 'services/subcategory.service';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import Select from 'components/Select/Select';

import styles from './EditSubcategory.module.scss';

const EditSubcategory = ({
  isEditSubcategoryModalVisible,
  setIsEditSubcategoryModalVisible,
  selectedSubcategory,
  setSelectedSubcategory,
  fetchSubcategories,
}) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [intermediateValue, setIntermediateValue] = useState(null);
  const [intermediateCosting, setIntermediateCosting] = useState(null);

  useEffect(() => {
    setIntermediateValue(selectedSubcategory?.subcategory_name);
    setIntermediateCosting(selectedSubcategory?.costing);
  }, [selectedSubcategory]);

  const handleModalClose = () => {
    setIsEditSubcategoryModalVisible(false);
    setSelectedSubcategory(null);
  };

  const handleSave = () => {
    if (selectedSubcategory?.subcategory_name === intermediateValue && selectedSubcategory?.costing === intermediateCosting) {
      handleModalClose();
      return;
    }
    setIsLoading(true);
    subcategoryService
      .updateSubcategory({
        transactionType: selectedSubcategory?.transaction_type,
        category: selectedSubcategory?.category_name,
        name: selectedSubcategory?.subcategory_name,
        newName: intermediateValue,
        costing: intermediateCosting,
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
    <Modal
      canClose
      onClose={() => handleModalClose()}
      title={t(`SUBCATEGORIES.EDIT`)}
      top={null}
      visible={isEditSubcategoryModalVisible}
      width='300px'
    >
      <div className={styles.modal__content}>
        <div className={styles.modal__body}>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('SUBCATEGORIES.COSTING')}</span>
            <Select className={styles.modal__input} onChange={e => setIntermediateCosting(e.target.value)} value={intermediateCosting}>
              <option value=''>{t('SELECT')}</option>
              <option value={costingTypes.FIXED}>{t(`SUBCATEGORIES.COSTING.${costingTypes.FIXED}`)}</option>
              <option value={costingTypes.VARIABLE}>{t(`SUBCATEGORIES.COSTING.${costingTypes.VARIABLE}`)}</option>
            </Select>
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('SUBCATEGORIES.EDIT.DESCRIPTION')}</span>
            <Input className={styles.modal__input} onChange={e => setIntermediateValue(e.target.value)} value={intermediateValue} />
          </div>
        </div>
        <div className={styles.modal__footer}>
          <Button kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button kind='primary' size='md' onClick={() => handleSave()}>
            {t('SAVE')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditSubcategory;
