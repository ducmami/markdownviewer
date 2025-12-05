import { useRef, useCallback, useEffect, type MutableRefObject } from 'react';
import Editor from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  isDark?: boolean;
  onScroll?: (scrollTop: number, scrollHeight: number) => void;
  scrollToRef?: MutableRefObject<((scrollTop: number, scrollHeight: number) => void) | undefined>;
}

export function MarkdownEditor({ value, onChange, isDark = false, onScroll, scrollToRef }: MarkdownEditorProps) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorMount = useCallback((editor: Monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();

    // Setup scroll listener
    editor.onDidScrollChange((e) => {
      if (e.scrollTopChanged && onScroll) {
        const scrollTop = e.scrollTop;
        const scrollHeight = editor.getScrollHeight() - editor.getLayoutInfo().height;
        if (scrollHeight > 0) {
          onScroll(scrollTop, scrollHeight);
        }
      }
    });
  }, [onScroll]);

  // Setup scrollTo function for sync
  useEffect(() => {
    if (scrollToRef) {
      scrollToRef.current = (scrollTop: number, scrollHeight: number) => {
        if (editorRef.current) {
          const editorScrollHeight = editorRef.current.getScrollHeight() - editorRef.current.getLayoutInfo().height;
          if (scrollHeight > 0 && editorScrollHeight > 0) {
            const ratio = scrollTop / scrollHeight;
            editorRef.current.setScrollTop(ratio * editorScrollHeight);
          }
        }
      };
    }
  }, [scrollToRef]);

  const handleEditorChange = useCallback((newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  }, [onChange]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Editor
        height="100%"
        defaultLanguage="markdown"
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        theme={isDark ? 'vs-dark' : 'light'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
          lineNumbers: 'on',
          wordWrap: 'on',
          wrappingIndent: 'indent',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          tabSize: 2,
          renderWhitespace: 'selection',
          bracketPairColorization: { enabled: true },
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
        loading={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: isDark ? '#fff' : '#000',
          }}>
            Loading editor...
          </div>
        }
      />
    </div>
  );
}

