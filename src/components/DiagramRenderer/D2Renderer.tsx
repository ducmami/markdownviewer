import { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';
import { compileAndRenderD2 } from '../../utils/d2Client';

interface D2RendererProps {
  id: string;
  content: string;
  isDark?: boolean;
}

export function D2Renderer({ id, content, isDark = false }: D2RendererProps) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!content.trim()) {
        setLoading(false);
        setSvg('');
        setError('');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const rendered = await compileAndRenderD2(content, { isDark });
        if (!cancelled) {
          setSvg(rendered);
        }
      } catch (err) {
        if (!cancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to render D2 diagram';
          setError(errorMessage);
          console.error('D2 render error:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [content, isDark]);

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
        title="D2 Diagram Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: '8px 0' }}
      />
    );
  }

  return (
    <div
      id={id}
      className="d2-diagram"
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
