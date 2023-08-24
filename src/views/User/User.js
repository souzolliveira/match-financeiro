/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import bindConfirmationIcon from 'helpers/bindConfirmationIcon';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import userService from 'services/user.service';

import Button from 'components/Button';
import Fill from 'components/Fill';
import Icon from 'components/Icon';
import Input from 'components/Input';

import styles from './User.module.scss';

const User = () => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();
  const { signOut } = useAuth();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUser = () => {
    setIsLoading(true);
    userService
      .getUser({ handleError })
      .then(data => data.data)
      .then(data => {
        setName(data?.user?.name);
        setEmail(data?.user?.email);
        setIsEmailConfirmed(data?.user?.email_confirmation);
      })
      .catch(() => {
        addToast({
          content: t('LOGIN.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const saveUser = () => {
    if (!name || !email) {
      addToast({
        content: t('USER.UPDATE.FILL'),
        type: 'warning',
      });
      return;
    }
    setIsLoading(true);
    userService
      .updateUser({ name, email, handleError })
      .then(() => {
        addToast({
          content: t('USER.UPDATE.SUCCESS'),
          type: 'success',
        });
        setIsEditing(false);
      })
      .catch(() => {
        addToast({
          content: t('USER.UPDATE.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.user}>
      <div className={styles.user__header}>
        <button type='button' onClick={() => navigate('/')} className={styles.user__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.user__returnicon} />
        </button>
        <span className={styles.user__title}>{t('PROFILE')}</span>
      </div>
      <Fill />
      <div className={styles.user__container}>
        <div className={styles.user__photo}>
          <Icon name='user' width={200} height={200} fill='var(--gold-dark)' />
          {!isEditing && (
            <Button type='button' onClick={() => setIsEditing(true)} className={styles.user__editIcon}>
              <Icon name='edit' width={24} height={24} fill='white' />
            </Button>
          )}
        </div>
        {isEditing ? (
          <div className={styles.user__edit}>
            <div className={styles.user__inputGroup}>
              <span className={styles.user__label}>{t('NAME')}</span>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className={styles.user__inputGroup}>
              <span className={styles.user__label}>{t('EMAIL')}</span>
              <Input value={email} onChange={e => setEmail(e.target.value)} disabled={isEmailConfirmed} />
            </div>
            <div className={styles.user__editButtons}>
              <Button type='button' kind='outline' size='lg' onClick={() => setIsEditing(false)}>
                {t('CANCEL')}
              </Button>
              <Button type='button' kind='primary' size='lg' onClick={() => saveUser()}>
                {t('SAVE')}
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.user__info}>
            <span className={styles.user__name}>{name}</span>
            {email && (
              <div className={styles.user__emailContainer} tooltipflow='bottom' tooltip={t('CONFIRM.EMAIL.REQUIREMENT')}>
                <span className={styles.user__email}>{email}</span>
                <button type='button' className={styles.user__emailConfirmation} style={{ backgroundColor: isEmailConfirmed ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  <Icon name={bindConfirmationIcon(isEmailConfirmed)} width={16} height={16} fill='white' />
                </button>
              </div>
            )}
          </div>
        )}
        <Fill />
        <div className={styles.user__logout}>
          <button type='button' onClick={() => signOut('/user')} className={styles.user__logoutbutton}>
            <Icon name='logout' width={24} height={24} fill='var(--gold-dark)' />
            <span>{t('LOGOUT')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
