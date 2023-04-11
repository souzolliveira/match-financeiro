import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import transactionTypes from 'constants/transactionTypes';
import handleParams from 'helpers/handleParams';
import { useAuth } from 'hooks/useAuth';
import useDate from 'hooks/useDate';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import categoryService from 'services/category.service';
import subcategoryService from 'services/subcategory.service';
import transactionService from 'services/transaction.service';

import Fill from 'components/Fill/Fill';
import Icon from 'components/Icon/Icon';

import DeleteCategory from './DeleteCategory/DeleteCategory';
import DeleteSubcategory from './DeleteSubcategory/DeleteSubcategory';
import EditCategory from './EditCategory/EditCategory';
import EditSubcategory from './EditSubcategory/EditSubcategory';
import List from './List/List';
import NewCategory from './NewCategory/NewCategory';
import NewSubcategory from './NewSubcategory/NewSubcategory';
import Template from './Template/Template';

import styles from './Category.module.scss';

const Category = () => {
  const { formatDateFromFrontToAPI } = useDate();
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [openedCategory, setOpenedCategory] = useState('');

  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);
  const [newCategoryType, setNewCategoryType] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isNewSubcategoryModalVisible, setIsNewSubcategoryModalVisible] = useState(false);
  const [newSubcategoryType, setNewSubcategoryType] = useState('');
  const [newSubcategoryCategory, setNewSubcategoryCategory] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newSubcategoryCosting, setNewSubcategoryCosting] = useState('');
  const [isDeleteSubcategoryModalVisible, setIsDeleteSubcategoryModalVisible] = useState(false);
  const [isEditSubcategoryModalVisible, setIsEditSubcategoryModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [hasSubcategories, setHasSubcategories] = useState(false);
  const [hasTransactions, setHasTransactions] = useState(false);

  const [showTemplate, setShowTemplate] = useState(false);

  const fetchTransactions = async params => {
    setIsLoading(true);
    await transactionService
      .listTransactions({ params, handleError })
      .then(data => {
        setHasTransactions(!!data.data.length);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    await categoryService
      .listCategory({ handleError })
      .then(data => {
        setCategories(data);
        setShowTemplate(!!(data.length === 0));
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

  const handleDeleteCategory = (e, category) => {
    e.stopPropagation();
    setHasSubcategories(subcategories.filter(subcategory => subcategory.category_name === category.category_name)?.length > 0);
    setIsDeleteCategoryModalVisible(true);
    setSelectedCategory(category);
  };

  const handleDeleteSubcategory = async (e, subcategory) => {
    e.stopPropagation();
    await fetchTransactions(
      handleParams(
        {
          transactionType: subcategory?.transaction_type,
          category: subcategory?.category_name,
          subcategory: subcategory?.subcategory_name,
        },
        formatDateFromFrontToAPI
      )
    );
    setIsDeleteSubcategoryModalVisible(true);
    setSelectedSubcategory(subcategory);
  };

  return (
    <div className={styles.category}>
      <div className={styles.category__header}>
        <button type='button' onClick={() => navigate('/settings')} className={styles.category__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.category__returnicon} />
        </button>
        <span className={styles.category__title}>{t('CATEGORIES')}</span>
        <Fill />
        {!showTemplate && (
          <button type='button' onClick={() => setIsNewCategoryModalVisible(true)}>
            <Icon name='plus' width={24} height={24} fill='white' />
          </button>
        )}
      </div>
      <Fill />
      {showTemplate ? (
        <Template fetchCategories={fetchCategories} fetchSubcategories={fetchSubcategories} />
      ) : (
        <div className={styles.category__list}>
          {[transactionTypes.INCOME, transactionTypes.EXPENSE, transactionTypes.INVESTIMENT].map(transactionType => {
            return (
              <List
                key={transactionType}
                transactionType={transactionTypes[transactionType]}
                categories={categories.filter(category => category.transaction_type === transactionTypes[transactionType])}
                subcategories={subcategories}
                openedCategory={openedCategory}
                setOpenedCategory={setOpenedCategory}
                setIsNewCategoryModalVisible={setIsNewCategoryModalVisible}
                setNewCategoryType={setNewCategoryType}
                handleDeleteCategory={handleDeleteCategory}
                setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
                setSelectedCategory={setSelectedCategory}
                setIsNewSubcategoryModalVisible={setIsNewSubcategoryModalVisible}
                setNewSubcategoryType={setNewSubcategoryType}
                setNewSubcategoryCategory={setNewSubcategoryCategory}
                handleDeleteSubcategory={handleDeleteSubcategory}
                setIsEditSubcategoryModalVisible={setIsEditSubcategoryModalVisible}
                setSelectedSubcategory={setSelectedSubcategory}
              />
            );
          })}
        </div>
      )}
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
        fetchCategories={fetchCategories}
        hasSubcategories={hasSubcategories}
        setHasSubcategories={setHasSubcategories}
      />
      <EditCategory
        isEditCategoryModalVisible={isEditCategoryModalVisible}
        setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        fetchCategories={fetchCategories}
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
        fetchSubcategories={fetchSubcategories}
        hasTransactions={hasTransactions}
        setHasTransactions={setHasTransactions}
      />
      <EditSubcategory
        isEditSubcategoryModalVisible={isEditSubcategoryModalVisible}
        setIsEditSubcategoryModalVisible={setIsEditSubcategoryModalVisible}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
        fetchSubcategories={fetchSubcategories}
      />
    </div>
  );
};

export default Category;
