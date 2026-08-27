# Graph Report - mbgerp  (2026-08-27)

## Corpus Check
- 436 files · ~863,544 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1965 nodes · 3067 edges · 146 communities (113 shown, 33 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50e635d1`
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
- projectweb/src/context/ThemeContext.tsx
- devDependencies
- verification/page.tsx
- projectweb/src/components/ui/modal/index.tsx
- projectweb/src/app/(admin)/page.tsx
- projectweb/src/components/tables/BasicTableOne.tsx
- AssetRegistryTable.tsx
- Changelog
- projectweb/src/app/(admin)/(others-pages)/(forms)/form-elements/page.tsx
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
- RoleManagementDashboard.tsx
- HygieneInspectionsAudit.tsx
- uiweb/src/components/ecommerce/MonthlySalesChart.tsx
- uiweb/src/components/ecommerce/DemographicCard.tsx
- projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/images/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- ModulePageLayout.tsx
- .login
- projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx
- EmployeeRegistryTable.tsx
- projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx
- proof-of-delivery/page.tsx
- uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- projectweb/.eslintrc.json
- UserManagementTable.tsx
- InventoryTable.tsx
- KitchenOverviewDashboard.tsx
- 2. Struktur Submodul & Fitur Utama
- KitchenFinancialDashboard.tsx
- projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx
- dependencies
- devDependencies
- FinanceOverviewDashboard.tsx
- ColdChainTelemetry.tsx
- BrandLogo.tsx
- reports/page.tsx
- projectweb/src/components/form/form-elements/SelectInputs.tsx
- 🌐 3. Katalog Endpoint REST API
- FinanceController
- RecipeBuilder.tsx
- uiweb/src/components/form/form-elements/SelectInputs.tsx
- catalog/page.tsx
- suppliers/page.tsx
- performance/page.tsx
- AssetsController
- projectweb/src/components/form/Form.tsx
- projectweb/src/components/form/input/RadioSm.tsx
- projectweb/src/components/tables/Pagination.tsx
- projectweb/src/components/ui/avatar/AvatarText.tsx
- rules/graphify.md
- workflows/graphify.md
- projectweb/eslint.config.mjs
- projectweb/jsvectormap.d.ts
- projectweb/next.config.ts
- projectweb/src/components/ui/button/Button.tsx
- projectweb/src/components/ui/badge/Badge.tsx
- PrismaService
- projectweb/src/layout/AppHeader.tsx
- EmployeesController
- projectweb/src/app/(full-width-pages)/(error-pages)/error-404/page.tsx
- KitchenController
- LogisticsController
- projectweb/src/components/common/ComponentCard.tsx
- MenuController
- IncidentReportManagement.tsx
- IsoComplianceMatrix.tsx
- uiweb/src/app/(admin)/page.tsx
- AuditLogViewer.tsx
- SuppliersController
- ComplianceController
- projectweb/src/svg.d.ts
- InventoryController
- UsersController
- uiweb/src/components/ui/badge/Badge.tsx
- app.module.ts
- compilerOptions
- ModulePageLayout
- scripts
- main.ts
- projectapi/package.json
- exclude
- 🚀 Quick Start
- uiweb/src/app/(admin)/(ui-elements)/images/page.tsx
- RolesGuard
- ShipmentManagement.tsx
- nest-cli.json
- DistributionPointsTable.tsx
- HealthController
- ERP MBG — Sistem Manajemen Makanan Bergizi Gratis Nasional
- test-api.ts
- uiweb/src/app/(admin)/(ui-elements)/alerts/page.tsx
- seed.ts
- menu/page.tsx
- uiweb/src/app/(admin)/(others-pages)/(tables)/basic-tables/page.tsx
- @nestjs/cli
- @nestjs/testing
- ts-node
- @types/bcrypt
- @types/node
- typescript

## God Nodes (most connected - your core abstractions)
1. `ModulePageLayout()` - 36 edges
2. `PrismaService` - 32 edges
3. `ComponentCard()` - 24 edges
4. `ComponentCard()` - 24 edges
5. `Badge()` - 22 edges
6. `Button()` - 22 edges
7. `compilerOptions` - 19 edges
8. `Modal()` - 19 edges
9. `useModal()` - 19 edges
10. `useModal()` - 19 edges

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

## Communities (146 total, 33 thin omitted)

### Community 0 - "uiweb/src/components/form/Label.tsx"
Cohesion: 0.12
Nodes (16): metadata, metadata, SignInForm(), SignUpForm(), DatePicker(), PropsType, CheckboxComponents(), CountryCode (+8 more)

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

### Community 5 - "uiweb/src/components/ecommerce/RecentOrders.tsx"
Cohesion: 0.19
Nodes (14): Product, tableData, Order, tableData, Table(), TableBody(), TableBodyProps, TableCell() (+6 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (27): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+19 more)

### Community 7 - "uiweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.09
Nodes (15): metadata, metadata, metadata, metadata, metadata, metadata, LineChartOne(), ReactApexChart (+7 more)

### Community 8 - "projectweb/src/context/ThemeContext.tsx"
Cohesion: 0.19
Nodes (9): outfit, ThemeToggleButton(), ThemeTogglerTwo(), SidebarProvider(), Theme, ThemeContext, ThemeContextType, ThemeProvider() (+1 more)

### Community 9 - "devDependencies"
Cohesion: 0.05
Nodes (43): Tech Stack & Infrastructure Architecture, Next.js React Framework, Tailwind CSS & Shadcn UI, TanStack React Query, devDependencies, eslint, eslint-config-next, @eslint/eslintrc (+35 more)

### Community 10 - "verification/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, initialQueue, SupplierVerificationQueue(), VerificationItem

### Community 11 - "projectweb/src/components/ui/modal/index.tsx"
Cohesion: 0.15
Nodes (16): metadata, metadata, metadata, Calendar(), CalendarEvent, DefaultModal(), FormInModal(), FullScreenModal() (+8 more)

### Community 12 - "projectweb/src/app/(admin)/page.tsx"
Cohesion: 0.05
Nodes (27): metadata, metadata, metadata, ChartTab(), CountryMap(), CountryMapProps, Marker, MarkerStyle (+19 more)

### Community 13 - "projectweb/src/components/tables/BasicTableOne.tsx"
Cohesion: 0.18
Nodes (14): Product, tableData, Order, tableData, Table(), TableBody(), TableBodyProps, TableCell() (+6 more)

### Community 14 - "AssetRegistryTable.tsx"
Cohesion: 0.11
Nodes (19): metadata, metadata, AssetDetailModal(), AssetDetailModalProps, AssetMaintenanceSchedule(), INITIAL_TASKS, AssetQrData, AssetQrPrintModal() (+11 more)

### Community 15 - "Changelog"
Cohesion: 0.06
Nodes (31): Breaking Changes, Changelog, Cloning the Repository, Components, Demos, Feature Comparison, Free Version, Installation (+23 more)

### Community 16 - "projectweb/src/app/(admin)/(others-pages)/(forms)/form-elements/page.tsx"
Cohesion: 0.10
Nodes (17): metadata, DefaultInputs(), DropzoneComponent(), FileInputExample(), InputGroup(), InputStates(), RadioButtons(), TextAreaInput() (+9 more)

### Community 17 - "ERP MBG System Overview"
Cohesion: 0.40
Nodes (5): Standar Akurasi Pemenuhan Gizi, ERP MBG System Overview, Kepatuhan Multi-ISO MBG, Transparansi Anggaran & Stok Real-Time, Visi Distribusi Makanan Bergizi Gratis

### Community 18 - "uiweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.08
Nodes (22): metadata, metadata, BarChartOne(), ReactApexChart, ComponentCard(), ComponentCardProps, DefaultInputs(), DropzoneComponent() (+14 more)

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
Cohesion: 0.12
Nodes (16): 🚀 Backend API & Database Layer (`projectapi`) (`01_TECH_STACK_&_INFRA.md` & `02_DATABASE_SCHEMA.md`), 📋 Checklist Lengkap Modul & Task, 🏗️ Fase 0: Setup Proyek & Arsitektur Frontend UI, Master Checklist & Progress Review ERP MBG, 📦 Modul 1: Supplier & Vendor Management (`03_MODULE_SUPPLIER_MGMT.md`), 🏬 Modul 2: Gudang & Inventory (`04_MODULE_INVENTORY_MGMT.md`), 🥗 Modul 3: Menu & Nutrisi (`05_MODULE_MENU_&_NUTRISI.md`), 🚚 Modul 4: Logistik & Distribusi (`06_MODULE_LOGISTIK_DISTRIBUSI.md`) (+8 more)

### Community 43 - "dependencies"
Cohesion: 0.04
Nodes (45): dependencies, apexcharts, autoprefixer, flatpickr, @fullcalendar/core, @fullcalendar/daygrid, @fullcalendar/interaction, @fullcalendar/list (+37 more)

### Community 44 - "projectweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.24
Nodes (5): metadata, metadata, BreadcrumbProps, PageBreadcrumb(), BasicTableOne()

### Community 45 - "ExpenditureManagement.tsx"
Cohesion: 0.19
Nodes (12): metadata, CreateExpenditureModal(), CreateExpenditureModalProps, ExpenditureItem, ExpenditureRecord, ExpenditureDetailModal(), ExpenditureDetailModalProps, ExpenditureManagement() (+4 more)

### Community 46 - "BudgetManagement.tsx"
Cohesion: 0.22
Nodes (10): metadata, BudgetDetailModal(), BudgetDetailModalProps, BudgetManagement(), INITIAL_BUDGETS, BudgetReportPrintModal(), BudgetReportPrintModalProps, BudgetAllocation (+2 more)

### Community 47 - "RoleManagementDashboard.tsx"
Cohesion: 0.13
Nodes (15): metadata, ALL_MODULES, CreateRoleModal(), CreateRoleModalProps, RoleDetailModal(), RoleDetailModalProps, RoleHierarchyModal(), RoleHierarchyModalProps (+7 more)

### Community 48 - "HygieneInspectionsAudit.tsx"
Cohesion: 0.20
Nodes (10): metadata, HygieneInspectionDetailModal(), HygieneInspectionDetailModalProps, HygieneInspectionsAudit(), INITIAL_AUDITS, DEFAULT_ITEMS, HygieneAuditData, HygieneInspectionItem (+2 more)

### Community 49 - "uiweb/src/components/ecommerce/MonthlySalesChart.tsx"
Cohesion: 0.33
Nodes (6): ReactApexChart, ReactApexChart, Dropdown(), DropdownProps, DropdownItem(), DropdownItemProps

### Community 50 - "uiweb/src/components/ecommerce/DemographicCard.tsx"
Cohesion: 0.20
Nodes (6): CountryMap(), CountryMapProps, Marker, MarkerStyle, VectorMap, DemographicCard()

### Community 51 - "projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx"
Cohesion: 0.25
Nodes (6): metadata, Avatar(), AvatarProps, sizeClasses, statusColorClasses, statusSizeClasses

### Community 52 - "projectweb/src/app/(admin)/(ui-elements)/images/page.tsx"
Cohesion: 0.31
Nodes (4): metadata, ResponsiveImage(), ThreeColumnImageGrid(), TwoColumnImageGrid()

### Community 53 - "projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 54 - "ModulePageLayout.tsx"
Cohesion: 0.11
Nodes (9): metadata, metadata, metadata, metadata, ModulePageLayoutProps, LowStockAlerts(), DistributionPointsTable(), ShipmentManagement() (+1 more)

### Community 55 - ".login"
Cohesion: 0.09
Nodes (20): ApiProperty, Body, Headers, Ip, IsNotEmpty, IsString, MinLength, Post (+12 more)

### Community 56 - "projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, BarChartOne(), ReactApexChart

### Community 57 - "EmployeeRegistryTable.tsx"
Cohesion: 0.07
Nodes (38): AddCertificationModal(), AddCertificationModalProps, CertificationDetailModal(), CertificationDetailModalProps, CertificationMcuMatrix(), EmployeeCertRecord, INITIAL_CERT_RECORDS, CreateShiftModal() (+30 more)

### Community 58 - "projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, Alert(), AlertProps

### Community 60 - "uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 62 - "UserManagementTable.tsx"
Cohesion: 0.10
Nodes (24): metadata, DEFAULT_MODULES, getInitialRolePermissions(), ModulePermission, RolePermissionMatrixModal(), RolePermissionMatrixModalProps, UserAccessReportPrintModal(), UserAccessReportPrintModalProps (+16 more)

### Community 63 - "InventoryTable.tsx"
Cohesion: 0.22
Nodes (6): metadata, metadata, initialStocks, InventoryTable(), StockItem, StockMovementModal()

### Community 64 - "KitchenOverviewDashboard.tsx"
Cohesion: 0.15
Nodes (13): metadata, initialLines, initialOrganoleptic, KitchenOverviewDashboard(), KitchenRequisitionItem, KitchenRequisitionModal(), KitchenRequisitionModalProps, OrganolepticQualityModal() (+5 more)

### Community 65 - "2. Struktur Submodul & Fitur Utama"
Cohesion: 0.22
Nodes (8): 1. Deskripsi Modul, 2. Struktur Submodul & Fitur Utama, 3. Hubungan Antar Modul, A. Direktori Master Data Karyawan (`/employees`), B. Penjadwalan Shift & Presensi Higiene Harian (`/employees/shifts`), C. Penggajian & Insentif Kerja MBG (`/employees/payroll`), D. Sertifikasi Food Handler & Medical Check Up (`/employees/certifications`), Modul: Manajemen SDM, Tenaga Kerja Dapur & Payroll MBG

### Community 66 - "KitchenFinancialDashboard.tsx"
Cohesion: 0.12
Nodes (15): metadata, CostBreakdownItem, KitchenCostAnalysisModal(), KitchenCostAnalysisModalProps, KitchenExpenseItem, KitchenExpenseRecordModal(), KitchenExpenseRecordModalProps, INITIAL_EXPENSES (+7 more)

### Community 67 - "projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, LineChartOne(), ReactApexChart

### Community 68 - "dependencies"
Cohesion: 0.06
Nodes (33): bcrypt, class-transformer, class-validator, @nestjs/common, @nestjs/config, @nestjs/core, @nestjs/jwt, @nestjs/passport (+25 more)

### Community 69 - "devDependencies"
Cohesion: 0.13
Nodes (15): @nestjs/schematics, prisma, devDependencies, @nestjs/schematics, prisma, source-map-support, ts-loader, tsconfig-paths (+7 more)

### Community 70 - "FinanceOverviewDashboard.tsx"
Cohesion: 0.20
Nodes (8): metadata, FinanceOverviewDashboard(), ReactApexChart, RECENT_TRANSACTIONS, REGIONAL_BUDGETS, RegionalData, FinancialSimulationModal(), FinancialSimulationModalProps

### Community 71 - "ColdChainTelemetry.tsx"
Cohesion: 0.29
Nodes (5): metadata, ColdChainTelemetry(), ReactApexChart, sensors, SensorUnit

### Community 72 - "BrandLogo.tsx"
Cohesion: 0.28
Nodes (6): BrandLogo(), BrandLogoProps, FinancialReportLraPrintModal(), FinancialReportLraPrintModalProps, KitchenSpkPrintModal(), KitchenSpkPrintModalProps

### Community 73 - "reports/page.tsx"
Cohesion: 0.27
Nodes (6): metadata, ComprehensiveFinancialReports(), ReactApexChart, OfficialFinancialReportPrintModal(), OfficialFinancialReportPrintModalProps, ReportType

### Community 74 - "projectweb/src/components/form/form-elements/SelectInputs.tsx"
Cohesion: 0.24
Nodes (7): SelectInputs(), MultiSelect(), MultiSelectProps, Option, Option, Select(), SelectProps

### Community 75 - "🌐 3. Katalog Endpoint REST API"
Cohesion: 0.09
Nodes (22): 🏛️ 1. Arsitektur Backend (`projectapi`), 🗄️ 2. Skema Database Prisma (10 Domain Entity), 🔹 3.10. Finansial & Anggaran, 🔹 3.11. Audit & Kepatuhan ISO, 🔹 3.12. SDM & Karyawan, 🔹 3.1. System Health, 🔹 3.2. Authentication & Profile, 🔹 3.3. Users & RBAC (+14 more)

### Community 76 - "FinanceController"
Cohesion: 0.13
Nodes (12): FinanceController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, UseGuards (+4 more)

### Community 77 - "RecipeBuilder.tsx"
Cohesion: 0.22
Nodes (7): metadata, IngredientMaster, masterIngredients, presets, RecipeBuilder(), RecipeIngredientItem, RecipePreset

### Community 78 - "uiweb/src/components/form/form-elements/SelectInputs.tsx"
Cohesion: 0.24
Nodes (7): SelectInputs(), MultiSelect(), MultiSelectProps, Option, Option, Select(), SelectProps

### Community 79 - "catalog/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, CatalogItem, initialCatalog, SupplierCatalogGrid()

### Community 81 - "performance/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, SupplierPerformanceScorecard(), VendorPerformance, vendorScores

### Community 82 - "AssetsController"
Cohesion: 0.14
Nodes (11): AssetsController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+3 more)

### Community 92 - "projectweb/src/components/ui/button/Button.tsx"
Cohesion: 0.17
Nodes (12): metadata, StockMovementModalProps, PodDetailModal(), PodDetailModalProps, PodRecord, PodSubmissionModal(), PodSubmissionModalProps, waybillOptions (+4 more)

### Community 93 - "projectweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.11
Nodes (14): metadata, initialAlerts, StockAlert, ReactApexChart, DailyMenuPlan, mockMenuPlans, SupplierRegistrationModal(), initialSuppliers (+6 more)

### Community 94 - "PrismaService"
Cohesion: 0.19
Nodes (4): JwtStrategy, Injectable, PrismaService, Injectable

### Community 95 - "projectweb/src/layout/AppHeader.tsx"
Cohesion: 0.23
Nodes (11): AdminLayout(), SidebarContext, SidebarContextType, useSidebar(), AppHeader(), AppSidebar(), governanceNavItems, NavItem (+3 more)

### Community 96 - "EmployeesController"
Cohesion: 0.12
Nodes (13): EmployeesController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+5 more)

### Community 98 - "KitchenController"
Cohesion: 0.12
Nodes (13): KitchenController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+5 more)

### Community 99 - "LogisticsController"
Cohesion: 0.13
Nodes (13): LogisticsController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+5 more)

### Community 100 - "projectweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.12
Nodes (18): metadata, metadata, SignInForm(), SignUpForm(), ComponentCard(), ComponentCardProps, DatePicker(), PropsType (+10 more)

### Community 101 - "MenuController"
Cohesion: 0.15
Nodes (11): MenuController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+3 more)

### Community 102 - "IncidentReportManagement.tsx"
Cohesion: 0.22
Nodes (10): metadata, CreateIncidentReportModal(), CreateIncidentReportModalProps, IncidentReport, IncidentDetailModal(), IncidentDetailModalProps, IncidentReportManagement(), INITIAL_INCIDENTS (+2 more)

### Community 103 - "IsoComplianceMatrix.tsx"
Cohesion: 0.22
Nodes (10): metadata, AddCertificateModal(), AddCertificateModalProps, IsoCertificate, CertificateDetailModal(), CertificateDetailModalProps, IsoAuditReportPrintModal(), IsoAuditReportPrintModalProps (+2 more)

### Community 104 - "uiweb/src/app/(admin)/page.tsx"
Cohesion: 0.14
Nodes (8): metadata, ChartTab(), EcommerceMetrics(), MonthlySalesChart(), MonthlyTarget(), RecentOrders(), Chart, StatisticsChart()

### Community 105 - "AuditLogViewer.tsx"
Cohesion: 0.24
Nodes (8): metadata, AuditLogDetailModal(), AuditLogDetailModalProps, AuditLogEntry, AuditLogViewer(), INITIAL_AUDIT_LOGS, AuditReportPrintModal(), AuditReportPrintModalProps

### Community 106 - "SuppliersController"
Cohesion: 0.13
Nodes (13): SuppliersController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+5 more)

### Community 107 - "ComplianceController"
Cohesion: 0.15
Nodes (10): ComplianceController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, UseGuards (+2 more)

### Community 117 - "InventoryController"
Cohesion: 0.13
Nodes (12): InventoryController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, UseGuards (+4 more)

### Community 118 - "UsersController"
Cohesion: 0.13
Nodes (13): ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query, UseGuards (+5 more)

### Community 119 - "uiweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.33
Nodes (5): Badge(), BadgeColor, BadgeProps, BadgeSize, BadgeVariant

### Community 120 - "app.module.ts"
Cohesion: 0.14
Nodes (13): Global, AssetsModule, Module, AuthModule, Module, ComplianceModule, Module, HealthModule (+5 more)

### Community 121 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, incremental (+11 more)

### Community 122 - "ModulePageLayout"
Cohesion: 0.20
Nodes (6): metadata, metadata, metadata, metadata, ModulePageLayout(), EmployeeNavigationTabs()

### Community 123 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, format, lint, prisma:format, prisma:generate, prisma:migrate, prisma:seed (+7 more)

### Community 124 - "main.ts"
Cohesion: 0.18
Nodes (7): Catch, AppModule, Module, HttpExceptionFilter, Response, TransformInterceptor, Injectable

### Community 125 - "projectapi/package.json"
Cohesion: 0.22
Nodes (8): author, description, license, name, prisma, seed, private, version

### Community 126 - "exclude"
Cohesion: 0.22
Nodes (8): exclude, extends, node_modules, dist, prisma/seed.ts, **/*spec.ts, test, ./tsconfig.json

### Community 127 - "🚀 Quick Start"
Cohesion: 0.15
Nodes (12): 1. Prasyarat Sistem, 2. Instalasi Dependensi, 3. Konfigurasi Environment (`.env`), 4. Setup Database & Seeder, 5. Menjalankan Server API, ERP MBG Enterprise Backend API Service (`projectapi`), Menggunakan VS Code REST Client, Menjalankan Automated Test Runner (+4 more)

### Community 128 - "uiweb/src/app/(admin)/(ui-elements)/images/page.tsx"
Cohesion: 0.31
Nodes (4): metadata, ResponsiveImage(), ThreeColumnImageGrid(), TwoColumnImageGrid()

### Community 129 - "RolesGuard"
Cohesion: 0.29
Nodes (3): ROLES_KEY, RolesGuard, Injectable

### Community 130 - "ShipmentManagement.tsx"
Cohesion: 0.32
Nodes (8): CreateShipmentModal(), CreateShipmentModalProps, Shipment, LiveTrackingModal(), LiveTrackingModalProps, initialShipments, ShipmentWaybillPrintModal(), ShipmentWaybillPrintModalProps

### Community 131 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 132 - "DistributionPointsTable.tsx"
Cohesion: 0.39
Nodes (6): DistributionPoint, DistributionPointModal(), DistributionPointModalProps, initialPoints, DistributionRouteMap(), DistributionRouteMapProps

### Community 133 - "HealthController"
Cohesion: 0.25
Nodes (6): HealthController, ApiOperation, ApiResponse, ApiTags, Controller, Get

### Community 134 - "ERP MBG — Sistem Manajemen Makanan Bergizi Gratis Nasional"
Cohesion: 0.25
Nodes (7): 1. Menjalankan Backend API (`projectapi`), 2. Menjalankan Frontend Web (`projectweb`), 🏛️ Arsitektur Proyek, 📚 Dokumentasi Lengkap (`task_md/`), ERP MBG — Sistem Manajemen Makanan Bergizi Gratis Nasional, 🚀 Memulai Proyek (Development Setup), 📋 Modul & Fitur ERP MBG

### Community 135 - "test-api.ts"
Cohesion: 0.40
Nodes (5): colors, request(), results, runTestSuite(), TestResult

### Community 136 - "uiweb/src/app/(admin)/(ui-elements)/alerts/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, Alert(), AlertProps

## Knowledge Gaps
- **641 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModulePageLayout()` connect `ModulePageLayout` to `menu/page.tsx`, `verification/page.tsx`, `projectweb/src/app/(admin)/page.tsx`, `AssetRegistryTable.tsx`, `PaymentManagement.tsx`, `ExpenditureManagement.tsx`, `BudgetManagement.tsx`, `RoleManagementDashboard.tsx`, `HygieneInspectionsAudit.tsx`, `ModulePageLayout.tsx`, `proof-of-delivery/page.tsx`, `UserManagementTable.tsx`, `InventoryTable.tsx`, `KitchenOverviewDashboard.tsx`, `KitchenFinancialDashboard.tsx`, `FinanceOverviewDashboard.tsx`, `ColdChainTelemetry.tsx`, `reports/page.tsx`, `RecipeBuilder.tsx`, `catalog/page.tsx`, `suppliers/page.tsx`, `performance/page.tsx`, `IncidentReportManagement.tsx`, `IsoComplianceMatrix.tsx`, `AuditLogViewer.tsx`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `PageBreadcrumb()` connect `projectweb/src/components/common/PageBreadCrumb.tsx` to `projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx`, `projectweb/src/components/ui/modal/index.tsx`, `projectweb/src/app/(admin)/(others-pages)/(forms)/form-elements/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx`, `ModulePageLayout.tsx`, `projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx`, `projectweb/src/components/ui/button/Button.tsx`, `projectweb/src/components/ui/badge/Badge.tsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `ComponentCard()` connect `uiweb/src/components/common/ComponentCard.tsx` to `uiweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `uiweb/src/components/form/Label.tsx`, `useModal`, `uiweb/src/components/common/PageBreadCrumb.tsx`, `uiweb/src/app/(admin)/(ui-elements)/alerts/page.tsx`, `uiweb/src/app/(admin)/(others-pages)/(tables)/basic-tables/page.tsx`, `uiweb/src/components/form/form-elements/SelectInputs.tsx`, `uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `uiweb/src/components/form/Label.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11895161290322581 - nodes in this community are weakly interconnected._
- **Should `uiweb/src/layout/AppHeader.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07149758454106281 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._