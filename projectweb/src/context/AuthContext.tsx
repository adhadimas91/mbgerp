"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../lib/api";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  kitchenId?: string;
  kitchenName?: string;
  avatar?: string;
  isMfaEnabled?: boolean;
}

export interface DefaultAccount {
  name: string;
  email: string;
  role: string;
  roleLabel: string;
  badgeColor: string;
}

export const DEFAULT_BGN_ACCOUNTS: DefaultAccount[] = [
  {
    name: "Dr. Pratama Wicaksono, M.Sc.",
    email: "admin@mbg.go.id",
    role: "SUPER_ADMIN",
    roleLabel: "Admin Pusat BGN",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  },
  {
    name: "Drs. Hendro Utomo, M.M.",
    email: "kepala.sppg@mbg.go.id",
    role: "KITCHEN_HEAD",
    roleLabel: "Kepala SPPG Harmoni",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    name: "Ratna Kusuma, S.Gz., RD.",
    email: "ahli.gizi@mbg.go.id",
    role: "NUTRITIONIST",
    roleLabel: "Ahli Gizi PIC",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  {
    name: "Chef Arnold Poernomo",
    email: "head.chef@mbg.go.id",
    role: "HEAD_CHEF",
    roleLabel: "Head Chef SPPG",
    badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  {
    name: "Ahmad Fauzi, S.E., Ak.",
    email: "finance.ppk@mbg.go.id",
    role: "FINANCE_OFFICER",
    roleLabel: "PPK & Bendahara",
    badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  },
  {
    name: "Ir. Bambang Trihatmojo",
    email: "logistics.lead@mbg.go.id",
    role: "LOGISTICS_MANAGER",
    roleLabel: "Manajer Logistik",
    badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  },
  {
    name: "Hj. Siti Aminah, S.Pt.",
    email: "supplier.rel@mbg.go.id",
    role: "SUPPLIER_COORDINATOR",
    roleLabel: "Koordinator Vendor",
    badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  },
  {
    name: "Dra. Nurul Hidayah, QIA.",
    email: "auditor.bpk@bpk.go.id",
    role: "AUDITOR",
    roleLabel: "Auditor BPK / KAN",
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  },
];

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchAccount: (account: DefaultAccount) => void;
  checkPermission: (module: string, action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: "USR-001",
    name: "Dr. Pratama Wicaksono, M.Sc.",
    email: "admin@mbg.go.id",
    role: "SUPER_ADMIN",
    phone: "0811-2233-4455",
    kitchenName: "Pusat Komando BGN Jakarta",
    isMfaEnabled: true,
  });
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load persisted token or session
    const savedToken = localStorage.getItem("mbg_access_token");
    const savedUser = localStorage.getItem("mbg_user_profile");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // use default user
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password = "Password123!"): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      const data = res.data?.data || res.data;
      if (data?.accessToken) {
        setToken(data.accessToken);
        setUser(data.user);
        localStorage.setItem("mbg_access_token", data.accessToken);
        localStorage.setItem("mbg_user_profile", JSON.stringify(data.user));
        return true;
      }
      return false;
    } catch {
      // Fallback matching for demo mode
      const matched = DEFAULT_BGN_ACCOUNTS.find((a) => a.email === email);
      if (matched) {
        const dummyUser: UserProfile = {
          id: `USR-${matched.role}`,
          name: matched.name,
          email: matched.email,
          role: matched.role,
          kitchenName: "SPPG Harmoni 01",
          isMfaEnabled: true,
        };
        setUser(dummyUser);
        localStorage.setItem("mbg_user_profile", JSON.stringify(dummyUser));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("mbg_access_token");
    localStorage.removeItem("mbg_user_profile");
    // reset to default admin
    setUser({
      id: "USR-001",
      name: "Dr. Pratama Wicaksono, M.Sc.",
      email: "admin@mbg.go.id",
      role: "SUPER_ADMIN",
      kitchenName: "Pusat Komando BGN Jakarta",
    });
  };

  const switchAccount = (account: DefaultAccount) => {
    const newUser: UserProfile = {
      id: `USR-${account.role.toLowerCase()}`,
      name: account.name,
      email: account.email,
      role: account.role,
      kitchenName: "SPPG Harmoni Jakarta Pusat",
      isMfaEnabled: true,
    };
    setUser(newUser);
    localStorage.setItem("mbg_user_profile", JSON.stringify(newUser));
  };

  const checkPermission = (module: string, action: string): boolean => {
    if (!user) return false;
    if (user.role === "SUPER_ADMIN") return true;
    // Auditor has read/export/print permissions
    if (user.role === "AUDITOR") {
      return ["read", "export", "print"].includes(action.toLowerCase());
    }
    // Chef/Kitchen head
    if (user.role === "KITCHEN_HEAD" || user.role === "HEAD_CHEF") {
      return ["kitchen", "inventory", "menu", "assets"].includes(module.toLowerCase());
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchAccount,
        checkPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
