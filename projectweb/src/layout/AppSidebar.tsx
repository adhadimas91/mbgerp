"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { BrandLogo } from "@/components/common/BrandLogo";
import {
  GridIcon,
  GroupIcon,
  BoxIcon,
  TaskIcon,
  PaperPlaneIcon,
  FolderIcon,
  DollarLineIcon,
  CheckCircleIcon,
  UserCircleIcon,
  UserIcon,
  ChevronDownIcon,
  HorizontaLDots,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// Modul Operasional Utama MBG (Fase 1 - Fase 3)
const operationalNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      { name: "Overview Eksekutif", path: "/" },
      { name: "Monitoring Logistik & Peta", path: "/dashboard/logistics" },
      { name: "Analisis Nutrisi Harian", path: "/dashboard/nutrition" },
    ],
  },
  {
    icon: <GroupIcon />,
    name: "Supplier & Vendor",
    subItems: [
      { name: "Daftar Supplier", path: "/suppliers" },
      { name: "Verifikasi & Kepatuhan", path: "/suppliers/verification", new: true },
      { name: "Katalog Bahan & Harga", path: "/suppliers/catalog" },
      { name: "Rating & Performa", path: "/suppliers/performance" },
    ],
  },
  {
    icon: <BoxIcon />,
    name: "Gudang & Stok",
    subItems: [
      { name: "Stok Bahan Baku", path: "/inventory" },
      { name: "Mutasi Stok (IN/OUT)", path: "/inventory/movements" },
      { name: "Cold Chain & Suhu", path: "/inventory/cold-chain", new: true },
      { name: "Peringatan Stok Rendah", path: "/inventory/alerts" },
    ],
  },
  {
    icon: <TaskIcon />,
    name: "Menu & Nutrisi",
    subItems: [
      { name: "Perencanaan Menu", path: "/menu" },
      { name: "Kalkulator Gizi & Resep", path: "/menu/recipes" },
      { name: "Analisis Biaya per Porsi", path: "/menu/cost-analysis" },
    ],
  },
  {
    icon: <PaperPlaneIcon />,
    name: "Logistik & Distribusi",
    subItems: [
      { name: "Titik Distribusi (Sekolah)", path: "/logistics/distribution-points" },
      { name: "Pengiriman & Resi", path: "/logistics/shipments" },
      { name: "Bukti Terima (PoD)", path: "/logistics/proof-of-delivery" },
    ],
  },
  {
    icon: <FolderIcon />,
    name: "Manajemen Aset",
    subItems: [
      { name: "Master Aset & QR Code", path: "/assets" },
      { name: "Jadwal Servis & Perbaikan", path: "/assets/maintenance" },
      { name: "Inspeksi Kelaikan Masak", path: "/assets/hygiene-inspections" },
    ],
  },
  {
    icon: <UserIcon />,
    name: "SDM & Karyawan",
    subItems: [
      { name: "Direktori Karyawan & ID", path: "/employees" },
      { name: "Shift & Presensi Higiene", path: "/employees/shifts" },
      { name: "Kelola Gaji & Payroll", path: "/employees/payroll", new: true },
      { name: "Sertifikasi & MCU Higiene", path: "/employees/certifications" },
    ],
  },
];

// Modul Tata Kelola, Keuangan, Kualitas ISO & Sistem
const governanceNavItems: NavItem[] = [
  {
    icon: <DollarLineIcon />,
    name: "Finansial & Budget",
    subItems: [
      { name: "Alokasi Anggaran", path: "/finance/budgets" },
      { name: "Pencatatan Pengeluaran", path: "/finance/expenditures" },
      { name: "Pembayaran Supplier", path: "/finance/payments" },
    ],
  },
  {
    icon: <CheckCircleIcon />,
    name: "Audit & Kepatuhan ISO",
    subItems: [
      { name: "Audit Trail (Immutable)", path: "/compliance/audit-logs" },
      { name: "Standar ISO 22000/9001", path: "/compliance/iso-standards" },
      { name: "Laporan Insiden Mutu", path: "/compliance/incident-reports" },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "Pengguna & Sistem",
    subItems: [
      { name: "Manajemen Pengguna (RBAC)", path: "/settings/users" },
      { name: "Profil Saya", path: "/profile" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "operational" | "governance";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["operational", "governance"].forEach((menuType) => {
      const items =
        menuType === "operational" ? operationalNavItems : governanceNavItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "operational" | "governance",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "operational" | "governance"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "operational" | "governance"
  ) => (
    <ul className="flex flex-col gap-1.5">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-1 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      <span>{subItem.name}</span>
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            baru
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            iso
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-4 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-6 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start px-2"
        }`}
      >
        <BrandLogo collapsed={!isExpanded && !isHovered && !isMobileOpen} />
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-6">
            <div>
              <h2
                className={`mb-3 text-[11px] font-bold tracking-wider uppercase flex leading-[20px] text-gray-400 dark:text-gray-500 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start px-2"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Operasional MBG"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(operationalNavItems, "operational")}
            </div>

            <div>
              <h2
                className={`mb-3 text-[11px] font-bold tracking-wider uppercase flex leading-[20px] text-gray-400 dark:text-gray-500 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start px-2"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Tata Kelola & Kepatuhan"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(governanceNavItems, "governance")}
            </div>
          </div>
        </nav>

        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
