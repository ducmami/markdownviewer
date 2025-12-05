import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Spin, Alert } from 'antd';

interface MermaidRendererProps {
  id: string;
  content: string;
  isDark?: boolean;
}

// Initialize mermaid once
let mermaidInitialized = false;

export function MermaidRenderer({ id, content, isDark = false }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'neutral',
        securityLevel: 'strict',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      });
      mermaidInitialized = true;
    } else {
      // Update theme when it changes
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'neutral',
        securityLevel: 'strict',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      });
    }
  }, [isDark]);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!content.trim()) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        // Use unique ID with timestamp to avoid conflicts
        const uniqueId = `mermaid-svg-${id}-${Date.now()}`;
        const { svg: renderedSvg } = await mermaid.render(uniqueId, content);
        setSvg(renderedSvg);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to render Mermaid diagram';
        setError(errorMessage);
        console.error('Mermaid render error:', err);
      } finally {
        setLoading(false);
      }
    };

    renderDiagram();
  }, [id, content]);

  if (loading) {
    return (
      <div className="diagram-loading">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        title="Mermaid Diagram Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: '8px 0' }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram"
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
        background: isDark ? '#2d2d2d' : '#fafafa',
        borderRadius: '8px',
        margin: '8px 0',
        overflow: 'auto',
      }}
    />
  );
}

