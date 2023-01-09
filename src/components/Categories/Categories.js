import React from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import useHiddenStep from 'hooks/useHiddenStep';

import Button from 'components/Button/Button';

import styles from './Categories.module.scss';

const Categories = ({ categories, selectedCategory, setSelectedCategory, step, setStep }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.CATEGORY, step });

  const handleChange = category => {
    setSelectedCategory(category);
    setStep(steps.SUBCATEGORY);
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
              onClick={() => handleChange(item.category_name)}
            >
              {item.category_name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
