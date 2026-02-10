# react-material-symbol-icons

[![npm version](https://img.shields.io/npm/v/react-material-symbol-icons)](https://www.npmjs.com/package/react-material-symbol-icons)
[![npm downloads](https://img.shields.io/npm/dm/react-material-symbol-icons)](https://www.npmjs.com/package/react-material-symbol-icons)
[![license](https://img.shields.io/npm/l/react-material-symbol-icons)](./LICENSE)
[![release](https://img.shields.io/github/actions/workflow/status/yteruel31/react-material-symbol-icons/release.yml?branch=main&label=release)](https://github.com/yteruel31/react-material-symbol-icons/actions/workflows/release.yml)
![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)

> React component library for [Google Material Symbols](https://fonts.google.com/icons) with full TypeScript support.

## Features

- **Fully typed** -- autocomplete for 3,000+ icon names via the `IconKey` type
- **Three themes** -- Outlined, Rounded, and Sharp
- **Variable font axes** -- control weight, fill, grade, and optical size
- **Lightweight** -- uses CSS variable fonts, no SVG bundles
- **Ref forwarding** -- supports `React.forwardRef`
- **Tree-shakeable** -- dual ESM + CJS format
- **RSC compatible** -- includes `"use client"` directive

## Live Demo

Browse all icons and props in the interactive [Storybook](https://yteruel31.github.io/react-material-symbol-icons/).

## Installation

```bash
# npm
npm install react-material-symbol-icons

# yarn
yarn add react-material-symbol-icons

# pnpm
pnpm add react-material-symbol-icons
```

## Usage

```tsx
import { MaterialSymbol } from 'react-material-symbol-icons';

function App() {
  return <MaterialSymbol icon="check_circle" />;
}
```

With all props:

```tsx
<MaterialSymbol
  icon="settings"
  theme="rounded"
  size={24}
  weight="400"
  filled
  color="#1976d2"
  grade="200"
/>
```

## Props

The `MaterialSymbol` component extends `React.HTMLAttributes<HTMLSpanElement>`, so it accepts all standard `<span>` attributes (`className`, `style`, `onClick`, `aria-label`, etc.) in addition to:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `IconKey` | *(required)* | Material Symbol icon name |
| `filled` | `boolean` | `false` | Whether the icon is filled |
| `theme` | `'outlined' \| 'rounded' \| 'sharp'` | `'outlined'` | Icon theme variant |
| `weight` | `'100' \| '200' \| '300' \| '400' \| '500' \| '600' \| '700'` | `'500'` | Font weight |
| `size` | `'20' \| '24' \| '40' \| '48' \| number` | `'48'` | Icon size in pixels |
| `color` | `CSSProperties['color']` | `'currentColor'` | Icon color |
| `grade` | `'-25' \| '0' \| '200'` | `'0'` | Icon grade (emphasis level) |

## TypeScript

The `IconKey` type is exported for type-safe icon name usage:

```typescript
import type { IconKey } from 'react-material-symbol-icons';

const icon: IconKey = 'check_circle';
```

## Contributing

Feel like contributing? That's awesome! We have a [contributing guide](./CONTRIBUTING.md) to help guide you.

## License

[MIT](./LICENSE)
