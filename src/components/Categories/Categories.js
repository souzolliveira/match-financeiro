import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import { useAuth } from 'hooks/useAuth';
import useHiddenStep from 'hooks/useHiddenStep';
import categoryService from 'services/category.service';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';

import styles from './Categories.module.scss';

const Categories = ({ categories, fetchCategories, selectedCategory, setSelectedCategory, step, setStep, transactionType }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.CATEGORY, step });
  const { handleError } = useAuth();

  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleSelectCategory = category => {
    setSelectedCategory(category);
    setCategoryName('');
    setStep(steps.SUBCATEGORY);
  };

  const handleCreateCategory = () => {
    categoryService
      .createCategory({ name: categoryName, transactionType, handleError })
      .then(() => {
        fetchCategories();
      })
      .catch(() => {})
      .finally(() => {
        setIsAddCategoryModalVisible(false);
      });
  };

  return (
    <div className={`${styles.categories} ${hidden ? styles.hidden : ''} ${selectedCategory ? styles.selected : ''}`}>
      <span className={styles.categories__label}>{t('CATEGORIES.LABEL')}</span>
      <div className={styles.categories__items}>
        {categories.map((item, index) => {
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
    </div>
  );
};

export default Categories;
