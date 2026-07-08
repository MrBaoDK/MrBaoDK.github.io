# Bao DK — Data & Quality Engineer

This is the repository for my personal portfolio and landing site, built with a focus on high performance, modern design, and a conversational user experience.

[baodk.tech](https://baodk.tech)

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & Vanilla CSS
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Deployment**: [GitHub Pages](https://pages.github.com/)

## Project Structure

This project uses a **pnpm workspace** to manage dependencies and packages.

```text
.
├── .agents/             # AI Agent rules and workflows
├── site/                # Primary React application
│   ├── src/             # Component source code
│   │   ├── components/  # React components
│   │   ├── data/        # Shared data files (projects, capabilities, etc.)
│   │   └── styles/      # Global CSS and Tailwind configuration
│   ├── public/          # Static assets
│   └── package.json     # Site-specific dependencies
├── package.json         # Workspace root with shared scripts
└── pnpm-workspace.yaml  # Workspace definitions
```

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/installation) installed globally.

### Local Development

1.  **Install dependencies**:
    ```sh
    pnpm install
    ```

2.  **Start the development server**:
    ```sh
    pnpm dev
    ```
    The site will be available at `http://localhost:5173`.

3.  **Build for production**:
    ```sh
    pnpm build
    ```

4.  **Deploy to GitHub Pages**:
    ```sh
    pnpm gh-deploy
    ```

## Development Workflow

- **Rules**: Interaction rules for AI agents are located in [`.agents/rules`](.agents/rules).
- **Styles**: Global styles and CSS variables are defined in `site/src/styles/globals.css`.
- **Imports**: Use the `@baodk-site/` alias for internal imports within the `site` package.

## License

This project is licensed under the [MIT License](LICENSE).
