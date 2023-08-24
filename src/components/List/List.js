import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import costingTypes from 'constants/costingTypes';
import transactionTypes from 'constants/transactionTypes';

import Fill from 'components/Fill';
import Icon from 'components/Icon';

import styles from './List.module.scss';

const List = ({
  transactionType,
  categories = [],
  subcategories = [],
  assets = [],
  handleEditCategory,
  handleDeleteCategory,
  handleNewSubcategory,
  handleEditSubcategory,
  handleDeleteSubcategory,
  handleNewAsset,
  handleEditAsset,
  handleDeleteAsset,
}) => {
  const { t } = useTranslation();

  const [openedSubcategory, setOpenedSubcategory] = useState(null);

  const isSubcategoryOpened = id => {
    if (openedSubcategory === id) return true;
    return false;
  };

  const handleOpenSubcategory = subcategoryId => {
    if (transactionType !== transactionTypes.INVESTIMENT) return;
    if (isSubcategoryOpened(subcategoryId)) setOpenedSubcategory(null);
    else setOpenedSubcategory(subcategoryId);
  };

  return (
    <>
      {categories.length > 0
        ? categories.map(category => {
            return (
              <div key={category.category_id} className={styles.list}>
                <div className={styles.list__header}>
                  <div className={styles.list__title}>
                    <span className={styles.list__titleLabel}>{t('CATEGORY')}</span>
                    <span className={styles.list__titleValue}>{category.category_name}</span>
                  </div>
                  <div className={styles.list__buttons}>
                    <button type='button' onClick={() => handleDeleteCategory(category)}>
                      <Icon name='trash' width={20} height={20} fill='var(--gold-darker)' />
                    </button>
                    <button type='button' onClick={() => handleEditCategory(category)}>
                      <Icon name='edit' width={20} height={20} fill='var(--gold-darker)' />
                    </button>
                    <button type='button' onClick={() => handleNewSubcategory(category)}>
                      <Icon name='plus' width={20} height={20} fill='var(--gold-darker)' />
                    </button>
                  </div>
                </div>
                {subcategories?.filter(subcategory => subcategory.category_id === category.id)?.length > 0 ? (
                  subcategories
                    ?.filter(subcategory => subcategory.category_id === category.id)
                    ?.map(subcategory => {
                      return (
                        <div
                          key={subcategory.id}
                          className={styles.list__subcategory}
                          onClick={() => handleOpenSubcategory(subcategory.id)}
                          onKeyDown={() => {}}
                          role='button'
                          tabIndex={0}
                        >
                          <div className={styles.list__subcategoryHeader}>
                            {transactionType === transactionTypes.INVESTIMENT && (
                              <Icon
                                name='chevron-top'
                                width={24}
                                height={24}
                                fill='var(--gold-darker)'
                                className={`${styles.list__icon} ${isSubcategoryOpened(subcategory.id) ? styles.list__opened : ''}`}
                              />
                            )}
                            <div className={styles.list__subcategoryTitle}>
                              <span className={styles.list__subcategoryTitleLabel}>{t('SUBCATEGORY')}</span>
                              <span className={styles.list__subcategoryTitleValue}>{subcategory.subcategory_name}</span>
                              {transactionType === transactionTypes.EXPENSE && (
                                <span className={styles.list__subcategoryTitleLabel}>{t(`SUBCATEGORIES.COSTING.${costingTypes[subcategory.costing]}`)}</span>
                              )}
                            </div>
                            <Fill />
                            <div className={styles.list__buttons}>
                              <button type='button' onClick={e => handleDeleteSubcategory(e, subcategory)}>
                                <Icon name='trash' width={20} height={20} fill='var(--gold-darker)' />
                              </button>
                              <button type='button' onClick={e => handleEditSubcategory(e, subcategory)}>
                                <Icon name='edit' width={20} height={20} fill='var(--gold-darker)' />
                              </button>
                              {transactionType === transactionTypes.INVESTIMENT && (
                                <button type='button' onClick={e => handleNewAsset(e, category, subcategory)}>
                                  <Icon name='plus' width={20} height={20} fill='var(--gold-darker)' />
                                </button>
                              )}
                            </div>
                          </div>
                          {transactionType === transactionTypes.INVESTIMENT && isSubcategoryOpened(subcategory.id) ? (
                            <div className={styles.list__assets}>
                              {assets?.filter(asset => asset.subcategory_id === openedSubcategory)?.length > 0 ? (
                                assets
                                  ?.filter(asset => asset.subcategory_id === openedSubcategory)
                                  ?.map(asset => {
                                    return (
                                      <div key={asset.id} className={styles.list__asset}>
                                        <div className={styles.list__assetTitle}>
                                          <span className={styles.list__assetTitleLabel}>{t('ASSET')}</span>
                                          <span className={styles.list__assetTitleValue}>{asset.name}</span>
                                          <span className={styles.list__assetTitleLabel}>{t(`ASSETS.${asset.quantifiable}`)}</span>
                                        </div>
                                        <Fill />
                                        <div className={styles.list__buttons}>
                                          <button type='button' onClick={e => handleDeleteAsset(e, asset)}>
                                            <Icon name='trash' width={16} height={16} fill='var(--gold-darker)' />
                                          </button>
                                          <button type='button' onClick={e => handleEditAsset(e, asset)}>
                                            <Icon name='edit' width={16} height={16} fill='var(--gold-darker)' />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })
                              ) : (
                                <span className={styles.list__empty}>{t('ASSETS.EMPTY')}</span>
                              )}
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                ) : (
                  <span className={styles.list__empty}>{t('SUBCATEGORIES.EMPTY')}</span>
                )}
              </div>
            );
          })
        : null}
    </>
  );
};

export default List;
