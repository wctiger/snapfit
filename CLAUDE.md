# CLAUDE.md - AI Assistant Guide for SNAPFIT

> **Last Updated**: 2026-01-13
> **Repository**: SNAPFIT - Photo Preparation Tool for Printing

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [State Management](#state-management)
- [Styling System](#styling-system)
- [Development Workflow](#development-workflow)
- [Code Conventions](#code-conventions)
- [Key Files Reference](#key-files-reference)
- [Feature Development Guidelines](#feature-development-guidelines)
- [Common Patterns](#common-patterns)
- [Git Workflow](#git-workflow)
- [AI Assistant Guidelines](#ai-assistant-guidelines)

---

## Project Overview

**SNAPFIT** is a web application that helps users prepare photos for printing on various paper sizes. It provides a streamlined workflow:

1. **Upload** - Users upload images from their local file system
2. **Crop** - Crop images to specific dimensions for photo paper sizes
3. **Collate** - Arrange multiple copies on selected photo paper with background options
4. **Preview** - View and download the final print layout

### Key Features
- Aspect ratio selection for standard photo sizes (passport, 4R, 5R, etc.)
- Zoom control for precise cropping
- Photo paper selection (A3, A4, A5, B-series, inch sizes)
- Background color customization (White, Blue, Gray)
- Live preview of print layout
- Light/Dark theme toggle
- Optimized print efficiency (auto-rotation for better paper utilization)

---

## Tech Stack

### Core Technologies
- **Framework**: React 18.1.0 with TypeScript 5.8.3
- **Build Tool**: Vite 7.0.0
- **State Management**: Zustand 5.0.6
- **Styling**: Tailwind CSS 3.4.17 + shadcn/ui components
- **UI Components**: Radix UI primitives
- **Image Processing**: react-easy-crop 4.2.0 + Canvas API
- **Icons**: lucide-react 0.555.0

### Development Tools
- **TypeScript**: Strict mode enabled
- **Prettier**: Code formatting (4 spaces, single quotes, 120 char width)
- **PostCSS**: CSS processing with Autoprefixer
- **Path Aliases**: `@/*` maps to `./src/*`

### Deployment
- **Platform**: GitHub Pages
- **CI/CD**: GitHub Actions (Node 24.x)
- **Base Path**: `/snapfit/`

---

## Project Structure

```
/home/user/snapfit/
├── .github/
│   └── workflows/
│       └── gh-pages.yml          # GitHub Pages deployment
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── index.tsx         # Layout wrapper
│   │   │   ├── TopBar.tsx        # Header with theme toggle
│   │   │   └── Footer.tsx        # Footer component
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── slider.tsx
│   │   │   └── toggle-group.tsx
│   │   ├── ContentFactory.tsx    # Main content router
│   │   └── StyledPaper.tsx       # Shared paper component
│   ├── config/
│   │   ├── photo-paper-config.json      # Paper sizes (A4, 4R, etc.)
│   │   └── target-image-config.json     # Crop aspect ratios
│   ├── core/
│   │   ├── imageWorker.ts        # Web Worker for image collation
│   │   └── imageHelpers.ts       # Canvas/image utilities
│   ├── features/                 # Feature-based organization
│   │   ├── collate/
│   │   │   ├── Collate.tsx       # Collate feature component
│   │   │   └── hooks/
│   │   │       └── useImageCollate.ts
│   │   ├── crop/
│   │   │   └── Crop.tsx          # Crop feature component
│   │   ├── preview/
│   │   │   └── Preview.tsx       # Preview feature component
│   │   └── upload/
│   │       └── Upload.tsx        # Upload feature component
│   ├── lib/
│   │   └── utils.ts              # Tailwind utility (cn helper)
│   ├── stores/
│   │   └── store.ts              # Zustand global state
│   ├── types/
│   │   ├── index.ts              # Type exports
│   │   └── IImageConfig.ts       # Image config interface
│   ├── utils/
│   │   └── index.ts              # Utility functions
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Tailwind + CSS variables
│   └── vite-env.d.ts             # Vite types
├── index.html                    # HTML entry
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite config
├── tailwind.config.js            # Tailwind config
├── components.json               # shadcn/ui config
└── .prettierrc                   # Prettier config
```

---

## Architecture & Design Patterns

### 1. Feature-Based Architecture
The app uses a **feature-based folder structure** where each feature (upload, crop, collate, preview) is self-contained:
- Each feature has its own component(s)
- Hooks are co-located with features (`features/collate/hooks/`)
- Promotes modularity and separation of concerns

### 2. Content Factory Pattern
**Location**: `src/components/ContentFactory.tsx`

The `ContentFactory` component acts as a **conditional router** based on global state:

```typescript
const ContentFactory = () => {
    const uploadImage = useStore(state => state.uploadImage);

    const getLeftComp = () => {
        if (uploadImage) return <Crop />;
        return <Upload />;
    };

    const getRightComp = () => {
        if (uploadImage) return <Collate />;
        return <Preview />;
    };

    return <Layout leftComp={getLeftComp()} rightComp={getRightComp()} />;
};
```

**Key Insight**: Navigation is state-driven, not route-based. The app is a single-page application without React Router.

### 3. Web Worker for Performance
**Location**: `src/core/imageWorker.ts`

Image collation (arranging multiple photos on paper) runs in a **Web Worker** to avoid blocking the main thread:
- Receives canvas, dimensions, and background color via `postMessage`
- Calculates optimal photo positions (with auto-rotation)
- Uses `putImageData` for efficient rendering
- Maintains 5px gutter between images

### 4. Canvas-Based Image Processing
**Location**: `src/core/imageHelpers.ts`

All image manipulation uses the **Canvas API**:
- Cropping via `canvas.drawImage()` with pixel coordinates
- Scaling to match target dimensions
- Export to blob/data URL for downloads

---

## State Management

### Zustand Store
**Location**: `src/stores/store.ts`

Global state is managed with **Zustand** (simple, performant):

```typescript
interface AppState {
    theme: 'light' | 'dark';           // Current theme
    uploadImage: string | null;         // Base64/blob URL of uploaded image
    crop: Area | null;                  // Crop area from react-easy-crop
    targetImage: IImageConfig | null;   // Selected crop aspect ratio
    photoPaper: IImageConfig | null;    // Selected paper size

    // Setters
    setTheme: (theme: 'light' | 'dark') => void;
    setUploadImage: (image: string | null) => void;
    setCrop: (crop: Area | null) => void;
    setTargetImage: (image: IImageConfig | null) => void;
    setPhotoPaper: (paper: IImageConfig | null) => void;
}
```

**Usage Pattern**:
```typescript
// Read state
const uploadImage = useStore(state => state.uploadImage);

// Update state
const { setUploadImage } = useStore();
setUploadImage(imageDataUrl);
```

### State Flow
1. **Upload Phase**: User uploads → `uploadImage` set → triggers Crop/Collate views
2. **Crop Phase**: User adjusts crop → `crop` and `targetImage` updated
3. **Collate Phase**: User selects paper → `photoPaper` set → preview generated
4. **Reset**: `setUploadImage(null)` clears state and returns to Upload view

---

## Styling System

### Tailwind CSS + shadcn/ui
The project uses **utility-first CSS** with Tailwind and **pre-built accessible components** from shadcn/ui.

#### CSS Variables
**Location**: `src/index.css`

Theme colors are defined as **HSL CSS variables**:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

#### Theme Switching
**Location**: `src/App.tsx`

Theme switching updates the `<html>` class:
```typescript
useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
}, [theme]);
```

#### Component Library
All UI components use **Radix UI primitives** + **Tailwind**:
- `Button`, `Select`, `Slider`, `Label` → from `@/components/ui/*`
- Variants managed via `class-variance-authority`
- Utilities combined with `tailwind-merge` (via `cn()` helper)

#### Styling Conventions
- Use **Tailwind utilities** first (e.g., `className="flex gap-4"`)
- Use **semantic color tokens** (e.g., `bg-background`, `text-foreground`)
- Avoid custom CSS unless absolutely necessary
- Follow shadcn/ui component patterns for consistency

---

## Development Workflow

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
- Starts Vite dev server with HMR
- Typically runs on `http://localhost:5173`

### Build
```bash
npm run build
```
1. Runs TypeScript compiler (`tsc`)
2. Builds optimized bundle with Vite
3. Output to `/dist`

### Preview Production Build
```bash
npm run preview
```

### Deployment
**Automatic via GitHub Actions** (`.github/workflows/gh-pages.yml`):
- Triggered on push/PR to `main`
- Runs `npm ci` → `npm run build`
- Deploys `/dist` to `gh-pages` branch
- Live at: `https://<username>.github.io/snapfit/`

**Important**: Vite config has `base: '/snapfit/'` for GitHub Pages routing.

---

## Code Conventions

### TypeScript
- **Strict mode enabled**: All type checks enforced
- **No `any` types**: Use proper types or `unknown`
- **Path aliases**: Import from `@/*` (maps to `src/*`)
- **JSON imports**: Enabled via `resolveJsonModule: true`

Example:
```typescript
import { IImageConfig } from '@/types';
import imageConfigArr from '@/config/target-image-config.json';
```

### Prettier Configuration
**Location**: `.prettierrc`

```json
{
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true,
    "printWidth": 120,
    "arrowParens": "avoid"
}
```

**Key Rules**:
- **4 spaces** for indentation (not 2)
- **Single quotes** for strings
- **Semicolons required**
- **120 character** line limit
- **ES5 trailing commas**
- **Avoid arrow parentheses** for single params

### File Naming
- **Components**: PascalCase (e.g., `Crop.tsx`, `TopBar.tsx`)
- **Utilities**: camelCase (e.g., `imageHelpers.ts`, `utils.ts`)
- **Types**: PascalCase with `I` prefix (e.g., `IImageConfig.ts`)
- **Config**: kebab-case (e.g., `photo-paper-config.json`)

### Import Order
1. External libraries (React, Zustand, etc.)
2. Internal components (`@/components/*`)
3. Internal types (`@/types/*`)
4. Internal utilities (`@/utils/*`)
5. Config files

Example:
```typescript
import { useState, useEffect } from 'react';
import { useStore } from '@/stores/store';
import { Button } from '@/components/ui/button';
import { IImageConfig } from '@/types';
import { downloadImage } from '@/utils';
import imageConfigArr from '@/config/target-image-config.json';
```

---

## Key Files Reference

### Configuration Files

#### `IImageConfig.ts` (src/types/)
```typescript
export interface IImageConfig {
    name: string;              // Display name (e.g., "4 x 6", "A4")
    descripton?: string;       // Optional description (typo in original)
    height: number;            // Height in specified unit
    width: number;             // Width in specified unit
    unit: 'cm' | 'inch' | 'px'; // Measurement unit
    backgroundColor?: string;  // Optional background color
}
```

#### `photo-paper-config.json` (src/config/)
Defines available paper sizes:
```json
[
    { "name": "4 x 6", "width": 6, "height": 4, "unit": "inch" },
    { "name": "A4", "width": 21, "height": 29.7, "unit": "cm" },
    { "name": "5寸(3R)", "width": 12.7, "height": 8.9, "unit": "cm" }
]
```

#### `target-image-config.json` (src/config/)
Defines crop aspect ratios (passport sizes, etc.)

### Core Processing

#### `imageWorker.ts` (src/core/)
Web Worker for collating images:
- **Input**: Canvas, target dimensions, paper dimensions, background color
- **Algorithm**:
  1. Calculate grid (columns × rows) for portrait orientation
  2. Calculate grid for landscape (rotated paper) orientation
  3. Choose orientation with more photos (`rotatePaper` flag)
  4. Center grid on paper
  5. Place images with 5px gutter
- **Output**: Modifies canvas in-place

**Key Constant**: `GUTTER = 5` (pixels between images)

#### `imageHelpers.ts` (src/core/)
Canvas utilities:
- `getCroppedImg()`: Extracts cropped region to new canvas
- Uses `OffscreenCanvas` where supported

### Features

#### `Upload.tsx` (src/features/upload/)
- File input with drag-and-drop
- Converts to data URL via `FileReader`
- Sets `uploadImage` in store

#### `Crop.tsx` (src/features/crop/)
- Uses `react-easy-crop` library
- Zoom control: 1.0 to 3.0 (step 0.05)
- Target size selector (populates from `target-image-config.json`)
- Actions:
  - **Preview Cropped Image**: Downloads cropped result
  - **Pick Another Photo**: Resets `uploadImage` to `null`

#### `Collate.tsx` (src/features/collate/)
- Paper size selector (from `photo-paper-config.json`)
- Background color toggle (White, Blue, Gray)
- Uses `useImageCollate` hook
- Invokes Web Worker for rendering
- **Download Print** button

#### `Preview.tsx` (src/features/preview/)
- Shows instructions when no image uploaded
- Visual guidance for print preview

---

## Feature Development Guidelines

### Adding a New Feature
1. **Create feature folder**: `src/features/<feature-name>/`
2. **Add main component**: `<FeatureName>.tsx`
3. **Co-locate hooks**: `src/features/<feature-name>/hooks/`
4. **Update ContentFactory**: Add conditional rendering logic
5. **Update store** (if needed): Add new state slices
6. **Add types** (if needed): Define interfaces in `src/types/`

### Adding a New UI Component
1. **Use shadcn/ui CLI** (if available):
   ```bash
   npx shadcn-ui@latest add <component-name>
   ```
2. **Manual addition**:
   - Place in `src/components/ui/`
   - Follow Radix UI + Tailwind pattern
   - Use `cn()` utility for class merging

### Adding New Paper Sizes
1. Edit `src/config/photo-paper-config.json`
2. Add object with `name`, `width`, `height`, `unit`
3. No code changes needed (loaded dynamically)

### Adding New Crop Ratios
1. Edit `src/config/target-image-config.json`
2. Follow same structure as paper config
3. Component auto-populates from JSON

---

## Common Patterns

### Pattern 1: Store Selectors
```typescript
// ✅ Good - Selective subscription
const uploadImage = useStore(state => state.uploadImage);

// ❌ Avoid - Re-renders on any state change
const store = useStore();
```

### Pattern 2: Refs for Non-Reactive Data
```typescript
// Used in Crop.tsx for preview URL
const croppedImageRaw = useRef<string>('');
```
**Why**: Preview URL doesn't need to trigger re-renders

### Pattern 3: Config-Driven UI
```typescript
// Import JSON directly
import imageConfigArr from '@/config/target-image-config.json';

// Map to UI
{imageConfigArr.map(({ name, descripton }) => (
    <SelectItem key={name} value={name}>
        {`${name} ${descripton ? '(' + descripton + ')' : ''}`}
    </SelectItem>
))}
```

### Pattern 4: Canvas to Download
```typescript
// Typical flow
canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'output.jpg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
});
```

### Pattern 5: Type-Safe Config Loading
```typescript
// TypeScript doesn't validate JSON structure at runtime
// Use type assertion with caution
const selectedConfig: IImageConfig = imageConfigArr[0]; // ⚠️ Assumes structure
```

---

## Git Workflow

### Branch Strategy
- **Main branch**: `main` (protected)
- **Feature branches**: `feature/<feature-name>`
- **AI branches**: `claude/claude-md-<session-id>`

### Commit Messages
- Use conventional commits (e.g., `feat:`, `fix:`, `docs:`)
- Be descriptive (see git log for examples):
  - `feat: Add dark mode toggle`
  - `fix: resolve Select component layout conflict in Collate feature`
  - `docs: Add README.md with app features and UI description`

### Pull Requests
- PRs trigger GitHub Actions build
- Must pass build before merge
- Squash and merge to keep history clean

---

## AI Assistant Guidelines

### When Working on This Codebase

#### ✅ DO
1. **Read before writing**: Always check existing patterns before adding code
2. **Use path aliases**: Import from `@/*`, not relative paths
3. **Follow Prettier rules**: 4 spaces, single quotes, 120 char width
4. **Check types**: Enable TypeScript strict mode in editor
5. **Update configs**: Add new paper sizes/ratios via JSON (not hardcoded)
6. **Test locally**: Use `npm run dev` to verify changes
7. **Consider performance**: Large image operations should use Web Workers
8. **Maintain feature isolation**: Keep features self-contained
9. **Use shadcn/ui**: Prefer existing UI components over custom ones
10. **Respect theme system**: Use CSS variables, not hardcoded colors

#### ❌ DON'T
1. **Don't add routing**: App is single-page, state-driven navigation
2. **Don't use `any` type**: Always define proper interfaces
3. **Don't bypass Prettier**: Format code according to `.prettierrc`
4. **Don't hardcode dimensions**: Use config JSON files
5. **Don't add heavy dependencies**: Keep bundle size minimal
6. **Don't break Web Worker**: `imageWorker.ts` must remain separate
7. **Don't modify `base` path**: Vite config has `/snapfit/` for GitHub Pages
8. **Don't skip type checks**: Run `tsc` before committing
9. **Don't create custom CSS**: Use Tailwind utilities and CSS variables
10. **Don't ignore mobile**: UI should be responsive

### Common Tasks

#### Task: Add a new paper size
```json
// Edit: src/config/photo-paper-config.json
{ "name": "New Size", "width": 20, "height": 25, "unit": "cm" }
```

#### Task: Fix a type error
1. Check `tsconfig.json` for strict rules
2. Define proper interface in `src/types/`
3. Import and use type annotations
4. Run `npm run build` to verify

#### Task: Update theme colors
```css
/* Edit: src/index.css */
:root {
  --primary: <new-hsl-value>;
}
.dark {
  --primary: <new-dark-hsl-value>;
}
```

#### Task: Optimize image processing
1. Profile with Chrome DevTools
2. Move heavy operations to `imageWorker.ts`
3. Use `OffscreenCanvas` where supported
4. Debounce user inputs (zoom, crop adjustments)

#### Task: Debug state issues
1. Add Zustand DevTools (if not present)
2. Check `src/stores/store.ts` for state shape
3. Verify `ContentFactory.tsx` conditional logic
4. Trace state updates with `console.log` in setters

### Code Review Checklist
- [ ] TypeScript compiles (`npm run build`)
- [ ] Prettier formatted (4 spaces, single quotes)
- [ ] No `any` types introduced
- [ ] State updates use Zustand setters
- [ ] UI uses shadcn/ui components + Tailwind
- [ ] Config changes in JSON (not hardcoded)
- [ ] No breaking changes to `imageWorker.ts`
- [ ] Mobile responsive (test at 375px width)
- [ ] Theme works in light + dark mode
- [ ] No console errors in dev mode

---

## Notes on Typos and Known Issues

### Known Typo
**Location**: `src/types/IImageConfig.ts:3`

```typescript
descripton?: string;  // ⚠️ Typo: should be "description"
```

**Status**: Exists in production. Fixing requires:
1. Update interface
2. Update all JSON config files
3. Update component destructuring
4. Regression test all features

**Decision**: Document here; fix in major version bump.

---

## Performance Considerations

### Image Processing Bottlenecks
1. **Cropping**: Runs on main thread (react-easy-crop handles this)
2. **Collation**: Runs in Web Worker (good)
3. **Download**: Synchronous canvas-to-blob conversion

### Optimization Opportunities
- Use `ImageBitmap` for faster canvas operations
- Implement canvas caching for collate preview
- Debounce zoom slider (currently updates on every pixel change)
- Lazy-load config JSON (currently loaded upfront)

### Bundle Size
- Current stack is minimal (no heavy libraries)
- Largest deps: React, Radix UI components
- Consider code-splitting features if bundle grows

---

## Testing Strategy

**Current State**: No automated tests present.

**Recommended Additions**:
1. **Unit tests**: `imageHelpers.ts`, `imageWorker.ts` calculations
2. **Component tests**: Feature components with React Testing Library
3. **E2E tests**: Playwright/Cypress for upload → crop → collate flow
4. **Visual regression**: Percy/Chromatic for UI changes

**Blocked on**: Team decision to add testing framework.

---

## Accessibility

### Current Implementation
- **shadcn/ui components**: Built on Radix UI (accessible by default)
- **Keyboard navigation**: Works for buttons, selects, sliders
- **Theme contrast**: WCAG AA compliant (light + dark modes)

### Improvements Needed
- Add `aria-label` to file input
- Announce crop changes to screen readers
- Test with NVDA/JAWS
- Add focus indicators for keyboard users

---

## Browser Support

### Tested
- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)

### Required Features
- Canvas API
- FileReader API
- Web Workers
- CSS Grid/Flexbox

**IE11**: Not supported (uses modern ES2020 features).

---

## Resources

### Documentation
- [React Docs](https://react.dev)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)
- [Vite Guide](https://vitejs.dev/guide/)

### Internal References
- **Main README**: `/README.md` (user-facing features)
- **GitHub Issues**: Track bugs and feature requests
- **Pull Requests**: Code review history

---

## Maintenance

### Dependencies
- **Update strategy**: Monthly security patches
- **Major upgrades**: Coordinate with team (breaking changes)
- **Lockfile**: `package-lock.json` committed (ensures reproducible builds)

### Build Artifacts
- **Git ignored**: `/dist`, `/node_modules`, `tsconfig.tsbuildinfo`
- **Deployed**: `/dist` copied to `gh-pages` branch

---

## Contact & Support

- **Repository Owner**: wctiger
- **Issues**: GitHub Issues tab
- **License**: See `LICENSE` file

---

**End of CLAUDE.md** | Last updated: 2026-01-13
