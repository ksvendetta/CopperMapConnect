# Fiber Optic Cable Splicing Application - Design Guidelines

## Design Approach: Material Design System (Utility-Focused)
**Justification**: This is a specialized technical tool requiring clear data visualization, efficient workflows, and reliable interaction patterns. Material Design provides excellent support for data-dense interfaces with strong visual feedback.

## Color Palette

### Application Interface Colors (Dark Mode Primary)
- **Background**: 220 15% 10% (deep navy-charcoal)
- **Surface**: 220 15% 15% (elevated panels)
- **Surface Elevated**: 220 15% 18% (cards, modals)
- **Primary**: 220 90% 56% (professional blue for actions)
- **Text Primary**: 0 0% 98%
- **Text Secondary**: 220 10% 70%
- **Border**: 220 15% 25%
- **Success**: 142 70% 45% (splice completion indicators)
- **Warning**: 38 92% 50%

### Fiber Optic Standard Colors (Exact Specification Required)
Use these exact HSL values for fiber color representation:
- Blue: 220 90% 56%
- Orange: 25 95% 53%
- Green: 142 70% 45%
- Brown: 25 45% 35%
- Slate: 215 15% 50%
- White: 0 0% 95%
- Red: 0 85% 55%
- Black: 0 0% 15%
- Yellow: 48 95% 55%
- Violet: 270 60% 60%
- Pink: 330 75% 70%
- Aqua: 180 70% 50%

## Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace Font**: JetBrains Mono (for cable IDs, fiber numbers)
- **Headings**: 600 weight, tight tracking
- **Body**: 400 weight, normal line-height (1.6)
- **Data Labels**: 500 weight, 14px size
- **Technical Data**: Monospace, 13px for IDs and numbers

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 for consistent rhythm
- Small gaps: gap-2, gap-4 (component internal spacing)
- Section padding: p-6, p-8 (cards, panels)
- Page margins: mx-6, my-8
- Large separations: space-y-12, space-y-16

**Container Strategy**:
- Max width: max-w-7xl for main content area
- Sidebar/panels: Fixed 320px for InputData controls
- Responsive breakpoints: Mobile-first, stack at md:

## Component Library

### Navigation & Tabs
- **Tab Bar**: Fixed top navigation with 2 primary tabs (InputData, Splice)
- Active tab: Primary color underline (4px thick), bold weight
- Inactive tabs: Secondary text color, hover state with 50% primary color
- Tab content: Full-width below navigation with p-6 spacing

### InputData Tab Components

**Cable Management Panel**:
- Left sidebar (320px) with scrollable cable list
- Each cable card: Surface elevated background, rounded-lg, p-4
- Add Cable button: Full-width, primary color, rounded-md
- Cable cards show: ID (monospace), fiber count, ribbon configuration
- Edit/Delete icons: Top-right corner, ghost buttons

**Cable Configuration Form**:
- Right main area for selected cable details
- Form fields: Full-width inputs with labels above
- Number inputs: Steppers for fiber counts (12, 24, 48, 72, 96, 144, 288)
- Ribbon grouping: Toggle switches or checkboxes
- Save button: Primary, bottom-right alignment

**Splice Connection Editor**:
- Table layout with source → destination mapping
- Columns: Source Cable, Source Fibers, Destination Cable, Destination Fibers, Status
- Row hover: Subtle background highlight
- Checkboxes: Material Design style, success color when checked
- Add Splice button: Secondary button, icon + text

### Splice Tab Components

**Visual Splice Map**:
- Full-width canvas area with horizontal scroll if needed
- Cable representations: Vertical panels, 200px wide each
- Separation between cables: 120px for connection lines
- Each cable panel shows:
  - Header: Cable ID (bold, monospace), fiber count
  - Fiber ribbons: Stacked horizontal bars (20px height each)
  - Color coding: Left border (8px) in fiber color
  - PON ranges: Small text labels (monospace, 11px)

**Connection Lines**:
- SVG paths connecting source to destination fibers
- Line color: Matches source fiber color at 70% opacity
- Line width: 2px
- Curve style: Smooth bezier curves
- Hover: Increase opacity to 100%, width to 3px

**Status Indicators**:
- Checkbox at connection midpoint
- Checked: Success color with checkmark icon
- Unchecked: Border-only, secondary color
- Click to toggle splice completion status

## Data Visualization Principles

1. **Color Consistency**: Fiber colors must match industry standards exactly
2. **Clear Hierarchy**: Cable → Ribbon → Fiber progression visible at glance
3. **Spatial Relationships**: Physical cable layout reflected in visual arrangement
4. **Status Clarity**: Splice completion immediately recognizable
5. **Density Management**: Information-rich without overwhelming

## Interaction Patterns

- **Hover States**: Subtle elevation increase (shadow), no color changes
- **Click Feedback**: Brief scale animation (0.98) on buttons
- **Form Validation**: Inline error messages below fields, red border
- **Loading States**: Spinner overlay for data operations
- **Empty States**: Centered icon + text prompting user action

## Accessibility Requirements

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Fiber colors have sufficient contrast against dark backgrounds
- Keyboard navigation: Tab through all interactive elements
- Focus indicators: 2px outline in primary color with 2px offset
- Screen reader labels for all icon-only buttons
- ARIA labels for complex visualizations

## Responsive Behavior

- **Desktop (>1024px)**: Side-by-side panels, full splice visualization
- **Tablet (768-1024px)**: Stacked panels, horizontal scroll for splice map
- **Mobile (<768px)**: Single column, accordion-style cable selection, simplified connection view

## Performance Considerations

- Lazy render splice connections (visible viewport only)
- Use CSS transforms for animations (GPU acceleration)
- Debounce form inputs when calculating splice mappings
- Virtual scrolling for cable lists with >20 items

This application prioritizes **clarity, precision, and efficiency** for professional fiber optic technicians performing critical infrastructure work.