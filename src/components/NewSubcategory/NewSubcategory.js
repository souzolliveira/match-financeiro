import React, { useState } from 'react';

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

import styles from './NewSubcategory.module.scss';

const NewSubcategory = ({
  isNewSubcategoryModalVisible,
  setIsNewSubcategoryModalVisible,
  category,
  setCategory = () => {},
  categories,
  fetchSubcategories,
  setSubcategory = () => {},
}) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [costing, setCosting] = useState('');

  const handleModalClose = id => {
    setIsNewSubcategoryModalVisible(false);
    setName('');
    setCosting('');
    setCategory({});
    setSubcategory(id);
  };

  const handleSave = e => {
    e.preventDefault();
    setIsLoading(true);
    subcategoryService
      .createSubcategory({
        category: category.id,
        costing,
        name,
        transactionType: category.transaction_type,
        handleError,
      })
      .then(async data => {
        addToast({
          content: t('SUBCATEGORIES.NEW.SUCCESS'),
          type: 'success',
        });
        await fetchSubcategories();
        handleModalClose(data.id);
      })
      .catch(() => {
        addToast({
          content: t('SUBCATEGORIES.NEW.ERROR', { subcategory: name }),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal canClose onClose={() => handleModalClose()} title={t(`SUBCATEGORIES.NEW`)} top={null} visible={isNewSubcategoryModalVisible} width='300px'>
      <form className={styles.modal__content} onSubmit={e => handleSave(e)}>
        <div className={styles.modal__body}>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CATEGORY')}</span>
            <Select className={styles.modal__input} onChange={() => {}} value={category.id} disabled>
              <option value=''>{t('SELECT')}</option>
              {categories.map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.category_name}
                  </option>
                );
              })}
            </Select>
          </div>
          {category.transaction_type === transactionTypes.EXPENSE && (
            <div className={styles.modal__inputGroup}>
              <span className={styles.modal__label}>{t('SUBCATEGORIES.COSTING')}</span>
              <Select className={styles.modal__input} onChange={e => setCosting(e.target.value)} value={costing} required={category.transaction_type === transactionTypes.EXPENSE}>
                <option value='' disabled>
                  {t('SELECT')}
                </option>
                <option value={costingTypes.FIXED}>{t(`SUBCATEGORIES.COSTING.${costingTypes.FIXED}`)}</option>
                <option value={costingTypes.VARIABLE}>{t(`SUBCATEGORIES.COSTING.${costingTypes.VARIABLE}`)}</option>
              </Select>
            </div>
          )}
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('SUBCATEGORIES.NAME')}</span>
            <Input className={styles.modal__input} onChange={e => setName(e.target.value)} value={name} required />
          </div>
        </div>
        <div className={styles.modal__footer}>
          <Button type='button' kind='outline' size='md' onClick={() => handleModalClose()}>
            {t('CANCEL')}
          </Button>
          <Button type='submit' kind='primary' size='md' onClick={() => {}} disabled={isLoading}>
            {t('CREATE')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewSubcategory;
