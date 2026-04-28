export const DEFAULT_MARKDOWN = `# Markdown Viewer

Markdown Viewer is a free online tool that helps you view and render Markdown instantly.

Fully supports **PlantUML**, **Mermaid**, and **D2**, allowing you to create and view diagrams directly without installing any software.

---

## Key Features

### 🔹 Fast & Accurate Markdown Rendering

Supports GitHub Flavored Markdown, tables, code blocks, footnotes…

### 🔹 PlantUML Support in Markdown

Automatically renders the following block:

\`\`\`plantuml
@startuml
Alice -> Bob: Hello
@enduml
\`\`\`

### 🔹 Full Mermaid Support

Flowchart, sequence, Gantt, class diagram, ERD…

### 🔹 D2 (Terrastruct) Support

Modern text-to-diagram language, rendered client-side via WebAssembly.

### 🔹 No Installation – 100% Web-based

Renders in your browser, ensuring security and high performance.

---

## PlantUML Demo

\`\`\`plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Response
@enduml
\`\`\`

---

## Mermaid Demo

\`\`\`mermaid
flowchart TD
    A[Start] --> B{Check Input}
    B -->|Valid| C[Process]
    B -->|Invalid| D[Error]
\`\`\`

---

## D2 Demo

\`\`\`d2
direction: right

user: User {
  shape: person
}

api: API Gateway {
  shape: hexagon
}

db: Database {
  shape: cylinder
}

user -> api: request
api -> db: query
db -> api: rows
api -> user: response
\`\`\`

---

## Why Choose This Markdown Viewer?

- Completely free
- Fast diagram rendering
- Optimized for developers / architects
- Supports many diagram types
- Compatible with all browsers

---

## FAQ

**Q: Does Markdown Viewer support PlantUML?**  
A: Yes. Just use the \`plantuml\` code block.

**Q: Is Mermaid fully supported?**  
A: Yes, including flowchart, sequence, class, gantt…

**Q: Does Markdown Viewer support D2?**  
A: Yes. Use the \`d2\` code block; diagrams are rendered locally via WebAssembly.

**Q: Is my data uploaded to a server?**  
A: No. All processing runs in your browser.

---

## PlantUML Viewer Online – Render UML from Markdown

PlantUML Viewer allows you to render UML diagrams directly from Markdown.  
Supports sequence, class, state, component, activity…

---

## PlantUML Example

\`\`\`plantuml
@startuml
Alice -> Bob: Hello
Bob --> Alice: Hi!
@enduml
\`\`\`

---

## Supported Diagram Types

- Sequence Diagram
- Class Diagram
- Activity Diagram
- Component Diagram
- State Diagram
- Deployment Diagram

---

## How to Use PlantUML in Markdown

\`\`\`\`markdown
\`\`\`plantuml
@startuml
' your UML here
@enduml
\`\`\`
\`\`\`\`

---

Made with ❤️ by DucMami
`;