# Component Library

A collection of high-quality, standalone React components built with Vite, TypeScript, and Tailwind CSS.

## Components

### 1. Calculator
A minimalist, high-contrast calculator with a sharp-edged design.
- **Features**: Standard arithmetic, percentage, and sign toggle.
- **Design**: "No rounded edges" aesthetic, dark theme, responsive layout.

### 2. Todo
A slick task management component with smooth animations.
- **Features**: Task creation, completion toggling, deletion, and progress tracking.
- **Animations**: Powered by Framer Motion for fluid transitions and layout changes.
- **Icons**: Lucide React.

## Technology Stack
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (for Todo)
- **Lucide React** (for Todo)

## Usage

Each component is exported as a named export.

```tsx
import { Calculator, Todo } from './components';

function App() {
  return (
    <div className="flex flex-col gap-8">
      <Calculator />
      <Todo title="Daily Goals" />
    </div>
  );
}
```

## Development

```bash
pnpm install
pnpm dev
```

## Building for Distribution

```bash
pnpm build
```
The build process generates ESM modules in the `dist` folder.
