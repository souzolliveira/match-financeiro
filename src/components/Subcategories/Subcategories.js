import React from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import useHiddenStep from 'hooks/useHiddenStep';

import Button from 'components/Button/Button';

import styles from './Subcategories.module.scss';

const Subcategories = ({ subcategories, selectedSubcategory, setSelectedSubcategory, step, setStep }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.SUBCATEGORY, step });

  const handleChange = subcategory => {
    setSelectedSubcategory(subcategory);
    setStep(steps.VALUE);
    const valueInput = document.getElementById('transaction-value');
    if (valueInput) valueInput.focus();
  };

  return (
    <div className={`${styles.subcategories} ${hidden ? styles.hidden : ''} ${selectedSubcategory ? styles.selected : ''}`}>
      <span className={styles.subcategories__label}>{t('SUBCATEGORIES.LABEL')}</span>
      <div className={styles.subcategories__items}>
        {subcategories.map((item, index) => {
          return (
            <Button
              key={index}
              type='button'
              size='lg'
              className={styles.subcategories__button}
              onClick={() => handleChange(item.subcategory_name)}
            >
              {item.subcategory_name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Subcategories;
