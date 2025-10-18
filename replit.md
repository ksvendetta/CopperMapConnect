# Fiber Optic Cable Splicing Management Application

## Overview

This application is a professional fiber optic cable splicing management tool designed for mapping and tracking fiber connections between multiple cables. It provides visual splice diagrams and workflow management for technical fiber optic infrastructure work. The system enables users to create cables with specific fiber counts and ribbon configurations, then define splice connections between fibers across different cables, with visual representations of the connections and their completion status.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (only Home and NotFound pages)

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management with automatic caching and synchronization
- React Hook Form with Zod validation for form state management and validation
- Query client configured with infinite stale time and disabled automatic refetching for stable data scenarios

**UI Component System**
- Shadcn UI component library (New York style variant) with Radix UI primitives
- Tailwind CSS with custom HSL-based color system for theming
- Material Design principles adapted for technical/industrial use case
- Custom fiber color visualization system matching industry-standard fiber optic color codes (12 colors: blue, orange, green, brown, slate, white, red, black, yellow, violet, pink, aqua)

**Design System Highlights**
- Dark mode as primary interface with deep navy-charcoal backgrounds (220 15% 10%)
- Professional blue primary color (220 90% 56%)
- Exact HSL color specifications for fiber optic standard colors
- Typography: Inter for UI, JetBrains Mono for technical data (cable IDs, fiber numbers)
- Responsive spacing using Tailwind's scale (2, 4, 6, 8, 12, 16, 20)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for RESTful API endpoints
- HTTP server created via Node's built-in http module
- Custom middleware for request logging with response capture
- Error handling middleware for centralized error responses

**API Design**
- RESTful endpoints under `/api` prefix
- CRUD operations for cables: GET /api/cables, GET /api/cables/:id, POST /api/cables, PUT /api/cables/:id, DELETE /api/cables/:id
- CRUD operations for splices: GET /api/splices, GET /api/splices/:id, POST /api/splices, PUT /api/splices/:id, DELETE /api/splices/:id
- Request validation using Zod schemas derived from Drizzle ORM schema definitions
- JSON request/response format with appropriate HTTP status codes

**Development & Production Modes**
- Development: Vite middleware integration for hot module replacement
- Production: Static file serving from dist/public directory
- Conditional Replit-specific plugins for development features

### Data Storage Solutions

**ORM & Schema Management**
- Drizzle ORM for type-safe database operations with PostgreSQL dialect
- Schema-first approach with Drizzle-Zod integration for automatic validation schema generation
- Database schema defined in shared/schema.ts for full-stack type sharing

**Database Schema**
- **Cables Table**: Stores cable definitions with id (UUID), name, fiberCount, ribbonSize (default 12), and type fields
- **Splices Table**: Stores fiber connections between cables with source/destination cable references, ribbon numbers, fiber ranges (start/end), optional PON range, and completion status
- UUID primary keys using PostgreSQL's gen_random_uuid()
- Integer-based boolean for splice completion status (0/1) for database compatibility

**Storage Abstraction**
- IStorage interface defining all data operations for cables and splices
- MemStorage class implementing in-memory storage for development/testing
- Design allows easy swap to PostgreSQL implementation via Drizzle ORM
- Cascade deletion support (deleting a cable removes associated splices)

### External Dependencies

**Database**
- PostgreSQL (via Neon serverless driver @neondatabase/serverless)
- Drizzle Kit for schema migrations (output to ./migrations directory)
- Connection via DATABASE_URL environment variable (required)

**Core Libraries**
- React ecosystem: react, react-dom, wouter (routing)
- State management: @tanstack/react-query, react-hook-form
- Validation: zod, @hookform/resolvers
- UI components: Full Radix UI suite (@radix-ui/react-*)
- Styling: tailwindcss, class-variance-authority, clsx, tailwind-merge
- Date handling: date-fns
- Utilities: nanoid (ID generation), cmdk (command palette)

**Development Tools**
- TypeScript with strict mode enabled
- ESBuild for production server bundling
- Replit-specific plugins: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner
- PostCSS with Tailwind and Autoprefixer

**Build & Deployment**
- npm scripts: dev (tsx with NODE_ENV=development), build (Vite + ESBuild bundling), start (production node server)
- Client built to dist/public, server bundled to dist/index.js
- Path aliases: @/ for client/src, @shared/ for shared, @assets/ for attached_assets
- Module resolution: ESNext with bundler mode for modern import syntax