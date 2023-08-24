import moment from 'moment';
import React, { useEffect, useState } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { useTranslation } from 'react-i18next';

import transactionTypes from 'constants/transactionTypes';
import bindTransactionTypeIcon from 'helpers/bindTransactionTypeIcon';
import bindTransactionTypeIconColor from 'helpers/bindTransactionTypeIconColor';
import { useAuth } from 'hooks/useAuth';
import useDate from 'hooks/useDate';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import useTime from 'hooks/useTime';
import { useTransactions } from 'hooks/useTransactions';
import transactionService from 'services/transaction.service';

import Button from 'components/Button';
import Fill from 'components/Fill';
import Icon from 'components/Icon';
import Input from 'components/Input';
import Select from 'components/Select';

import styles from './Details.module.scss';

const Details = ({ transaction, setShowDetails }) => {
  const { addToast } = useNotification();
  const { bindHour } = useTime();
  const { formatDateInFiltersInput, getDateFormat, formatDateFromAPIToFront } = useDate();
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();
  const { t } = useTranslation();
  const { categories, subcategories, fetchTransactions } = useTransactions();

  const transactionDefault = { ...transaction, transaction_date: transaction?.transaction_date?.split('T')?.[0] };

  const [isEditing, setIsEditing] = useState(false);
  const [transactionIntermediate, setTransactionIntermediate] = useState(transactionDefault);
  const [focused, setFocused] = useState(false);
  const [focusedDate, setFocusedDate] = useState(false);

  const handleEditTransaction = () => {
    setIsEditing(true);
  };

  const handleCancelEdition = () => {
    setIsEditing(false);
    setTransactionIntermediate(transactionDefault);
  };

  const handleSaveTransaction = () => {
    setIsLoading(true);
    transactionService
      .updateTransaction({
        transactionId: transactionIntermediate.id,
        transactionType: transactionIntermediate.transaction_type,
        categoryName: transactionIntermediate.categories_fk,
        subcategoryName: transactionIntermediate.subcategories_fk,
        transactionDate: transactionIntermediate.transaction_date,
        transactionValue: transactionIntermediate.value?.replace(',', '.'),
        transactionPayment: transactionIntermediate.transaction_payment,
        transactionObservation: transactionIntermediate.observation,
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('TRANSACTIONS.UPDATE.SUCCESS'),
          type: 'success',
        });
        await fetchTransactions();
        setShowDetails(false);
        setIsEditing(false);
      })
      .catch(() => {
        addToast({
          content: t('TRANSACTIONS.UPDATE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteTransaction = () => {
    setIsLoading(true);
    transactionService
      .deleteTransaction({
        transactionId: transaction.id,
        handleError,
      })
      .then(async () => {
        addToast({
          content: t('TRANSACTIONS.DELETE.SUCCESS'),
          type: 'success',
        });
        await fetchTransactions();
        setShowDetails(false);
      })
      .catch(() => {
        addToast({
          content: t('TRANSACTIONS.DELETE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleKeyDown = e => {
    if (focused)
      if (e.key === 'Backspace') {
        setTransactionIntermediate({
          ...transactionIntermediate,
          value: (parseFloat(transactionIntermediate.value) / 10).toFixed(2),
        });
      }
  };

  const date = dt => {
    if (dt && moment(dt, formatDateFromAPIToFront()).isValid()) {
      return moment(dt, formatDateFromAPIToFront());
    }
    return null;
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  if (isEditing) {
    return (
      <div className={styles.details}>
        <div className={styles.details__infos}>
          <span className={styles.details__date}>
            {`
              ${t('CREATED')}
              ${formatDateFromAPIToFront(transaction.date)}
              ${t('AT')}
              ${bindHour(transaction.date)}
            `}
          </span>
          <div className={styles.details__transactionType}>
            <Icon name={bindTransactionTypeIcon(transaction.transaction_type)} width={48} height={48} fill={bindTransactionTypeIconColor(transaction.transaction_type)} />
          </div>
          <Select
            className={styles.details__transactionTypeSelect}
            value={transactionIntermediate.transaction_type}
            onChange={e => {
              setTransactionIntermediate({
                ...transactionIntermediate,
                transaction_type: e.target.value,
                categories_fk: '',
                subcategories_fk: '',
              });
            }}
          >
            <option value={transactionTypes.INCOME}>{t('FILTERS.INCOMES')}</option>
            <option value={transactionTypes.EXPENSE}>{t('FILTERS.EXPENSES')}</option>
            <option value={transactionTypes.INVESTIMENT}>{t('FILTERS.INVESTIMENTS')}</option>
          </Select>
          <div className={styles.details__category}>
            <span className={styles.details__categoryLabel}>{t('CATEGORY')}</span>
            <Select
              value={transactionIntermediate.categories_fk}
              onChange={e => {
                setTransactionIntermediate({
                  ...transactionIntermediate,
                  categories_fk: e.target.value,
                  subcategories_fk: '',
                });
              }}
            >
              <option value=''>{t('SELECT')}</option>
              {categories
                ?.filter(category => category.transaction_type === transactionIntermediate.transaction_type)
                ?.map((item, index) => {
                  return (
                    <option key={index} value={item.category_name}>
                      {item.category_name}
                    </option>
                  );
                })}
            </Select>
          </div>
          <div className={styles.details__subcategory}>
            <span className={styles.details__subcategoryLabel}>{t('SUBCATEGORY')}</span>
            <Select
              value={transactionIntermediate.subcategories_fk}
              onChange={e => {
                setTransactionIntermediate({
                  ...transactionIntermediate,
                  subcategories_fk: e.target.value,
                });
              }}
            >
              <option value=''>{t('SELECT')}</option>
              {subcategories
                ?.filter(subcategory => subcategory.transaction_type === transactionIntermediate.transaction_type)
                ?.map((item, index) => {
                  return (
                    <option key={index} value={item.subcategory_name}>
                      {item.subcategory_name}
                    </option>
                  );
                })}
            </Select>
          </div>
          <div className={styles.details__observation}>
            <span className={styles.details__observationLabel}>{t('OBSERVATION')}</span>
            <Input
              className={styles.details__observationInput}
              type='text'
              name='transaction-observation'
              value={transactionIntermediate.observation}
              onChange={e =>
                setTransactionIntermediate({
                  ...transactionIntermediate,
                  observation: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.details__dateinput}>
            <SingleDatePicker
              id='date'
              placeholder={t(`FILTERS.DATE.${getDateFormat()}`)}
              date={date(transactionIntermediate.transaction_date)}
              onDateChange={dt =>
                setTransactionIntermediate(state => ({
                  ...state,
                  transaction_date: dt,
                }))
              }
              focused={focusedDate}
              onFocusChange={({ focused: dateFocus }) => setFocusedDate(dateFocus)}
              numberOfMonths={1}
              small
              showClearDate
              hideKeyboardShortcutsPanel
              isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
              initialVisibleMonth={() => moment()}
              displayFormat={formatDateInFiltersInput()}
              readOnly
            />
          </div>
          <div className={styles.details__value__inputcontainer}>
            <Input
              className={styles.details__value__input}
              type='number'
              name='transaction-value'
              value=''
              onInput={e => {
                if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseFloat(e.target.value))) {
                  setTransactionIntermediate({
                    ...transactionIntermediate,
                    value: (parseFloat(transactionIntermediate.value) * 10 + parseFloat(e.target.value) / 100).toFixed(2),
                  });
                }
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <div className={styles.details__value__showcontainer}>
              <span className={styles.details__value__show}>{transactionIntermediate.value.replace('.', ',')}</span>
              <div className={focused ? styles.details__value__cursor : ''} />
            </div>
          </div>
        </div>
        <Fill />
        <div className={styles.details__footer}>
          <div className={styles.details__buttonContainer}>
            <Button type='button' className={styles.details__button} kind='outline' size='lg' onClick={() => handleCancelEdition()}>
              <Icon name='close' width={36} height={36} fill='var(--color-danger)' />
            </Button>
            <span className={styles.details__buttonSpan}>{t('CANCEL')}</span>
          </div>
          <div className={styles.details__buttonContainer}>
            <Button type='button' className={styles.details__button} kind='outline' size='lg' onClick={() => handleSaveTransaction()}>
              <Icon name='check' width={30} height={30} fill='var(--color-success)' />
            </Button>
            <span className={styles.details__buttonSpan}>{t('SAVE')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.details}>
      <Button type='button' kind='outline' className={styles.details__close} onClick={() => setShowDetails(false)}>
        <Icon name='close' width={24} height={24} fill='var(--gold-darkest)' />
      </Button>
      <div className={styles.details__infos}>
        <span className={styles.details__date}>
          {`
            ${t('CREATED')}
            ${formatDateFromAPIToFront(transaction.date)}
            ${t('AT')}
            ${bindHour(transaction.date)}
          `}
        </span>
        <div className={styles.details__transactionType}>
          <Icon name={bindTransactionTypeIcon(transaction.transaction_type)} width={48} height={48} fill={bindTransactionTypeIconColor(transaction.transaction_type)} />
        </div>
        <span className={styles.details__transactionTypeValue}>{t(`TRANSACTION_TYPE.${transaction.transaction_type}`)}</span>
        <div className={styles.details__category}>
          <span className={styles.details__categoryLabel}>{t('CATEGORY')}</span>
          <span className={styles.details__categoryValue}>{transaction.categories_fk}</span>
        </div>
        <div className={styles.details__subcategory}>
          <span className={styles.details__subcategoryLabel}>{t('SUBCATEGORY')}</span>
          <span className={styles.details__subcategoryValue}>{transaction.subcategories_fk}</span>
        </div>
        <div className={styles.details__observation}>
          <span className={styles.details__observationLabel}>{t('OBSERVATION')}</span>
          <span className={styles.details__observationValue}>{transaction.observation}</span>
        </div>
        <span className={styles.details__date}>
          {`
            ${t('OCCURRED')}
            ${formatDateFromAPIToFront(transaction.transaction_date)}
          `}
        </span>
        <span className={styles.details__value}>R$ {transactionIntermediate.value.replace('.', ',')}</span>
      </div>
      <Fill />
      <div className={styles.details__footer}>
        <div className={styles.details__buttonContainer}>
          <Button type='button' className={styles.details__button} kind='outline' size='lg' onClick={() => handleEditTransaction()}>
            <Icon name='edit' width={30} height={30} fill='var(--gold-darker)' />
          </Button>
          <span className={styles.details__buttonSpan}>{t('EDIT')}</span>
        </div>
        <div className={styles.details__buttonContainer}>
          <Button type='button' className={styles.details__button} kind='outline' size='lg' onClick={() => handleDeleteTransaction()}>
            <Icon name='trash' width={30} height={30} fill='var(--color-danger)' />
          </Button>
          <span className={styles.details__buttonSpan}>{t('DELETE')}</span>
        </div>
      </div>
    </div>
  );
};

export default Details;
