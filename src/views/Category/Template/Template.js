import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import costingTypes from 'constants/costingTypes';
import transactionTypes from 'constants/transactionTypes';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import categoryService from 'services/category.service';
import subcategoryService from 'services/subcategory.service';

import Button from 'components/Button/Button';
import Checkbox from 'components/Checkbox/Checkbox';

import NewCategoryFromTemplate from './NewCategoryFromTemplate/NewCategoryFromTemplate';
import NewSubcategoryFromTemplate from './NewSubcategoryFromTemplate/NewSubcategoryFromTemplate';
import json from './template.json';

import styles from './Template.module.scss';

const Template = ({ fetchCategories, fetchSubcategories }) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();
  const { t } = useTranslation();

  const [template, setTemplate] = useState(json);

  const handleCreateCategory = async (transactionType, category) => {
    categoryService
      .createCategory({ name: category, transactionType, handleError })
      .then(() => {})
      .catch(() => {
        addToast({
          content: t('CATEGORIES.NEW.ERROR', { category }),
          type: 'danger',
        });
      });
  };

  const handleCreateSubcategory = async (transactionType, category, subcategory, costing) => {
    subcategoryService
      .createSubcategory({
        category,
        costing,
        name: subcategory,
        transactionType,
        handleError,
      })
      .then(() => {})
      .catch(() => {
        addToast({
          content: t('SUBCATEGORIES.NEW.ERROR', { subcategory }),
          type: 'danger',
        });
      });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    [transactionTypes.INCOME, transactionTypes.EXPENSE, transactionTypes.INVESTIMENT].forEach(transactionType => {
      Object.keys(template[transactionType]).forEach(async category => {
        const subcategories = [];
        Object.keys(template[transactionType][category]).forEach(async subcategory => {
          if (template?.[transactionType]?.[category]?.[subcategory].value) {
            subcategories.push({ name: subcategory, costing: template?.[transactionType]?.[category]?.[subcategory].costing });
          }
        });
        if (subcategories.length > 0) {
          await handleCreateCategory(transactionType, category);
          subcategories.forEach(async subcategory => {
            await handleCreateSubcategory(transactionType, category, subcategory.name, subcategory.costing);
          });
        }
      });
    });
    await fetchCategories();
    await fetchSubcategories();
    setIsLoading(false);
  };

  const handleSelect = (e, transactionType, category, subcategory) => {
    e.stopPropagation();
    setTemplate({
      ...template,
      [transactionType]: {
        ...template[transactionType],
        [category]: {
          ...template[transactionType][category],
          [subcategory]: {
            ...template[transactionType][category][subcategory],
            value: !template[transactionType][category][subcategory].value,
          },
        },
      },
    });
  };

  const handleChangeCosting = (e, transactionType, category, subcategory) => {
    e.stopPropagation();
    setTemplate({
      ...template,
      [transactionType]: {
        ...template[transactionType],
        [category]: {
          ...template[transactionType][category],
          [subcategory]: {
            ...template[transactionType][category][subcategory],
            costing:
              template[transactionType][category][subcategory].costing === costingTypes.FIXED ? costingTypes.VARIABLE : costingTypes.FIXED,
          },
        },
      },
    });
    const button = document.getElementById(`${transactionType}-${category}-${subcategory}-costing`);
    if (button) button.blur();
  };

  return (
    <div className={styles.template}>
      {[transactionTypes.INCOME, transactionTypes.EXPENSE, transactionTypes.INVESTIMENT].map(transactionType => {
        return (
          <div key={transactionType} className={styles.template__transactionType}>
            <span className={styles.template__title}>{t(`TRANSACTION_TYPE.${transactionType}`)}</span>
            {Object.keys(template[transactionType]).map(category => {
              return (
                <div key={category} className={styles.template__category}>
                  <span className={styles.template__categoryname}>{category}</span>
                  <div className={styles.template__subcategories}>
                    {Object.keys(template[transactionType][category]).map(subcategory => {
                      return (
                        <div
                          key={subcategory}
                          className={styles.template__subcategory}
                          onClick={e => handleSelect(e, transactionType, category, subcategory)}
                          onKeyDown={e => handleSelect(e, transactionType, category, subcategory)}
                          role='button'
                          tabIndex={0}
                        >
                          <span className={styles.template__label}>{subcategory}</span>
                          {transactionType === transactionTypes.EXPENSE && (
                            <Button
                              id={`${transactionType}-${category}-${subcategory}-costing`}
                              type='button'
                              kind='outline'
                              size='md'
                              onClick={e => handleChangeCosting(e, transactionType, category, subcategory)}
                            >
                              {t(`SUBCATEGORIES.COSTING.${costingTypes[template[transactionType][category][subcategory].costing]}`)}
                            </Button>
                          )}
                          <div className={styles.template__checkbox}>
                            <Checkbox type='checkbox' checked={template[transactionType][category][subcategory].value} />
                          </div>
                        </div>
                      );
                    })}
                    <NewSubcategoryFromTemplate
                      template={template}
                      setTemplate={setTemplate}
                      transactionType={transactionType}
                      category={category}
                    />
                  </div>
                </div>
              );
            })}
            <NewCategoryFromTemplate template={template} setTemplate={setTemplate} transactionType={transactionType} />
          </div>
        );
      })}
      <Button className={styles.template__confirmButton} type='button' kind='primary' size='lg' onClick={() => handleCreate()}>
        {t('CREATE')}
      </Button>
    </div>
  );
};

export default Template;
