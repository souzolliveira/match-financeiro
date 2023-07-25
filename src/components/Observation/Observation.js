import React from 'react';

import { useTranslation } from 'react-i18next';

import Input from 'components/Input';

import styles from './Observation.module.scss';

const Observation = ({ observation, setObservation }) => {
  const { t } = useTranslation();

  const handleChange = e => {
    setObservation(e.target.value);
  };

  return (
    <div className={styles.observation}>
      <span className={styles.observation__label}>{t('OBSERVATION.LABEL')}</span>
      <div className={styles.observation__container}>
        <Input
          className={styles.observation__input}
          id='observation'
          name='observation'
          type='text'
          value={observation}
          onChange={e => handleChange(e)}
          required
        />
      </div>
    </div>
  );
};

export default Observation;
