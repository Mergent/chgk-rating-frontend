import { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SiderComp = () => {
  const {t} = useTranslation();

  const [collapsed, setCollapsed] = useState(false);
  return (
      <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key='main'>
            <Link to="/">
              <span className="nav-text">{t('pages.main')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='users'>
            <Link to="/users">
              <span className="nav-text">{t('pages.users')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='teams'>
            <Link to="/teams">
              <span className="nav-text">{t('pages.teams')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='roles'>
            <Link to="/roles">
              <span className="nav-text">{t('pages.roles')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='players'>
            <Link to="/players">
              <span className="nav-text">{t('pages.players')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='settings'>
            <Link to="/settings">
              <span className="nav-text">{t('pages.settings')}</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
  )
}

export default SiderComp