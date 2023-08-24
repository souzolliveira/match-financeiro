import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import transactionTypes from 'constants/transactionTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import { useTransactions } from 'hooks/useTransactions';
import investimentService from 'services/investiment.service';

import Button from 'components/Button';
import Calendar from 'components/Calendar';
import Categories from 'components/Categories';
import Fill from 'components/Fill';
import Icon from 'components/Icon';
import Observation from 'components/Observation';
import Subcategories from 'components/Subcategories';
import Value from 'components/Value';

import styles from './Investiment.module.scss';

const Investiment = () => {
  const { addToast } = useNotification();
  const { fetchTransactions } = useTransactions();
  const { handleError } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // const [accumulated, setAccumulated] = useState(false);
  const [asset, setAsset] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [observation, setObservation] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [subcategory, setSubcategory] = useState('');
  const [total, setTotal] = useState(parseFloat(0).toFixed(2));
  const [unitaryValue, setUnitaryValue] = useState(parseFloat(0).toFixed(2));
  // const [continueAdding, setContinueAdding] = useState(false); todo

  const cleanForms = () => {
    setAsset('');
    setCategory('');
    setDate('');
    setObservation('');
    setQuantity(0);
    setUnitaryValue(parseFloat(0).toFixed(2));
    setSubcategory('');
    setTotal(parseFloat(0).toFixed(2));
    setUnitaryValue(parseFloat(0).toFixed(2));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await investimentService
      .create({
        asset,
        quantity,
        unitaryValue,
        total,
        date,
        observation,
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('INVESTIMENT.CREATE.SUCCESS'),
          type: 'success',
        });
        cleanForms();
        await fetchTransactions();
      })
      .catch(() => {
        addToast({
          content: t('INVESTIMENT.CREATE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.investiment}>
      <div className={styles.investiment__header}>
        <button type='button' onClick={() => navigate('/add')} className={styles.investiment__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.investiment__returnicon} />
        </button>
        <span className={styles.investiment__title}>{t('INVESTIMENT.ADD')}</span>
      </div>
      <Fill />
      <div className={styles.investiment__form}>
        {/* todo: acumulado */}
        <Calendar date={date} setDate={setDate} />
        <Categories category={category} setCategory={setCategory} setSubcategory={setSubcategory} transactionType={transactionTypes.INVESTIMENT} />
        <Subcategories category={category} subcategory={subcategory} setSubcategory={setSubcategory} />
        <Value value={total} setValue={setTotal} />
        <Observation observation={observation} setObservation={setObservation} />
        <Fill />
        <Button type='button' size='lg' kind='primary' onClick={() => handleSubmit()} disabled={isLoading}>
          {t('INVESTIMENT.ADD')}
        </Button>
        {/* todo: adicionar radio button para adicionar nova receita após submeter */}
      </div>
    </div>
  );
};

export default Investiment;
