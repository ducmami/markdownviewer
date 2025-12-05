# Markdown Viewer

A modern, feature-rich Markdown editor with live preview, diagram support, and a beautiful UI.

## Features

- **Live Preview**: See your Markdown rendered in real-time as you type
- **Monaco Editor**: Powered by the same editor that runs VS Code
- **Mermaid Diagrams**: Create flowcharts, sequence diagrams, and more
- **PlantUML Support**: UML diagrams rendered via PlantUML server
- **Dark/Light Mode**: Toggle between themes for comfortable editing
- **Auto-save**: Your content is automatically saved to localStorage
- **Responsive Design**: Works on desktop and tablet devices
- **GitHub Flavored Markdown**: Full GFM support including tables and task lists

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Ant Design 6.0** - Modern UI components with sky blue theme
- **Monaco Editor** - VS Code's editor for the web
- **marked** + **DOMPurify** - Safe Markdown parsing
- **Mermaid.js** - Client-side diagram rendering
- **PlantUML** - Server-side UML diagram generation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/ducmami/markdownviewer.git
cd markdownviewer

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the \`dist\` directory.

## Usage

### Basic Markdown

Write standard Markdown syntax in the left editor pane:

\`\`\`markdown
# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

[Link](https://example.com)
\`\`\`

### Code Blocks

\`\`\`markdown
\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`
\`\`\`

### Mermaid Diagrams

Create diagrams using Mermaid syntax:

\`\`\`markdown
\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[OK]
    B -->|No| D[Cancel]
\`\`\`
\`\`\`

Supported diagram types:
- Flowcharts
- Sequence diagrams
- Class diagrams
- State diagrams
- Entity Relationship diagrams
- Gantt charts
- Pie charts
- And more!

### PlantUML Diagrams

Create UML diagrams using PlantUML syntax:

\`\`\`markdown
\`\`\`plantuml
@startuml
actor User
participant System

User -> System: Request
System --> User: Response
@enduml
\`\`\`
\`\`\`

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| \`Ctrl+S\` | Save (auto-saved) |
| \`Ctrl+Z\` | Undo |
| \`Ctrl+Shift+Z\` | Redo |
| \`Ctrl+F\` | Find |
| \`Ctrl+H\` | Find and Replace |

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: \`npm run build\`
3. Set output directory: \`dist\`
4. Deploy!

### Manual Deployment

\`\`\`bash
npm run build
# Upload contents of dist/ to your web server
\`\`\`

## Project Structure

\`\`\`
markdownviewer/
├── public/
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Editor/
│   │   ├── Preview/
│   │   ├── DiagramRenderer/
│   │   └── Layout/
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useMarkdownParser.ts
│   ├── styles/
│   │   └── theme.ts
│   ├── utils/
│   │   └── diagramUtils.ts
│   ├── constants/
│   │   └── defaultMarkdown.ts
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   └── README.md
├── vite.config.ts
├── package.json
└── tsconfig.json
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Ant Design](https://ant.design/)
- [Mermaid](https://mermaid.js.org/)
- [PlantUML](https://plantuml.com/)
- [marked](https://marked.js.org/)

