import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import transactionTypes from 'constants/transactionTypes';
import { useTransactions } from 'hooks/useTransactions';

import Template from 'views/Category/Template/Template';

import DeleteCategory from 'components/DeleteCategory';
import DeleteSubcategory from 'components/DeleteSubcategory';
import EditCategory from 'components/EditCategory';
import EditSubcategory from 'components/EditSubcategory';
import Fill from 'components/Fill';
import Icon from 'components/Icon';
import List from 'components/List';
import NewAsset from 'components/NewAsset';
import NewCategory from 'components/NewCategory';
import NewSubcategory from 'components/NewSubcategory';

import styles from './Investiments.module.scss';

const Investiments = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { categories, fetchCategories, subcategories, fetchSubcategories, assets, fetchAssets, transactions } = useTransactions();

  const [showTemplate, setShowTemplate] = useState(false);

  const [category, setCategory] = useState({});
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] = useState(false);

  const [subcategory, setSubcategory] = useState({});
  const [isNewSubcategoryModalVisible, setIsNewSubcategoryModalVisible] = useState(false);
  const [isEditSubcategoryModalVisible, setIsEditSubcategoryModalVisible] = useState(false);
  const [isDeleteSubcategoryModalVisible, setIsDeleteSubcategoryModalVisible] = useState(false);

  const [asset, setAsset] = useState({});
  const [isNewAssetModalVisible, setIsNewAssetModalVisible] = useState(false);
  const [isEditAssetModalVisible, setIsEditAssetModalVisible] = useState(false);
  const [isDeleteAssetModalVisible, setIsDeleteAssetModalVisible] = useState(false);

  const handleEditCategory = selectedCategory => {
    setCategory(selectedCategory);
    setIsEditCategoryModalVisible(true);
  };

  const handleDeleteCategory = selectedCategory => {
    setCategory(selectedCategory);
    setIsDeleteCategoryModalVisible(true);
  };

  const handleNewSubcategory = selectedCategory => {
    setCategory(selectedCategory);
    setIsNewSubcategoryModalVisible(true);
  };

  const handleEditSubcategory = (e, selectedSubcategory) => {
    e.stopPropagation();
    setSubcategory(selectedSubcategory);
    setIsEditSubcategoryModalVisible(true);
  };

  const handleDeleteSubcategory = (e, selectedSubcategory) => {
    e.stopPropagation();
    setSubcategory(selectedSubcategory);
    setIsDeleteSubcategoryModalVisible(true);
  };

  const handleNewAsset = (e, selectedCategory, selectedSubcategory) => {
    e.stopPropagation();
    setCategory(selectedCategory);
    setSubcategory(selectedSubcategory);
    setIsNewAssetModalVisible(true);
  };

  // TODO
  const handleEditAsset = (e, selectedAsset) => {
    e.stopPropagation();
    setAsset(selectedAsset);
    setIsEditAssetModalVisible(true);
  };

  // TODO
  const handleDeleteAsset = (e, selectedAsset) => {
    e.stopPropagation();
    setAsset(selectedAsset);
    setIsDeleteAssetModalVisible(true);
  };

  return (
    <div className={styles.investiments}>
      <div className={styles.investiments__header}>
        <button type='button' onClick={() => navigate('/settings')} className={styles.investiments__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.investiments__returnicon} />
        </button>
        <span className={styles.investiments__title}>{t('INVESTIMENTS')}</span>
        <Fill />
        <button type='button' onClick={() => setIsNewCategoryModalVisible(true)}>
          <Icon name='plus' width={24} height={24} fill='white' />
        </button>
      </div>
      <Fill />
      {showTemplate ? (
        <Template fetchCategories={fetchCategories} fetchSubcategories={fetchSubcategories} fetchAssets={fetchAssets} />
      ) : (
        <div className={styles.investiments__list}>
          <List
            transactionType={transactionTypes.INVESTIMENT}
            categories={categories.filter(item => item.transaction_type === transactionTypes.INVESTIMENT)}
            subcategories={subcategories.filter(item => item.transaction_type === transactionTypes.INVESTIMENT)}
            assets={assets}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
            handleNewSubcategory={handleNewSubcategory}
            handleEditSubcategory={handleEditSubcategory}
            handleDeleteSubcategory={handleDeleteSubcategory}
            handleNewAsset={handleNewAsset}
            handleEditAsset={handleEditAsset}
            handleDeleteAsset={handleDeleteAsset}
          />
        </div>
      )}
      <NewCategory
        isNewCategoryModalVisible={isNewCategoryModalVisible}
        setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
        transactionType={transactionTypes.INVESTIMENT}
      />
      <EditCategory
        isEditCategoryModalVisible={isEditCategoryModalVisible}
        setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
        category={category}
        setCategory={setCategory}
        fetchCategories={fetchCategories}
      />
      <DeleteCategory
        isDeleteCategoryModalVisible={isDeleteCategoryModalVisible}
        setIsDeleteCategoryModalVisible={setIsDeleteCategoryModalVisible}
        category={category}
        setCategory={setCategory}
        subcategories={subcategories.filter(item => item.transaction_type === transactionTypes.INVESTIMENT)}
        fetchCategories={fetchCategories}
      />
      <NewSubcategory
        isNewSubcategoryModalVisible={isNewSubcategoryModalVisible}
        setIsNewSubcategoryModalVisible={setIsNewSubcategoryModalVisible}
        category={category}
        setCategory={setCategory}
        categories={categories.filter(item => item.transaction_type === transactionTypes.INVESTIMENT)}
        fetchSubcategories={fetchSubcategories}
      />
      <EditSubcategory
        isEditSubcategoryModalVisible={isEditSubcategoryModalVisible}
        setIsEditSubcategoryModalVisible={setIsEditSubcategoryModalVisible}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        fetchSubcategories={fetchSubcategories}
      />
      <DeleteSubcategory
        isDeleteSubcategoryModalVisible={isDeleteSubcategoryModalVisible}
        setIsDeleteSubcategoryModalVisible={setIsDeleteSubcategoryModalVisible}
        transactions={transactions}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        fetchSubcategories={fetchSubcategories}
      />
      <NewAsset
        isNewAssetModalVisible={isNewAssetModalVisible}
        setIsNewAssetModalVisible={setIsNewAssetModalVisible}
        category={category}
        setCategory={setCategory}
        categories={categories.filter(item => item.transaction_type === transactionTypes.INVESTIMENT)}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        subcategories={subcategories.filter(item => item.transaction_type === transactionTypes.INVESTIMENT)}
        fetchAssets={fetchAssets}
      />
      {/* <EditAsset
        isEditAssetModalVisible={isEditAssetModalVisible}
        setIsEditAssetModalVisible={setIsEditAssetModalVisible}
        asset={asset}
        setAsset={setAsset}
        fetchAssets={fetchAssets}
      />
      <DeleteAsset
        isDeleteAssetModalVisible={isDeleteAssetModalVisible}
        setIsDeleteAssetModalVisible={setIsDeleteAssetModalVisible}
        transactions={transactions}
        asset={asset}
        setAsset={setAsset}
        fetchAssets={fetchAssets}
      /> */}
    </div>
  );
};

export default Investiments;
