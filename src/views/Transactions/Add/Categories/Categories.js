import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import { useAuth } from 'hooks/useAuth';
import useHiddenStep from 'hooks/useHiddenStep';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import { useTransactions } from 'hooks/useTransactions';
import categoryService from 'services/category.service';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import Select from 'components/Select/Select';

import styles from './Categories.module.scss';

const Categories = ({ selectedCategory, setSelectedCategory, setSelectedSubcategory, step, setStep, transactionType }) => {
  const { t } = useTranslation();
  const { addToast } = useNotification();
  const { hidden } = useHiddenStep({ target: steps.CATEGORY, step });
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();
  const { fetchCategories, categories } = useTransactions();

  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [isChangedStep, setIsChangedStep] = useState(false);

  const handleSelectCategory = category => {
    setSelectedCategory(category);
    setCategoryName('');
    if (step !== steps.CATEGORY) return;
    setStep(steps.SUBCATEGORY);
    setIsChangedStep(true);
  };

  const handleCreateCategory = async () => {
    const name = categoryName;
    setIsLoading(true);
    await categoryService
      .createCategory({ name: categoryName, transactionType, handleError })
      .then(() => {
        fetchCategories();
      })
      .catch(() => {
        addToast({
          content: t('CATEGORIES.CREATE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsAddCategoryModalVisible(false);
        setIsLoading(false);
        setSelectedCategory(name);
        setCategoryName('');
      });
  };

  return (
    <>
      <div className={`${styles.categories} ${hidden ? styles.categories__bottom : ''} ${isChangedStep ? styles.categories__top : ''}`}>
        <span className={styles.categories__label}>{t('CATEGORIES.LABEL')}</span>
        <div className={styles.categories__items}>
          {categories
            .filter(category => category.transaction_type === transactionType)
            .map((item, index) => {
              return (
                <Button
                  key={index}
                  type='button'
                  size='lg'
                  kind='secondary'
                  className={styles.categories__button}
                  onClick={() => handleSelectCategory(item.category_name)}
                >
                  {item.category_name}
                </Button>
              );
            })}
          <Button
            type='button'
            size='lg'
            kind='secondary'
            className={styles.categories__button}
            onClick={() => {
              setIsAddCategoryModalVisible(true);
            }}
          >
            <Icon name='plus' width={18} height={18} fill='var(--gold-darker)' />
            {t('CATEGORIES.CREATE')}
          </Button>
        </div>
      </div>
      <div className={isChangedStep ? styles.categories__selected : styles.categories__unselected}>
        <span className={styles.categories__label}>{t('FILTERS.CATEGORY')}:</span>
        <Select
          className={styles.categories__select}
          value={selectedCategory}
          onChange={e => {
            const { value } = e.target;
            if (value === 'CREATE') {
              setIsAddCategoryModalVisible(true);
              setSelectedCategory('');
              setSelectedSubcategory('');
            } else {
              setSelectedCategory(value);
              setSelectedSubcategory('');
            }
          }}
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {categories
            .filter(category => category.transaction_type === transactionType)
            .map((item, index) => {
              return (
                <option key={index} value={item.category_name}>
                  {item.category_name}
                </option>
              );
            })}
          <option value='CREATE'>{t('CATEGORIES.CREATE')}</option>
        </Select>
      </div>
      <Modal
        canClose
        onClose={() => setIsAddCategoryModalVisible(false)}
        title={t('CATEGORIES.CREATE')}
        top={null}
        visible={isAddCategoryModalVisible}
        width='300px'
      >
        <div className={styles.categories__modal}>
          <span className={styles.categories__label}>{t('CATEGORIES.NAME')}</span>
          <Input id='new-category-input' value={categoryName} onChange={e => setCategoryName(e.target.value)} />
          <Button type='button' size='md' kind='primary' onClick={() => handleCreateCategory()}>
            {t('CREATE')}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Categories;
