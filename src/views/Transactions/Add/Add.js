import React, { useEffect, useState } from 'react';

import steps from 'constants/steps';
import { useAuth } from 'hooks/useAuth';
import categoryService from 'services/category.service';
import subcategoryService from 'services/subcategory.service';
import transactionService from 'services/transaction.service';

import Calendar from 'components/Calendar/Calendar';
import Categories from 'components/Categories/Categories';
import Confirm from 'components/Confirm/Confirm';
import Observation from 'components/Observation/Observation';
import Subcategories from 'components/Subcategories/Subcategories';
import TransactionType from 'components/TransactionType/TransactionType';
import Value from 'components/Value/Value';

import styles from './Add.module.scss';

const Add = ({ isAddTransactionFormOpened, setIsAddTransactionFormOpened, fetchTransactions }) => {
  const { handleError } = useAuth();

  const [transactionType, setTransactionType] = useState('');
  const [step, setStep] = useState(steps.TYPE);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionValue, setTransactionValue] = useState(0);
  const [transactionObservation, setTransactionObservation] = useState('');

  const [showForms, setShowForms] = useState(false);

  const fetchCategories = async () => {
    await categoryService
      .listCategory({ transactionType, handleError })
      .then(data => {
        setCategories(data);
      })
      .catch()
      .finally();
  };

  useEffect(() => {
    if (transactionType) fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionType]);

  const fetchSubcategories = async () => {
    await subcategoryService
      .listSubcategory({
        transactionType,
        categoryName: selectedCategory,
        handleError,
      })
      .then(data => {
        setSubcategories(data);
      })
      .catch()
      .finally();
  };

  useEffect(() => {
    if (selectedCategory) fetchSubcategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionType, selectedCategory]);

  const handleSubmit = async e => {
    e.preventDefault();
    await transactionService
      .createTransaction({
        transactionType,
        categoryName: selectedCategory,
        subcategoryName: selectedSubcategory,
        transactionDate,
        transactionValue,
        transactionObservation,
      })
      .then(data => {
        console.log(data);
      })
      .catch()
      .finally(() => {
        fetchTransactions();
        setShowForms(false);
        setTimeout(() => {
          setIsAddTransactionFormOpened(false);
          setTransactionType('');
          setStep(steps.TYPE);
          setSelectedCategory('');
          setSelectedSubcategory('');
          setTransactionDate('');
          setTransactionValue('');
          setTransactionObservation('');
        }, [100]);
      });
  };

  useEffect(() => {
    if (showForms)
      setTimeout(() => {
        setIsAddTransactionFormOpened(true);
      }, [200]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showForms]);

  return (
    <>
      {showForms && (
        <form className={`${styles.add} ${isAddTransactionFormOpened ? '' : styles.hidden}`} onSubmit={e => handleSubmit(e)}>
          <TransactionType transactionType={transactionType} setTransactionType={setTransactionType} setStep={setStep} />
          <Calendar transactionDate={transactionDate} setTransactionDate={setTransactionDate} step={step} setStep={setStep} />
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            step={step}
            setStep={setStep}
          />
          <Subcategories
            subcategories={subcategories}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            step={step}
            setStep={setStep}
          />
          <Value transactionValue={transactionValue} setTransactionValue={setTransactionValue} step={step} setStep={setStep} />
          <Observation
            transactionObservation={transactionObservation}
            setTransactionObservation={setTransactionObservation}
            step={step}
            setStep={setStep}
          />
          <Confirm step={step} />
        </form>
      )}
      <button
        type='button'
        className={`${styles.add__button} ${isAddTransactionFormOpened ? styles.add__button__isopened : ''}`}
        onClick={() => setShowForms(true)}
      >
        +
      </button>
    </>
  );
};

export default Add;
