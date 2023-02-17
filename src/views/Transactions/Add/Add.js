import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import transactionService from 'services/transaction.service';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';

import Calendar from './Calendar/Calendar';
import Categories from './Categories/Categories';
import Confirm from './Confirm/Confirm';
import Observation from './Observation/Observation';
import Subcategories from './Subcategories/Subcategories';
import TransactionType from './TransactionType/TransactionType';
import Value from './Value/Value';

import styles from './Add.module.scss';

const Add = ({
  isAddTransactionFormOpened,
  setIsAddTransactionFormOpened,
  fetchTransactions,
  fetchCategories,
  categories,
  fetchSubcategories,
  subcategories,
  setIsFiltersTabOpened,
}) => {
  const { t } = useTranslation();
  const { addToast } = useNotification();
  const { setIsLoading } = useLoader();

  const [transactionType, setTransactionType] = useState('');
  const [step, setStep] = useState(steps.DATE);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionValue, setTransactionValue] = useState((0).toFixed(2));
  const [transactionObservation, setTransactionObservation] = useState('');

  const [showForms, setShowForms] = useState(false);

  const cleanForms = () => {
    setIsAddTransactionFormOpened(false);
    setTransactionType('');
    setStep(steps.DATE);
    setSelectedCategory('');
    setSelectedSubcategory('');
    setTransactionDate('');
    setTransactionValue((0).toFixed(2));
    setTransactionObservation('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await transactionService
      .createTransaction({
        transactionType,
        categoryName: selectedCategory,
        subcategoryName: selectedSubcategory,
        transactionDate,
        transactionValue,
        transactionObservation,
      })
      .then(() => {
        fetchTransactions();
        addToast({
          content: t('TRANSACTIONS.CREATE.SUCCESS'),
          type: 'success',
        });
      })
      .catch(() => {
        addToast({
          content: t('TRANSACTIONS.CREATE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setShowForms(false);
        setIsLoading(false);
        setTimeout(() => {
          cleanForms();
        }, [100]);
      });
  };

  useEffect(() => {
    if (showForms)
      setTimeout(() => {
        setIsAddTransactionFormOpened(true);
        setIsFiltersTabOpened(false);
      }, [200]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showForms]);

  return (
    <>
      {showForms && (
        <Button
          type='button'
          kind='outline'
          className={`${styles.add__close} ${isAddTransactionFormOpened ? '' : styles.hidden}`}
          onClick={() => {
            setShowForms(false);
            cleanForms();
          }}
        >
          <Icon name='close' width={24} height={24} fill='var(--gold-darkest)' />
        </Button>
      )}
      {showForms && (
        <div className={`${styles.add} ${isAddTransactionFormOpened ? '' : styles.hidden}`}>
          <Calendar transactionDate={transactionDate} setTransactionDate={setTransactionDate} setStep={setStep} />
          <TransactionType
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            setSelectedCategory={setSelectedCategory}
            setSelectedSubcategory={setSelectedSubcategory}
            step={step}
            setStep={setStep}
          />
          <Categories
            categories={categories.filter(category => category.transaction_type === transactionType)}
            fetchCategories={fetchCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedSubcategory={setSelectedSubcategory}
            step={step}
            setStep={setStep}
            transactionType={transactionType}
          />
          <Subcategories
            category={selectedCategory}
            fetchSubcategories={fetchSubcategories}
            subcategories={subcategories.filter(subcategory => subcategory.category_name === selectedCategory)}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            step={step}
            setStep={setStep}
            transactionType={transactionType}
          />
          <Value transactionValue={transactionValue} setTransactionValue={setTransactionValue} step={step} setStep={setStep} />
          <Observation
            transactionObservation={transactionObservation}
            setTransactionObservation={setTransactionObservation}
            step={step}
            setStep={setStep}
          />
          <Confirm
            step={step}
            handleSubmit={handleSubmit}
            disabled={
              transactionType === '' ||
              transactionDate === '' ||
              selectedCategory === '' ||
              selectedSubcategory === '' ||
              transactionValue === (0).toFixed(2)
            }
          />
        </div>
      )}
      <Button
        type='button'
        kind='primary'
        className={`${styles.add__button} ${isAddTransactionFormOpened ? styles.add__button__isopened : ''}`}
        onClick={() => setShowForms(true)}
      >
        <Icon name='plus' width={24} height={24} fill='var(--gold-lightest)' />
      </Button>
    </>
  );
};

export default Add;
