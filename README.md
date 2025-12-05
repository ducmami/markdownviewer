# Markdown Viewer

A modern, feature-rich Markdown editor with live preview, Mermaid diagrams, and PlantUML support.

![Markdown Viewer](images/rongsam.svg)

## Features

- ✨ **Live Preview** - See your changes in real-time
- 🎨 **Syntax Highlighting** - Beautiful code blocks with Monaco Editor
- 🌙 **Dark/Light Mode** - Easy on your eyes
- 📊 **Mermaid Diagrams** - Flowcharts, sequence diagrams, and more
- 🌿 **PlantUML Support** - UML diagrams rendered via server
- 💾 **Auto-save** - Your content is saved locally
- 📋 **Copy to Clipboard** - One-click copy markdown content
- 🔄 **Resizable Panels** - Drag to adjust editor/preview ratio

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Ant Design 6** - UI components
- **Monaco Editor** - Code editor
- **Marked** - Markdown parser
- **Mermaid** - Diagram rendering
- **PlantUML** - UML diagram support
- **DOMPurify** - XSS protection

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ducmami/markdownviewer.git
cd markdownviewer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deploy to Cloudflare Pages

See [Deployment Guide](docs/DEPLOY.md) for detailed instructions.

Quick deploy:
```bash
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── DiagramRenderer/   # Mermaid & PlantUML renderers
│   ├── Editor/            # Monaco editor wrapper
│   ├── Header/            # App header with controls
│   ├── Layout/            # Split pane layout
│   └── Preview/           # Markdown preview
├── constants/             # Default content
├── hooks/                 # Custom React hooks
├── styles/                # Theme configuration
└── utils/                 # Utility functions
```

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.

## Author

Built with ❤️ by [DucMami](https://github.com/ducmami)
