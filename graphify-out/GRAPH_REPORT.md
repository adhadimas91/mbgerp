# Graph Report - mbgerp  (2026-08-27)

## Corpus Check
- 296 files · ~352,905 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 489 nodes · 758 edges · 39 communities (29 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.88)
- Token cost: 12,500 input · 4,200 output

## Community Hubs (Navigation)
- Authentication & Form Pages
- Application Layouts & Navigation
- UI Visualization & Calendar Libraries
- Core MBG ERP Modules & Database Schemas
- User Profile & Button Components
- Ecommerce Analytics & Geo Charts
- TypeScript & Next.js Environment Config
- Ecommerce Metrics & Data Tables
- Build Tools, Linter & Tailwind Plugins
- Project Dependencies & Architecture Specs
- Blank & Utility Pages
- Avatar UI Components
- Responsive Image Grid Components
- Video & YouTube Player Components
- Bar Chart Analytics Components
- Line Chart Trend Components
- Notification Alert Components
- MBG Project Vision & Strategic Goals
- Toggle & Switch Input Components
- Cloud Deployment & Scalability Strategy
- ESLint Next.js Rule Config
- Form Formik UI Components
- Radio Button Input Components
- Pagination Navigation Components
- Avatar Text Badges
- ESLint Modular Config
- Vector Map Typings
- Next.js Build Configuration
- SVG Image Declaration Typings
- Distributed Database Backend

## God Nodes (most connected - your core abstractions)
1. `ComponentCard()` - 24 edges
2. `useModal()` - 19 edges
3. `compilerOptions` - 16 edges
4. `PageBreadcrumb()` - 14 edges
5. `Label()` - 14 edges
6. `Input()` - 10 edges
7. `Button()` - 10 edges
8. `Modal()` - 10 edges
9. `useSidebar()` - 9 edges
10. `Database Schema Design` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Inventory & Warehouse Management Module` --shares_data_with--> `Warehouse & Stocks Schema`  [INFERRED]
  task_md/04_MODULE_INVENTORY_MGMT.md → task_md/02_DATABASE_SCHEMA.md
- `Audit Trail & Tamper-Proof Logging Module` --implements--> `Audit Logs Schema`  [INFERRED]
  task_md/10_AUDIT_TRAIL_MGMT.md → task_md/02_DATABASE_SCHEMA.md
- `Fixed Asset Management Module` --shares_data_with--> `Fixed Assets & Maintenance Schema`  [INFERRED]
  task_md/12_MODULE_ASSET_MGMT.md → task_md/02_DATABASE_SCHEMA.md
- `ISO 27001 Information Security & Encryption` --conceptually_related_to--> `Audit Trail & Tamper-Proof Logging Module`  [INFERRED]
  task_md/11_ISO_COMPLIANCE_&_QUALITY.md → task_md/10_AUDIT_TRAIL_MGMT.md
- `AdminLayout()` --calls--> `useSidebar()`  [EXTRACTED]
  uiweb/src/app/(admin)/layout.tsx → uiweb/src/context/SidebarContext.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **MBG End-to-End Supply Chain & Distribution Pipeline** — task_md_03_module_supplier_mgmt_supplier_management, task_md_04_module_inventory_mgmt_inventory_management, task_md_05_module_menu_nutrisi_menu_management, task_md_06_module_logistik_distribusi_logistics_module [INFERRED 0.85]
- **MBG Governance, Audit Trail & ISO Compliance Framework** — task_md_07_module_finansial_budget_finance_module, task_md_10_audit_trail_mgmt_audit_module, task_md_11_iso_compliance_quality_compliance_module, task_md_08_module_dashboard_report_dashboard_module [INFERRED 0.85]

## Communities (39 total, 10 thin omitted)

### Community 0 - "Authentication & Form Pages"
Cohesion: 0.06
Nodes (37): metadata, metadata, metadata, SignInForm(), SignUpForm(), DatePicker(), PropsType, CheckboxComponents() (+29 more)

### Community 1 - "Application Layouts & Navigation"
Cohesion: 0.07
Nodes (24): AdminLayout(), metadata, outfit, GridShape(), ThemeToggleButton(), ThemeTogglerTwo(), NotificationDropdown(), UserDropdown() (+16 more)

### Community 2 - "UI Visualization & Calendar Libraries"
Cohesion: 0.04
Nodes (45): apexcharts, autoprefixer, flatpickr, @fullcalendar/core, @fullcalendar/daygrid, @fullcalendar/interaction, @fullcalendar/list, @fullcalendar/react (+37 more)

### Community 3 - "Core MBG ERP Modules & Database Schemas"
Cohesion: 0.05
Nodes (44): Fixed Assets & Maintenance Schema, Audit Logs Schema, Budget & Payment Transaction Schema, Database Schema Design, Distribution & Delivery Logs Schema, Menu & Nutrition Item Schema, Supplier Schema & Documents, User & Role Entities (+36 more)

### Community 4 - "User Profile & Button Components"
Cohesion: 0.14
Nodes (20): metadata, metadata, metadata, Calendar(), CalendarEvent, ComponentCard(), ComponentCardProps, DefaultModal() (+12 more)

### Community 5 - "Ecommerce Analytics & Geo Charts"
Cohesion: 0.08
Nodes (19): metadata, ChartTab(), CountryMap(), CountryMapProps, Marker, MarkerStyle, VectorMap, DemographicCard() (+11 more)

### Community 6 - "TypeScript & Next.js Environment Config"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 7 - "Ecommerce Metrics & Data Tables"
Cohesion: 0.13
Nodes (20): EcommerceMetrics(), Product, tableData, Order, tableData, Badge(), BadgeColor, BadgeProps (+12 more)

### Community 8 - "Build Tools, Linter & Tailwind Plugins"
Cohesion: 0.09
Nodes (23): eslint, eslint-config-next, @eslint/eslintrc, postcss, @svgr/webpack, tailwindcss, @types/node, @types/react (+15 more)

### Community 9 - "Project Dependencies & Architecture Specs"
Cohesion: 0.10
Nodes (20): Tech Stack & Infrastructure Architecture, Next.js React Framework, Tailwind CSS & Shadcn UI, TanStack React Query, name, overrides, @react-jvectormap/core, @react-jvectormap/world (+12 more)

### Community 10 - "Blank & Utility Pages"
Cohesion: 0.16
Nodes (7): metadata, metadata, metadata, metadata, BreadcrumbProps, PageBreadcrumb(), BasicTableOne()

### Community 11 - "Avatar UI Components"
Cohesion: 0.25
Nodes (6): metadata, Avatar(), AvatarProps, sizeClasses, statusColorClasses, statusSizeClasses

### Community 12 - "Responsive Image Grid Components"
Cohesion: 0.31
Nodes (4): metadata, ResponsiveImage(), ThreeColumnImageGrid(), TwoColumnImageGrid()

### Community 13 - "Video & YouTube Player Components"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 14 - "Bar Chart Analytics Components"
Cohesion: 0.40
Nodes (3): metadata, BarChartOne(), ReactApexChart

### Community 15 - "Line Chart Trend Components"
Cohesion: 0.40
Nodes (3): metadata, LineChartOne(), ReactApexChart

### Community 16 - "Notification Alert Components"
Cohesion: 0.40
Nodes (3): metadata, Alert(), AlertProps

### Community 17 - "MBG Project Vision & Strategic Goals"
Cohesion: 0.40
Nodes (5): Standar Akurasi Pemenuhan Gizi, ERP MBG System Overview, Kepatuhan Multi-ISO MBG, Transparansi Anggaran & Stok Real-Time, Visi Distribusi Makanan Bergizi Gratis

### Community 18 - "Toggle & Switch Input Components"
Cohesion: 0.50
Nodes (3): ToggleSwitch(), Switch(), SwitchProps

### Community 19 - "Cloud Deployment & Scalability Strategy"
Cohesion: 0.50
Nodes (4): Read/Write Database Replication, Automated Backup & Disaster Recovery (RTO/RPO), Deployment, High Availability & Scalability, Multi-Region Edge Deployment Strategy

## Knowledge Gaps
- **190 isolated node(s):** `extends`, `next/core-web-vitals`, `eslintConfig`, `jsvectormap`, `nextConfig` (+185 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ComponentCard()` connect `User Profile & Button Components` to `Authentication & Form Pages`, `Blank & Utility Pages`, `Avatar UI Components`, `Responsive Image Grid Components`, `Video & YouTube Player Components`, `Bar Chart Analytics Components`, `Line Chart Trend Components`, `Notification Alert Components`, `Toggle & Switch Input Components`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `PageBreadcrumb()` connect `Blank & Utility Pages` to `Authentication & Form Pages`, `User Profile & Button Components`, `Avatar UI Components`, `Responsive Image Grid Components`, `Video & YouTube Player Components`, `Bar Chart Analytics Components`, `Line Chart Trend Components`, `Notification Alert Components`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `dependencies` connect `UI Visualization & Calendar Libraries` to `Project Dependencies & Architecture Specs`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `eslintConfig` to the rest of the system?**
  _190 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Authentication & Form Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.05673076923076923 - nodes in this community are weakly interconnected._
- **Should `Application Layouts & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.07149758454106281 - nodes in this community are weakly interconnected._
- **Should `UI Visualization & Calendar Libraries` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._