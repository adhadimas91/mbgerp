# Graph Report - mbgerp  (2026-08-27)

## Corpus Check
- 329 files · ~785,527 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1260 nodes · 2034 edges · 143 communities (87 shown, 56 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0fb2b7a4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- uiweb/src/components/form/Label.tsx
- uiweb/src/layout/AppHeader.tsx
- dependencies
- Database Schema Design
- useModal
- uiweb/src/components/ecommerce/RecentOrders.tsx
- compilerOptions
- uiweb/src/components/common/PageBreadCrumb.tsx
- projectweb/src/layout/AppHeader.tsx
- devDependencies
- projectweb/src/components/ui/badge/Badge.tsx
- projectweb/src/components/ui/modal/index.tsx
- projectweb/src/app/(admin)/page.tsx
- projectweb/src/components/tables/BasicTableOne.tsx
- AssetRegistryTable.tsx
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
- PaymentManagement.tsx
- devDependencies
- 📋 Checklist Lengkap Modul & Task
- dependencies
- projectweb/src/components/common/PageBreadCrumb.tsx
- ExpenditureManagement.tsx
- BudgetManagement.tsx
- uiweb/src/app/(admin)/(ui-elements)/images/page.tsx
- HygieneInspectionsAudit.tsx
- uiweb/src/components/form/form-elements/SelectInputs.tsx
- inventory/alerts/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/images/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- ProofOfDeliveryViewer.tsx
- DistributionPointsTable.tsx
- projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx
- projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx
- ModulePageLayout.tsx
- uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- projectweb/.eslintrc.json
- uiweb/package.json
- overrides
- scripts
- autoprefixer
- uiweb/src/components/auth/SignInForm.tsx
- @fullcalendar/core
- uiweb/src/app/(admin)/(ui-elements)/avatars/page.tsx
- @fullcalendar/daygrid
- MenuPlannerCalendar.tsx
- ColdChainTelemetry.tsx
- uiweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx
- uiweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx
- @fullcalendar/interaction
- cost-analysis/page.tsx
- @fullcalendar/list
- RecipeBuilder.tsx
- @fullcalendar/react
- catalog/page.tsx
- SupplierTable.tsx
- performance/page.tsx
- @fullcalendar/timegrid
- projectweb/src/components/form/Form.tsx
- projectweb/src/components/form/input/RadioSm.tsx
- projectweb/src/components/tables/Pagination.tsx
- projectweb/src/components/ui/avatar/AvatarText.tsx
- rules/graphify.md
- workflows/graphify.md
- projectweb/eslint.config.mjs
- projectweb/jsvectormap.d.ts
- projectweb/next.config.ts
- next
- react-apexcharts
- react-dnd-html5-backend
- react-dom
- react-dropzone
- @react-jvectormap/core
- swiper
- @tailwindcss/forms
- projectweb/src/components/form/Label.tsx
- projectweb/src/components/ui/button/Button.tsx
- IncidentReportManagement.tsx
- IsoComplianceMatrix.tsx
- uiweb/src/app/(admin)/page.tsx
- AuditLogViewer.tsx
- uiweb/src/components/ecommerce/DemographicCard.tsx
- projectweb/src/components/auth/SignInForm.tsx
- projectweb/src/svg.d.ts
- uiweb/src/app/(admin)/(ui-elements)/alerts/page.tsx
- projectweb/package.json
- uiweb/src/components/ui/badge/Badge.tsx
- overrides
- projectweb/src/components/form/form-elements/InputGroup.tsx
- uiweb/src/components/ecommerce/CountryMap.tsx
- uiweb/src/app/(admin)/(others-pages)/(tables)/basic-tables/page.tsx
- MonthlySalesChart
- NotificationDropdown
- UserDropdown
- apexcharts
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

## God Nodes (most connected - your core abstractions)
1. `ModulePageLayout()` - 27 edges
2. `ComponentCard()` - 24 edges
3. `ComponentCard()` - 24 edges
4. `Badge()` - 22 edges
5. `Button()` - 22 edges
6. `Modal()` - 19 edges
7. `useModal()` - 19 edges
8. `useModal()` - 19 edges
9. `compilerOptions` - 16 edges
10. `compilerOptions` - 16 edges

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

## Communities (143 total, 56 thin omitted)

### Community 0 - "uiweb/src/components/form/Label.tsx"
Cohesion: 0.15
Nodes (13): metadata, SignUpForm(), DatePicker(), PropsType, InputGroup(), InputStates(), CountryCode, PhoneInput() (+5 more)

### Community 1 - "uiweb/src/layout/AppHeader.tsx"
Cohesion: 0.09
Nodes (22): AdminLayout(), metadata, outfit, GridShape(), ThemeToggleButton(), ThemeTogglerTwo(), SidebarContext, SidebarContextType (+14 more)

### Community 2 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, apexcharts, flatpickr, react, react-dnd, @react-jvectormap/world, tailwind-merge, @tailwindcss/postcss (+7 more)

### Community 3 - "Database Schema Design"
Cohesion: 0.05
Nodes (44): Fixed Assets & Maintenance Schema, Audit Logs Schema, Budget & Payment Transaction Schema, Database Schema Design, Distribution & Delivery Logs Schema, Menu & Nutrition Item Schema, Supplier Schema & Documents, User & Role Entities (+36 more)

### Community 4 - "useModal"
Cohesion: 0.17
Nodes (17): metadata, metadata, Calendar(), CalendarEvent, DefaultModal(), FormInModal(), FullScreenModal(), ModalBasedAlerts() (+9 more)

### Community 5 - "uiweb/src/components/ecommerce/RecentOrders.tsx"
Cohesion: 0.18
Nodes (15): Product, RecentOrders(), tableData, Order, tableData, Table(), TableBody(), TableBodyProps (+7 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (27): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+19 more)

### Community 7 - "uiweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.21
Nodes (5): metadata, metadata, metadata, BreadcrumbProps, PageBreadcrumb()

### Community 8 - "projectweb/src/layout/AppHeader.tsx"
Cohesion: 0.07
Nodes (26): AdminLayout(), metadata, outfit, BrandLogo(), BrandLogoProps, GridShape(), ThemeToggleButton(), ThemeTogglerTwo() (+18 more)

### Community 9 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, eslint, eslint-config-next, @eslint/eslintrc, postcss, @svgr/webpack, tailwindcss, @types/node (+15 more)

### Community 10 - "projectweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.16
Nodes (9): metadata, initialQueue, SupplierVerificationQueue(), VerificationItem, Badge(), BadgeColor, BadgeProps, BadgeSize (+1 more)

### Community 11 - "projectweb/src/components/ui/modal/index.tsx"
Cohesion: 0.16
Nodes (16): metadata, metadata, CalendarEvent, DefaultModal(), FormInModal(), FullScreenModal(), ModalBasedAlerts(), VerticallyCenteredModal() (+8 more)

### Community 12 - "projectweb/src/app/(admin)/page.tsx"
Cohesion: 0.06
Nodes (25): metadata, metadata, metadata, ChartTab(), CountryMap(), CountryMapProps, Marker, MarkerStyle (+17 more)

### Community 13 - "projectweb/src/components/tables/BasicTableOne.tsx"
Cohesion: 0.16
Nodes (15): Product, tableData, BasicTableOne(), Order, tableData, Table(), TableBody(), TableBodyProps (+7 more)

### Community 14 - "AssetRegistryTable.tsx"
Cohesion: 0.11
Nodes (19): metadata, metadata, AssetDetailModal(), AssetDetailModalProps, AssetMaintenanceSchedule(), INITIAL_TASKS, AssetQrData, AssetQrPrintModal() (+11 more)

### Community 15 - "Changelog"
Cohesion: 0.06
Nodes (31): Breaking Changes, Changelog, Cloning the Repository, Components, Demos, Feature Comparison, Free Version, Installation (+23 more)

### Community 16 - "projectweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.11
Nodes (18): metadata, ComponentCard(), ComponentCardProps, DefaultInputs(), DropzoneComponent(), FileInputExample(), InputStates(), RadioButtons() (+10 more)

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

### Community 40 - "PaymentManagement.tsx"
Cohesion: 0.15
Nodes (14): metadata, BankReconciliationEntry, BankReconciliationModal(), BankReconciliationModalProps, INITIAL_BANK_MUTATIONS, PaymentInvoiceDetailModal(), PaymentInvoiceDetailModalProps, INITIAL_INVOICES (+6 more)

### Community 41 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, eslint, eslint-config-next, @eslint/eslintrc, postcss, @svgr/webpack, tailwindcss, @types/node (+15 more)

### Community 42 - "📋 Checklist Lengkap Modul & Task"
Cohesion: 0.14
Nodes (13): 📋 Checklist Lengkap Modul & Task, 🏗️ Fase 0: Setup Proyek & Arsitektur Frontend UI, Master Checklist & Progress Review ERP MBG, 📦 Modul 1: Supplier & Vendor Management (`03_MODULE_SUPPLIER_MGMT.md`), 🏬 Modul 2: Gudang & Inventory (`04_MODULE_INVENTORY_MGMT.md`), 🥗 Modul 3: Menu & Nutrisi (`05_MODULE_MENU_&_NUTRISI.md`), 🚚 Modul 4: Logistik & Distribusi (`06_MODULE_LOGISTIK_DISTRIBUSI.md`), 🍳 Modul 5: Manajemen Aset Tetap (`12_MODULE_ASSET_MGMT.md`) (+5 more)

### Community 43 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, autoprefixer, flatpickr, @fullcalendar/daygrid, @fullcalendar/timegrid, react-dnd-html5-backend, @tailwindcss/forms, autoprefixer (+5 more)

### Community 44 - "projectweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.16
Nodes (7): metadata, metadata, metadata, metadata, Calendar(), BreadcrumbProps, PageBreadcrumb()

### Community 45 - "ExpenditureManagement.tsx"
Cohesion: 0.19
Nodes (12): metadata, CreateExpenditureModal(), CreateExpenditureModalProps, ExpenditureItem, ExpenditureRecord, ExpenditureDetailModal(), ExpenditureDetailModalProps, ExpenditureManagement() (+4 more)

### Community 46 - "BudgetManagement.tsx"
Cohesion: 0.22
Nodes (10): metadata, BudgetDetailModal(), BudgetDetailModalProps, BudgetManagement(), INITIAL_BUDGETS, BudgetReportPrintModal(), BudgetReportPrintModalProps, BudgetAllocation (+2 more)

### Community 47 - "uiweb/src/app/(admin)/(ui-elements)/images/page.tsx"
Cohesion: 0.31
Nodes (4): metadata, ResponsiveImage(), ThreeColumnImageGrid(), TwoColumnImageGrid()

### Community 48 - "HygieneInspectionsAudit.tsx"
Cohesion: 0.20
Nodes (10): metadata, HygieneInspectionDetailModal(), HygieneInspectionDetailModalProps, HygieneInspectionsAudit(), INITIAL_AUDITS, DEFAULT_ITEMS, HygieneAuditData, HygieneInspectionItem (+2 more)

### Community 49 - "uiweb/src/components/form/form-elements/SelectInputs.tsx"
Cohesion: 0.24
Nodes (7): SelectInputs(), MultiSelect(), MultiSelectProps, Option, Option, Select(), SelectProps

### Community 50 - "inventory/alerts/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, initialAlerts, LowStockAlerts(), StockAlert

### Community 51 - "projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx"
Cohesion: 0.25
Nodes (6): metadata, Avatar(), AvatarProps, sizeClasses, statusColorClasses, statusSizeClasses

### Community 52 - "projectweb/src/app/(admin)/(ui-elements)/images/page.tsx"
Cohesion: 0.31
Nodes (4): metadata, ResponsiveImage(), ThreeColumnImageGrid(), TwoColumnImageGrid()

### Community 53 - "projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 54 - "ProofOfDeliveryViewer.tsx"
Cohesion: 0.22
Nodes (9): metadata, PodDetailModal(), PodDetailModalProps, PodRecord, PodSubmissionModal(), PodSubmissionModalProps, waybillOptions, initialPods (+1 more)

### Community 55 - "DistributionPointsTable.tsx"
Cohesion: 0.24
Nodes (8): metadata, DistributionPoint, DistributionPointModal(), DistributionPointModalProps, DistributionPointsTable(), initialPoints, DistributionRouteMap(), DistributionRouteMapProps

### Community 56 - "projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, BarChartOne(), ReactApexChart

### Community 57 - "projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, LineChartOne(), ReactApexChart

### Community 58 - "projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, Alert(), AlertProps

### Community 59 - "ModulePageLayout.tsx"
Cohesion: 0.14
Nodes (10): metadata, metadata, metadata, metadata, ModulePageLayout(), ModulePageLayoutProps, initialStocks, InventoryTable() (+2 more)

### Community 60 - "uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 62 - "uiweb/package.json"
Cohesion: 0.25
Nodes (8): Tech Stack & Infrastructure Architecture, Next.js React Framework, Tailwind CSS & Shadcn UI, TanStack React Query, name, private, version, Next.js UI Application Documentation

### Community 63 - "overrides"
Cohesion: 0.29
Nodes (7): overrides, @react-jvectormap/core, @react-jvectormap/world, react, react-dom, react, react-dom

### Community 64 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 66 - "uiweb/src/components/auth/SignInForm.tsx"
Cohesion: 0.27
Nodes (5): metadata, SignInForm(), CheckboxComponents(), Checkbox(), CheckboxProps

### Community 68 - "uiweb/src/app/(admin)/(ui-elements)/avatars/page.tsx"
Cohesion: 0.25
Nodes (6): metadata, Avatar(), AvatarProps, sizeClasses, statusColorClasses, statusSizeClasses

### Community 70 - "MenuPlannerCalendar.tsx"
Cohesion: 0.33
Nodes (4): metadata, DailyMenuPlan, MenuPlannerCalendar(), mockMenuPlans

### Community 71 - "ColdChainTelemetry.tsx"
Cohesion: 0.29
Nodes (5): metadata, ColdChainTelemetry(), ReactApexChart, sensors, SensorUnit

### Community 72 - "uiweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, BarChartOne(), ReactApexChart

### Community 73 - "uiweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, LineChartOne(), ReactApexChart

### Community 75 - "cost-analysis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, MenuCostAnalysis(), ReactApexChart

### Community 77 - "RecipeBuilder.tsx"
Cohesion: 0.22
Nodes (7): metadata, IngredientMaster, masterIngredients, presets, RecipeBuilder(), RecipeIngredientItem, RecipePreset

### Community 79 - "catalog/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, CatalogItem, initialCatalog, SupplierCatalogGrid()

### Community 80 - "SupplierTable.tsx"
Cohesion: 0.24
Nodes (6): metadata, SupplierRegistrationModal(), SupplierRegistrationModalProps, initialSuppliers, SupplierData, SupplierTable()

### Community 81 - "performance/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, SupplierPerformanceScorecard(), VendorPerformance, vendorScores

### Community 100 - "projectweb/src/components/form/Label.tsx"
Cohesion: 0.14
Nodes (13): metadata, SignUpForm(), DatePicker(), PropsType, SelectInputs(), Label(), LabelProps, MultiSelect() (+5 more)

### Community 101 - "projectweb/src/components/ui/button/Button.tsx"
Cohesion: 0.18
Nodes (13): metadata, StockMovementModal(), StockMovementModalProps, CreateShipmentModal(), CreateShipmentModalProps, Shipment, LiveTrackingModal(), LiveTrackingModalProps (+5 more)

### Community 102 - "IncidentReportManagement.tsx"
Cohesion: 0.22
Nodes (10): metadata, CreateIncidentReportModal(), CreateIncidentReportModalProps, IncidentReport, IncidentDetailModal(), IncidentDetailModalProps, IncidentReportManagement(), INITIAL_INCIDENTS (+2 more)

### Community 103 - "IsoComplianceMatrix.tsx"
Cohesion: 0.22
Nodes (10): metadata, AddCertificateModal(), AddCertificateModalProps, IsoCertificate, CertificateDetailModal(), CertificateDetailModalProps, IsoAuditReportPrintModal(), IsoAuditReportPrintModalProps (+2 more)

### Community 104 - "uiweb/src/app/(admin)/page.tsx"
Cohesion: 0.16
Nodes (6): metadata, ChartTab(), DemographicCard(), MonthlyTarget(), Chart, StatisticsChart()

### Community 105 - "AuditLogViewer.tsx"
Cohesion: 0.24
Nodes (8): metadata, AuditLogDetailModal(), AuditLogDetailModalProps, AuditLogEntry, AuditLogViewer(), INITIAL_AUDIT_LOGS, AuditReportPrintModal(), AuditReportPrintModalProps

### Community 106 - "uiweb/src/components/ecommerce/DemographicCard.tsx"
Cohesion: 0.33
Nodes (6): ReactApexChart, ReactApexChart, Dropdown(), DropdownProps, DropdownItem(), DropdownItemProps

### Community 107 - "projectweb/src/components/auth/SignInForm.tsx"
Cohesion: 0.27
Nodes (5): metadata, SignInForm(), CheckboxComponents(), Checkbox(), CheckboxProps

### Community 117 - "uiweb/src/app/(admin)/(ui-elements)/alerts/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, Alert(), AlertProps

### Community 118 - "projectweb/package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 119 - "uiweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.29
Nodes (6): EcommerceMetrics(), Badge(), BadgeColor, BadgeProps, BadgeSize, BadgeVariant

### Community 120 - "overrides"
Cohesion: 0.29
Nodes (7): overrides, @react-jvectormap/core, @react-jvectormap/world, react, react-dom, react, react-dom

### Community 121 - "projectweb/src/components/form/form-elements/InputGroup.tsx"
Cohesion: 0.40
Nodes (4): InputGroup(), CountryCode, PhoneInput(), PhoneInputProps

### Community 122 - "uiweb/src/components/ecommerce/CountryMap.tsx"
Cohesion: 0.33
Nodes (5): CountryMap(), CountryMapProps, Marker, MarkerStyle, VectorMap

## Knowledge Gaps
- **468 isolated node(s):** `extends`, `next/core-web-vitals`, `eslintConfig`, `jsvectormap`, `nextConfig` (+463 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **56 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModulePageLayout()` connect `ModulePageLayout.tsx` to `projectweb/src/components/ui/badge/Badge.tsx`, `projectweb/src/app/(admin)/page.tsx`, `AssetRegistryTable.tsx`, `PaymentManagement.tsx`, `ExpenditureManagement.tsx`, `BudgetManagement.tsx`, `HygieneInspectionsAudit.tsx`, `inventory/alerts/page.tsx`, `ProofOfDeliveryViewer.tsx`, `DistributionPointsTable.tsx`, `MenuPlannerCalendar.tsx`, `ColdChainTelemetry.tsx`, `cost-analysis/page.tsx`, `RecipeBuilder.tsx`, `catalog/page.tsx`, `SupplierTable.tsx`, `performance/page.tsx`, `IncidentReportManagement.tsx`, `IsoComplianceMatrix.tsx`, `AuditLogViewer.tsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `PageBreadcrumb()` connect `projectweb/src/components/common/PageBreadCrumb.tsx` to `projectweb/src/components/ui/button/Button.tsx`, `projectweb/src/components/ui/modal/index.tsx`, `projectweb/src/components/common/ComponentCard.tsx`, `projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx`, `projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx`, `projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx`, `ModulePageLayout.tsx`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `ComponentCard()` connect `uiweb/src/components/common/ComponentCard.tsx` to `uiweb/src/components/form/Label.tsx`, `uiweb/src/components/auth/SignInForm.tsx`, `uiweb/src/app/(admin)/(ui-elements)/avatars/page.tsx`, `useModal`, `uiweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx`, `uiweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx`, `uiweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `uiweb/src/components/form/form-elements/SelectInputs.tsx`, `uiweb/src/app/(admin)/(ui-elements)/alerts/page.tsx`, `uiweb/src/app/(admin)/(others-pages)/(tables)/basic-tables/page.tsx`, `uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `eslintConfig` to the rest of the system?**
  _468 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `uiweb/src/layout/AppHeader.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08717948717948718 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Database Schema Design` be split into smaller, more focused modules?**
  _Cohesion score 0.049682875264270614 - nodes in this community are weakly interconnected._