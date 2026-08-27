/**
 * MBG ERP Enterprise API Automated Test Runner
 * Pings all endpoints across 12 domain modules, verifies auth, status codes, and latency.
 */

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api/v1';

interface TestResult {
  module: string;
  endpoint: string;
  method: string;
  status: number;
  expectedStatus: number;
  durationMs: number;
  success: boolean;
  notes?: string;
}

const results: TestResult[] = [];

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

async function request(
  module: string,
  path: string,
  options: { method?: string; body?: any; token?: string; expectedStatus?: number } = {},
): Promise<{ status: number; data: any; durationMs: number }> {
  const method = options.method || 'GET';
  const expectedStatus = options.expectedStatus || 200;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const url = `${BASE_URL}${path}`;
  const start = Date.now();

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const durationMs = Date.now() - start;
    let data: any = null;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    const success = response.status === expectedStatus;
    results.push({
      module,
      endpoint: path,
      method,
      status: response.status,
      expectedStatus,
      durationMs,
      success,
      notes: success ? undefined : JSON.stringify(data).slice(0, 100),
    });

    return { status: response.status, data, durationMs };
  } catch (err: any) {
    const durationMs = Date.now() - start;
    results.push({
      module,
      endpoint: path,
      method,
      status: 0,
      expectedStatus,
      durationMs,
      success: false,
      notes: err.message,
    });
    return { status: 0, data: null, durationMs };
  }
}

async function runTestSuite() {
  console.log(`\n${colors.bold}${colors.cyan}═════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  🧪 MBG ERP ENTERPRISE BACKEND - AUTOMATED API TEST SUITE  ${colors.reset}`);
  console.log(`${colors.dim}  Target Base URL: ${BASE_URL}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}═════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  // 1. Health Check
  console.log(`${colors.yellow}▶ [1/12] Testing System Health & Liveness...${colors.reset}`);
  await request('System Health', '/health');

  // 2. Authentication & Login
  console.log(`${colors.yellow}▶ [2/12] Testing Authentication & JWT Flow...${colors.reset}`);
  const loginRes = await request('Authentication', '/auth/login', {
    method: 'POST',
    body: {
      username: 'admin_pusat',
      password: 'MbgAdmin2026!',
    },
  });

  const token = loginRes.data?.data?.accessToken;
  if (token) {
    console.log(`  ${colors.green}✔ JWT Token acquired successfully for [admin_pusat]${colors.reset}`);
    await request('Authentication', '/auth/profile', { token });
  } else {
    console.log(`  ${colors.red}✖ Failed to acquire token (Login response: status ${loginRes.status})${colors.reset}`);
  }

  // 3. Users & RBAC
  console.log(`${colors.yellow}▶ [3/12] Testing Users & RBAC Module...${colors.reset}`);
  await request('Users & RBAC', '/users', { token });
  await request('Users & RBAC', '/users?role=ADMIN_PUSAT', { token });

  // 4. Supplier & Vendor Management
  console.log(`${colors.yellow}▶ [4/12] Testing Supplier & Vendor Module...${colors.reset}`);
  await request('Supplier & Vendor', '/suppliers', { token });
  await request('Supplier & Vendor', '/suppliers/scorecard', { token });

  // 5. Inventory & Cold Chain IoT
  console.log(`${colors.yellow}▶ [5/12] Testing Inventory, Stock & Cold Chain IoT...${colors.reset}`);
  await request('Inventory & Cold Chain', '/inventory/stocks', { token });
  await request('Inventory & Cold Chain', '/inventory/movements', { token });
  await request('Inventory & Cold Chain', '/inventory/cold-chain', { token });
  await request('Inventory & Cold Chain', '/inventory/alerts', { token });

  // 6. Menu, Resep & Nutrisi AKG
  console.log(`${colors.yellow}▶ [6/12] Testing Menu & Nutrition AKG Module...${colors.reset}`);
  await request('Menu & Nutrisi AKG', '/menu/recipes', { token });
  await request('Menu & Nutrisi AKG', '/menu/daily-plans', { token });
  await request('Menu & Nutrisi AKG', '/menu/cost-analysis', { token });

  // 7. Dapur Sentral SPPG & Batch Produksi
  console.log(`${colors.yellow}▶ [7/12] Testing Central Kitchen SPPG Module...${colors.reset}`);
  await request('Dapur Sentral SPPG', '/kitchen/units', { token });
  await request('Dapur Sentral SPPG', '/kitchen/batches', { token });
  await request('Dapur Sentral SPPG', '/kitchen/requisitions', { token });

  // 8. Logistik, Rute & Distribusi
  console.log(`${colors.yellow}▶ [8/12] Testing Logistics & Fleet Module...${colors.reset}`);
  await request('Logistik & Distribusi', '/logistics/distribution-points', { token });
  await request('Logistik & Distribusi', '/logistics/shipments', { token });
  await request('Logistik & Distribusi', '/logistics/fleet', { token });

  // 9. Manajemen Aset & Sanitasi
  console.log(`${colors.yellow}▶ [9/12] Testing Fixed Assets & Hygiene Inspection...${colors.reset}`);
  await request('Manajemen Aset', '/assets', { token });
  await request('Manajemen Aset', '/assets/maintenance', { token });
  await request('Manajemen Aset', '/assets/hygiene-inspections', { token });

  // 10. Finansial, Anggaran & SP2D
  console.log(`${colors.yellow}▶ [10/12] Testing Financial & Budget Module...${colors.reset}`);
  await request('Finansial & Anggaran', '/finance/overview', { token });
  await request('Finansial & Anggaran', '/finance/budgets', { token });
  await request('Finansial & Anggaran', '/finance/expenditures', { token });
  await request('Finansial & Anggaran', '/finance/invoices', { token });
  await request('Finansial & Anggaran', '/finance/payments', { token });

  // 11. Kepatuhan Mutu, ISO & Audit Trail
  console.log(`${colors.yellow}▶ [11/12] Testing Quality & ISO Compliance Module...${colors.reset}`);
  await request('Audit & ISO', '/compliance/audit-logs', { token });
  await request('Audit & ISO', '/compliance/incidents', { token });
  await request('Audit & ISO', '/compliance/iso-overview', { token });

  // 12. SDM, Shift & Payroll
  console.log(`${colors.yellow}▶ [12/12] Testing HR & Employee Management Module...${colors.reset}`);
  await request('SDM & Karyawan', '/employees', { token });
  await request('SDM & Karyawan', '/employees/shifts', { token });
  await request('SDM & Karyawan', '/employees/payroll', { token });

  // Print Summary Table
  console.log(`\n${colors.bold}${colors.cyan}═════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}  📊 TEST EXECUTION SUMMARY REPORT ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}═════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(
    `| ${'STATUS'.padEnd(6)} | ${'MODULE'.padEnd(22)} | ${'METHOD'.padEnd(6)} | ${'ENDPOINT'.padEnd(30)} | ${'LATENCY'.padEnd(8)} |`
  );
  console.log(`|--------|------------------------|--------|--------------------------------|----------|`);

  let passed = 0;
  let failed = 0;

  for (const r of results) {
    const statusIcon = r.success ? `${colors.green} PASS ${colors.reset}` : `${colors.red} FAIL ${colors.reset}`;
    if (r.success) passed++;
    else failed++;

    const latency = `${r.durationMs}ms`.padStart(6);
    console.log(
      `| ${statusIcon} | ${r.module.padEnd(22)} | ${r.method.padEnd(6)} | ${r.endpoint.padEnd(30)} | ${latency}   |`
    );
    if (!r.success && r.notes) {
      console.log(`  ${colors.dim}↳ Error detail: ${r.notes}${colors.reset}`);
    }
  }

  console.log(`|----------------------------------------------------------------------------------|`);
  console.log(
    `  Total Tests: ${results.length} | Passed: ${colors.green}${passed}${colors.reset} | Failed: ${
      failed > 0 ? colors.red + failed : colors.green + 0
    }${colors.reset}`
  );
  console.log(`${colors.bold}${colors.cyan}═════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  if (failed === 0) {
    console.log(`${colors.green}${colors.bold}🎉 ALL 12 DOMAIN REST API ENDPOINTS ARE 100% OPERATIONAL!${colors.reset}\n`);
  } else {
    console.log(`${colors.yellow}⚠️ Note: If some database queries returned 500, ensure PostgreSQL is running & seeded.${colors.reset}\n`);
  }
}

runTestSuite();
