import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useNotification } from 'hooks/useNotification';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';

import styles from './NewCategoryFromTemplate.module.scss';

const NewCategoryFromTemplate = ({ template, setTemplate, transactionType }) => {
  const { addToast } = useNotification();
  const { t } = useTranslation();

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [transactionTypeToCreateCategory, setTransactionTypeToCreateCategory] = useState('');
  const [categoryToBeCreated, setCategoryToBeCreated] = useState('');

  const handleAddCategory = () => {
    setTransactionTypeToCreateCategory(transactionType);
    setIsAddingCategory(true);
    setTimeout(() => {
      const input = document.getElementById('category');
      if (input) input.focus();
    }, [100]);
  };

  const handleCancelCategoryCreation = () => {
    setCategoryToBeCreated('');
    setTransactionTypeToCreateCategory(null);
    setIsAddingCategory(false);
  };

  const handleCreateCategory = category => {
    if (category in template?.[transactionType]) {
      addToast({
        content: t('CATEGORIES.DIFFERENT.NAME'),
        type: 'danger',
        timeout: 5,
      });
      return;
    }
    handleCancelCategoryCreation();
    setTemplate({
      ...template,
      [transactionType]: {
        ...template[transactionType],
        [category]: {},
      },
    });
  };

  if (isAddingCategory && transactionTypeToCreateCategory === transactionType) {
    return (
      <div className={styles.newCategoryFromTemplate__addCategory}>
        <Input
          className={styles.newCategoryFromTemplate__addCategoryInput}
          id='category'
          name='category'
          type='text'
          value={categoryToBeCreated}
          onChange={e => setCategoryToBeCreated(e.target.value)}
        />
        <Button
          className={styles.newCategoryFromTemplate__addCategoryButton}
          type='button'
          onClick={() => handleCancelCategoryCreation()}
          kind='outline'
          size='md'
        >
          <Icon name='close' width={20} height={20} fill='var(--gold-darker)' />
        </Button>
        <Button
          className={styles.newCategoryFromTemplate__addCategoryButton}
          type='button'
          onClick={() => handleCreateCategory(categoryToBeCreated)}
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
      className={styles.newCategoryFromTemplate__addButton}
      onClick={() => handleAddCategory(transactionType)}
      onKeyDown={() => handleAddCategory(transactionType)}
      role='button'
      tabIndex={0}
    >
      <Icon name='plus' width={16} height={16} fill='var(--gold-darker)' />
      <span className={styles.newCategoryFromTemplate__label}>{t('CATEGORIES.ADD')}</span>
    </div>
  );
};

export default NewCategoryFromTemplate;
