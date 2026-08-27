# Graph Report - mbgerp  (2026-08-27)

## Corpus Check
- 282 files · ~717,985 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1094 nodes · 1700 edges · 119 communities (70 shown, 49 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a7e68e58`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- uiweb/src/components/form/Label.tsx
- uiweb/src/layout/AppHeader.tsx
- dependencies
- Database Schema Design
- useModal
- uiweb/src/app/(admin)/page.tsx
- compilerOptions
- uiweb/src/components/common/PageBreadCrumb.tsx
- projectweb/src/layout/AppHeader.tsx
- devDependencies
- projectweb/src/components/ui/badge/Badge.tsx
- uiweb/src/app/(admin)/(ui-elements)/avatars/page.tsx
- projectweb/src/app/(admin)/page.tsx
- projectweb/src/components/tables/BasicTableOne.tsx
- useModal
- Changelog
- projectweb/src/components/common/ComponentCard.tsx
- ERP MBG System Overview
- uiweb/src/components/common/ComponentCard.tsx
- Deployment, High Availability & Scalability
- uiweb/.eslintrc.json
- uiweb/src/components/form/Form.tsx
- uiweb/src/components/form/input/RadioSm.tsx
- uiweb/src/components/tables/Pagination.tsx
- uiweb/src/components/ui/avatar/AvatarText.tsx
- uiweb/eslint.config.mjs
- uiweb/jsvectormap.d.ts
- uiweb/next.config.ts
- uiweb/src/svg.d.ts
- Backend & Multi-Region Database
- compilerOptions
- projectweb/src/components/form/Label.tsx
- devDependencies
- 📋 Checklist Lengkap Modul & Task
- dependencies
- projectweb/src/components/common/PageBreadCrumb.tsx
- projectweb/src/components/user-profile/UserAddressCard.tsx
- projectweb/src/components/auth/SignInForm.tsx
- uiweb/src/app/(admin)/(ui-elements)/images/page.tsx
- uiweb/src/components/auth/SignInForm.tsx
- uiweb/src/components/form/form-elements/SelectInputs.tsx
- projectweb/package.json
- projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/images/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- overrides
- ModulePageLayout
- projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx
- projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx
- InventoryTable.tsx
- uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- projectweb/.eslintrc.json
- projectweb/src/components/form/form-elements/InputGroup.tsx
- assets/page.tsx
- audit-logs/page.tsx
- incident-reports/page.tsx
- iso-standards/page.tsx
- budgets/page.tsx
- expenditures/page.tsx
- payments/page.tsx
- inventory/alerts/page.tsx
- ColdChainTelemetry.tsx
- ModulePageLayout.tsx
- uiweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx
- uiweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx
- cost-analysis/page.tsx
- menu/page.tsx
- recipes/page.tsx
- users/page.tsx
- catalog/page.tsx
- SupplierTable.tsx
- performance/page.tsx
- verification/page.tsx
- projectweb/src/components/form/Form.tsx
- projectweb/src/components/form/input/RadioSm.tsx
- projectweb/src/components/tables/Pagination.tsx
- projectweb/src/components/ui/avatar/AvatarText.tsx
- rules/graphify.md
- workflows/graphify.md
- projectweb/eslint.config.mjs
- projectweb/jsvectormap.d.ts
- projectweb/next.config.ts
- autoprefixer
- @fullcalendar/core
- @fullcalendar/interaction
- @fullcalendar/list
- @fullcalendar/react
- next
- react
- react-apexcharts
- react-dnd
- react-dom
- react-dropzone
- @react-jvectormap/core
- @react-jvectormap/world
- swiper
- tailwind-merge
- @tailwindcss/postcss
- projectweb/src/svg.d.ts
- uiweb/src/app/(admin)/(ui-elements)/alerts/page.tsx
- projectweb/src/app/(admin)/(others-pages)/(tables)/basic-tables/page.tsx

## God Nodes (most connected - your core abstractions)
1. `ModulePageLayout()` - 27 edges
2. `ComponentCard()` - 24 edges
3. `ComponentCard()` - 24 edges
4. `useModal()` - 19 edges
5. `useModal()` - 19 edges
6. `compilerOptions` - 16 edges
7. `compilerOptions` - 16 edges
8. `PageBreadcrumb()` - 15 edges
9. `Label()` - 14 edges
10. `Badge()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Fixed Asset Management Module` --shares_data_with--> `Fixed Assets & Maintenance Schema`  [INFERRED]
  task_md/12_MODULE_ASSET_MGMT.md → task_md/02_DATABASE_SCHEMA.md
- `Audit Trail & Tamper-Proof Logging Module` --implements--> `Audit Logs Schema`  [INFERRED]
  task_md/10_AUDIT_TRAIL_MGMT.md → task_md/02_DATABASE_SCHEMA.md
- `Inventory & Warehouse Management Module` --shares_data_with--> `Warehouse & Stocks Schema`  [INFERRED]
  task_md/04_MODULE_INVENTORY_MGMT.md → task_md/02_DATABASE_SCHEMA.md
- `ISO 27001 Information Security & Encryption` --conceptually_related_to--> `Audit Trail & Tamper-Proof Logging Module`  [INFERRED]
  task_md/11_ISO_COMPLIANCE_&_QUALITY.md → task_md/10_AUDIT_TRAIL_MGMT.md
- `AdminLayout()` --calls--> `useSidebar()`  [EXTRACTED]
  projectweb/src/app/(admin)/layout.tsx → projectweb/src/context/SidebarContext.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **MBG Governance, Audit Trail & ISO Compliance Framework** — task_md_07_module_finansial_budget_finance_module, task_md_10_audit_trail_mgmt_audit_module, task_md_11_iso_compliance_quality_compliance_module, task_md_08_module_dashboard_report_dashboard_module [INFERRED 0.85]
- **MBG End-to-End Supply Chain & Distribution Pipeline** — task_md_03_module_supplier_mgmt_supplier_management, task_md_04_module_inventory_mgmt_inventory_management, task_md_05_module_menu_nutrisi_menu_management, task_md_06_module_logistik_distribusi_logistics_module [INFERRED 0.85]

## Communities (119 total, 49 thin omitted)

### Community 0 - "uiweb/src/components/form/Label.tsx"
Cohesion: 0.15
Nodes (13): metadata, SignUpForm(), DatePicker(), PropsType, InputGroup(), InputStates(), CountryCode, PhoneInput() (+5 more)

### Community 1 - "uiweb/src/layout/AppHeader.tsx"
Cohesion: 0.07
Nodes (24): AdminLayout(), metadata, outfit, GridShape(), ThemeToggleButton(), ThemeTogglerTwo(), NotificationDropdown(), UserDropdown() (+16 more)

### Community 2 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, apexcharts, autoprefixer, flatpickr, @fullcalendar/core, @fullcalendar/daygrid, @fullcalendar/interaction, @fullcalendar/list (+37 more)

### Community 3 - "Database Schema Design"
Cohesion: 0.05
Nodes (44): Fixed Assets & Maintenance Schema, Audit Logs Schema, Budget & Payment Transaction Schema, Database Schema Design, Distribution & Delivery Logs Schema, Menu & Nutrition Item Schema, Supplier Schema & Documents, User & Role Entities (+36 more)

### Community 4 - "useModal"
Cohesion: 0.17
Nodes (17): metadata, metadata, Calendar(), CalendarEvent, DefaultModal(), FormInModal(), FullScreenModal(), ModalBasedAlerts() (+9 more)

### Community 5 - "uiweb/src/app/(admin)/page.tsx"
Cohesion: 0.05
Nodes (40): metadata, metadata, ChartTab(), CountryMap(), CountryMapProps, Marker, MarkerStyle, VectorMap (+32 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (27): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+19 more)

### Community 7 - "uiweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.19
Nodes (6): metadata, metadata, metadata, BreadcrumbProps, PageBreadcrumb(), BasicTableOne()

### Community 8 - "projectweb/src/layout/AppHeader.tsx"
Cohesion: 0.08
Nodes (24): AdminLayout(), metadata, outfit, BrandLogo(), BrandLogoProps, GridShape(), ThemeToggleButton(), ThemeTogglerTwo() (+16 more)

### Community 9 - "devDependencies"
Cohesion: 0.05
Nodes (43): Tech Stack & Infrastructure Architecture, Next.js React Framework, Tailwind CSS & Shadcn UI, TanStack React Query, devDependencies, eslint, eslint-config-next, @eslint/eslintrc (+35 more)

### Community 10 - "projectweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.15
Nodes (10): metadata, MbgMetrics(), MbgRecentShipments(), mockShipments, ShipmentItem, Badge(), BadgeColor, BadgeProps (+2 more)

### Community 11 - "uiweb/src/app/(admin)/(ui-elements)/avatars/page.tsx"
Cohesion: 0.25
Nodes (6): metadata, Avatar(), AvatarProps, sizeClasses, statusColorClasses, statusSizeClasses

### Community 12 - "projectweb/src/app/(admin)/page.tsx"
Cohesion: 0.06
Nodes (23): metadata, metadata, metadata, ChartTab(), CountryMap(), CountryMapProps, Marker, MarkerStyle (+15 more)

### Community 13 - "projectweb/src/components/tables/BasicTableOne.tsx"
Cohesion: 0.18
Nodes (14): Product, tableData, Order, tableData, Table(), TableBody(), TableBodyProps, TableCell() (+6 more)

### Community 14 - "useModal"
Cohesion: 0.17
Nodes (16): metadata, Calendar(), CalendarEvent, DefaultModal(), FormInModal(), FullScreenModal(), ModalBasedAlerts(), VerticallyCenteredModal() (+8 more)

### Community 15 - "Changelog"
Cohesion: 0.06
Nodes (31): Breaking Changes, Changelog, Cloning the Repository, Components, Demos, Feature Comparison, Free Version, Installation (+23 more)

### Community 16 - "projectweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.10
Nodes (19): metadata, metadata, ComponentCard(), ComponentCardProps, DefaultInputs(), DropzoneComponent(), FileInputExample(), InputStates() (+11 more)

### Community 17 - "ERP MBG System Overview"
Cohesion: 0.40
Nodes (5): Standar Akurasi Pemenuhan Gizi, ERP MBG System Overview, Kepatuhan Multi-ISO MBG, Transparansi Anggaran & Stok Real-Time, Visi Distribusi Makanan Bergizi Gratis

### Community 18 - "uiweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.10
Nodes (18): metadata, metadata, ComponentCard(), ComponentCardProps, DefaultInputs(), DropzoneComponent(), FileInputExample(), RadioButtons() (+10 more)

### Community 19 - "Deployment, High Availability & Scalability"
Cohesion: 0.50
Nodes (4): Read/Write Database Replication, Automated Backup & Disaster Recovery (RTO/RPO), Deployment, High Availability & Scalability, Multi-Region Edge Deployment Strategy

### Community 39 - "compilerOptions"
Cohesion: 0.07
Nodes (27): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+19 more)

### Community 40 - "projectweb/src/components/form/Label.tsx"
Cohesion: 0.14
Nodes (13): metadata, SignUpForm(), DatePicker(), PropsType, SelectInputs(), Label(), LabelProps, MultiSelect() (+5 more)

### Community 41 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, eslint, eslint-config-next, @eslint/eslintrc, postcss, @svgr/webpack, tailwindcss, @types/node (+15 more)

### Community 42 - "📋 Checklist Lengkap Modul & Task"
Cohesion: 0.14
Nodes (13): 📋 Checklist Lengkap Modul & Task, 🏗️ Fase 0: Setup Proyek & Arsitektur Frontend UI, Master Checklist & Progress Review ERP MBG, 📦 Modul 1: Supplier & Vendor Management (`03_MODULE_SUPPLIER_MGMT.md`), 🏬 Modul 2: Gudang & Inventory (`04_MODULE_INVENTORY_MGMT.md`), 🥗 Modul 3: Menu & Nutrisi (`05_MODULE_MENU_&_NUTRISI.md`), 🚚 Modul 4: Logistik & Distribusi (`06_MODULE_LOGISTIK_DISTRIBUSI.md`), 🍳 Modul 5: Manajemen Aset Tetap (`12_MODULE_ASSET_MGMT.md`) (+5 more)

### Community 43 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, apexcharts, flatpickr, @fullcalendar/daygrid, @fullcalendar/timegrid, react-dnd-html5-backend, @tailwindcss/forms, apexcharts (+5 more)

### Community 44 - "projectweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.28
Nodes (4): metadata, metadata, BreadcrumbProps, PageBreadcrumb()

### Community 45 - "projectweb/src/components/user-profile/UserAddressCard.tsx"
Cohesion: 0.31
Nodes (5): metadata, Input(), InputProps, UserAddressCard(), UserInfoCard()

### Community 46 - "projectweb/src/components/auth/SignInForm.tsx"
Cohesion: 0.27
Nodes (5): metadata, SignInForm(), CheckboxComponents(), Checkbox(), CheckboxProps

### Community 47 - "uiweb/src/app/(admin)/(ui-elements)/images/page.tsx"
Cohesion: 0.31
Nodes (4): metadata, ResponsiveImage(), ThreeColumnImageGrid(), TwoColumnImageGrid()

### Community 48 - "uiweb/src/components/auth/SignInForm.tsx"
Cohesion: 0.27
Nodes (5): metadata, SignInForm(), CheckboxComponents(), Checkbox(), CheckboxProps

### Community 49 - "uiweb/src/components/form/form-elements/SelectInputs.tsx"
Cohesion: 0.24
Nodes (7): SelectInputs(), MultiSelect(), MultiSelectProps, Option, Option, Select(), SelectProps

### Community 50 - "projectweb/package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 51 - "projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx"
Cohesion: 0.25
Nodes (6): metadata, Avatar(), AvatarProps, sizeClasses, statusColorClasses, statusSizeClasses

### Community 52 - "projectweb/src/app/(admin)/(ui-elements)/images/page.tsx"
Cohesion: 0.31
Nodes (4): metadata, ResponsiveImage(), ThreeColumnImageGrid(), TwoColumnImageGrid()

### Community 53 - "projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 54 - "overrides"
Cohesion: 0.29
Nodes (7): overrides, @react-jvectormap/core, @react-jvectormap/world, react, react-dom, react, react-dom

### Community 55 - "ModulePageLayout"
Cohesion: 0.20
Nodes (4): metadata, metadata, metadata, ModulePageLayout()

### Community 56 - "projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, BarChartOne(), ReactApexChart

### Community 57 - "projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, LineChartOne(), ReactApexChart

### Community 58 - "projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, Alert(), AlertProps

### Community 59 - "InventoryTable.tsx"
Cohesion: 0.22
Nodes (6): metadata, metadata, initialStocks, InventoryTable(), StockItem, StockMovementModal()

### Community 60 - "uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 62 - "projectweb/src/components/form/form-elements/InputGroup.tsx"
Cohesion: 0.40
Nodes (4): InputGroup(), CountryCode, PhoneInput(), PhoneInputProps

### Community 70 - "inventory/alerts/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, initialAlerts, LowStockAlerts(), StockAlert

### Community 71 - "ColdChainTelemetry.tsx"
Cohesion: 0.29
Nodes (5): metadata, ColdChainTelemetry(), ReactApexChart, sensors, SensorUnit

### Community 72 - "ModulePageLayout.tsx"
Cohesion: 0.25
Nodes (3): metadata, metadata, ModulePageLayoutProps

### Community 73 - "uiweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, BarChartOne(), ReactApexChart

### Community 74 - "uiweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, LineChartOne(), ReactApexChart

### Community 79 - "catalog/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, CatalogItem, initialCatalog, SupplierCatalogGrid()

### Community 80 - "SupplierTable.tsx"
Cohesion: 0.29
Nodes (5): metadata, SupplierRegistrationModal(), initialSuppliers, SupplierData, SupplierTable()

### Community 81 - "performance/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, SupplierPerformanceScorecard(), VendorPerformance, vendorScores

### Community 82 - "verification/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, initialQueue, SupplierVerificationQueue(), VerificationItem

### Community 117 - "uiweb/src/app/(admin)/(ui-elements)/alerts/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, Alert(), AlertProps

## Knowledge Gaps
- **428 isolated node(s):** `extends`, `next/core-web-vitals`, `eslintConfig`, `jsvectormap`, `nextConfig` (+423 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **49 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PageBreadcrumb()` connect `projectweb/src/components/common/PageBreadCrumb.tsx` to `ModulePageLayout.tsx`, `projectweb/src/components/ui/badge/Badge.tsx`, `useModal`, `projectweb/src/components/common/ComponentCard.tsx`, `projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx`, `projectweb/src/app/(admin)/(others-pages)/(tables)/basic-tables/page.tsx`, `projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx`, `projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `ModulePageLayout()` connect `ModulePageLayout` to `projectweb/src/app/(admin)/page.tsx`, `InventoryTable.tsx`, `assets/page.tsx`, `audit-logs/page.tsx`, `incident-reports/page.tsx`, `iso-standards/page.tsx`, `budgets/page.tsx`, `expenditures/page.tsx`, `payments/page.tsx`, `inventory/alerts/page.tsx`, `ColdChainTelemetry.tsx`, `ModulePageLayout.tsx`, `cost-analysis/page.tsx`, `menu/page.tsx`, `recipes/page.tsx`, `users/page.tsx`, `catalog/page.tsx`, `SupplierTable.tsx`, `performance/page.tsx`, `verification/page.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `ComponentCard()` connect `uiweb/src/components/common/ComponentCard.tsx` to `uiweb/src/components/form/Label.tsx`, `useModal`, `uiweb/src/components/common/PageBreadCrumb.tsx`, `uiweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx`, `uiweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx`, `uiweb/src/app/(admin)/(ui-elements)/avatars/page.tsx`, `uiweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `uiweb/src/components/auth/SignInForm.tsx`, `uiweb/src/components/form/form-elements/SelectInputs.tsx`, `uiweb/src/app/(admin)/(ui-elements)/alerts/page.tsx`, `uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `eslintConfig` to the rest of the system?**
  _428 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `uiweb/src/layout/AppHeader.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07149758454106281 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `Database Schema Design` be split into smaller, more focused modules?**
  _Cohesion score 0.049682875264270614 - nodes in this community are weakly interconnected._