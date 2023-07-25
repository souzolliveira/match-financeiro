import React from 'react';

import { useTranslation } from 'react-i18next';

import installmentTypes from 'constants/installmentTypes';
import paymentTypes from 'constants/paymentTypes';

import Select from 'components/Select';

import styles from './Installments.module.scss';

const Installments = ({ payment, installments, setInstallments }) => {
  const { t } = useTranslation();

  const handleChange = value => {
    setInstallments(value);
  };

  return (
    <div className={styles.installments}>
      <span className={styles.installments__label}>{t('FILTERS.INSTALLMENTS')}</span>
      <Select value={installments} onChange={e => handleChange(e.target.value)} disabled={payment !== paymentTypes.CREDIT}>
        <option value='' disabled>
          {t('SELECT')}
        </option>
        {installmentTypes.types?.map((item, index) => {
          return (
            <option key={index} value={item}>
              {t(installmentTypes.bind[item])}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default Installments;
