import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import transactionTypes from 'constants/transactionTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import { useTransactions } from 'hooks/useTransactions';
import incomeService from 'services/income.service';

import Button from 'components/Button';
import Calendar from 'components/Calendar';
import Categories from 'components/Categories';
import Fill from 'components/Fill';
import Icon from 'components/Icon';
import Observation from 'components/Observation';
import Subcategories from 'components/Subcategories';
import Value from 'components/Value';

import styles from './Income.module.scss';

const Income = () => {
  const { addToast } = useNotification();
  const { fetchTransactions } = useTransactions();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // const [accumulated, setAccumulated] = useState(false);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [observation, setObservation] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [value, setValue] = useState((0).toFixed(2));
  // const [continueAdding, setContinueAdding] = useState(false); todo

  const cleanForms = () => {
    setCategory('');
    setDate('');
    setObservation('');
    setSubcategory('');
    setValue((0).toFixed(2));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await incomeService
      .create({
        subcategory,
        date,
        value,
        observation,
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('INCOME.CREATE.SUCCESS'),
          type: 'success',
        });
        cleanForms();
        await fetchTransactions();
      })
      .catch(() => {
        addToast({
          content: t('INCOME.CREATE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.income}>
      <div className={styles.income__header}>
        <button type='button' onClick={() => navigate('/add')} className={styles.income__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.income__returnicon} />
        </button>
        <span className={styles.income__title}>{t('INCOME.ADD')}</span>
      </div>
      <Fill />
      <div className={styles.income__form}>
        {/* todo: acumulado */}
        <Calendar date={date} setDate={setDate} />
        <Categories category={category} setCategory={setCategory} setSubcategory={setSubcategory} transactionType={transactionTypes.INCOME} />
        <Subcategories category={category} subcategory={subcategory} setSubcategory={setSubcategory} />
        <Value value={value} setValue={setValue} />
        <Observation observation={observation} setObservation={setObservation} />
        <Fill />
        <Button type='button' size='lg' kind='primary' onClick={() => handleSubmit()} disabled={isLoading}>
          {t('INCOME.ADD')}
        </Button>
        {/* todo: adicionar radio button para adicionar nova receita após submeter */}
      </div>
    </div>
  );
};

export default Income;
