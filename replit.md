# Fiber Optic Cable Splicing Management Application

## Overview

This application is a professional fiber optic cable splicing management tool designed for managing circuits within fiber cables. It provides a simple checkbox-based system for marking circuits as spliced. The system enables users to create cables with specific fiber counts, define circuit IDs with auto-calculated fiber positions, and track which circuits have been spliced using checkboxes.

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
- Circuit operations: GET /api/circuits, GET /api/circuits/cable/:cableId, PATCH /api/circuits/:id/toggle-spliced, DELETE /api/circuits/:id
- Toggle splice status: PATCH /api/circuits/:id/toggle-spliced - Toggles the isSpliced boolean field and stores feed cable mapping
  - Request body: `{ feedCableId: "uuid", feedFiberStart: 21, feedFiberEnd: 24 }` (all required when splicing, optional when unsplicing)
  - When isSpliced set to 1, feedCableId, feedFiberStart, and feedFiberEnd are required and stored
  - When isSpliced set to 0, all feed-related fields are cleared
  - feedFiberStart/End are calculated from ribbon and strand: (ribbon - 1) * 12 + strand
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
- **Cables Table**: Stores cable definitions with id (UUID), name, fiberCount, ribbonSize (always 12, not exposed in UI), and type (restricted to "Feed" or "Distribution")
- **Circuits Table**: Stores circuit ID assignments and fiber allocations within each cable (cableId, circuitId, position, fiberStart, fiberEnd - all auto-calculated, isSpliced - integer 0/1, feedCableId - UUID reference to cables table, nullable, feedFiberStart - integer, nullable, feedFiberEnd - integer, nullable)
- UUID primary keys using PostgreSQL's gen_random_uuid()
- Integer-based boolean for isSpliced field (0/1) for database compatibility
- feedCableId field tracks which Feed cable a Distribution circuit is spliced to
- feedFiberStart and feedFiberEnd track which specific fibers in the Feed cable are mapped to this Distribution circuit

**Storage Abstraction**
- IStorage interface defining all data operations for cables and circuits
- DatabaseStorage class implementing PostgreSQL-backed persistent storage via Drizzle ORM
- Cascade deletion support (deleting a cable removes associated circuits)
- toggleCircuitSpliced method for updating isSpliced boolean field, feedCableId, feedFiberStart, and feedFiberEnd
- When splicing (isSpliced set to 1), feedCableId, feedFiberStart, and feedFiberEnd are stored
- When unsplicing (isSpliced set to 0), all feed-related fields are cleared (set to null)

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
- npm scripts: dev (tsx with NODE_ENV=development), build (Vite + ESBuild bundling), start (production node server), db:push (sync schema to database)
- Client built to dist/public, server bundled to dist/index.js
- Path aliases: @/ for client/src, @shared/ for shared, @assets/ for attached_assets
- Module resolution: ESNext with bundler mode for modern import syntax

## Key Features (Updated October 2025)

### Database Persistence
- Full PostgreSQL database integration via Neon serverless driver
- All cables and circuits persist across sessions
- Automatic schema migrations with Drizzle Kit
- UUID-based primary keys for all records

### Checkbox-Based Splicing System with Feed Cable Mapping
- Simple checkbox interface to mark Distribution circuits as "spliced" and map to Feed cables
- Only Distribution cables show splice checkboxes (Feed cables do not)
- Clicking checkbox opens dialog to select Feed cable and specify fiber range:
  - Feed Cable selection (dropdown showing all Feed cables)
  - Feed Ribbon number (1, 2, etc.)
  - Feed Strand range (1-12 within the ribbon)
- System calculates feed fiber numbers from ribbon and strand inputs
- feedCableId, feedFiberStart, and feedFiberEnd stored in circuits table
- Splice tab displays individual fiber mappings (one row per fiber):
  - Feed Cable fiber count | Feed Ribbon | Feed Strand (color-coded)
  - Circuit ID (e.g., lg,33)
  - Distribution Strand (color-coded) | Distribution Ribbon | Distribution Cable fiber count
- Industry-standard fiber optic color coding (12 colors: blue, orange, green, brown, slate, white, red, black, yellow, violet, pink, aqua)
- Colors repeat every 12 strands based on strand position within ribbon
- Real-time updates when toggling splice status
- Unchecking removes feedCableId, feedFiberStart, feedFiberEnd and circuit from Splice tab

### Cable Search
- **Cable Search**: Real-time search by cable name or type
- Instant UI updates using React useMemo for performance
- No-results states for better user experience

### Circuit ID Management (Auto-Calculated Fiber Positions)
- **Simplified Input**: Circuit ID is the ONLY required input (e.g., "lg,33-36", "b,1-2")
- **Auto-Calculation**: Fiber positions automatically calculated based on circuit order in the list
  - Circuit order determines ribbon placement
  - First circuit starts at fiber 1, subsequent circuits follow sequentially
  - Example: "lg,33-36" as 6th circuit → auto-assigned to R2: 9-12
- **Smart Recalculation**: Deleting a circuit automatically recalculates positions for all remaining circuits
- **Ribbon Display**: Shows exact ribbon and fiber positions (e.g., "R1: 1-2" or "R1: 5-12 and R2: 1-2" for spanning circuits)
- **Real-time Validation**: Pass/Fail indicator shows if circuits total exactly matches cable fiber count
- **Visual Feedback**: Shows assigned/total fiber count (e.g., "24 / 24 fibers")
- **Automatic Persistence**: All circuit data persists across sessions

### User Interface
- Two main tabs: **InputData** (for managing cables and circuits) and **Splice** (for viewing splice mappings)
- InputData tab: Cable list with search, cable details, and circuit management with splice checkboxes for Distribution cables
- Splice tab: Individual fiber mapping table (one row per fiber) with 7 columns:
  - Feed Cable | Feed Ribbon | Feed Strand (color-coded) | Circuit | Distribution Strand (color-coded) | Distribution Ribbon | Distribution Cable
  - Each strand colored with industry-standard fiber optic colors
  - Table header uses color accents to distinguish Feed vs Distribution sections
- Circuit display in InputData uses ribbon and strand format (e.g., "R1: 1-4") instead of raw fiber ranges
- Responsive design with professional technical interface
- Feed cable selection dialog with inputs for:
  - Feed Cable (dropdown)
  - Feed Ribbon (number input)
  - Feed Strand Start and End (number inputs, 1-12)

## Recent Changes (October 18, 2025)
- **Individual Fiber Mapping with Color Coding**:
  - Added feedFiberStart and feedFiberEnd fields to circuits table to track specific feed fiber positions
  - Updated Feed selection dialog to ask for Feed Ribbon and Strand range (not just cable)
  - Implemented fiber position calculation: (ribbon - 1) * 12 + strand = fiber number
  - Redesigned Splice tab to show individual fiber mappings (one row per fiber, not per circuit)
  - Added industry-standard fiber optic color coding (12 colors based on strand position)
  - Each fiber displays with colored chip matching its strand position color
  - Table shows: Feed Cable | Ribbon | Strand (colored) | Circuit | Strand (colored) | Ribbon | Distribution Cable
  - Updated toggle-spliced API to accept and store feedFiberStart and feedFiberEnd
  - Storage layer now manages feed fiber range along with feedCableId
- **Major Simplification - Checkbox-Based Splicing with Feed Cable Mapping**:
  - Replaced complex splice entity system with simple checkbox-based approach
  - Removed splice tables, forms, connections visualization, and related components
  - Added isSpliced boolean field (0/1) to circuits table
  - Updated CircuitManagement component to show checkboxes only for Distribution cables
  - Circuit display now shows ribbon and strand format (e.g., "R1: 1-4" or "R1:9-12 / R2:1-2")
  - Changed UI labels from "Spliced" to "Splice"
- **Auto-Calculated Circuit Management**:
  - Circuit ID as sole input (fiber positions calculated from order)
  - Automatic fiber range calculation based on circuit sequence
  - Smart recalculation when circuits are deleted
  - Pass/fail validation for complete fiber allocation
- **Integrated Cable and Circuit Creation**:
  - Circuits entered during cable creation via multi-line textarea
  - Backend creates cable and associated circuits in one transaction
  - Auto-validates that circuits don't exceed cable fiber capacity
- **Simplified Cable Configuration**:
  - Ribbon size always defaults to 12 (not exposed in UI)
  - Cable type restricted to "Feed" and "Distribution" only
  - Database persistence with PostgreSQL
  - Cable search functionality by name or type