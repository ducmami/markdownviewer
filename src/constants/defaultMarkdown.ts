export const DEFAULT_MARKDOWN = `# Welcome to Markdown Viewer 📝

A modern, feature-rich markdown editor with **live preview** and diagram support.

## Features

- ✨ **Live Preview** - See your changes in real-time
- 🎨 **Syntax Highlighting** - Beautiful code blocks
- 🌙 **Dark/Light Mode** - Easy on your eyes
- 📊 **Mermaid Diagrams** - Flowcharts, sequences, and more
- 🌿 **PlantUML Support** - UML diagrams rendered via server
- 💾 **Auto-save** - Your content is saved locally

## Code Example

\`\`\`typescript
interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

## Mermaid Diagram

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[Deploy]
\`\`\`

## Sequence Diagram

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Editor
    participant Preview
    
    User->>Editor: Type markdown
    Editor->>Preview: Parse & render
    Preview-->>User: Show result
\`\`\`

## PlantUML Diagram

\`\`\`plantuml
@startuml
actor User
participant "Markdown Editor" as Editor
participant "Preview Pane" as Preview

User -> Editor: Write markdown
Editor -> Preview: Parse content
Preview --> User: Display rendered HTML
@enduml
\`\`\`

## Table Example

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | ✅ | Full GFM support |
| Mermaid | ✅ | Client-side rendering |
| PlantUML | ✅ | Server-side rendering |
| Export | 🚧 | Coming soon |

## Blockquote

> "The best way to predict the future is to create it."
> — Peter Drucker

## Task List

- [x] Create markdown parser
- [x] Add Mermaid support
- [x] Add PlantUML support
- [ ] Add export functionality
- [ ] Add more themes

---

From ducmami with ❤️ using React, Ant Design, and Monaco Editor
`;

