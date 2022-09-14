import { Layout } from 'antd';
import LanguageDropdown from './LanguageDropdown';

const HeaderComp: React.FC = () => {
  return (
    <Layout.Header
      className="site-layout-background"
      style={{
        padding: 0,
      }}
    >
      <LanguageDropdown />
    </Layout.Header>
  )
}

export default HeaderComp