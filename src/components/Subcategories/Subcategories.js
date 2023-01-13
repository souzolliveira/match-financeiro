import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import costingTypes from 'constants/costing';
import steps from 'constants/steps';
import { useAuth } from 'hooks/useAuth';
import useHiddenStep from 'hooks/useHiddenStep';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import subcategoryService from 'services/subcategory.service';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import Radio from 'components/Radio/Radio';

import styles from './Subcategories.module.scss';

const Subcategories = ({
  category,
  fetchSubcategories,
  subcategories,
  selectedSubcategory,
  setSelectedSubcategory,
  step,
  setStep,
  transactionType,
}) => {
  const { t } = useTranslation();
  const { addToast } = useNotification();
  const { hidden } = useHiddenStep({ target: steps.SUBCATEGORY, step });
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();

  const [isAddSubcategoryModalVisible, setIsAddSubcategoryModalVisible] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [costing, setCosting] = useState(true);

  const handleSelectSubcategory = subcategory => {
    setSelectedSubcategory(subcategory);
    setStep(steps.VALUE);
    const valueInput = document.getElementById('transaction-value');
    if (valueInput) valueInput.focus();
  };

  const handleCreateSubcategory = () => {
    setIsLoading(true);
    subcategoryService
      .createSubcategory({ category, costing, name: subcategoryName, transactionType, handleError })
      .then(() => {
        fetchSubcategories();
      })
      .catch(() => {
        addToast({
          content: t('SUBCATEGORIES.CREATE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsAddSubcategoryModalVisible(false);
        setIsLoading(false);
      });
  };

  return (
    <div className={`${styles.subcategories} ${hidden ? styles.hidden : ''} ${selectedSubcategory ? styles.selected : ''}`}>
      <span className={styles.subcategories__label}>{t('SUBCATEGORIES.LABEL')}</span>
      <div className={styles.subcategories__items}>
        {subcategories.map((item, index) => {
          return (
            <Button
              key={index}
              type='button'
              size='lg'
              kind='secondary'
              className={styles.subcategories__button}
              onClick={() => handleSelectSubcategory(item.subcategory_name)}
            >
              {item.subcategory_name}
            </Button>
          );
        })}
        <Button
          type='button'
          size='lg'
          kind='secondary'
          className={styles.subcategories__button}
          onClick={() => {
            setIsAddSubcategoryModalVisible(true);
          }}
        >
          <Icon name='plus' width={18} height={18} fill='var(--gold-darker)' />
          {t('SUBCATEGORIES.CREATE')}
        </Button>
      </div>
      <Modal
        canClose
        onClose={() => setIsAddSubcategoryModalVisible(false)}
        title={t('SUBCATEGORIES.CREATE')}
        top={null}
        visible={isAddSubcategoryModalVisible}
        width='300px'
      >
        <div className={styles.subcategories__modal}>
          <span className={styles.subcategories__label}>{t('SUBCATEGORIES.NAME')}</span>
          <Input className={styles.subcategories__input} value={subcategoryName} onChange={e => setSubcategoryName(e.target.value)} />
          <span className={styles.subcategories__label}>{t('SUBCATEGORIES.COSTING')}</span>
          <div className={styles.subcategories__costing}>
            <Radio
              reference={costing}
              value={costingTypes.FIXED}
              onChange={() => setCosting(costingTypes.FIXED)}
              label={t('SUBCATEGORIES.COSTING.FIXED')}
              name='subcategories-costing'
            />
            <Radio
              reference={costing}
              value={costingTypes.VARIABLE}
              onChange={() => setCosting(costingTypes.VARIABLE)}
              label={t('SUBCATEGORIES.COSTING.VARIABLE')}
              name='subcategories-costing'
            />
          </div>
          <Button type='button' size='md' kind='primary' onClick={() => handleCreateSubcategory()}>
            {t('CREATE')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Subcategories;
