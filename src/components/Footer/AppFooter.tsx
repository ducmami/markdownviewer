import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

interface AppFooterProps {
  isDark: boolean;
}

export function AppFooter({ isDark }: AppFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Footer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        background: isDark ? '#1f1f1f' : '#001529',
        borderTop: isDark ? '1px solid #303030' : 'none',
        height: 50,
      }}
    >
      <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>
        © {currentYear} Markdown Viewer. All rights reserved.
      </Text>
    </Footer>
  );
}
