import { PrismaClient, UserRole, UserStatus, SupplierStatus, SupplierTier, ProductCategory, StorageType, AgeGroup, CookingLine, BatchStatus, ShipmentStatus, AssetCondition, MaintenanceType, BudgetCategory, PaymentStatus, ShiftType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive ERP MBG database seeding...');

  // 1. Clear existing data (in reverse dependency order)
  console.log('🧹 Cleaning previous seed records...');
  await prisma.sensorReading.deleteMany({});
  await prisma.coldChainSensor.deleteMany({});
  await prisma.deliveryProof.deleteMany({});
  await prisma.shipment.deleteMany({});
  await prisma.distributionRoute.deleteMany({});
  await prisma.fleetVehicle.deleteMany({});
  await prisma.distributionPoint.deleteMany({});
  await prisma.organolepticQc.deleteMany({});
  await prisma.ccpTelemetryLog.deleteMany({});
  await prisma.requisitionItem.deleteMany({});
  await prisma.kitchenRequisition.deleteMany({});
  await prisma.productionBatch.deleteMany({});
  await prisma.dailyMenu.deleteMany({});
  await prisma.recipeIngredient.deleteMany({});
  await prisma.recipe.deleteMany({});
  await prisma.stockMovement.deleteMany({});
  await prisma.stock.deleteMany({});
  await prisma.purchaseOrderItem.deleteMany({});
  await prisma.purchaseOrder.deleteMany({});
  await prisma.supplierProduct.deleteMany({});
  await prisma.supplierCertificate.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.supplierInvoice.deleteMany({});
  await prisma.kitchenPettyCash.deleteMany({});
  await prisma.expenditure.deleteMany({});
  await prisma.budgetAllocation.deleteMany({});
  await prisma.budget.deleteMany({});
  await prisma.hygieneInspection.deleteMany({});
  await prisma.assetMaintenance.deleteMany({});
  await prisma.fixedAsset.deleteMany({});
  await prisma.employeeMcu.deleteMany({});
  await prisma.payrollItem.deleteMany({});
  await prisma.payrollRun.deleteMany({});
  await prisma.dailyAttendance.deleteMany({});
  await prisma.shiftAssignment.deleteMany({});
  await prisma.shiftSchedule.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.qualityIncident.deleteMany({});
  await prisma.userSession.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.supplier.deleteMany({});
  await prisma.kitchenUnit.deleteMany({});
  await prisma.warehouse.deleteMany({});

  const defaultPasswordHash = await bcrypt.hash('MbgAdmin2026!', 10);

  // 2. Seed Warehouses & Central Kitchen SPPG
  console.log('🏬 Creating Warehouses & Central Kitchen...');
  const warehouseHarmoni = await prisma.warehouse.create({
    data: {
      code: 'WH-BGR-01',
      name: 'Gudang Pusat Logistik & Cold Storage Bogor',
      type: 'CENTRAL_HUB',
      location: 'Jl. Raya Pajajaran No. 88, Bogor Timur',
      city: 'Kota Bogor',
      totalAreaM2: 1200,
      dryCapacityKg: 25000,
      coldCapacityKg: 10000,
      managerName: 'Bambang Sudarsono, S.T.',
      contactPhone: '0812-3456-7890',
    },
  });

  const kitchenHarmoni = await prisma.kitchenUnit.create({
    data: {
      code: 'SPPG-BGR-01',
      name: 'Sentra Produksi Pangan Gizi (SPPG) Harmoni Bogor',
      address: 'Jl. Pemuda No. 45, Tanah Sareal, Kota Bogor',
      city: 'Kota Bogor',
      province: 'Jawa Barat',
      dailyCapacity: 5000,
      headChefName: 'Chef Agus Supriyanto',
      nutritionistName: 'dr. Siti Rahmawati, M.Gizi',
      warehouseId: warehouseHarmoni.id,
    },
  });

  // 3. Seed Users & RBAC (10 Roles Standard BGN)
  console.log('👤 Creating Users for 10 BGN Roles...');
  const usersData = [
    { email: 'admin.pusat@mbg.go.id', username: 'admin_pusat', fullName: 'Dr. Hendra Gunawan, M.Si', role: UserRole.ADMIN_PUSAT, region: 'Pusat BGN Jakarta' },
    { email: 'admin.bogor@mbg.go.id', username: 'admin_bogor', fullName: 'Dewi Sartika, S.STP', role: UserRole.ADMIN_REGIONAL, region: 'Kota Bogor' },
    { email: 'kepala.sppg@mbg.go.id', username: 'kepala_sppg', fullName: 'Ir. Ahmad Zulkarnaen', role: UserRole.KEPALA_SPPG, region: 'Kota Bogor' },
    { email: 'gizi.sppg@mbg.go.id', username: 'gizi_sppg', fullName: 'dr. Siti Rahmawati, M.Gizi', role: UserRole.AHLI_GIZI, region: 'Kota Bogor' },
    { email: 'gudang.sppg@mbg.go.id', username: 'gudang_sppg', fullName: 'Bambang Sudarsono', role: UserRole.PETUGAS_GUDANG, region: 'Kota Bogor' },
    { email: 'chef.sppg@mbg.go.id', username: 'chef_sppg', fullName: 'Chef Agus Supriyanto', role: UserRole.PETUGAS_DAPUR, region: 'Kota Bogor' },
    { email: 'driver.sppg@mbg.go.id', username: 'driver_sppg', fullName: 'Supriyadi (Armada 01)', role: UserRole.DRIVER_LOGISTIK, region: 'Kota Bogor' },
    { email: 'qc.sppg@mbg.go.id', username: 'qc_sppg', fullName: 'Wahyu Nugroho, S.Si (Lead QC)', role: UserRole.TIM_QC_AUDITOR, region: 'Kota Bogor' },
    { email: 'keuangan.ppk@mbg.go.id', username: 'keuangan_ppk', fullName: 'Drs. Arif Budiman, Ak., CA (PPK)', role: UserRole.PPK_KEUANGAN, region: 'Kota Bogor' },
    { email: 'supplier.primafarm@mbg.go.id', username: 'vendor_primafarm', fullName: 'PT Prima Pangan Nusantara', role: UserRole.SUPPLIER, region: 'Jawa Barat' },
  ];

  const createdUsers: Record<string, any> = {};
  for (const u of usersData) {
    const user = await prisma.user.create({
      data: {
        email: u.email,
        username: u.username,
        passwordHash: defaultPasswordHash,
        fullName: u.fullName,
        role: u.role,
        status: UserStatus.ACTIVE,
        twoFactorEnabled: u.role === UserRole.ADMIN_PUSAT || u.role === UserRole.PPK_KEUANGAN,
        assignedRegion: u.region,
        kitchenUnitId: kitchenHarmoni.id,
      },
    });
    createdUsers[u.username] = user;
  }

  // 4. Seed Suppliers & Vendors
  console.log('🌾 Creating Suppliers & Certificates...');
  const supplier1 = await prisma.supplier.create({
    data: {
      code: 'SUP-BGN-001',
      name: 'PT Prima Pangan Nusantara',
      legalName: 'PT Prima Pangan Nusantara Persero',
      nib: '9120003481921',
      npwp: '01.345.678.9-411.000',
      category: 'Protein Hewani & Telur Segar',
      contactPerson: 'Bpk. Ridwan Santoso',
      phone: '0811-9876-5432',
      email: 'kontrak@primapangan.co.id',
      address: 'Kawasan Industri Sentul Kav. 12, Babakan Madang',
      city: 'Kabupaten Bogor',
      province: 'Jawa Barat',
      dailyCapacityKg: 3500,
      tier: SupplierTier.PLATINUM,
      status: SupplierStatus.ACTIVE,
      ratingScore: 4.9,
      onTimeDeliveryRate: 99.1,
      qualityAcceptanceRate: 99.8,
      iso22000Certified: true,
      halalCertified: true,
      bankName: 'Bank Mandiri (Persero) Tbk',
      bankAccountNumber: '133-00-9876543-1',
      bankAccountHolder: 'PT Prima Pangan Nusantara',
    },
  });

  await prisma.supplierCertificate.createMany({
    data: [
      {
        supplierId: supplier1.id,
        type: 'HALAL_BPJPH',
        certificateNo: 'ID00110000234560124',
        issuedBy: 'BPJPH Kemenag RI',
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2028-01-01'),
        status: 'VERIFIED',
      },
      {
        supplierId: supplier1.id,
        type: 'ISO_22000',
        certificateNo: 'ISO-FSMS-2024-0988',
        issuedBy: 'KAN Accreditation Body',
        validFrom: new Date('2024-03-15'),
        validUntil: new Date('2027-03-15'),
        status: 'VERIFIED',
      },
    ],
  });

  // 5. Seed Products & Inventory Stocks
  console.log('🥩 Creating Products & Inventory Stocks...');
  const rawProducts = [
    { sku: 'PRD-AYAM-01', name: 'Daging Ayam Broiler Fillet Segar', category: ProductCategory.PROTEIN_HEWANI, unit: 'kg', storageType: StorageType.CHILLER, minStock: 200, idealStock: 800, standardPrice: 38000, qty: 650 },
    { sku: 'PRD-TELUR-01', name: 'Telur Ayam Ras Grade A (Pack Tray)', category: ProductCategory.PROTEIN_HEWANI, unit: 'kg', storageType: StorageType.ROOM_TEMP, minStock: 150, idealStock: 500, standardPrice: 28500, qty: 420 },
    { sku: 'PRD-BERAS-01', name: 'Beras Premium Pulen Ramos BGN', category: ProductCategory.KARBOHIDRAT, unit: 'kg', storageType: StorageType.DRY_STORAGE, minStock: 500, idealStock: 2500, standardPrice: 14500, qty: 1850 },
    { sku: 'PRD-WORTEL-01', name: 'Wortel Brastagi Segar Grade A', category: ProductCategory.SAYURAN_SEGAR, unit: 'kg', storageType: StorageType.CHILLER, minStock: 80, idealStock: 300, standardPrice: 16000, qty: 240 },
    { sku: 'PRD-BUNCIS-01', name: 'Buncis Baby Segar', category: ProductCategory.SAYURAN_SEGAR, unit: 'kg', storageType: StorageType.CHILLER, minStock: 60, idealStock: 250, standardPrice: 18000, qty: 190 },
    { sku: 'PRD-TEMPE-01', name: 'Tempe Kedelai Non-GMO Balok', category: ProductCategory.PROTEIN_NABATI, unit: 'kg', storageType: StorageType.ROOM_TEMP, minStock: 100, idealStock: 400, standardPrice: 12000, qty: 320 },
    { sku: 'PRD-SUSU-01', name: 'Susu Pasteurisasi UHT Plain 200ml', category: ProductCategory.SUSU_OLAHAN, unit: 'pcs', storageType: StorageType.ROOM_TEMP, minStock: 1000, idealStock: 5000, standardPrice: 4200, qty: 4200 },
    { sku: 'PRD-TRAY-01', name: 'Food Tray Ompreng Stainless 304 MBG', category: ProductCategory.KEMASAN_SANITASI, unit: 'pcs', storageType: StorageType.DRY_STORAGE, minStock: 2000, idealStock: 6000, standardPrice: 35000, qty: 5200 },
  ];

  const createdProducts: Record<string, any> = {};
  for (const p of rawProducts) {
    const prod = await prisma.product.create({
      data: {
        sku: p.sku,
        name: p.name,
        category: p.category,
        unit: p.unit,
        storageType: p.storageType,
        minStockThreshold: p.minStock,
        idealStockLevel: p.idealStock,
        shelfLifeDays: p.storageType === StorageType.CHILLER ? 3 : 60,
        standardUnitPrice: p.standardPrice,
      },
    });
    createdProducts[p.sku] = prod;

    // Create stock entry
    await prisma.stock.create({
      data: {
        warehouseId: warehouseHarmoni.id,
        productId: prod.id,
        quantity: p.qty,
        reservedQty: 100,
        batchLotNumber: `LOT-${p.sku}-20260827`,
        expiryDate: new Date(Date.now() + 30 * 24 * 3600 * 1000),
        lastRestocked: new Date(),
      },
    });

    // Link with supplier
    await prisma.supplierProduct.create({
      data: {
        supplierId: supplier1.id,
        productId: prod.id,
        unitPrice: p.standardPrice * 0.96, // Harga grosir
        govCeilingPrice: p.standardPrice * 1.05,
        minOrderQty: 50,
      },
    });
  }

  // 6. Seed Cold Chain IoT Sensors & Readings
  console.log('❄️ Creating Cold Chain Sensors...');
  const sensorChiller = await prisma.coldChainSensor.create({
    data: {
      sensorCode: 'IOT-CHILLER-BGR-01',
      warehouseId: warehouseHarmoni.id,
      roomName: 'Ruang Pendingin Protein Hewani (Chiller A)',
      sensorType: 'TEMPERATURE_HUMIDITY',
      minThreshold: 1.0,
      maxThreshold: 4.0,
      currentTemp: 2.4,
      currentHumidity: 84.5,
      batteryLevel: 98,
      status: 'NORMAL',
    },
  });

  await prisma.sensorReading.createMany({
    data: [
      { sensorId: sensorChiller.id, temperature: 2.2, humidity: 85.0, isBreach: false },
      { sensorId: sensorChiller.id, temperature: 2.5, humidity: 84.2, isBreach: false },
      { sensorId: sensorChiller.id, temperature: 2.4, humidity: 84.5, isBreach: false },
    ],
  });

  // 7. Seed Recipes & AKG Standards
  console.log('🥗 Creating Recipes & AKG Standards...');
  const recipeMenu1 = await prisma.recipe.create({
    data: {
      code: 'RCP-MBG-001',
      name: 'Ayam Bakar Madu Kecap + Sop Sayuran + Tempe Orek + Buah Pisang',
      category: 'Paket Standar Bergizi Siang',
      targetAgeGroup: AgeGroup.SD_KELAS_4_6,
      targetCaloriesKcal: 685.0,
      targetProteinG: 29.5,
      targetCarbsG: 88.0,
      targetFatG: 16.5,
      targetFiberG: 7.8,
      standardCostPorsi: 13750, // di bawah pagu Rp 15.000
      preparationTimeMin: 90,
      cookingTimeMin: 60,
      halalVerified: true,
      nutritionApproved: true,
      nutritionistPic: 'dr. Siti Rahmawati, M.Gizi',
      instructions: 'Panggang ayam pada oven steam 180C hingga suhu inti minimal 75C selama 25 menit.',
    },
  });

  await prisma.recipeIngredient.createMany({
    data: [
      { recipeId: recipeMenu1.id, productId: createdProducts['PRD-AYAM-01'].id, quantityPerPorsi: 0.08, estimatedCost: 3040 },
      { recipeId: recipeMenu1.id, productId: createdProducts['PRD-BERAS-01'].id, quantityPerPorsi: 0.10, estimatedCost: 1450 },
      { recipeId: recipeMenu1.id, productId: createdProducts['PRD-WORTEL-01'].id, quantityPerPorsi: 0.04, estimatedCost: 640 },
      { recipeId: recipeMenu1.id, productId: createdProducts['PRD-TEMPE-01'].id, quantityPerPorsi: 0.05, estimatedCost: 600 },
      { recipeId: recipeMenu1.id, productId: createdProducts['PRD-SUSU-01'].id, quantityPerPorsi: 1.00, estimatedCost: 4200 },
    ],
  });

  // 8. Seed Production Batch & CCP HACCP
  console.log('🍳 Creating Production Batch & CCP HACCP...');
  const batch1 = await prisma.productionBatch.create({
    data: {
      batchNumber: 'BATCH-20260827-01',
      kitchenUnitId: kitchenHarmoni.id,
      recipeId: recipeMenu1.id,
      cookingDate: new Date(),
      cookingLine: CookingLine.LINI_2_PROTEIN_HEWANI,
      targetPortions: 3500,
      actualPortions: 3500,
      status: BatchStatus.COMPLETED,
      spkNumber: 'SPM-SPPG-20260827-001',
      chefInCharge: 'Chef Agus Supriyanto',
    },
  });

  await prisma.ccpTelemetryLog.createMany({
    data: [
      { batchId: batch1.id, ccpStage: 'CORE_COOKING_TEMP', targetMinTemp: 75.0, actualTemp: 78.4, isCompliant: true, operatorName: 'Head Chef Agus' },
      { batchId: batch1.id, ccpStage: 'HOT_HOLDING_WARMER', targetMinTemp: 60.0, actualTemp: 64.2, isCompliant: true, operatorName: 'QC Wahyu' },
      { batchId: batch1.id, ccpStage: 'STEAM_SANITIZER_TRAY', targetMinTemp: 100.0, actualTemp: 102.1, isCompliant: true, operatorName: 'Sanitasi Rudi' },
    ],
  });

  await prisma.organolepticQc.create({
    data: {
      batchId: batch1.id,
      tasteScore: 5,
      aromaScore: 5,
      textureScore: 5,
      visualScore: 5,
      overallGrade: 'GRADE_A_LULUS',
      retentionSampleCode: 'RET-BGR-20260827-01',
      retentionFridge: 'CH-RET-01',
      inspectorId: createdUsers['gizi_sppg'].id,
      isReleased: true,
    },
  });

  // 9. Seed Logistics, Distribution Points & Shipments
  console.log('🚚 Creating Distribution Points, Fleet & Shipments...');
  const school1 = await prisma.distributionPoint.create({
    data: {
      code: 'SCH-BGR-001',
      name: 'SD Negeri Pajajaran 01 Bogor',
      type: 'SD',
      address: 'Jl. Pajajaran No. 10, Bogor Timur',
      district: 'Bogor Timur',
      city: 'Kota Bogor',
      latitude: -6.5971,
      longitude: 106.8060,
      targetPortions: 480,
      contactPerson: 'Drs. M. Hidayat (Kepsek)',
      contactPhone: '0813-8877-6655',
      dropOffWindow: '09:30 - 10:15 WIB',
      distanceKm: 3.8,
    },
  });

  const fleet1 = await prisma.fleetVehicle.create({
    data: {
      plateNumber: 'B 9482 BGN',
      vehicleModel: 'Isuzu Traga Box Thermal Food Warmer',
      capacityPortions: 1500,
      thermalStorageTemp: 63.5,
      driverName: 'Supriyadi',
      driverPhone: '0812-9988-7766',
      status: 'READY',
    },
  });

  const shipment1 = await prisma.shipment.create({
    data: {
      waybillNumber: 'WB-MBG-20260827-01',
      productionBatchId: batch1.id,
      distributionPointId: school1.id,
      vehicleId: fleet1.id,
      driverId: createdUsers['driver_sppg'].id,
      driverName: 'Supriyadi',
      portionsShipped: 480,
      loadingTempC: 64.5,
      status: ShipmentStatus.DELIVERED,
      bastNumber: 'BAST-MBG-20260827-001',
    },
  });

  await prisma.deliveryProof.create({
    data: {
      shipmentId: shipment1.id,
      receivedPortions: 480,
      tempAtReceiptC: 61.8,
      recipientName: 'Drs. M. Hidayat (Kepsek)',
      recipientNip: '197204151998021003',
      isOrganolepticOk: true,
      latitude: -6.5971,
      longitude: 106.8060,
      notes: 'Makanan diterima dalam kondisi hangat & higienis prima.',
    },
  });

  // 10. Seed Fixed Assets & Maintenance
  console.log('🍳 Creating Fixed Assets...');
  const asset1 = await prisma.fixedAsset.create({
    data: {
      assetCode: 'AST-BGN-BGR-001',
      name: 'Kuali Elektrik Steam Tilting Kettle 100L',
      category: 'MESIN_MEMASAK',
      kitchenUnitId: kitchenHarmoni.id,
      brandModel: 'Electrolux Professional CookPro 100',
      serialNumber: 'ELX-2026-99481',
      purchaseDate: new Date('2025-12-01'),
      purchaseCost: 85000000,
      economicLifeYears: 5,
      salvageValue: 5000000,
      currentBookValue: 75000000,
      condition: AssetCondition.EXCELLENT,
      locationRoom: 'Lini Masak 1 (Karbohidrat)',
    },
  });

  await prisma.hygieneInspection.create({
    data: {
      inspectionCode: 'INS-SAN-20260827-01',
      assetId: asset1.id,
      areaOrMachine: 'Kuali Steam 100L Lini 1',
      inspectorId: createdUsers['qc_sppg'].id,
      scorePercentage: 98.5,
      grade: 'GRADE_A',
      passedSanitation: true,
      findings: 'Permukaan stainless steril dan bebas residu kimia pembersih.',
    },
  });

  // 11. Seed Budgets & Financials
  console.log('💰 Creating Budgets, DPA & Expenditures...');
  const budgetBogor = await prisma.budget.create({
    data: {
      fiscalYear: 2026,
      dpaCode: 'DPA-BGN-2026-BGR-01',
      regionName: 'Kota Bogor',
      totalCeilingPagu: 15000000000, // Rp 15 Milyar
      allocatedAmount: 15000000000,
      realizedAmount: 11250000000,
      remainingAmount: 3750000000,
      status: 'ACTIVE',
    },
  });

  await prisma.budgetAllocation.createMany({
    data: [
      { budgetId: budgetBogor.id, category: BudgetCategory.RAW_INGREDIENTS, percentage: 75.0, allocatedPagu: 11250000000, realizedPagu: 8500000000, remainingPagu: 2750000000 },
      { budgetId: budgetBogor.id, category: BudgetCategory.OPERATIONAL_KITCHEN, percentage: 15.0, allocatedPagu: 2250000000, realizedPagu: 1700000000, remainingPagu: 550000000 },
      { budgetId: budgetBogor.id, category: BudgetCategory.LOGISTICS_DISTRIBUTION, percentage: 8.0, allocatedPagu: 1200000000, realizedPagu: 900000000, remainingPagu: 300000000 },
      { budgetId: budgetBogor.id, category: BudgetCategory.QUALITY_CONTROL, percentage: 2.0, allocatedPagu: 300000000, realizedPagu: 150000000, remainingPagu: 150000000 },
    ],
  });

  await prisma.expenditure.create({
    data: {
      receiptNumber: 'BKK-BGN-20260827-01',
      budgetId: budgetBogor.id,
      category: BudgetCategory.RAW_INGREDIENTS,
      description: 'Pengadaan Daging Ayam Broiler 1.200 Kg Periode W35 SPPG Harmoni',
      grossAmount: 45600000,
      taxPph22: 684000, // 1.5%
      taxPpn11: 5016000,
      netAmount: 39900000,
      paymentMethod: 'TRANSFER_BANK_MANDIRI',
      creatorId: createdUsers['gudang_sppg'].id,
      approverId: createdUsers['keuangan_ppk'].id,
      status: PaymentStatus.PAID_SP2D,
      sp2dNumber: 'SP2D-BGN-20260827-8841',
      ntpnTaxReceipt: 'NTPN-7749201948102948',
    },
  });

  // 12. Seed Employees, Shifts & MCU
  console.log('👥 Creating Employees & HR Payroll...');
  const empHeadChef = await prisma.employee.create({
    data: {
      nik: '3271011508850001',
      nip: 'MBG-EMP-2026-001',
      fullName: 'Chef Agus Supriyanto',
      gender: 'L',
      birthDate: new Date('1985-08-15'),
      phone: '0812-3344-5566',
      position: 'Head Chef Dapur Sentral',
      department: 'Dapur Sentral',
      kitchenUnitId: kitchenHarmoni.id,
      employmentType: 'TETAP',
      joinDate: new Date('2025-01-01'),
      baseSalary: 6500000,
      hygieneAllowance: 750000,
      foodHandlerCertified: true,
      foodHandlerExpiry: new Date('2027-01-01'),
      mcuStatus: 'FIT_FOR_FOOD_SERVICE',
    },
  });

  await prisma.employeeMcu.create({
    data: {
      employeeId: empHeadChef.id,
      examinationDate: new Date('2026-06-15'),
      clinicLaboratory: 'Labkesda Kota Bogor',
      typhoidTest: 'NEGATIVE',
      tbcThoraxTest: 'CLEAR',
      hepatitisATest: 'NEGATIVE',
      fitConclusion: 'FIT_FOR_FOOD_SERVICE',
      validUntil: new Date('2027-06-15'),
    },
  });

  // 13. Seed Audit Logs (Immutable SHA-256 Chained)
  console.log('🛡️ Creating Audit Trail Logs...');
  await prisma.auditLog.create({
    data: {
      userId: createdUsers['admin_pusat'].id,
      action: 'SYSTEM_INITIALIZATION',
      entityName: 'SystemCore',
      entityId: 'MBG-CORE-INIT',
      description: 'Inisialisasi Master ERP Sistem Makanan Bergizi Gratis Nasional (BGN)',
      ipAddress: '10.0.0.1',
      userAgent: 'NestJS Enterprise API Bootstrapper',
      integrityHash: 'a6c8e312b2e88a8d11c0f4f7e2d93e1b7f0e9b4d1c3a5e8f2d7c9b0e1a4f6d8c',
    },
  });

  console.log('✅ All 10 Domain Entities Seeded Successfully into ERP MBG Database!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
