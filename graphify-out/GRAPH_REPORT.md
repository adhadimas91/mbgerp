# Graph Report - mbgerp  (2026-08-27)

## Corpus Check
- 449 files · ~864,742 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2005 nodes · 3098 edges · 161 communities (117 shown, 44 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7b86a70c`
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
- projectweb/src/components/calendar/Calendar.tsx
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
- 🎯 Pilihan Prioritas untuk Task Selanjutnya
- dependencies
- projectweb/src/components/common/PageBreadCrumb.tsx
- ExpenditureManagement.tsx
- BudgetManagement.tsx
- RoleManagementDashboard.tsx
- HygieneInspectionsAudit.tsx
- uiweb/src/components/ecommerce/DemographicCard.tsx
- uiweb/src/components/ecommerce/CountryMap.tsx
- api.ts
- projectweb/src/app/(admin)/(ui-elements)/images/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- ModulePageLayout
- .login
- uiweb/src/context/ThemeContext.tsx
- EmployeeRegistryTable.tsx
- AuthContext.tsx
- proof-of-delivery/page.tsx
- uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- projectweb/.eslintrc.json
- UserManagementTable.tsx
- InventoryTable.tsx
- KitchenOverviewDashboard.tsx
- 2. Struktur Submodul & Fitur Utama
- KitchenFinancialDashboard.tsx
- projectweb/src/components/ecommerce/DemographicCard.tsx
- dependencies
- devDependencies
- projectweb/src/components/ecommerce/CountryMap.tsx
- ColdChainTelemetry.tsx
- nutrition/page.tsx
- reports/page.tsx
- projectweb/src/components/form/form-elements/SelectInputs.tsx
- 🌐 3. Katalog Endpoint REST API
- FinanceController
- RecipeBuilder.tsx
- uiweb/src/components/form/form-elements/SelectInputs.tsx
- uiweb/package.json
- SupplierTable.tsx
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
- projectweb/src/components/ui/badge/Badge.tsx
- inventory/alerts/page.tsx
- PrismaService
- projectweb/src/layout/AppHeader.tsx
- EmployeesController
- projectweb/src/app/(full-width-pages)/(error-pages)/error-404/page.tsx
- KitchenController
- LogisticsController
- useModal
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
- UserSecuritySessionsModal.tsx
- app.module.ts
- compilerOptions
- ModulePageLayout.tsx
- scripts
- main.ts
- projectapi/package.json
- exclude
- 🚀 Quick Start
- uiweb/src/app/(admin)/(ui-elements)/images/page.tsx
- RolesGuard
- overrides
- nest-cli.json
- DistributionPointsTable.tsx
- HealthController
- ERP MBG — Sistem Manajemen Makanan Bergizi Gratis Nasional
- test-api.ts
- uiweb/src/app/(full-width-pages)/(error-pages)/error-404/page.tsx
- seed.ts
- menu/page.tsx
- cost-analysis/page.tsx
- @nestjs/cli
- @nestjs/testing
- ts-node
- @types/bcrypt
- @types/node
- typescript
- RolePermissionMatrixModal.tsx
- uiweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx
- scripts
- NotificationDropdown
- NotificationDropdown
- UserDropdown
- flatpickr
- @fullcalendar/daygrid
- @fullcalendar/react
- react
- react-dom
- react-dropzone
- @react-jvectormap/world
- tailwind-merge
- @tailwindcss/postcss

## God Nodes (most connected - your core abstractions)
1. `ModulePageLayout()` - 36 edges
2. `PrismaService` - 32 edges
3. `ComponentCard()` - 24 edges
4. `ComponentCard()` - 24 edges
5. `Badge()` - 21 edges
6. `Button()` - 21 edges
7. `compilerOptions` - 19 edges
8. `useModal()` - 19 edges
9. `Modal()` - 18 edges
10. `useModal()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `RolePermissionMatrixModalProps` --references--> `UserAccount`  [EXTRACTED]
  projectweb/src/components/settings/RolePermissionMatrixModal.tsx → projectweb/src/components/settings/UserManagementTable.tsx
- `UserSecuritySessionsModalProps` --references--> `UserAccount`  [EXTRACTED]
  projectweb/src/components/settings/UserSecuritySessionsModal.tsx → projectweb/src/components/settings/UserManagementTable.tsx
- `Fixed Asset Management Module` --shares_data_with--> `Fixed Assets & Maintenance Schema`  [INFERRED]
  task_md/12_MODULE_ASSET_MGMT.md → task_md/02_DATABASE_SCHEMA.md
- `Audit Trail & Tamper-Proof Logging Module` --implements--> `Audit Logs Schema`  [INFERRED]
  task_md/10_AUDIT_TRAIL_MGMT.md → task_md/02_DATABASE_SCHEMA.md
- `Inventory & Warehouse Management Module` --shares_data_with--> `Warehouse & Stocks Schema`  [INFERRED]
  task_md/04_MODULE_INVENTORY_MGMT.md → task_md/02_DATABASE_SCHEMA.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **MBG Governance, Audit Trail & ISO Compliance Framework** — task_md_07_module_finansial_budget_finance_module, task_md_10_audit_trail_mgmt_audit_module, task_md_11_iso_compliance_quality_compliance_module, task_md_08_module_dashboard_report_dashboard_module [INFERRED 0.85]
- **MBG End-to-End Supply Chain & Distribution Pipeline** — task_md_03_module_supplier_mgmt_supplier_management, task_md_04_module_inventory_mgmt_inventory_management, task_md_05_module_menu_nutrisi_menu_management, task_md_06_module_logistik_distribusi_logistics_module [INFERRED 0.85]

## Communities (161 total, 44 thin omitted)

### Community 0 - "uiweb/src/components/form/Label.tsx"
Cohesion: 0.14
Nodes (13): metadata, metadata, SignInForm(), SignUpForm(), DatePicker(), PropsType, CountryCode, PhoneInput() (+5 more)

### Community 1 - "uiweb/src/layout/AppHeader.tsx"
Cohesion: 0.23
Nodes (11): AdminLayout(), SidebarContext, SidebarContextType, useSidebar(), AppHeader(), AppSidebar(), NavItem, navItems (+3 more)

### Community 2 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, apexcharts, autoprefixer, @fullcalendar/core, @fullcalendar/interaction, @fullcalendar/list, @fullcalendar/timegrid, next (+19 more)

### Community 3 - "Database Schema Design"
Cohesion: 0.05
Nodes (44): Fixed Assets & Maintenance Schema, Audit Logs Schema, Budget & Payment Transaction Schema, Database Schema Design, Distribution & Delivery Logs Schema, Menu & Nutrition Item Schema, Supplier Schema & Documents, User & Role Entities (+36 more)

### Community 4 - "useModal"
Cohesion: 0.14
Nodes (17): metadata, metadata, metadata, CalendarEvent, DefaultModal(), FormInModal(), FullScreenModal(), ModalBasedAlerts() (+9 more)

### Community 5 - "uiweb/src/components/ecommerce/RecentOrders.tsx"
Cohesion: 0.13
Nodes (20): Product, tableData, BasicTableOne(), Order, tableData, Badge(), BadgeColor, BadgeProps (+12 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (27): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+19 more)

### Community 7 - "uiweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.07
Nodes (18): metadata, metadata, metadata, metadata, metadata, metadata, Calendar(), LineChartOne() (+10 more)

### Community 8 - "projectweb/src/context/ThemeContext.tsx"
Cohesion: 0.27
Nodes (7): ThemeToggleButton(), ThemeTogglerTwo(), Theme, ThemeContext, ThemeContextType, ThemeProvider(), useTheme()

### Community 9 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, eslint, eslint-config-next, @eslint/eslintrc, postcss, @svgr/webpack, tailwindcss, @types/node (+15 more)

### Community 10 - "verification/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, initialQueue, SupplierVerificationQueue(), VerificationItem

### Community 11 - "projectweb/src/components/calendar/Calendar.tsx"
Cohesion: 0.33
Nodes (3): metadata, Calendar(), CalendarEvent

### Community 12 - "projectweb/src/app/(admin)/page.tsx"
Cohesion: 0.13
Nodes (7): metadata, DemographicCard(), MonthlySalesChart(), MonthlyTarget(), MbgRecentShipments(), mockShipments, ShipmentItem

### Community 13 - "projectweb/src/components/tables/BasicTableOne.tsx"
Cohesion: 0.18
Nodes (14): Product, tableData, Order, tableData, Table(), TableBody(), TableBodyProps, TableCell() (+6 more)

### Community 14 - "AssetRegistryTable.tsx"
Cohesion: 0.11
Nodes (19): metadata, metadata, AssetDetailModal(), AssetDetailModalProps, AssetMaintenanceSchedule(), INITIAL_TASKS, AssetQrData, AssetQrPrintModal() (+11 more)

### Community 15 - "Changelog"
Cohesion: 0.06
Nodes (31): Breaking Changes, Changelog, Cloning the Repository, Components, Demos, Feature Comparison, Free Version, Installation (+23 more)

### Community 16 - "projectweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.07
Nodes (28): metadata, metadata, BarChartOne(), ReactApexChart, ComponentCard(), ComponentCardProps, CheckboxComponents(), DefaultInputs() (+20 more)

### Community 17 - "ERP MBG System Overview"
Cohesion: 0.40
Nodes (5): Standar Akurasi Pemenuhan Gizi, ERP MBG System Overview, Kepatuhan Multi-ISO MBG, Transparansi Anggaran & Stok Real-Time, Visi Distribusi Makanan Bergizi Gratis

### Community 18 - "uiweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.08
Nodes (23): metadata, metadata, ComponentCard(), ComponentCardProps, CheckboxComponents(), DefaultInputs(), DropzoneComponent(), FileInputExample() (+15 more)

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

### Community 42 - "🎯 Pilihan Prioritas untuk Task Selanjutnya"
Cohesion: 0.11
Nodes (17): 🚀 Backend API & Database Layer (`projectapi`) (`01_TECH_STACK_&_INFRA.md` & `02_DATABASE_SCHEMA.md`), 📋 Checklist Lengkap Modul & Task, 🏗️ Fase 0: Setup Proyek & Arsitektur Frontend UI, 🌐 Layer Integrasi Frontend-Backend (`projectweb/src/services` & `projectweb/src/context`), Master Checklist & Progress Review ERP MBG, 🏬 Modul 2: Gudang & Inventory (`04_MODULE_INVENTORY_MGMT.md`), 🥗 Modul 3: Menu & Nutrisi (`05_MODULE_MENU_&_NUTRISI.md`), 🚚 Modul 4: Logistik & Distribusi (`06_MODULE_LOGISTIK_DISTRIBUSI.md`) (+9 more)

### Community 43 - "dependencies"
Cohesion: 0.04
Nodes (47): axios, dependencies, apexcharts, autoprefixer, axios, flatpickr, @fullcalendar/core, @fullcalendar/daygrid (+39 more)

### Community 44 - "projectweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.07
Nodes (19): metadata, metadata, metadata, metadata, metadata, metadata, metadata, LineChartOne() (+11 more)

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

### Community 49 - "uiweb/src/components/ecommerce/DemographicCard.tsx"
Cohesion: 0.33
Nodes (6): ReactApexChart, ReactApexChart, Dropdown(), DropdownProps, DropdownItem(), DropdownItemProps

### Community 50 - "uiweb/src/components/ecommerce/CountryMap.tsx"
Cohesion: 0.33
Nodes (5): CountryMap(), CountryMapProps, Marker, MarkerStyle, VectorMap

### Community 51 - "api.ts"
Cohesion: 0.11
Nodes (16): BackendStatusBadge(), HealthData, apiClient, AssetPayload, assetService, complianceService, IncidentPayload, EmployeePayload (+8 more)

### Community 52 - "projectweb/src/app/(admin)/(ui-elements)/images/page.tsx"
Cohesion: 0.31
Nodes (4): metadata, ResponsiveImage(), ThreeColumnImageGrid(), TwoColumnImageGrid()

### Community 53 - "projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 54 - "ModulePageLayout"
Cohesion: 0.15
Nodes (6): metadata, metadata, metadata, ModulePageLayout(), DistributionPointsTable(), ShipmentManagement()

### Community 55 - ".login"
Cohesion: 0.11
Nodes (19): ApiProperty, Body, Headers, Ip, IsNotEmpty, IsString, MinLength, Post (+11 more)

### Community 56 - "uiweb/src/context/ThemeContext.tsx"
Cohesion: 0.19
Nodes (9): outfit, ThemeToggleButton(), ThemeTogglerTwo(), SidebarProvider(), Theme, ThemeContext, ThemeContextType, ThemeProvider() (+1 more)

### Community 57 - "EmployeeRegistryTable.tsx"
Cohesion: 0.07
Nodes (38): AddCertificationModal(), AddCertificationModalProps, CertificationDetailModal(), CertificationDetailModalProps, CertificationMcuMatrix(), EmployeeCertRecord, INITIAL_CERT_RECORDS, CreateShiftModal() (+30 more)

### Community 58 - "AuthContext.tsx"
Cohesion: 0.21
Nodes (8): outfit, AuthContext, AuthContextType, AuthProvider(), DEFAULT_BGN_ACCOUNTS, DefaultAccount, UserProfile, SidebarProvider()

### Community 60 - "uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 62 - "UserManagementTable.tsx"
Cohesion: 0.16
Nodes (14): metadata, UserAccessReportPrintModal(), UserAccessReportPrintModalProps, UserDetailModal(), UserDetailModalProps, UserFormModal(), UserFormModalProps, INITIAL_USERS (+6 more)

### Community 63 - "InventoryTable.tsx"
Cohesion: 0.22
Nodes (6): metadata, metadata, initialStocks, InventoryTable(), StockItem, StockMovementModal()

### Community 64 - "KitchenOverviewDashboard.tsx"
Cohesion: 0.06
Nodes (28): metadata, metadata, FinanceOverviewDashboard(), ReactApexChart, RECENT_TRANSACTIONS, REGIONAL_BUDGETS, RegionalData, FinancialReportLraPrintModal() (+20 more)

### Community 65 - "2. Struktur Submodul & Fitur Utama"
Cohesion: 0.22
Nodes (8): 1. Deskripsi Modul, 2. Struktur Submodul & Fitur Utama, 3. Hubungan Antar Modul, A. Direktori Master Data Karyawan (`/employees`), B. Penjadwalan Shift & Presensi Higiene Harian (`/employees/shifts`), C. Penggajian & Insentif Kerja MBG (`/employees/payroll`), D. Sertifikasi Food Handler & Medical Check Up (`/employees/certifications`), Modul: Manajemen SDM, Tenaga Kerja Dapur & Payroll MBG

### Community 66 - "KitchenFinancialDashboard.tsx"
Cohesion: 0.12
Nodes (15): metadata, CostBreakdownItem, KitchenCostAnalysisModal(), KitchenCostAnalysisModalProps, KitchenExpenseItem, KitchenExpenseRecordModal(), KitchenExpenseRecordModalProps, INITIAL_EXPENSES (+7 more)

### Community 67 - "projectweb/src/components/ecommerce/DemographicCard.tsx"
Cohesion: 0.33
Nodes (6): ReactApexChart, ReactApexChart, Dropdown(), DropdownProps, DropdownItem(), DropdownItemProps

### Community 68 - "dependencies"
Cohesion: 0.06
Nodes (33): bcrypt, class-transformer, class-validator, @nestjs/common, @nestjs/config, @nestjs/core, @nestjs/jwt, @nestjs/passport (+25 more)

### Community 69 - "devDependencies"
Cohesion: 0.13
Nodes (15): @nestjs/schematics, prisma, devDependencies, @nestjs/schematics, prisma, source-map-support, ts-loader, tsconfig-paths (+7 more)

### Community 70 - "projectweb/src/components/ecommerce/CountryMap.tsx"
Cohesion: 0.22
Nodes (6): metadata, CountryMap(), CountryMapProps, Marker, MarkerStyle, VectorMap

### Community 71 - "ColdChainTelemetry.tsx"
Cohesion: 0.29
Nodes (5): metadata, ColdChainTelemetry(), ReactApexChart, sensors, SensorUnit

### Community 72 - "nutrition/page.tsx"
Cohesion: 0.27
Nodes (5): metadata, ChartTab(), Chart, StatisticsChart(), MbgNutritionGauge()

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
Cohesion: 0.11
Nodes (12): FinanceController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, UseGuards (+4 more)

### Community 77 - "RecipeBuilder.tsx"
Cohesion: 0.22
Nodes (7): metadata, IngredientMaster, masterIngredients, presets, RecipeBuilder(), RecipeIngredientItem, RecipePreset

### Community 78 - "uiweb/src/components/form/form-elements/SelectInputs.tsx"
Cohesion: 0.24
Nodes (7): SelectInputs(), MultiSelect(), MultiSelectProps, Option, Option, Select(), SelectProps

### Community 79 - "uiweb/package.json"
Cohesion: 0.25
Nodes (8): Tech Stack & Infrastructure Architecture, Next.js React Framework, Tailwind CSS & Shadcn UI, TanStack React Query, name, private, version, Next.js UI Application Documentation

### Community 80 - "SupplierTable.tsx"
Cohesion: 0.22
Nodes (7): metadata, SupplierRegistrationModal(), initialSuppliers, SupplierData, SupplierTable(), SupplierPayload, supplierService

### Community 81 - "performance/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, SupplierPerformanceScorecard(), VendorPerformance, vendorScores

### Community 82 - "AssetsController"
Cohesion: 0.14
Nodes (11): AssetsController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+3 more)

### Community 92 - "projectweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.09
Nodes (32): StockMovementModalProps, CreateShipmentModal(), CreateShipmentModalProps, Shipment, LiveTrackingModal(), LiveTrackingModalProps, PodDetailModal(), PodDetailModalProps (+24 more)

### Community 93 - "inventory/alerts/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, initialAlerts, LowStockAlerts(), StockAlert

### Community 94 - "PrismaService"
Cohesion: 0.19
Nodes (4): JwtStrategy, Injectable, PrismaService, Injectable

### Community 95 - "projectweb/src/layout/AppHeader.tsx"
Cohesion: 0.18
Nodes (12): AdminLayout(), UserDropdown(), useAuth(), SidebarContext, SidebarContextType, useSidebar(), AppHeader(), AppSidebar() (+4 more)

### Community 96 - "EmployeesController"
Cohesion: 0.12
Nodes (13): EmployeesController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+5 more)

### Community 98 - "KitchenController"
Cohesion: 0.11
Nodes (13): KitchenController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+5 more)

### Community 99 - "LogisticsController"
Cohesion: 0.11
Nodes (13): LogisticsController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+5 more)

### Community 100 - "useModal"
Cohesion: 0.10
Nodes (20): metadata, metadata, metadata, metadata, SignInForm(), SignUpForm(), DefaultModal(), FormInModal() (+12 more)

### Community 101 - "MenuController"
Cohesion: 0.11
Nodes (13): MenuController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+5 more)

### Community 102 - "IncidentReportManagement.tsx"
Cohesion: 0.22
Nodes (10): metadata, CreateIncidentReportModal(), CreateIncidentReportModalProps, IncidentReport, IncidentDetailModal(), IncidentDetailModalProps, IncidentReportManagement(), INITIAL_INCIDENTS (+2 more)

### Community 103 - "IsoComplianceMatrix.tsx"
Cohesion: 0.22
Nodes (10): metadata, AddCertificateModal(), AddCertificateModalProps, IsoCertificate, CertificateDetailModal(), CertificateDetailModalProps, IsoAuditReportPrintModal(), IsoAuditReportPrintModalProps (+2 more)

### Community 104 - "uiweb/src/app/(admin)/page.tsx"
Cohesion: 0.12
Nodes (9): metadata, ChartTab(), DemographicCard(), EcommerceMetrics(), MonthlySalesChart(), MonthlyTarget(), RecentOrders(), Chart (+1 more)

### Community 105 - "AuditLogViewer.tsx"
Cohesion: 0.24
Nodes (8): metadata, AuditLogDetailModal(), AuditLogDetailModalProps, AuditLogEntry, AuditLogViewer(), INITIAL_AUDIT_LOGS, AuditReportPrintModal(), AuditReportPrintModalProps

### Community 106 - "SuppliersController"
Cohesion: 0.14
Nodes (11): SuppliersController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+3 more)

### Community 107 - "ComplianceController"
Cohesion: 0.12
Nodes (12): ComplianceController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, UseGuards (+4 more)

### Community 117 - "InventoryController"
Cohesion: 0.12
Nodes (12): InventoryController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, UseGuards (+4 more)

### Community 118 - "UsersController"
Cohesion: 0.15
Nodes (11): ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query, UseGuards (+3 more)

### Community 119 - "UserSecuritySessionsModal.tsx"
Cohesion: 0.29
Nodes (6): AuthSecurityLog, MOCK_AUTH_LOGS, MOCK_SESSIONS, SessionEntry, UserSecuritySessionsModal(), UserSecuritySessionsModalProps

### Community 120 - "app.module.ts"
Cohesion: 0.14
Nodes (13): Global, AssetsModule, Module, AuthModule, Module, HealthModule, Module, SuppliersModule (+5 more)

### Community 121 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, incremental (+11 more)

### Community 122 - "ModulePageLayout.tsx"
Cohesion: 0.18
Nodes (6): metadata, metadata, metadata, metadata, ModulePageLayoutProps, EmployeeNavigationTabs()

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

### Community 130 - "overrides"
Cohesion: 0.29
Nodes (7): overrides, @react-jvectormap/core, @react-jvectormap/world, react, react-dom, react, react-dom

### Community 131 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 132 - "DistributionPointsTable.tsx"
Cohesion: 0.39
Nodes (6): DistributionPoint, DistributionPointModal(), DistributionPointModalProps, initialPoints, DistributionRouteMap(), DistributionRouteMapProps

### Community 133 - "HealthController"
Cohesion: 0.25
Nodes (6): HealthController, ApiOperation, ApiTags, Controller, Get, ApiResponse

### Community 134 - "ERP MBG — Sistem Manajemen Makanan Bergizi Gratis Nasional"
Cohesion: 0.25
Nodes (7): 1. Menjalankan Backend API (`projectapi`), 2. Menjalankan Frontend Web (`projectweb`), 🏛️ Arsitektur Proyek, 📚 Dokumentasi Lengkap (`task_md/`), ERP MBG — Sistem Manajemen Makanan Bergizi Gratis Nasional, 🚀 Memulai Proyek (Development Setup), 📋 Modul & Fitur ERP MBG

### Community 135 - "test-api.ts"
Cohesion: 0.40
Nodes (5): colors, request(), results, runTestSuite(), TestResult

### Community 139 - "cost-analysis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, MenuCostAnalysis(), ReactApexChart

### Community 146 - "RolePermissionMatrixModal.tsx"
Cohesion: 0.40
Nodes (5): DEFAULT_MODULES, getInitialRolePermissions(), ModulePermission, RolePermissionMatrixModal(), RolePermissionMatrixModalProps

### Community 147 - "uiweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, BarChartOne(), ReactApexChart

### Community 148 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

## Knowledge Gaps
- **660 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+655 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **44 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ApiResponse` connect `HealthController` to `api.ts`, `.login`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `ModulePageLayout()` connect `ModulePageLayout` to `menu/page.tsx`, `cost-analysis/page.tsx`, `verification/page.tsx`, `AssetRegistryTable.tsx`, `PaymentManagement.tsx`, `ExpenditureManagement.tsx`, `BudgetManagement.tsx`, `RoleManagementDashboard.tsx`, `HygieneInspectionsAudit.tsx`, `proof-of-delivery/page.tsx`, `UserManagementTable.tsx`, `InventoryTable.tsx`, `KitchenOverviewDashboard.tsx`, `KitchenFinancialDashboard.tsx`, `projectweb/src/components/ecommerce/CountryMap.tsx`, `ColdChainTelemetry.tsx`, `nutrition/page.tsx`, `reports/page.tsx`, `RecipeBuilder.tsx`, `SupplierTable.tsx`, `performance/page.tsx`, `inventory/alerts/page.tsx`, `IncidentReportManagement.tsx`, `IsoComplianceMatrix.tsx`, `AuditLogViewer.tsx`, `ModulePageLayout.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `HealthController` connect `HealthController` to `app.module.ts`, `PrismaService`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _660 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `uiweb/src/components/form/Label.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Database Schema Design` be split into smaller, more focused modules?**
  _Cohesion score 0.049682875264270614 - nodes in this community are weakly interconnected._