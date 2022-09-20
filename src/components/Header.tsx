/** @jsxImportSource @emotion/react */
import { Button, Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown';
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { User } from '../hooks/users/getUser';
import { Fragment } from 'react';

const header = css({
  display: 'flex',
  padding: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const loginButton = css({
  display: 'flex',
  alignItems: 'center',
})

const HeaderComp: React.FC = () => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const currentUser = queryClient.getQueryData<User>('currentUser');

  return (
    <Layout.Header
      className="site-layout-background"
      css={header}
    >
      <LanguageDropdown />
      <div css={loginButton}>
        {currentUser ? (
          <Fragment>
            <div>{`${currentUser?.lastName} ${currentUser?.firstName}`}</div>
            <Button>{t('header.logout')}</Button>
          </Fragment>
        ) : (
          <Button onClick={() => navigate('login')}>{t('header.login')}</Button>
        )}

      </div>
    </Layout.Header>
  )
}

export default HeaderComp