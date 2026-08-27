# Graph Report - mbgerp  (2026-08-27)

## Corpus Check
- 350 files · ~802,835 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1334 nodes · 2157 edges · 103 communities (80 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e71fdb1b`
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
- ComponentCard
- projectweb/src/layout/AppHeader.tsx
- devDependencies
- verification/page.tsx
- projectweb/src/components/ui/button/Button.tsx
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
- EmployeeRegistryTable.tsx
- projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx
- ModulePageLayout.tsx
- uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- projectweb/.eslintrc.json
- ShiftScheduleManager.tsx
- InventoryTable.tsx
- projectweb/src/components/form/form-elements/SelectInputs.tsx
- 2. Struktur Submodul & Fitur Utama
- uiweb/src/components/ecommerce/StatisticsChart.tsx
- projectweb/src/app/(admin)/(others-pages)/(tables)/basic-tables/page.tsx
- uiweb/src/app/(admin)/(ui-elements)/avatars/page.tsx
- ColdChainTelemetry.tsx
- projectweb/src/components/ui/badge/Badge.tsx
- RecipeBuilder.tsx
- catalog/page.tsx
- SupplierTable.tsx
- performance/page.tsx
- projectweb/src/components/form/Form.tsx
- projectweb/src/components/form/input/RadioSm.tsx
- projectweb/src/components/tables/Pagination.tsx
- projectweb/src/components/ui/avatar/AvatarText.tsx
- rules/graphify.md
- workflows/graphify.md
- projectweb/eslint.config.mjs
- projectweb/jsvectormap.d.ts
- projectweb/next.config.ts
- projectweb/src/components/form/Label.tsx
- Badge
- IncidentReportManagement.tsx
- IsoComplianceMatrix.tsx
- uiweb/src/app/(admin)/page.tsx
- AuditLogViewer.tsx
- uiweb/src/components/ecommerce/DemographicCard.tsx
- projectweb/src/svg.d.ts
- uiweb/src/components/ui/badge/Badge.tsx
- uiweb/src/components/ecommerce/CountryMap.tsx
- NotificationDropdown

## God Nodes (most connected - your core abstractions)
1. `ModulePageLayout()` - 31 edges
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

## Communities (103 total, 23 thin omitted)

### Community 0 - "uiweb/src/components/form/Label.tsx"
Cohesion: 0.12
Nodes (16): metadata, metadata, SignInForm(), SignUpForm(), DatePicker(), PropsType, CheckboxComponents(), CountryCode (+8 more)

### Community 1 - "uiweb/src/layout/AppHeader.tsx"
Cohesion: 0.08
Nodes (23): AdminLayout(), metadata, outfit, GridShape(), ThemeToggleButton(), ThemeTogglerTwo(), UserDropdown(), SidebarContext (+15 more)

### Community 2 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, apexcharts, autoprefixer, flatpickr, @fullcalendar/core, @fullcalendar/daygrid, @fullcalendar/interaction, @fullcalendar/list (+37 more)

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

### Community 7 - "ComponentCard"
Cohesion: 0.08
Nodes (17): metadata, metadata, metadata, metadata, metadata, metadata, metadata, BarChartOne() (+9 more)

### Community 8 - "projectweb/src/layout/AppHeader.tsx"
Cohesion: 0.07
Nodes (26): AdminLayout(), metadata, outfit, BrandLogo(), BrandLogoProps, GridShape(), ThemeToggleButton(), ThemeTogglerTwo() (+18 more)

### Community 9 - "devDependencies"
Cohesion: 0.05
Nodes (43): Tech Stack & Infrastructure Architecture, Next.js React Framework, Tailwind CSS & Shadcn UI, TanStack React Query, devDependencies, eslint, eslint-config-next, @eslint/eslintrc (+35 more)

### Community 10 - "verification/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, initialQueue, SupplierVerificationQueue(), VerificationItem

### Community 11 - "projectweb/src/components/ui/button/Button.tsx"
Cohesion: 0.13
Nodes (22): metadata, metadata, Calendar(), CalendarEvent, DefaultModal(), FormInModal(), FullScreenModal(), ModalBasedAlerts() (+14 more)

### Community 12 - "projectweb/src/app/(admin)/page.tsx"
Cohesion: 0.06
Nodes (25): metadata, metadata, metadata, ChartTab(), CountryMap(), CountryMapProps, Marker, MarkerStyle (+17 more)

### Community 13 - "projectweb/src/components/tables/BasicTableOne.tsx"
Cohesion: 0.18
Nodes (14): Product, tableData, Order, tableData, Table(), TableBody(), TableBodyProps, TableCell() (+6 more)

### Community 14 - "AssetRegistryTable.tsx"
Cohesion: 0.12
Nodes (18): metadata, AssetDetailModal(), AssetDetailModalProps, AssetMaintenanceSchedule(), INITIAL_TASKS, AssetQrData, AssetQrPrintModal(), AssetQrPrintModalProps (+10 more)

### Community 15 - "Changelog"
Cohesion: 0.06
Nodes (31): Breaking Changes, Changelog, Cloning the Repository, Components, Demos, Feature Comparison, Free Version, Installation (+23 more)

### Community 16 - "projectweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.08
Nodes (23): metadata, metadata, ComponentCard(), ComponentCardProps, CheckboxComponents(), DefaultInputs(), DropzoneComponent(), FileInputExample() (+15 more)

### Community 17 - "ERP MBG System Overview"
Cohesion: 0.40
Nodes (5): Standar Akurasi Pemenuhan Gizi, ERP MBG System Overview, Kepatuhan Multi-ISO MBG, Transparansi Anggaran & Stok Real-Time, Visi Distribusi Makanan Bergizi Gratis

### Community 18 - "uiweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.10
Nodes (18): metadata, ComponentCardProps, DefaultInputs(), DropzoneComponent(), FileInputExample(), InputGroup(), InputStates(), RadioButtons() (+10 more)

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
Cohesion: 0.05
Nodes (38): devDependencies, eslint, eslint-config-next, @eslint/eslintrc, postcss, @svgr/webpack, tailwindcss, @types/node (+30 more)

### Community 42 - "📋 Checklist Lengkap Modul & Task"
Cohesion: 0.13
Nodes (14): 📋 Checklist Lengkap Modul & Task, 🏗️ Fase 0: Setup Proyek & Arsitektur Frontend UI, Master Checklist & Progress Review ERP MBG, 📦 Modul 1: Supplier & Vendor Management (`03_MODULE_SUPPLIER_MGMT.md`), 🏬 Modul 2: Gudang & Inventory (`04_MODULE_INVENTORY_MGMT.md`), 🥗 Modul 3: Menu & Nutrisi (`05_MODULE_MENU_&_NUTRISI.md`), 🚚 Modul 4: Logistik & Distribusi (`06_MODULE_LOGISTIK_DISTRIBUSI.md`), 🍳 Modul 5: Manajemen Aset Tetap (`12_MODULE_ASSET_MGMT.md`) (+6 more)

### Community 43 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, apexcharts, autoprefixer, flatpickr, @fullcalendar/core, @fullcalendar/daygrid, @fullcalendar/interaction, @fullcalendar/list (+37 more)

### Community 44 - "projectweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.14
Nodes (8): metadata, metadata, metadata, metadata, LineChartOne(), ReactApexChart, BreadcrumbProps, PageBreadcrumb()

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
Cohesion: 0.33
Nodes (7): PodDetailModal(), PodDetailModalProps, PodRecord, PodSubmissionModal(), PodSubmissionModalProps, waybillOptions, initialPods

### Community 55 - "DistributionPointsTable.tsx"
Cohesion: 0.24
Nodes (8): metadata, DistributionPoint, DistributionPointModal(), DistributionPointModalProps, DistributionPointsTable(), initialPoints, DistributionRouteMap(), DistributionRouteMapProps

### Community 56 - "projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, BarChartOne(), ReactApexChart

### Community 57 - "EmployeeRegistryTable.tsx"
Cohesion: 0.07
Nodes (30): metadata, metadata, metadata, AddCertificationModal(), AddCertificationModalProps, CertificationDetailModal(), CertificationDetailModalProps, CertificationMcuMatrix() (+22 more)

### Community 58 - "projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, Alert(), AlertProps

### Community 59 - "ModulePageLayout.tsx"
Cohesion: 0.12
Nodes (10): metadata, metadata, metadata, metadata, metadata, ModulePageLayout(), ModulePageLayoutProps, ProofOfDeliveryViewer() (+2 more)

### Community 60 - "uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 62 - "ShiftScheduleManager.tsx"
Cohesion: 0.21
Nodes (10): metadata, CreateShiftModal(), CreateShiftModalProps, DailyAttendanceModal(), DailyAttendanceModalProps, INITIAL_SHIFTS, ShiftRosterItem, ShiftScheduleManager() (+2 more)

### Community 63 - "InventoryTable.tsx"
Cohesion: 0.22
Nodes (6): metadata, metadata, initialStocks, InventoryTable(), StockItem, StockMovementModal()

### Community 64 - "projectweb/src/components/form/form-elements/SelectInputs.tsx"
Cohesion: 0.24
Nodes (7): SelectInputs(), MultiSelect(), MultiSelectProps, Option, Option, Select(), SelectProps

### Community 65 - "2. Struktur Submodul & Fitur Utama"
Cohesion: 0.22
Nodes (8): 1. Deskripsi Modul, 2. Struktur Submodul & Fitur Utama, 3. Hubungan Antar Modul, A. Direktori Master Data Karyawan (`/employees`), B. Penjadwalan Shift & Presensi Higiene Harian (`/employees/shifts`), C. Penggajian & Insentif Kerja MBG (`/employees/payroll`), D. Sertifikasi Food Handler & Medical Check Up (`/employees/certifications`), Modul: Manajemen SDM, Tenaga Kerja Dapur & Payroll MBG

### Community 66 - "uiweb/src/components/ecommerce/StatisticsChart.tsx"
Cohesion: 0.50
Nodes (3): ChartTab(), Chart, StatisticsChart()

### Community 68 - "uiweb/src/app/(admin)/(ui-elements)/avatars/page.tsx"
Cohesion: 0.25
Nodes (6): metadata, Avatar(), AvatarProps, sizeClasses, statusColorClasses, statusSizeClasses

### Community 71 - "ColdChainTelemetry.tsx"
Cohesion: 0.29
Nodes (5): metadata, ColdChainTelemetry(), ReactApexChart, sensors, SensorUnit

### Community 75 - "projectweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.20
Nodes (7): metadata, MenuCostAnalysis(), ReactApexChart, BadgeColor, BadgeProps, BadgeSize, BadgeVariant

### Community 77 - "RecipeBuilder.tsx"
Cohesion: 0.22
Nodes (7): metadata, IngredientMaster, masterIngredients, presets, RecipeBuilder(), RecipeIngredientItem, RecipePreset

### Community 79 - "catalog/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, CatalogItem, initialCatalog, SupplierCatalogGrid()

### Community 80 - "SupplierTable.tsx"
Cohesion: 0.29
Nodes (5): metadata, SupplierRegistrationModal(), initialSuppliers, SupplierData, SupplierTable()

### Community 81 - "performance/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, SupplierPerformanceScorecard(), VendorPerformance, vendorScores

### Community 100 - "projectweb/src/components/form/Label.tsx"
Cohesion: 0.14
Nodes (13): metadata, metadata, SignInForm(), SignUpForm(), DatePicker(), PropsType, CountryCode, PhoneInput() (+5 more)

### Community 101 - "Badge"
Cohesion: 0.23
Nodes (8): CreateShipmentModal(), Shipment, LiveTrackingModal(), LiveTrackingModalProps, initialShipments, ShipmentWaybillPrintModal(), ShipmentWaybillPrintModalProps, Badge()

### Community 102 - "IncidentReportManagement.tsx"
Cohesion: 0.22
Nodes (10): metadata, CreateIncidentReportModal(), CreateIncidentReportModalProps, IncidentReport, IncidentDetailModal(), IncidentDetailModalProps, IncidentReportManagement(), INITIAL_INCIDENTS (+2 more)

### Community 103 - "IsoComplianceMatrix.tsx"
Cohesion: 0.22
Nodes (10): metadata, AddCertificateModal(), AddCertificateModalProps, IsoCertificate, CertificateDetailModal(), CertificateDetailModalProps, IsoAuditReportPrintModal(), IsoAuditReportPrintModalProps (+2 more)

### Community 104 - "uiweb/src/app/(admin)/page.tsx"
Cohesion: 0.15
Nodes (5): metadata, DemographicCard(), EcommerceMetrics(), MonthlySalesChart(), MonthlyTarget()

### Community 105 - "AuditLogViewer.tsx"
Cohesion: 0.24
Nodes (8): metadata, AuditLogDetailModal(), AuditLogDetailModalProps, AuditLogEntry, AuditLogViewer(), INITIAL_AUDIT_LOGS, AuditReportPrintModal(), AuditReportPrintModalProps

### Community 106 - "uiweb/src/components/ecommerce/DemographicCard.tsx"
Cohesion: 0.33
Nodes (6): ReactApexChart, ReactApexChart, Dropdown(), DropdownProps, DropdownItem(), DropdownItemProps

### Community 119 - "uiweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.25
Nodes (6): metadata, Badge(), BadgeColor, BadgeProps, BadgeSize, BadgeVariant

### Community 122 - "uiweb/src/components/ecommerce/CountryMap.tsx"
Cohesion: 0.33
Nodes (5): CountryMap(), CountryMapProps, Marker, MarkerStyle, VectorMap

## Knowledge Gaps
- **482 isolated node(s):** `extends`, `next/core-web-vitals`, `eslintConfig`, `jsvectormap`, `nextConfig` (+477 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModulePageLayout()` connect `ModulePageLayout.tsx` to `verification/page.tsx`, `projectweb/src/app/(admin)/page.tsx`, `AssetRegistryTable.tsx`, `PaymentManagement.tsx`, `ExpenditureManagement.tsx`, `BudgetManagement.tsx`, `HygieneInspectionsAudit.tsx`, `inventory/alerts/page.tsx`, `DistributionPointsTable.tsx`, `EmployeeRegistryTable.tsx`, `ShiftScheduleManager.tsx`, `InventoryTable.tsx`, `ColdChainTelemetry.tsx`, `projectweb/src/components/ui/badge/Badge.tsx`, `RecipeBuilder.tsx`, `catalog/page.tsx`, `SupplierTable.tsx`, `performance/page.tsx`, `IncidentReportManagement.tsx`, `IsoComplianceMatrix.tsx`, `AuditLogViewer.tsx`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `PageBreadcrumb()` connect `projectweb/src/components/common/PageBreadCrumb.tsx` to `projectweb/src/app/(admin)/(others-pages)/(tables)/basic-tables/page.tsx`, `projectweb/src/components/ui/button/Button.tsx`, `projectweb/src/components/common/ComponentCard.tsx`, `projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx`, `projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx`, `ModulePageLayout.tsx`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `ComponentCard()` connect `ComponentCard` to `uiweb/src/components/form/Label.tsx`, `uiweb/src/app/(admin)/(ui-elements)/avatars/page.tsx`, `useModal`, `uiweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `uiweb/src/components/form/form-elements/SelectInputs.tsx`, `uiweb/src/components/common/ComponentCard.tsx`, `uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `eslintConfig` to the rest of the system?**
  _482 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `uiweb/src/components/form/Label.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11895161290322581 - nodes in this community are weakly interconnected._
- **Should `uiweb/src/layout/AppHeader.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07862679955703211 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._