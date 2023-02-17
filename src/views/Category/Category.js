import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import transactionTypes from 'constants/transactionTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import categoryService from 'services/category.service';
import subcategoryService from 'services/subcategory.service';

import Fill from 'components/Fill/Fill';
import Icon from 'components/Icon/Icon';

import DeleteCategory from './DeleteCategory/DeleteCategory';
import DeleteSubcategory from './DeleteSubcategory/DeleteSubcategory';
import EditCategory from './EditCategory/EditCategory';
import EditSubcategory from './EditSubcategory/EditSubcategory';
import List from './List/List';
import NewCategory from './NewCategory/NewCategory';
import NewSubcategory from './NewSubcategory/NewSubcategory';

import styles from './Category.module.scss';

const Category = () => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [openedCategory, setOpenedCategory] = useState(null);

  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);
  const [newCategoryType, setNewCategoryType] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState(null);
  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isNewSubcategoryModalVisible, setIsNewSubcategoryModalVisible] = useState(false);
  const [newSubcategoryType, setNewSubcategoryType] = useState(null);
  const [newSubcategoryCategory, setNewSubcategoryCategory] = useState(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState(null);
  const [newSubcategoryCosting, setNewSubcategoryCosting] = useState(null);
  const [isDeleteSubcategoryModalVisible, setIsDeleteSubcategoryModalVisible] = useState(false);
  const [isEditSubcategoryModalVisible, setIsEditSubcategoryModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    await categoryService
      .listCategory({ handleError })
      .then(data => {
        setCategories(data);
      })
      .catch(() => {
        addToast({
          content: t('CATEGORIES.FETCH.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchSubcategories = async () => {
    setIsLoading(true);
    await subcategoryService
      .listSubcategory({
        handleError,
      })
      .then(data => {
        setSubcategories(data);
      })
      .catch(() => {
        addToast({
          content: t('SUBCATEGORIES.FETCH.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.category}>
      <div className={styles.category__header}>
        <button type='button' onClick={() => navigate('/user')} className={styles.category__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.category__returnicon} />
        </button>
        <span className={styles.category__title}>{t('CATEGORIES')}</span>
        <Fill />
        <button type='button' onClick={() => setIsNewCategoryModalVisible(true)}>
          <Icon name='plus' width={24} height={24} fill='white' />
        </button>
      </div>
      <Fill />
      <div className={styles.category__list}>
        <List
          transactionType={transactionTypes.INCOME}
          categories={categories.filter(category => category.transaction_type === transactionTypes.INCOME)}
          subcategories={subcategories}
          openedCategory={openedCategory}
          setOpenedCategory={setOpenedCategory}
          setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
          setNewCategoryType={setNewCategoryType}
          setIsDeleteCategoryModalVisible={setIsDeleteCategoryModalVisible}
          setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
          setSelectedCategory={setSelectedCategory}
          setIsNewSubcategoryModalVisible={setIsNewSubcategoryModalVisible}
          setNewSubcategoryType={setNewSubcategoryType}
          setNewSubcategoryCategory={setNewSubcategoryCategory}
          setIsDeleteSubcategoryModalVisible={setIsDeleteSubcategoryModalVisible}
          setIsEditSubcategoryModalVisible={setIsEditSubcategoryModalVisible}
          setSelectedSubcategory={setSelectedSubcategory}
        />
        <List
          transactionType={transactionTypes.EXPENSE}
          categories={categories.filter(category => category.transaction_type === transactionTypes.EXPENSE)}
          setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
          setNewCategoryType={setNewCategoryType}
          setIsDeleteCategoryModalVisible={setIsDeleteCategoryModalVisible}
          setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
          setSelectedCategory={setSelectedCategory}
          setIsNewSubcategoryModalVisible={setIsNewSubcategoryModalVisible}
          setNewSubcategoryType={setNewSubcategoryType}
          setNewSubcategoryCategory={setNewSubcategoryCategory}
          setIsDeleteSubcategoryModalVisible={setIsDeleteSubcategoryModalVisible}
          setIsEditSubcategoryModalVisible={setIsEditSubcategoryModalVisible}
          setSelectedSubcategory={setSelectedSubcategory}
        />
        <List
          transactionType={transactionTypes.INVESTIMENT}
          categories={categories.filter(category => category.transaction_type === transactionTypes.INVESTIMENT)}
          setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
          setNewCategoryType={setNewCategoryType}
          setIsDeleteCategoryModalVisible={setIsDeleteCategoryModalVisible}
          setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
          setSelectedCategory={setSelectedCategory}
          setIsNewSubcategoryModalVisible={setIsNewSubcategoryModalVisible}
          setNewSubcategoryType={setNewSubcategoryType}
          setNewSubcategoryCategory={setNewSubcategoryCategory}
          setIsDeleteSubcategoryModalVisible={setIsDeleteSubcategoryModalVisible}
          setIsEditSubcategoryModalVisible={setIsEditSubcategoryModalVisible}
          setSelectedSubcategory={setSelectedSubcategory}
        />
      </div>
      <NewCategory
        isNewCategoryModalVisible={isNewCategoryModalVisible}
        setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
        newCategoryType={newCategoryType}
        setNewCategoryType={setNewCategoryType}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        fetchCategories={fetchCategories}
      />
      <DeleteCategory
        isDeleteCategoryModalVisible={isDeleteCategoryModalVisible}
        setIsDeleteCategoryModalVisible={setIsDeleteCategoryModalVisible}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <EditCategory
        isEditCategoryModalVisible={isEditCategoryModalVisible}
        setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <NewSubcategory
        isNewSubcategoryModalVisible={isNewSubcategoryModalVisible}
        setIsNewSubcategoryModalVisible={setIsNewSubcategoryModalVisible}
        newSubcategoryType={newSubcategoryType}
        setNewSubcategoryType={setNewSubcategoryType}
        categories={categories}
        newSubcategoryCategory={newSubcategoryCategory}
        setNewSubcategoryCategory={setNewSubcategoryCategory}
        newSubcategoryName={newSubcategoryName}
        setNewSubcategoryName={setNewSubcategoryName}
        newSubcategoryCosting={newSubcategoryCosting}
        setNewSubcategoryCosting={setNewSubcategoryCosting}
        fetchSubcategories={fetchSubcategories}
      />
      <DeleteSubcategory
        isDeleteSubcategoryModalVisible={isDeleteSubcategoryModalVisible}
        setIsDeleteSubcategoryModalVisible={setIsDeleteSubcategoryModalVisible}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
      <EditSubcategory
        isEditSubcategoryModalVisible={isEditSubcategoryModalVisible}
        setIsEditSubcategoryModalVisible={setIsEditSubcategoryModalVisible}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
    </div>
  );
};

export default Category;
