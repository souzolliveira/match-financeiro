import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import userService from 'services/user.service';

import Fill from 'components/Fill/Fill';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';

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
  const [phone, setPhone] = useState('');
  const [isPhoneConfirmed, setIsPhoneConfirmed] = useState(false);

  const fetchUser = () => {
    setIsLoading(true);
    userService
      .getUser({ handleError })
      .then(data => data.data)
      .then(data => {
        setName(data?.user?.name);
        setEmail(data?.user?.email);
        setIsEmailConfirmed(data?.user?.email_confirmation);
        setPhone(data?.user?.phone_number);
        setIsPhoneConfirmed(data?.user?.phone_confirmation);
      })
      .catch(() => {
        addToast({
          content: t('LOGIN.ERROR'),
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
        </div>
        <div className={styles.user__info}>
          <div className={styles.user__inputGroup}>
            <span className={styles.user__label}>{t('NAME')}</span>
            <Input value={name} disabled />
          </div>
          <div className={styles.user__inputGroup}>
            <span className={styles.user__label}>{t('EMAIL')}</span>
            <Input value={email} disabled />
          </div>
          <div className={styles.user__inputGroup}>
            <span className={styles.user__label}>{t('PHONE')}</span>
            <Input value={phone} disabled />
          </div>
        </div>
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
