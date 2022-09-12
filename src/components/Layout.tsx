import { Breadcrumb, Layout } from 'antd';
import FooterComp from './Footer';
import HeaderComp from './Header';
import SiderComp from './Sider';

const LayoutComp: React.FC = () => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SiderComp />
      <Layout className="site-layout">
        <HeaderComp />
        <Layout.Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            Bill is a cat.
          </div>
        </Layout.Content>
        <FooterComp />
      </Layout>
    </Layout>
  );
}

export default LayoutComp