# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kit For Dev is a collection of 87 developer utilities organized into 9 categories (Crypto, Converter, Web, Images/Videos, Development, Network, Math, Measurement, Text, Data). It's a Vue 3 single-page application built with Vite, TypeScript, and Naive UI.

## Essential Commands

**Development:**
- `pnpm dev` - Start development server
- `pnpm build` - Build for production (includes type checking)
- `pnpm preview` - Preview production build locally

**Testing:**
- `pnpm test` - Run unit tests with Vitest
- `pnpm coverage` - Generate test coverage reports
- `pnpm test:e2e` - Run Playwright E2E tests

**Quality:**
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

**Tool Creation:**
- `pnpm run script:create:tool [tool-name]` - Generate new tool boilerplate
- `pnpm run script:create:ui` - Generate UI component templates

## Architecture & Structure

**Tool System:**
Each tool is self-contained in `/src/tools/[category]/[tool-name]/` with:
- `index.ts` - Tool metadata (name, path, description, keywords, icon)
- `[tool-name].tool.vue` - Vue component implementation
- `locales/` - Internationalization files

**Key Directories:**
- `/src/tools/` - All tool implementations organized by category
- `/src/components/` - Shared Vue components
- `/src/composables/` - Vue composables for shared logic
- `/src/utils/` - Utility functions
- `/src/locales/` - Translation files

**Tech Stack:**
- Vue 3 with Composition API
- TypeScript throughout
- UnoCSS for styling (atomic CSS)
- Naive UI component library
- Pinia for state management
- vue-i18n for internationalization

**Important Patterns:**
- Auto-imports for Vue APIs, VueUse, and Naive UI components
- Lazy loading for all tools via dynamic imports
- Tool routing handled automatically based on metadata
- Theme support (dark/light) built into UnoCSS configuration

## Development Guidelines

**When creating new tools:**
1. Use the tool creation script: `pnpm run script:create:tool [name]`
2. Follow existing tool patterns in the same category
3. Include proper TypeScript types
4. Add internationalization support
5. Test with both light and dark themes

**Styling:**
- Use UnoCSS utilities (check `/uno.config.ts` for custom shortcuts)
- Follow existing component patterns from `/src/components/`
- Ensure responsive design works on mobile and desktop

**Testing:**
- Unit tests go in `/src/tools/[category]/[tool]/__tests__/`
- Use Vitest for unit testing
- Test edge cases and error handling

**Deployment:**
- Production builds optimize automatically
- Docker and Vercel configurations are maintained
- All static assets are properly handled by Vite