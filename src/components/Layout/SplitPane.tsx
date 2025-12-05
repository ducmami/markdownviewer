import { useState, useRef, useCallback, useEffect, ReactNode } from 'react';

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
  defaultSplit?: number;
  minSize?: number;
  isDark?: boolean;
}

export function SplitPane({
  left,
  right,
  defaultSplit = 50,
  minSize = 200,
  isDark = false,
}: SplitPaneProps) {
  const [splitPosition, setSplitPosition] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;
      
      // Calculate percentage
      let newSplit = (mouseX / containerWidth) * 100;
      
      // Enforce minimum sizes
      const minPercent = (minSize / containerWidth) * 100;
      newSplit = Math.max(minPercent, Math.min(100 - minPercent, newSplit));
      
      setSplitPosition(newSplit);
    },
    [isDragging, minSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left Pane */}
      <div
        style={{
          width: `${splitPosition}%`,
          height: '100%',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {left}
      </div>

      {/* Divider */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: 6,
          height: '100%',
          background: isDark ? '#303030' : '#e8e8e8',
          cursor: 'col-resize',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: isDragging ? 'none' : 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLDivElement).style.background = isDark ? '#404040' : '#d0d0d0';
        }}
        onMouseLeave={(e) => {
          if (!isDragging) {
            (e.target as HTMLDivElement).style.background = isDark ? '#303030' : '#e8e8e8';
          }
        }}
      >
        <div
          style={{
            width: 2,
            height: 40,
            background: isDark ? '#505050' : '#bfbfbf',
            borderRadius: 1,
          }}
        />
      </div>

      {/* Right Pane */}
      <div
        style={{
          flex: 1,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {right}
      </div>
    </div>
  );
}

