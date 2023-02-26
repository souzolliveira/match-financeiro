/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import costingTypes from 'constants/costingTypes';
import { useNotification } from 'hooks/useNotification';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';

import styles from './NewSubcategoryFromTemplate.module.scss';

const NewSubcategoryFromTemplate = ({ template, setTemplate, transactionType, category }) => {
  const { addToast } = useNotification();
  const { t } = useTranslation();

  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
  const [transactionTypeToCreateSubcategory, setTransactionTypeToCreateSubcategory] = useState(null);
  const [categoryToCreateSubcategory, setCategoryToCreateSubcategory] = useState(null);
  const [subcategoryToBeCreated, setSubcategoryToBeCreated] = useState('');

  const handleAddSubcategory = () => {
    setTransactionTypeToCreateSubcategory(transactionType);
    setCategoryToCreateSubcategory(category);
    setIsAddingSubcategory(true);
    setTimeout(() => {
      const input = document.getElementById('subcategory');
      if (input) input.focus();
    }, [100]);
  };

  const handleCancelSubcategoryCreation = () => {
    setSubcategoryToBeCreated('');
    setCategoryToCreateSubcategory(null);
    setTransactionTypeToCreateSubcategory(null);
    setIsAddingSubcategory(false);
  };

  const handleCreateSubcategory = subcategory => {
    if (subcategory in template?.[transactionType]?.[category]) {
      addToast({
        content: t('SUBCATEGORIES.DIFFERENT.NAME'),
        type: 'danger',
        timeout: 5,
      });
      return;
    }
    handleCancelSubcategoryCreation();
    setTemplate({
      ...template,
      [transactionType]: {
        ...template[transactionType],
        [category]: {
          ...template[transactionType][category],
          [subcategory]: {
            value: false,
            costing: costingTypes.FIXED,
          },
        },
      },
    });
  };

  if (isAddingSubcategory && transactionTypeToCreateSubcategory === transactionType && categoryToCreateSubcategory === category) {
    return (
      <div className={styles.newSubcategoryFromTemplate__addSubcategory}>
        <Input
          className={styles.newSubcategoryFromTemplate__addSubcategoryInput}
          id='subcategory'
          name='subcategory'
          type='text'
          value={subcategoryToBeCreated}
          onChange={e => setSubcategoryToBeCreated(e.target.value)}
        />
        <Button
          className={styles.newSubcategoryFromTemplate__addSubcategoryButton}
          type='button'
          onClick={() => handleCancelSubcategoryCreation()}
          kind='outline'
          size='md'
        >
          <Icon name='close' width={20} height={20} fill='var(--gold-darker)' />
        </Button>
        <Button
          className={styles.newSubcategoryFromTemplate__addSubcategoryButton}
          type='button'
          onClick={() => handleCreateSubcategory(subcategoryToBeCreated)}
          kind='primary'
          size='md'
        >
          <Icon name='check' width={16} height={16} fill='#fff' />
        </Button>
      </div>
    );
  }
  return (
    <div
      className={styles.newSubcategoryFromTemplate__addButton}
      onClick={() => handleAddSubcategory(transactionType, category)}
      onKeyDown={() => handleAddSubcategory(transactionType, category)}
      role='button'
      tabIndex={0}
    >
      <Icon name='plus' width={16} height={16} fill='var(--gold-dark)' />
      <span className={styles.newSubcategoryFromTemplate__label}>{t('SUBCATEGORIES.ADD')}</span>
    </div>
  );
};

export default NewSubcategoryFromTemplate;
