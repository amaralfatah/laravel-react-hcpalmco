# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HC PalmCo is a Human Capital (HC) management system for PTPN IV PalmCo, built with Laravel (backend) and React (frontend). It manages corporate vision, value creation strategies, and human capital pillars for an agribusiness company.

## Tech Stack

**Backend:**
- Laravel 12.x (PHP 8.2+)
- Fortify for authentication
- Inertia.js for server-side rendering
- SQLite (dev), likely PostgreSQL/MySQL in production
- Wayfinder for route generation (PHP → TypeScript sync)

**Frontend:**
- React 19.2.x with TypeScript
- Vite for build tooling
- TailwindCSS v4 with custom theme
- Shadcn/ui (New York style) + Radix UI
- Inertia.js client-side
- React Compiler for optimization

## Development Commands

```bash
# Initial setup
composer run-setup

# Development (runs server, queue, and vite in parallel)
composer run dev

# Frontend only
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run build:ssr    # Build with SSR
npm run lint         # ESLint with fix
npm run format       # Prettier format
npm run types        # TypeScript check

# Backend
php artisan serve    # Laravel server
php artisan test     # Run Pest tests
```

## Architecture

### Directory Structure
```
├── app/                    # Laravel PHP code
│   ├── Actions/           # Fortify auth actions
│   ├── Http/              # Controllers, middleware
│   └── Models/            # Eloquent models
├── resources/
│   ├── js/
│   │   ├── actions/       # Auto-generated route actions (from Wayfinder)
│   │   ├── components/    # React components
│   │   │   └── ui/        # Shadcn/ui components
│   │   ├── layouts/       # Inertia layout components
│   │   └── pages/         # Inertia page components
│   ├── css/               # TailwindCSS styles
│   └── views/             # Blade templates (root, app)
├── routes/                # Laravel route definitions
└── database/              # Migrations, seeds
```

### Key Patterns

1. **Inertia.js Architecture**
   - Server-rendered by default
   - PHP controllers return Inertia responses
   - React components as page templates
   - Client-side routing handled by Inertia

2. **Route Actions (Wayfinder)**
   - PHP actions in `resources/js/actions/` are auto-generated
   - Provides type-safe route helpers
   - Keeps PHP and TypeScript routes in sync

3. **Layout System**
   - `AuthenticatedLayout` for logged-in users
   - `GuestLayout` for public pages
   - Full-screen layouts for auth pages

4. **Component Organization**
   - `/ui/` contains Shadcn/ui components
   - Custom components in parent directories
   - Variants system for component customization

## Business Domain Features

- Corporate Vision & Mission display
- Human Capital Strategy management
- 5 HC Pillars with initiatives
- Value Creation tracking
- Implementation initiatives

## Configuration

**Environment:**
- `APP_NAME` sets the application name
- `VITE_APP_NAME` for frontend
- Default database: SQLite

**Authentication:**
- Laravel Fortify
- Two-factor authentication enabled
- Session-based guard
- Redirect to `/dashboards` after login

## Styling

- TailwindCSS v4 with custom theme variables
- CSS custom properties for theming
- Dark mode via `.dark` class
- Mobile-first responsive design

## Testing

- Pest PHP testing framework
- GitHub Actions CI/CD
- Tests in `/tests/` directory
- Coverage with Xdebug

## Important Notes

1. Always run `npm run types` before committing to ensure type safety
2. Use `composer run dev` for full-stack development
3. When adding new routes, they'll be auto-generated in TypeScript via Wayfinder
4. Follow the existing component structure and naming conventions
5. The app uses progressive enhancement - works without JavaScript but enhances with it