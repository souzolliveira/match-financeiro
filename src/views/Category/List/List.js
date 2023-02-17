import React from 'react';

import { useTranslation } from 'react-i18next';

import costingTypes from 'constants/costingTypes';

import Fill from 'components/Fill/Fill';
import Icon from 'components/Icon/Icon';

import styles from './List.module.scss';

const List = ({
  transactionType,
  categories,
  subcategories,
  openedCategory,
  setOpenedCategory,
  setIsNewCategoryModalVisible,
  setNewCategoryType,
  setIsDeleteCategoryModalVisible,
  setIsEditCategoryModalVisible,
  setSelectedCategory,
  setIsNewSubcategoryModalVisible,
  setNewSubcategoryType,
  setNewSubcategoryCategory,
  setIsDeleteSubcategoryModalVisible,
  setIsEditSubcategoryModalVisible,
  setSelectedSubcategory,
}) => {
  const { t } = useTranslation();

  const isCategoryOpened = category => {
    if (JSON.stringify(openedCategory) === JSON.stringify(category)) return true;
    return false;
  };

  const handleOpenCategory = category => {
    if (isCategoryOpened(category)) setOpenedCategory(null);
    else setOpenedCategory(category);
  };

  const handleNewCategory = () => {
    setIsNewCategoryModalVisible(true);
    setNewCategoryType(transactionType);
  };

  const handleDeleteCategory = (e, category) => {
    e.stopPropagation();
    setIsDeleteCategoryModalVisible(true);
    setSelectedCategory(category);
  };

  const handleEditCategory = (e, category) => {
    e.stopPropagation();
    setIsEditCategoryModalVisible(true);
    setSelectedCategory(category);
  };

  const handleNewSubcategory = (e, category) => {
    e.stopPropagation();
    setIsNewSubcategoryModalVisible(true);
    setNewSubcategoryType(category.transaction_type);
    setNewSubcategoryCategory(category.category_name);
  };

  const handleDeleteSubcategory = (e, subcategory) => {
    e.stopPropagation();
    setIsDeleteSubcategoryModalVisible(true);
    setSelectedSubcategory(subcategory);
  };

  const handleEditSubcategory = (e, subcategory) => {
    e.stopPropagation();
    setIsEditSubcategoryModalVisible(true);
    setSelectedSubcategory(subcategory);
  };

  return (
    <div className={styles.list}>
      <div className={styles.list__header}>
        <span className={styles.list__title}>{t(`TRANSACTION_TYPE.${transactionType}`)}</span>
        <button type='button' onClick={() => handleNewCategory()}>
          <Icon name='plus' width={20} height={20} fill='var(--gold-dark)' />
        </button>
      </div>
      {categories.length > 0 ? (
        categories.map(category => {
          return (
            <div
              key={category.category_name}
              className={styles.list__category}
              onClick={() => handleOpenCategory(category)}
              onKeyDown={() => {}}
              role='button'
              tabIndex={0}
            >
              <div className={styles.list__categoryname}>
                <Icon name='chevron-top' width={24} height={24} fill='var(--gold-darker)' />
                <span className={styles.list__label}>{category.category_name}</span>
                <Fill />
                <div className={styles.list__buttons}>
                  <button type='button' onClick={e => handleDeleteCategory(e, category)}>
                    <Icon name='trash' width={20} height={20} fill='var(--gold-darker)' />
                  </button>
                  <button type='button' onClick={e => handleEditCategory(e, category)}>
                    <Icon name='edit' width={20} height={20} fill='var(--gold-darker)' />
                  </button>
                  <button type='button' onClick={e => handleNewSubcategory(e, category)}>
                    <Icon name='plus' width={20} height={20} fill='var(--gold-darker)' />
                  </button>
                </div>
              </div>
              {isCategoryOpened(category) ? (
                <div className={styles.list__subcategories}>
                  {subcategories.filter(subcategory => subcategory.category_name === openedCategory.category_name)?.length > 0 ? (
                    subcategories
                      .filter(subcategory => subcategory.category_name === openedCategory.category_name)
                      .map(subcategory => {
                        return (
                          <div className={styles.list__subcategory}>
                            <span className={styles.list__label}>
                              {subcategory.subcategory_name} - {t(`SUBCATEGORIES.COSTING.${costingTypes[subcategory.costing]}`)}
                            </span>
                            <Fill />
                            <div className={styles.list__buttons}>
                              <button type='button' onClick={e => handleDeleteSubcategory(e, subcategory)}>
                                <Icon name='trash' width={16} height={16} fill='var(--gold-darker)' />
                              </button>
                              <button type='button' onClick={e => handleEditSubcategory(e, subcategory)}>
                                <Icon name='edit' width={16} height={16} fill='var(--gold-darker)' />
                              </button>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <span className={styles.list__empty}>{t('SUBCATEGORIES.EMPTY')}</span>
                  )}
                </div>
              ) : null}
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
