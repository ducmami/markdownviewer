import { useCallback } from 'react';
import { ConfigProvider, Layout, App as AntApp, theme } from 'antd';
import { AppHeader } from './components/Header';
import { MarkdownEditor } from './components/Editor';
import { MarkdownPreview } from './components/Preview';
import { SplitPane } from './components/Layout';
import { useLocalStorage } from './hooks/useLocalStorage';
import { skyBlueTheme, darkTheme } from './styles/theme';
import { DEFAULT_MARKDOWN } from './constants/defaultMarkdown';
import './App.css';

const { Content } = Layout;

function App() {
  const [markdown, setMarkdown] = useLocalStorage<string>('markdown-content', DEFAULT_MARKDOWN);
  const [isDark, setIsDark] = useLocalStorage<boolean>('theme-dark', false);

  const handleThemeToggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, [setIsDark]);

  const handleReset = useCallback(() => {
    setMarkdown(DEFAULT_MARKDOWN);
  }, [setMarkdown]);


  const currentTheme = isDark ? darkTheme : skyBlueTheme;

  return (
    <ConfigProvider
      theme={{
        ...currentTheme,
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntApp>
        <Layout style={{ minHeight: '100vh' }}>
          <AppHeader
            isDark={isDark}
            onThemeToggle={handleThemeToggle}
            onReset={handleReset}
            markdown={markdown}
          />
          <Content
            style={{
              height: 'calc(100vh - 56px)',
              background: isDark ? '#141414' : '#f0f5ff',
            }}
          >
            <SplitPane
              isDark={isDark}
              left={
                <MarkdownEditor
                  value={markdown}
                  onChange={setMarkdown}
                  isDark={isDark}
                />
              }
              right={
                <MarkdownPreview
                  markdown={markdown}
                  isDark={isDark}
                />
              }
            />
          </Content>
        </Layout>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
