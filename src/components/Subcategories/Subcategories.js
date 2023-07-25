import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useTransactions } from 'hooks/useTransactions';

import NewSubcategory from 'components/NewSubcategory';
import Select from 'components/Select';

import styles from './Subcategories.module.scss';

const Subcategories = ({ category, subcategory, setSubcategory }) => {
  const { t } = useTranslation();
  const { categories, subcategories, fetchSubcategories } = useTransactions();

  const [isNewSubcategoryModalVisible, setIsNewSubcategoryModalVisible] = useState(false);

  const selectedCategory = categories?.filter(cat => cat.id === parseInt(category, 10))?.[0] || {};

  return (
    <div className={styles.subcategories}>
      <span className={styles.subcategories__label}>{t('SUBCATEGORIES.LABEL')}</span>
      <Select
        className={styles.subcategories__select}
        value={subcategory}
        onChange={e => {
          const value = parseInt(e.target.value, 10);
          if (value === 'CREATE') {
            setIsNewSubcategoryModalVisible(true);
            setSubcategory('');
          } else {
            setSubcategory(value);
          }
        }}
        required
      >
        <option value='' disabled>
          {t('SELECT')}
        </option>
        {subcategories
          .filter(subcat => subcat.category_id === parseInt(category, 10))
          .map((item, index) => {
            return (
              <option key={index} value={parseInt(item.id, 10)}>
                {item.subcategory_name}
              </option>
            );
          })}
        <option value='CREATE' disabled={!category}>
          {t('SUBCATEGORIES.CREATE')}
        </option>
      </Select>
      <NewSubcategory
        isNewSubcategoryModalVisible={isNewSubcategoryModalVisible}
        setIsNewSubcategoryModalVisible={setIsNewSubcategoryModalVisible}
        category={selectedCategory}
        categories={categories}
        fetchSubcategories={fetchSubcategories}
        setSubcategory={setSubcategory}
      />
    </div>
  );
};

export default Subcategories;
