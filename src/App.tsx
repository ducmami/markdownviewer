import { useCallback, useRef } from 'react';
import { ConfigProvider, Layout, App as AntApp, theme } from 'antd';
import { AppHeader } from './components/Header';
import { AppFooter } from './components/Footer';
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
  const [syncScroll, setSyncScroll] = useLocalStorage<boolean>('sync-scroll', true);
  
  // Refs for scroll sync
  const editorScrollRef = useRef<(scrollTop: number, scrollHeight: number) => void>(undefined);
  const previewScrollRef = useRef<(scrollTop: number, scrollHeight: number) => void>(undefined);
  const isScrollingRef = useRef<'editor' | 'preview' | null>(null);

  const handleThemeToggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, [setIsDark]);

  const handleReset = useCallback(() => {
    setMarkdown(DEFAULT_MARKDOWN);
  }, [setMarkdown]);

  const handleSyncScrollToggle = useCallback((checked: boolean) => {
    setSyncScroll(checked);
  }, [setSyncScroll]);

  // Use ref for syncScroll to avoid stale closure
  const syncScrollRef = useRef(syncScroll);
  syncScrollRef.current = syncScroll;

  // Editor scroll handler - syncs to preview
  const handleEditorScroll = useCallback((scrollTop: number, scrollHeight: number) => {
    if (!syncScrollRef.current || isScrollingRef.current === 'preview') return;
    isScrollingRef.current = 'editor';
    previewScrollRef.current?.(scrollTop, scrollHeight);
    setTimeout(() => { isScrollingRef.current = null; }, 50);
  }, []);

  // Preview scroll handler - syncs to editor
  const handlePreviewScroll = useCallback((scrollTop: number, scrollHeight: number) => {
    if (!syncScrollRef.current || isScrollingRef.current === 'editor') return;
    isScrollingRef.current = 'preview';
    editorScrollRef.current?.(scrollTop, scrollHeight);
    setTimeout(() => { isScrollingRef.current = null; }, 50);
  }, []);


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
            syncScroll={syncScroll}
            onSyncScrollToggle={handleSyncScrollToggle}
          />
          <Content
            style={{
              height: 'calc(100vh - 100px)',
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
                  onScroll={handleEditorScroll}
                  scrollToRef={editorScrollRef}
                />
              }
              right={
                <MarkdownPreview
                  markdown={markdown}
                  isDark={isDark}
                  onScroll={handlePreviewScroll}
                  scrollToRef={previewScrollRef}
                />
              }
            />
          </Content>
          <AppFooter isDark={isDark} />
        </Layout>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
