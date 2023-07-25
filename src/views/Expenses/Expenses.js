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

import styles from './Expenses.module.scss';

const Expenses = () => {
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
    <div className={styles.expenses}>
      <div className={styles.expenses__header}>
        <button type='button' onClick={() => navigate('/settings')} className={styles.expenses__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.expenses__returnicon} />
        </button>
        <span className={styles.expenses__title}>{t('EXPENSES')}</span>
        <Fill />
        <button type='button' onClick={() => setIsNewCategoryModalVisible(true)}>
          <Icon name='plus' width={24} height={24} fill='white' />
        </button>
      </div>
      <Fill />
      {showTemplate ? (
        <Template fetchCategories={fetchCategories} fetchSubcategories={fetchSubcategories} fetchAssets={fetchAssets} />
      ) : (
        <div className={styles.expenses__list}>
          <List
            transactionType={transactionTypes.EXPENSE}
            categories={categories.filter(item => item.transaction_type === transactionTypes.EXPENSE)}
            subcategories={subcategories.filter(item => item.transaction_type === transactionTypes.EXPENSE)}
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
        transactionType={transactionTypes.EXPENSE}
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
        subcategories={subcategories.filter(item => item.transaction_type === transactionTypes.EXPENSE)}
        fetchCategories={fetchCategories}
      />
      <NewSubcategory
        isNewSubcategoryModalVisible={isNewSubcategoryModalVisible}
        setIsNewSubcategoryModalVisible={setIsNewSubcategoryModalVisible}
        category={category}
        setCategory={setCategory}
        categories={categories.filter(item => item.transaction_type === transactionTypes.EXPENSE)}
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

export default Expenses;
