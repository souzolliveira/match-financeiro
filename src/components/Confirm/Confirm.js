import React from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import useHiddenStep from 'hooks/useHiddenStep';

import Button from 'components/Button/Button';

import styles from './Confirm.module.scss';

const Confirm = ({ step }) => {
  const { t } = useTranslation();
  const { hidden } = useHiddenStep({ target: steps.CONFIRM, step });

  return (
    <div className={`${styles.confirm} ${hidden ? styles.hidden : ''}`}>
      <Button type='submit' size='lg'>
        {t('TRANSACTION.SUBMIT')}
      </Button>
    </div>
  );
};

export default Confirm;
