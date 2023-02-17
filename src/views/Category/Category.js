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
import EditCategory from './EditCategory/EditCategory';
import List from './List/List';

import styles from './Category.module.scss';

const Category = () => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      </div>
      <Fill />
      <div className={styles.category__list}>
        <List
          transactionType={transactionTypes.INCOME}
          categories={categories.filter(category => category.transaction_type === transactionTypes.INCOME)}
          setIsDeleteCategoryModalVisible={setIsDeleteCategoryModalVisible}
          setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
          setSelectedCategory={setSelectedCategory}
        />
        <List
          transactionType={transactionTypes.EXPENSE}
          categories={categories.filter(category => category.transaction_type === transactionTypes.EXPENSE)}
          setIsDeleteCategoryModalVisible={setIsDeleteCategoryModalVisible}
          setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
          setSelectedCategory={setSelectedCategory}
        />
        <List
          transactionType={transactionTypes.INVESTIMENT}
          categories={categories.filter(category => category.transaction_type === transactionTypes.INVESTIMENT)}
          setIsDeleteCategoryModalVisible={setIsDeleteCategoryModalVisible}
          setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
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
    </div>
  );
};

export default Category;
