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
import NewCategory from 'components/NewCategory';
import NewSubcategory from 'components/NewSubcategory';

import styles from './Incomes.module.scss';

const Incomes = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { categories, fetchCategories, subcategories, fetchSubcategories, fetchAssets, transactions } = useTransactions();

  const [showTemplate, setShowTemplate] = useState(false);

  const [category, setCategory] = useState({});
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] = useState(false);

  const [subcategory, setSubcategory] = useState({});
  const [isNewSubcategoryModalVisible, setIsNewSubcategoryModalVisible] = useState(false);
  const [isEditSubcategoryModalVisible, setIsEditSubcategoryModalVisible] = useState(false);
  const [isDeleteSubcategoryModalVisible, setIsDeleteSubcategoryModalVisible] = useState(false);

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

  return (
    <div className={styles.incomes}>
      <div className={styles.incomes__header}>
        <button type='button' onClick={() => navigate('/settings')} className={styles.incomes__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.incomes__returnicon} />
        </button>
        <span className={styles.incomes__title}>{t('INCOMES')}</span>
        <Fill />
        <button type='button' onClick={() => setIsNewCategoryModalVisible(true)}>
          <Icon name='plus' width={24} height={24} fill='white' />
        </button>
      </div>
      <Fill />
      {showTemplate ? (
        <Template fetchCategories={fetchCategories} fetchSubcategories={fetchSubcategories} fetchAssets={fetchAssets} />
      ) : (
        <div className={styles.incomes__list}>
          <List
            transactionType={transactionTypes.INCOME}
            categories={categories.filter(item => item.transaction_type === transactionTypes.INCOME)}
            subcategories={subcategories.filter(item => item.transaction_type === transactionTypes.INCOME)}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
            handleNewSubcategory={handleNewSubcategory}
            handleEditSubcategory={handleEditSubcategory}
            handleDeleteSubcategory={handleDeleteSubcategory}
          />
        </div>
      )}
      <NewCategory
        isNewCategoryModalVisible={isNewCategoryModalVisible}
        setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
        transactionType={transactionTypes.INCOME}
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
        subcategories={subcategories.filter(item => item.transaction_type === transactionTypes.INCOME)}
        fetchCategories={fetchCategories}
      />
      <NewSubcategory
        isNewSubcategoryModalVisible={isNewSubcategoryModalVisible}
        setIsNewSubcategoryModalVisible={setIsNewSubcategoryModalVisible}
        category={category}
        setCategory={setCategory}
        categories={categories.filter(item => item.transaction_type === transactionTypes.INCOME)}
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
    </div>
  );
};

export default Incomes;
