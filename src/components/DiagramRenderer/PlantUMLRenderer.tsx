import { useState, useEffect } from 'react';
import { Spin, Alert } from 'antd';
import { getPlantUMLUrl } from '../../utils/diagramUtils';

interface PlantUMLRendererProps {
  id: string;
  content: string;
  isDark?: boolean;
}

export function PlantUMLRenderer({ id, content, isDark = false }: PlantUMLRendererProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (!content.trim()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = getPlantUMLUrl(content);
      setImageUrl(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate PlantUML URL';
      setError(errorMessage);
      console.error('PlantUML encoding error:', err);
      setLoading(false);
    }
  }, [content]);

  const handleImageLoad = () => {
    setLoading(false);
    setError('');
  };

  const handleImageError = () => {
    setLoading(false);
    setError('Failed to load PlantUML diagram from server');
  };

  if (error) {
    return (
      <Alert
        title="PlantUML Diagram Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: '8px 0' }}
      />
    );
  }

  return (
    <div
      className="plantuml-diagram"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        background: isDark ? '#2d2d2d' : '#fafafa',
        borderRadius: '8px',
        margin: '8px 0',
        minHeight: '100px',
        overflow: 'auto',
      }}
    >
      {loading && <Spin />}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`PlantUML diagram ${id}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            maxWidth: '100%',
            display: loading ? 'none' : 'block',
            filter: isDark ? 'invert(0.9) hue-rotate(180deg)' : 'none',
          }}
        />
      )}
    </div>
  );
}

