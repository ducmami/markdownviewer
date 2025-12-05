import { Layout, Button, Space, Tooltip, Typography, message } from 'antd';
import {
  SunOutlined,
  MoonOutlined,
  ClearOutlined,
  CopyOutlined,
  FileMarkdownOutlined,
} from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

interface AppHeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onReset: () => void;
  markdown: string;
}

export function AppHeader({ isDark, onThemeToggle, onReset, markdown }: AppHeaderProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      message.success('Markdown copied to clipboard!');
    } catch {
      message.error('Failed to copy to clipboard');
    }
  };

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: isDark ? '#1f1f1f' : '#001529',
        borderBottom: isDark ? '1px solid #303030' : 'none',
        height: 56,
      }}
    >
      <Space align="center">
        <FileMarkdownOutlined style={{ fontSize: 24, color: '#1890ff' }} />
        <Title
          level={4}
          style={{
            margin: 0,
            color: '#ffffff',
            fontWeight: 600,
            letterSpacing: '-0.5px',
          }}
        >
          Markdown Viewer
        </Title>
      </Space>

      <Space size="middle">
        <Tooltip title="Reset to default">
          <Button
            type="text"
            icon={<ClearOutlined />}
            onClick={onReset}
            style={{ color: '#ffffff' }}
          />
        </Tooltip>

        <Tooltip title="Copy markdown">
          <Button
            type="text"
            icon={<CopyOutlined />}
            onClick={handleCopy}
            style={{ color: '#ffffff' }}
          />
        </Tooltip>

        <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          <Button
            type="text"
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            onClick={onThemeToggle}
            style={{ color: '#ffffff' }}
          />
        </Tooltip>
      </Space>
    </Header>
  );
}

