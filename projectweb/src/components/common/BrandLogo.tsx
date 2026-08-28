import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  collapsed?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false, className = "" }) => {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`}>
      {collapsed ? (
        <Image
          src="/images/logo/mbg-logo-icon.svg"
          alt="ERP MBG Icon"
          width={34}
          height={34}
          priority
        />
      ) : (
        <>
          <Image
            src="/images/logo/mbg-logo.svg"
            alt="ERP MBG Logo"
            width={180}
            height={38}
            className="dark:hidden"
            priority
          />
          <Image
            src="/images/logo/mbg-logo-dark.svg"
            alt="ERP MBG Logo Dark"
            width={180}
            height={38}
            className="hidden dark:block"
            priority
          />
        </>
      )}
    </Link>
  );
};

export default BrandLogo;
