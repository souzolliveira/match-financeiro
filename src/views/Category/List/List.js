import React from 'react';

import { useTranslation } from 'react-i18next';

import Fill from 'components/Fill/Fill';
import Icon from 'components/Icon/Icon';

import styles from './List.module.scss';

const List = ({ transactionType, categories, setIsDeleteCategoryModalVisible, setIsEditCategoryModalVisible, setSelectedCategory }) => {
  const { t } = useTranslation();

  const handleDeleteCategory = category => {
    setIsDeleteCategoryModalVisible(true);
    setSelectedCategory(category);
  };

  const handleEditCategory = category => {
    setIsEditCategoryModalVisible(true);
    setSelectedCategory(category);
  };

  return (
    <div className={styles.list}>
      <div className={styles.list__header}>
        <span className={styles.list__title}>{t(`TRANSACTION_TYPE.${transactionType}`)}</span>
        <button type='button' onClick={() => {}}>
          <Icon name='plus' width={20} height={20} fill='var(--gold-dark)' />
        </button>
      </div>
      {categories.length > 0 ? (
        categories.map(category => {
          return (
            <div className={styles.list__item} key={category.category_name}>
              <Icon name='chevron-top' width={24} height={24} fill='var(--gold-darker)' />
              <span className={styles.list__label}>{category.category_name}</span>
              <Fill />
              <div className={styles.list__buttons}>
                <button type='button' onClick={() => handleDeleteCategory(category)}>
                  <Icon name='trash' width={20} height={20} fill='var(--gold-darker)' />
                </button>
                <button type='button' onClick={() => handleEditCategory(category)}>
                  <Icon name='edit' width={20} height={20} fill='var(--gold-darker)' />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <span className={styles.list__empty}>{t('CATEGORIES.EMPTY')}</span>
      )}
    </div>
  );
};

export default List;
