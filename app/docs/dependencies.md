# Dependencies

IdeaBox relies on several key dependencies to provide its functionality. Here's an overview of the main libraries and tools used in the project:

## Core Dependencies

- **Next.js**: A React framework for building server-side rendered and statically generated applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## UI and Styling

- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **shadcn/ui**: A collection of re-usable components built with Radix UI and Tailwind CSS.

## Functionality

- **react-draggable**: A draggable component for React.
- **@radix-ui/react-dropdown-menu**: Accessible dropdown menu components.
- **@radix-ui/react-slider**: An accessible slider component.
- **lucide-react**: A set of beautiful and consistent icons for React applications.

## Development Tools

- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **PostCSS**: A tool for transforming CSS with JavaScript.

## Installation

To install all dependencies, run the following command in the project root:

```bash
npm install
```

## Updating Dependencies

To update the dependencies to their latest versions, you can use:

```bash
npm update
```

## Custom Components

The project also includes several custom components built on top of these dependencies:

- `Canvas`: The main drawing area component.
- `Note`: Component for sticky notes.
- `Shape`: Component for various shapes (square, circle, triangle).
- `TextElement`: Component for text elements on the canvas.
- `ToolBar`: Component for the toolbar with various drawing tools.

These components leverage the core dependencies to create the interactive whiteboard functionality.
