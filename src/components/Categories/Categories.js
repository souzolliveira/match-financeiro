import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useTransactions } from 'hooks/useTransactions';

import NewCategory from 'components/NewCategory';
import Select from 'components/Select';

import styles from './Categories.module.scss';

const Categories = ({ category, setCategory, setSubcategory, transactionType }) => {
  const { t } = useTranslation();
  const { categories } = useTransactions();

  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);

  return (
    <div className={styles.categories}>
      <span className={styles.categories__label}>{t('CATEGORIES.LABEL')}</span>
      <Select
        className={styles.categories__select}
        value={category}
        onChange={e => {
          const { value } = e.target;
          if (value === 'CREATE') {
            setIsNewCategoryModalVisible(true);
            setCategory('');
            setSubcategory('');
          } else {
            setCategory(value);
            setSubcategory('');
          }
        }}
        required
      >
        <option value='' disabled>
          {t('SELECT')}
        </option>
        {categories
          .filter(cat => cat.transaction_type === transactionType)
          .map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.category_name}
              </option>
            );
          })}
        <option value='CREATE'>{t('CATEGORIES.CREATE')}</option>
      </Select>
      <NewCategory
        isNewCategoryModalVisible={isNewCategoryModalVisible}
        setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
        transactionType={transactionType}
        setCategory={setCategory}
      />
    </div>
  );
};

export default Categories;
