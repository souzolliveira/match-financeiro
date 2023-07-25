import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import installmentTypes from 'constants/installmentTypes';
import transactionTypes from 'constants/transactionTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import { useTransactions } from 'hooks/useTransactions';
import expenseService from 'services/expense.service';

import Button from 'components/Button';
import Calendar from 'components/Calendar';
import Card from 'components/Card';
import Categories from 'components/Categories';
import Fill from 'components/Fill';
import Icon from 'components/Icon';
import Installments from 'components/Installments';
import Observation from 'components/Observation';
import Payment from 'components/Payment';
import Subcategories from 'components/Subcategories';
import Value from 'components/Value';

import styles from './Expense.module.scss';

const Expense = () => {
  const { addToast } = useNotification();
  const { fetchTransactions } = useTransactions();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // const [accumulated, setAccumulated] = useState(false);
  const [card, setCard] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [installments, setInstallments] = useState('');
  const [observation, setObservation] = useState('');
  const [payment, setPayment] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [value, setValue] = useState((0).toFixed(2));
  // const [continueAdding, setContinueAdding] = useState(false); todo

  const cleanForms = () => {
    setCard('');
    setCategory('');
    setDate('');
    setInstallments('');
    setObservation('');
    setPayment('');
    setSubcategory('');
    setValue(parseFloat(0).toFixed(2));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await expenseService
      .create({
        subcategory,
        date,
        payment,
        installments: installmentTypes.toServer[installmentTypes],
        card,
        value: parseFloat(value),
        observation,
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('EXPENSE.CREATE.SUCCESS'),
          type: 'success',
        });
        cleanForms();
        await fetchTransactions();
      })
      .catch(() => {
        addToast({
          content: t('EXPENSE.CREATE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.expense}>
      <div className={styles.expense__header}>
        <button type='button' onClick={() => navigate('/add')} className={styles.expense__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.expense__returnicon} />
        </button>
        <span className={styles.expense__title}>{t('EXPENSE.ADD')}</span>
      </div>
      <Fill />
      <div className={styles.expense__form}>
        {/* todo: acumulado */}
        <Calendar date={date} setDate={setDate} />
        <Categories
          category={category}
          setCategory={setCategory}
          setSubcategory={setSubcategory}
          transactionType={transactionTypes.EXPENSE}
        />
        <Subcategories category={category} subcategory={subcategory} setSubcategory={setSubcategory} />
        <Value value={value} setValue={setValue} />
        <Payment payment={payment} setPayment={setPayment} setCard={setCard} setInstallments={setInstallments} />
        <Card payment={payment} card={card} setCard={setCard} />
        <Installments payment={payment} installments={installments} setInstallments={setInstallments} />
        <Observation observation={observation} setObservation={setObservation} />
        <Fill />
        <Button type='button' size='lg' kind='primary' onClick={() => handleSubmit()} disabled={isLoading}>
          {t('EXPENSE.ADD')}
        </Button>
        {/* todo: adicionar radio button para adicionar nova receita após submeter */}
      </div>
    </div>
  );
};

export default Expense;
