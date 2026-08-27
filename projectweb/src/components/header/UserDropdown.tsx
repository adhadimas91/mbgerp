"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useAuth, DEFAULT_BGN_ACCOUNTS, DefaultAccount } from "@/context/AuthContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const { user, logout, switchAccount } = useAuth();

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
    setIsRoleMenuOpen(false);
  }

  const handleSelectRole = (acc: DefaultAccount) => {
    switchAccount(acc);
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center justify-center w-9 h-9 font-bold text-white rounded-full shadow-xs bg-linear-to-tr from-emerald-600 to-teal-500 text-sm">
          {user?.name ? user.name.charAt(0) : "U"}
        </div>

        <div className="hidden text-left sm:block">
          <span className="block text-xs font-semibold text-gray-800 truncate max-w-[140px] dark:text-white/90">
            {user?.name?.split(",")[0] || "Admin Pusat"}
          </span>
          <span className="block text-[11px] font-medium text-emerald-600 dark:text-emerald-400 truncate max-w-[140px]">
            {user?.role?.replace("_", " ") || "SUPER ADMIN"}
          </span>
        </div>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-3 flex w-[300px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900 z-99999"
      >
        {/* User Info Header */}
        <div className="px-2 py-2 border-b border-gray-100 dark:border-gray-800">
          <span className="block text-xs font-bold text-gray-800 dark:text-white">
            {user?.name || "Dr. Pratama Wicaksono, M.Sc."}
          </span>
          <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400 truncate">
            {user?.email || "admin@mbg.go.id"}
          </span>
          <div className="mt-2 flex items-center justify-between">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {user?.role || "SUPER_ADMIN"}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              {user?.kitchenName || "Pusat BGN"}
            </span>
          </div>
        </div>

        {/* Role Simulation Switcher */}
        <div className="py-2 border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/60"
          >
            <span className="flex items-center gap-1.5">
              <span>🎭</span>
              <span>Simulasi Peran BGN</span>
            </span>
            <span className="text-gray-400 text-[10px]">
              {isRoleMenuOpen ? "▲ Tutup" : "▼ Ganti"}
            </span>
          </button>

          {isRoleMenuOpen && (
            <div className="mt-1 space-y-1 max-h-48 overflow-y-auto px-1 py-1">
              {DEFAULT_BGN_ACCOUNTS.map((acc) => {
                const isActive = user?.email === acc.email;
                return (
                  <button
                    key={acc.email}
                    onClick={() => handleSelectRole(acc)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800 font-semibold dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/40"
                    }`}
                  >
                    <div className="truncate pr-1">
                      <div className="truncate text-xs font-medium">{acc.roleLabel}</div>
                      <div className="text-[10px] text-gray-400 truncate">{acc.name.split(",")[0]}</div>
                    </div>
                    {isActive && <span className="text-emerald-500 text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <ul className="flex flex-col gap-0.5 pt-2 pb-2 border-b border-gray-100 dark:border-gray-800 text-xs">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-2.5 px-2.5 py-2 font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span>👤</span> Profil & Kredensial
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/settings/users"
              className="flex items-center gap-2.5 px-2.5 py-2 font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span>🛡️</span> Matriks Hak Akses (RBAC)
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/compliance/audit-logs"
              className="flex items-center gap-2.5 px-2.5 py-2 font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span>📜</span> Log Audit Forensik
            </DropdownItem>
          </li>
        </ul>

        {/* Sign Out Button */}
        <button
          onClick={() => {
            logout();
            closeDropdown();
          }}
          className="flex items-center gap-2.5 px-2.5 py-2 mt-1 text-xs font-medium text-rose-600 rounded-lg hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 text-left"
        >
          <span>🚪</span>
          <span>Reset Sesi / Logout</span>
        </button>
      </Dropdown>
    </div>
  );
}
