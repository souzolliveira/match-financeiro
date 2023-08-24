import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import assetTypes from 'constants/assetTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import assetService from 'services/asset.service';

import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Select from 'components/Select';

import styles from './NewAsset.module.scss';

const NewAsset = ({ isNewAssetModalVisible, setIsNewAssetModalVisible, category, setCategory, categories, subcategory, setSubcategory, subcategories, fetchAssets }) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [quantifiable, setQuantifiable] = useState('');

  const handleModalClose = () => {
    setIsNewAssetModalVisible(false);
    setName('');
    setQuantifiable('');
    setCategory({});
    setSubcategory({});
  };

  const handleSave = e => {
    e.preventDefault();
    setIsLoading(true);
    assetService
      .create({
        subcategory: subcategory.id,
        name,
        quantifiable,
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('ASSETS.NEW.SUCCESS'),
          type: 'success',
        });
        await fetchAssets();
        handleModalClose();
      })
      .catch(() => {
        addToast({
          content: t('ASSETS.NEW.ERROR', { asset: name }),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal canClose onClose={() => handleModalClose()} title={t(`ASSETS.NEW`)} top={null} visible={isNewAssetModalVisible} width='300px'>
      <form className={styles.modal__content} onSubmit={e => handleSave(e)}>
        <div className={styles.modal__body}>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('CATEGORY')}</span>
            <Select className={styles.modal__input} onChange={() => {}} value={category.id} disabled required>
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
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('SUBCATEGORY')}</span>
            <Select className={styles.modal__input} onChange={() => {}} value={subcategory.id} disabled required>
              <option value=''>{t('SELECT')}</option>
              {subcategories.map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.subcategory_name}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('ASSETS.QUANTIFIABLE.LABEL')}</span>
            <Select className={styles.modal__input} onChange={e => setQuantifiable(e.target.value)} value={quantifiable} required>
              <option value='' disabled>
                {t('SELECT')}
              </option>
              <option value={assetTypes.QUANTIFIABLE}>{t('ASSETS.QUANTIFIABLE')}</option>
              <option value={assetTypes.NOT_QUANTIFIABLE}>{t('ASSETS.NOT_QUANTIFIABLE')}</option>
            </Select>
          </div>
          <div className={styles.modal__inputGroup}>
            <span className={styles.modal__label}>{t('ASSETS.NAME')}</span>
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

export default NewAsset;
