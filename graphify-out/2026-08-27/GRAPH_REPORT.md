# Graph Report - mbgerp  (2026-08-27)

## Corpus Check
- 432 files · ~860,204 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1914 nodes · 3019 edges · 155 communities (108 shown, 47 thin omitted)
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
- projectweb/src/components/ui/badge/Badge.tsx
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
- RoleManagementDashboard.tsx
- HygieneInspectionsAudit.tsx
- uiweb/src/components/ecommerce/DemographicCard.tsx
- uiweb/src/components/ecommerce/CountryMap.tsx
- projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/images/page.tsx
- projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- shipments/page.tsx
- .login
- projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx
- EmployeeRegistryTable.tsx
- projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx
- proof-of-delivery/page.tsx
- uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx
- projectweb/.eslintrc.json
- UserManagementTable.tsx
- ModulePageLayout.tsx
- KitchenOverviewDashboard.tsx
- 2. Struktur Submodul & Fitur Utama
- KitchenFinancialDashboard.tsx
- projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx
- dependencies
- devDependencies
- FinanceOverviewDashboard.tsx
- ColdChainTelemetry.tsx
- projectweb/src/layout/AppSidebar.tsx
- reports/page.tsx
- projectweb/src/components/form/form-elements/SelectInputs.tsx
- cost-analysis/page.tsx
- FinanceController
- recipes/page.tsx
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
- NotificationDropdown
- inventory/alerts/page.tsx
- PrismaService
- projectweb/src/layout/AppHeader.tsx
- EmployeesController
- projectweb/src/app/(full-width-pages)/(error-pages)/error-404/page.tsx
- KitchenController
- LogisticsController
- ComponentCard
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
- certifications/page.tsx
- scripts
- main.ts
- projectapi/package.json
- exclude
- uiweb/package.json
- uiweb/src/app/(admin)/(ui-elements)/images/page.tsx
- RolesGuard
- overrides
- nest-cli.json
- projectweb/src/components/form/form-elements/TextAreaInput.tsx
- scripts
- projectweb/src/app/(full-width-pages)/(auth)/signin/page.tsx
- projectweb/src/app/(full-width-pages)/(auth)/signup/page.tsx
- projectweb/src/components/form/group-input/PhoneInput.tsx
- seed.ts
- UserDropdown
- DemographicCard
- MonthlySalesChart
- NotificationDropdown
- UserDropdown
- class-validator
- @nestjs/passport
- passport-jwt
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

## Communities (155 total, 47 thin omitted)

### Community 0 - "uiweb/src/components/form/Label.tsx"
Cohesion: 0.12
Nodes (16): metadata, metadata, SignInForm(), SignUpForm(), DatePicker(), PropsType, CheckboxComponents(), CountryCode (+8 more)

### Community 1 - "uiweb/src/layout/AppHeader.tsx"
Cohesion: 0.09
Nodes (22): AdminLayout(), metadata, outfit, GridShape(), ThemeToggleButton(), ThemeTogglerTwo(), SidebarContext, SidebarContextType (+14 more)

### Community 2 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, apexcharts, autoprefixer, @fullcalendar/core, @fullcalendar/interaction, @fullcalendar/list, @fullcalendar/timegrid, next (+19 more)

### Community 3 - "Database Schema Design"
Cohesion: 0.05
Nodes (44): Fixed Assets & Maintenance Schema, Audit Logs Schema, Budget & Payment Transaction Schema, Database Schema Design, Distribution & Delivery Logs Schema, Menu & Nutrition Item Schema, Supplier Schema & Documents, User & Role Entities (+36 more)

### Community 4 - "useModal"
Cohesion: 0.17
Nodes (17): metadata, metadata, Calendar(), CalendarEvent, DefaultModal(), FormInModal(), FullScreenModal(), ModalBasedAlerts() (+9 more)

### Community 5 - "uiweb/src/components/ecommerce/RecentOrders.tsx"
Cohesion: 0.16
Nodes (16): Product, RecentOrders(), tableData, BasicTableOne(), Order, tableData, Table(), TableBody() (+8 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (27): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+19 more)

### Community 7 - "uiweb/src/components/common/PageBreadCrumb.tsx"
Cohesion: 0.07
Nodes (20): metadata, metadata, metadata, metadata, metadata, metadata, metadata, BarChartOne() (+12 more)

### Community 8 - "projectweb/src/context/ThemeContext.tsx"
Cohesion: 0.19
Nodes (9): outfit, ThemeToggleButton(), ThemeTogglerTwo(), SidebarProvider(), Theme, ThemeContext, ThemeContextType, ThemeProvider() (+1 more)

### Community 9 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, eslint, eslint-config-next, @eslint/eslintrc, postcss, @svgr/webpack, tailwindcss, @types/node (+15 more)

### Community 10 - "verification/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, initialQueue, SupplierVerificationQueue(), VerificationItem

### Community 11 - "projectweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.05
Nodes (58): metadata, metadata, Calendar(), CalendarEvent, DefaultModal(), FormInModal(), FullScreenModal(), ModalBasedAlerts() (+50 more)

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
Cohesion: 0.11
Nodes (15): metadata, ComponentCardProps, DefaultInputs(), DropzoneComponent(), FileInputExample(), InputGroup(), InputStates(), RadioButtons() (+7 more)

### Community 17 - "ERP MBG System Overview"
Cohesion: 0.40
Nodes (5): Standar Akurasi Pemenuhan Gizi, ERP MBG System Overview, Kepatuhan Multi-ISO MBG, Transparansi Anggaran & Stok Real-Time, Visi Distribusi Makanan Bergizi Gratis

### Community 18 - "uiweb/src/components/common/ComponentCard.tsx"
Cohesion: 0.09
Nodes (20): metadata, metadata, ComponentCard(), ComponentCardProps, DefaultInputs(), DropzoneComponent(), FileInputExample(), InputGroup() (+12 more)

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
Cohesion: 0.13
Nodes (8): metadata, metadata, metadata, metadata, metadata, BreadcrumbProps, PageBreadcrumb(), BasicTableOne()

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

### Community 51 - "projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx"
Cohesion: 0.25
Nodes (6): metadata, Avatar(), AvatarProps, sizeClasses, statusColorClasses, statusSizeClasses

### Community 52 - "projectweb/src/app/(admin)/(ui-elements)/images/page.tsx"
Cohesion: 0.31
Nodes (4): metadata, ResponsiveImage(), ThreeColumnImageGrid(), TwoColumnImageGrid()

### Community 53 - "projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 55 - ".login"
Cohesion: 0.10
Nodes (20): ApiProperty, Body, Headers, Ip, IsNotEmpty, IsString, MinLength, Post (+12 more)

### Community 56 - "projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, BarChartOne(), ReactApexChart

### Community 57 - "EmployeeRegistryTable.tsx"
Cohesion: 0.08
Nodes (34): AddCertificationModal(), AddCertificationModalProps, CertificationDetailModal(), CertificationDetailModalProps, EmployeeCertRecord, INITIAL_CERT_RECORDS, CreateShiftModal(), CreateShiftModalProps (+26 more)

### Community 58 - "projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, Alert(), AlertProps

### Community 60 - "uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx"
Cohesion: 0.28
Nodes (5): metadata, VideosExample(), AspectRatio, YouTubeEmbed(), YouTubeEmbedProps

### Community 62 - "UserManagementTable.tsx"
Cohesion: 0.10
Nodes (24): metadata, DEFAULT_MODULES, getInitialRolePermissions(), ModulePermission, RolePermissionMatrixModal(), RolePermissionMatrixModalProps, UserAccessReportPrintModal(), UserAccessReportPrintModalProps (+16 more)

### Community 63 - "ModulePageLayout.tsx"
Cohesion: 0.12
Nodes (10): metadata, metadata, metadata, metadata, metadata, ModulePageLayout(), ModulePageLayoutProps, InventoryTable() (+2 more)

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
Cohesion: 0.07
Nodes (27): bcrypt, class-transformer, @nestjs/common, @nestjs/config, @nestjs/core, @nestjs/jwt, @nestjs/platform-express, @nestjs/swagger (+19 more)

### Community 69 - "devDependencies"
Cohesion: 0.07
Nodes (27): @nestjs/cli, @nestjs/schematics, @nestjs/testing, prisma, devDependencies, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 70 - "FinanceOverviewDashboard.tsx"
Cohesion: 0.16
Nodes (10): metadata, FinanceOverviewDashboard(), ReactApexChart, RECENT_TRANSACTIONS, REGIONAL_BUDGETS, RegionalData, FinancialReportLraPrintModal(), FinancialReportLraPrintModalProps (+2 more)

### Community 71 - "ColdChainTelemetry.tsx"
Cohesion: 0.29
Nodes (5): metadata, ColdChainTelemetry(), ReactApexChart, sensors, SensorUnit

### Community 72 - "projectweb/src/layout/AppSidebar.tsx"
Cohesion: 0.21
Nodes (8): BrandLogo(), BrandLogoProps, KitchenSpkPrintModal(), KitchenSpkPrintModalProps, governanceNavItems, NavItem, operationalNavItems, SidebarWidget()

### Community 73 - "reports/page.tsx"
Cohesion: 0.27
Nodes (6): metadata, ComprehensiveFinancialReports(), ReactApexChart, OfficialFinancialReportPrintModal(), OfficialFinancialReportPrintModalProps, ReportType

### Community 74 - "projectweb/src/components/form/form-elements/SelectInputs.tsx"
Cohesion: 0.24
Nodes (7): SelectInputs(), MultiSelect(), MultiSelectProps, Option, Option, Select(), SelectProps

### Community 75 - "cost-analysis/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, MenuCostAnalysis(), ReactApexChart

### Community 76 - "FinanceController"
Cohesion: 0.14
Nodes (10): FinanceController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, UseGuards (+2 more)

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

### Community 93 - "inventory/alerts/page.tsx"
Cohesion: 0.33
Nodes (4): metadata, initialAlerts, LowStockAlerts(), StockAlert

### Community 94 - "PrismaService"
Cohesion: 0.10
Nodes (12): JwtStrategy, Injectable, HealthController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 95 - "projectweb/src/layout/AppHeader.tsx"
Cohesion: 0.38
Nodes (7): AdminLayout(), SidebarContext, SidebarContextType, useSidebar(), AppHeader(), AppSidebar(), Backdrop()

### Community 96 - "EmployeesController"
Cohesion: 0.14
Nodes (11): EmployeesController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+3 more)

### Community 98 - "KitchenController"
Cohesion: 0.14
Nodes (11): KitchenController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+3 more)

### Community 99 - "LogisticsController"
Cohesion: 0.14
Nodes (11): LogisticsController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+3 more)

### Community 100 - "ComponentCard"
Cohesion: 0.23
Nodes (10): ComponentCard(), DatePicker(), PropsType, CheckboxComponents(), Checkbox(), CheckboxProps, Input(), InputProps (+2 more)

### Community 101 - "MenuController"
Cohesion: 0.14
Nodes (11): MenuController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+3 more)

### Community 102 - "IncidentReportManagement.tsx"
Cohesion: 0.22
Nodes (10): metadata, CreateIncidentReportModal(), CreateIncidentReportModalProps, IncidentReport, IncidentDetailModal(), IncidentDetailModalProps, IncidentReportManagement(), INITIAL_INCIDENTS (+2 more)

### Community 103 - "IsoComplianceMatrix.tsx"
Cohesion: 0.22
Nodes (10): metadata, AddCertificateModal(), AddCertificateModalProps, IsoCertificate, CertificateDetailModal(), CertificateDetailModalProps, IsoAuditReportPrintModal(), IsoAuditReportPrintModalProps (+2 more)

### Community 104 - "uiweb/src/app/(admin)/page.tsx"
Cohesion: 0.19
Nodes (6): metadata, ChartTab(), EcommerceMetrics(), MonthlyTarget(), Chart, StatisticsChart()

### Community 105 - "AuditLogViewer.tsx"
Cohesion: 0.24
Nodes (8): metadata, AuditLogDetailModal(), AuditLogDetailModalProps, AuditLogEntry, AuditLogViewer(), INITIAL_AUDIT_LOGS, AuditReportPrintModal(), AuditReportPrintModalProps

### Community 106 - "SuppliersController"
Cohesion: 0.13
Nodes (13): SuppliersController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query (+5 more)

### Community 107 - "ComplianceController"
Cohesion: 0.13
Nodes (12): ComplianceController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, UseGuards (+4 more)

### Community 117 - "InventoryController"
Cohesion: 0.15
Nodes (10): InventoryController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, UseGuards (+2 more)

### Community 118 - "UsersController"
Cohesion: 0.13
Nodes (13): ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Param, Query, UseGuards (+5 more)

### Community 119 - "uiweb/src/components/ui/badge/Badge.tsx"
Cohesion: 0.25
Nodes (6): metadata, Badge(), BadgeColor, BadgeProps, BadgeSize, BadgeVariant

### Community 120 - "app.module.ts"
Cohesion: 0.10
Nodes (19): Global, AssetsModule, Module, AuthModule, Module, EmployeesModule, Module, FinanceModule (+11 more)

### Community 121 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, incremental (+11 more)

### Community 122 - "certifications/page.tsx"
Cohesion: 0.14
Nodes (9): metadata, metadata, metadata, metadata, CertificationMcuMatrix(), EmployeeNavigationTabs(), EmployeeRegistryTable(), PayrollManagement() (+1 more)

### Community 123 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, format, lint, prisma:format, prisma:generate, prisma:migrate, prisma:seed (+6 more)

### Community 124 - "main.ts"
Cohesion: 0.18
Nodes (7): Catch, AppModule, Module, HttpExceptionFilter, Response, TransformInterceptor, Injectable

### Community 125 - "projectapi/package.json"
Cohesion: 0.22
Nodes (8): author, description, license, name, prisma, seed, private, version

### Community 126 - "exclude"
Cohesion: 0.22
Nodes (8): exclude, extends, node_modules, dist, prisma/seed.ts, **/*spec.ts, test, ./tsconfig.json

### Community 127 - "uiweb/package.json"
Cohesion: 0.25
Nodes (8): Tech Stack & Infrastructure Architecture, Next.js React Framework, Tailwind CSS & Shadcn UI, TanStack React Query, name, private, version, Next.js UI Application Documentation

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

### Community 132 - "projectweb/src/components/form/form-elements/TextAreaInput.tsx"
Cohesion: 0.50
Nodes (3): TextAreaInput(), TextArea(), TextareaProps

### Community 133 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 136 - "projectweb/src/components/form/group-input/PhoneInput.tsx"
Cohesion: 0.50
Nodes (3): CountryCode, PhoneInput(), PhoneInputProps

## Knowledge Gaps
- **605 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+600 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModulePageLayout()` connect `ModulePageLayout.tsx` to `verification/page.tsx`, `projectweb/src/app/(admin)/page.tsx`, `AssetRegistryTable.tsx`, `PaymentManagement.tsx`, `ExpenditureManagement.tsx`, `BudgetManagement.tsx`, `RoleManagementDashboard.tsx`, `HygieneInspectionsAudit.tsx`, `shipments/page.tsx`, `proof-of-delivery/page.tsx`, `UserManagementTable.tsx`, `KitchenOverviewDashboard.tsx`, `KitchenFinancialDashboard.tsx`, `FinanceOverviewDashboard.tsx`, `ColdChainTelemetry.tsx`, `reports/page.tsx`, `cost-analysis/page.tsx`, `recipes/page.tsx`, `catalog/page.tsx`, `suppliers/page.tsx`, `performance/page.tsx`, `inventory/alerts/page.tsx`, `IncidentReportManagement.tsx`, `IsoComplianceMatrix.tsx`, `AuditLogViewer.tsx`, `certifications/page.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `PageBreadcrumb()` connect `projectweb/src/components/common/PageBreadCrumb.tsx` to `projectweb/src/app/(admin)/(others-pages)/(chart)/line-chart/page.tsx`, `projectweb/src/components/ui/badge/Badge.tsx`, `projectweb/src/components/common/ComponentCard.tsx`, `projectweb/src/app/(admin)/(ui-elements)/avatars/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/videos/page.tsx`, `projectweb/src/app/(admin)/(others-pages)/(chart)/bar-chart/page.tsx`, `projectweb/src/app/(admin)/(ui-elements)/alerts/page.tsx`, `ModulePageLayout.tsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `ComponentCard()` connect `uiweb/src/components/common/ComponentCard.tsx` to `uiweb/src/app/(admin)/(ui-elements)/images/page.tsx`, `uiweb/src/components/form/Label.tsx`, `useModal`, `uiweb/src/components/common/PageBreadCrumb.tsx`, `uiweb/src/components/form/form-elements/SelectInputs.tsx`, `uiweb/src/app/(admin)/(ui-elements)/videos/page.tsx`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _605 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `uiweb/src/components/form/Label.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11895161290322581 - nodes in this community are weakly interconnected._
- **Should `uiweb/src/layout/AppHeader.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08717948717948718 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._