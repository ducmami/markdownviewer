import type { ThemeConfig } from 'antd';

export const skyBlueTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorBgLayout: '#f0f5ff',
    borderRadius: 6,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
  },
  components: {
    Layout: {
      headerBg: '#001529',
      headerColor: '#ffffff',
      siderBg: '#001529',
    },
    Button: {
      colorPrimary: '#1890ff',
      algorithm: true,
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#177ddc',
    colorBgLayout: '#141414',
    colorBgContainer: '#1f1f1f',
    colorText: '#ffffff',
    colorTextSecondary: '#a6a6a6',
    borderRadius: 6,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
  },
  components: {
    Layout: {
      headerBg: '#1f1f1f',
      headerColor: '#ffffff',
      bodyBg: '#141414',
    },
    Button: {
      colorPrimary: '#177ddc',
      algorithm: true,
    },
  },
};

