import { useMemo, useRef, useEffect, useCallback, type MutableRefObject } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { MermaidRenderer, PlantUMLRenderer } from '../DiagramRenderer';
import './MarkdownPreview.css';

interface MarkdownPreviewProps {
  markdown: string;
  isDark?: boolean;
  onScroll?: (scrollTop: number, scrollHeight: number) => void;
  scrollToRef?: MutableRefObject<((scrollTop: number, scrollHeight: number) => void) | undefined>;
}

interface DiagramBlock {
  id: string;
  type: 'mermaid' | 'plantuml';
  content: string;
}

interface ParsedSection {
  type: 'html' | 'mermaid' | 'plantuml';
  content: string;
  id?: string;
}

// Unique delimiter that won't appear in normal content
const DIAGRAM_DELIMITER = '___DIAGRAM___';

export function MarkdownPreview({ markdown, isDark = false, onScroll, scrollToRef }: MarkdownPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (containerRef.current && onScroll) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        onScroll(scrollTop, maxScroll);
      }
    }
  }, [onScroll]);

  // Setup scrollTo function for sync
  useEffect(() => {
    if (scrollToRef) {
      scrollToRef.current = (scrollTop: number, scrollHeight: number) => {
        if (containerRef.current) {
          const { scrollHeight: containerScrollHeight, clientHeight } = containerRef.current;
          const maxScroll = containerScrollHeight - clientHeight;
          if (scrollHeight > 0 && maxScroll > 0) {
            const ratio = scrollTop / scrollHeight;
            containerRef.current.scrollTop = ratio * maxScroll;
          }
        }
      };
    }
  }, [scrollToRef]);

  const sections = useMemo(() => {
    const result: ParsedSection[] = [];
    const diagrams: DiagramBlock[] = [];
    let diagramIndex = 0;

    // Custom renderer to handle mermaid and plantuml code blocks
    const renderer = new marked.Renderer();
    
    renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
      const language = lang?.toLowerCase() || '';
      
      if (language === 'mermaid') {
        const id = `mermaid-${diagramIndex++}`;
        diagrams.push({ id, type: 'mermaid', content: text });
        return `${DIAGRAM_DELIMITER}${id}:mermaid${DIAGRAM_DELIMITER}`;
      }
      
      if (language === 'plantuml' || language === 'puml') {
        const id = `plantuml-${diagramIndex++}`;
        diagrams.push({ id, type: 'plantuml', content: text });
        return `${DIAGRAM_DELIMITER}${id}:plantuml${DIAGRAM_DELIMITER}`;
      }
      
      // Default code block rendering with syntax highlighting class
      const escapedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      return `<pre><code class="language-${language}">${escapedText}</code></pre>`;
    };

    marked.setOptions({
      renderer,
      gfm: true,
      breaks: true,
    });

    const rawHtml = marked.parse(markdown) as string;
    
    // Split by delimiter BEFORE sanitizing
    const regex = new RegExp(`${DIAGRAM_DELIMITER}([^:]+):([^_]+)${DIAGRAM_DELIMITER}`, 'g');
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(rawHtml)) !== null) {
      // Add HTML before this diagram
      if (match.index > lastIndex) {
        const htmlPart = rawHtml.substring(lastIndex, match.index);
        const cleanHtml = DOMPurify.sanitize(htmlPart, {
          ADD_TAGS: ['div'],
          ADD_ATTR: ['class'],
        });
        if (cleanHtml.trim()) {
          result.push({ type: 'html', content: cleanHtml });
        }
      }
      
      // Add diagram
      const id = match[1];
      const type = match[2] as 'mermaid' | 'plantuml';
      const diagram = diagrams.find(d => d.id === id);
      if (diagram) {
        result.push({ type, content: diagram.content, id });
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining HTML
    if (lastIndex < rawHtml.length) {
      const htmlPart = rawHtml.substring(lastIndex);
      const cleanHtml = DOMPurify.sanitize(htmlPart, {
        ADD_TAGS: ['div'],
        ADD_ATTR: ['class'],
      });
      if (cleanHtml.trim()) {
        result.push({ type: 'html', content: cleanHtml });
      }
    }

    return result;
  }, [markdown]);

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className={`markdown-preview ${isDark ? 'dark' : 'light'}`}
      style={{
        height: '100%',
        overflow: 'auto',
        padding: '24px',
        backgroundColor: isDark ? '#1f1f1f' : '#ffffff',
      }}
    >
      <div className="markdown-body">
        {sections.map((section, index) => {
          if (section.type === 'html') {
            return (
              <div 
                key={`html-${index}`}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            );
          }
          
          if (section.type === 'mermaid') {
            return (
              <MermaidRenderer
                key={section.id}
                id={section.id!}
                content={section.content}
                isDark={isDark}
              />
            );
          }
          
          if (section.type === 'plantuml') {
            return (
              <PlantUMLRenderer
                key={section.id}
                id={section.id!}
                content={section.content}
                isDark={isDark}
              />
            );
          }
          
          return null;
        })}
      </div>
    </div>
  );
}
