import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export const PlusIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 4.16669V15.8334M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CloseLineIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BoxIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M21 8.5V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 5H2V8.5H22V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BoxIconLine: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BoxCubeIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M21 16V8L12 3L3 8V16L12 21L21 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 3V21M3 8L12 13L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.66666 10L9.16666 12.5L13.3333 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CheckLineIcon: React.FC<IconProps> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AlertIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 9V14M12 17.5V18M10.29 3.86L1.82 18A2 2 0 0 0 3.55 21H20.45A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 9.16669V14.1667M10 5.83335H10.0083" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ErrorIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BoltIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12.814 4.75L4.78516 16.0352H11.1859L11.1859 23.25L19.2148 11.9648L12.814 11.9648V4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 15.8334V4.16669M10 4.16669L4.16666 10M10 4.16669L15.8333 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 4.16669V15.8334M10 15.8334L15.8333 10M10 15.8334L4.16666 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.16666 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AngleUpIcon: React.FC<IconProps> = (props) => (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3.59038 0.58517C3.78943 0.30081 4.21057 0.30081 4.40962 0.58517L6.94929 4.21327C7.18126 4.54466 6.94418 5 6.53967 5H1.46033C1.05582 5 0.81874 4.54466 1.05071 4.21327L3.59038 0.58517Z" fill="currentColor" />
  </svg>
);

export const AngleDownIcon: React.FC<IconProps> = (props) => (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z" fill="currentColor" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.8333 12.7083L10.6249 7.5L5.41658 12.7083" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12.7083 5L7.5 10.2083L12.7083 15.4167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FolderIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.5 15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H8.33333L10.8333 5.83333H15.8333C16.7538 5.83333 17.5 6.57953 17.5 7.5V15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const VideoIcon: React.FC<IconProps> = (props) => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6.70825 5.93126L6.70825 18.0687C6.70825 19.2416 7.9937 19.9607 8.99315 19.347L18.8765 13.2783C19.83 12.6928 19.83 11.3072 18.8765 10.7217L8.99315 4.65301C7.9937 4.03931 6.70825 4.75844 6.70825 5.93126Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const AudioIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.07 4.93C20.9447 6.80527 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07M15.54 8.46C16.4774 9.39763 17.0039 10.6692 17.0039 12C17.0039 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GridIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8.33333 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V8.33333C2.5 8.79357 2.8731 9.16667 3.33333 9.16667H8.33333C8.79357 9.16667 9.16667 8.79357 9.16667 8.33333V3.33333C9.16667 2.8731 8.79357 2.5 8.33333 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.6667 2.5H11.6667C11.2064 2.5 10.8333 2.8731 10.8333 3.33333V8.33333C10.8333 8.79357 11.2064 9.16667 11.6667 9.16667H16.6667C17.1269 9.16667 17.5 8.79357 17.5 8.33333V3.33333C17.5 2.8731 17.1269 2.5 16.6667 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.6667 10.8333H11.6667C11.2064 10.8333 10.8333 11.2064 10.8333 11.6667V16.6667C10.8333 17.1269 11.2064 17.5 11.6667 17.5H16.6667C17.1269 17.5 17.5 17.1269 17.5 16.6667V11.6667C17.5 11.2064 17.1269 10.8333 16.6667 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.33333 10.8333H3.33333C2.8731 10.8333 2.5 11.2064 2.5 11.6667V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H8.33333C8.79357 17.5 9.16667 17.1269 9.16667 16.6667V11.6667C9.16667 11.2064 8.79357 10.8333 8.33333 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FileIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11.6667 1.66669H5C4.07953 1.66669 3.33334 2.41288 3.33334 3.33335V16.6667C3.33334 17.5872 4.07953 18.3334 5 18.3334H15C15.9205 18.3334 16.6667 17.5872 16.6667 16.6667V6.66669L11.6667 1.66669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.6667 1.66669V6.66669H16.6667M13.3333 10.8334H6.66666M13.3333 14.1667H6.66666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DocsIcon: React.FC<IconProps> = FileIcon;
export const PageIcon: React.FC<IconProps> = FileIcon;

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.5 12.5V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GroupIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14.1667 17.5V15.8333C14.1667 14.9493 13.8155 14.1014 13.1904 13.4763C12.5652 12.8512 11.7174 12.5 10.8333 12.5H4.16667C3.28261 12.5 2.43476 12.8512 1.80964 13.4763C1.18452 14.1014 0.833336 14.9493 0.833336 15.8333V17.5M19.1667 17.5V15.8333C19.166 15.0934 18.9174 14.3751 18.4583 13.7917C17.9991 13.2082 17.3546 12.7915 16.625 12.6083M13.3333 2.60834C14.0664 2.78855 14.7146 3.20455 15.1768 3.78859C15.639 4.37263 15.8893 5.09335 15.8893 5.83334C15.8893 6.57332 15.639 7.29405 15.1768 7.87809C14.7146 8.46213 14.0664 8.87812 13.3333 9.05834M7.5 9.16667C9.34095 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34095 2.5 7.5 2.5C5.65905 2.5 4.16667 3.99238 4.16667 5.83333C4.16667 7.67428 5.65905 9.16667 7.5 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ShootingStarIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DollarLineIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 1.66669V18.3334M14.1667 5.00002H8.125C7.3625 5.00002 6.63123 5.30292 6.09206 5.84209C5.5529 6.38126 5.25 7.11252 5.25 7.87502C5.25 8.63752 5.5529 9.36878 6.09206 9.90795C6.63123 10.4471 7.3625 10.75 8.125 10.75H11.875C12.6375 10.75 13.3688 11.0529 13.9079 11.5921C14.4471 12.1313 14.75 12.8625 14.75 13.625C14.75 14.3875 14.4471 15.1188 13.9079 15.658C13.3688 16.1971 12.6375 16.5 11.875 16.5H5.83334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TrashBinIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2.5 5H17.5M6.66667 5V3.33333C6.66667 2.41286 7.41286 1.66667 8.33333 1.66667H11.6667C12.5871 1.66667 13.3333 2.41286 13.3333 3.33333V5M15.8333 5V16.6667C15.8333 17.5871 15.0871 18.3333 14.1667 18.3333H5.83333C4.91286 18.3333 4.16667 17.5871 4.16667 16.6667V5H15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.33334 9.16669V14.1667M11.6667 9.16669V14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14.1667 2.50001C14.3856 2.2811 14.6455 2.10744 14.9315 1.98891C15.2176 1.87038 15.5242 1.80933 15.8339 1.80933C16.1436 1.80933 16.4502 1.87038 16.7363 1.98891C17.0223 2.10744 17.2822 2.2811 17.5011 2.50001C17.72 2.71892 17.8937 2.97881 18.0122 3.26486C18.1307 3.55091 18.1918 3.85752 18.1918 4.16723C18.1918 4.47695 18.1307 4.78356 18.0122 5.06961C17.8937 5.35565 17.72 5.61555 17.5011 5.83446L5.83333 17.5022L1.66666 18.3333L2.49778 14.1667L14.1667 2.50001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PaperPlaneIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18.3333 1.66669L9.16666 10.8334M18.3333 1.66669L12.5 18.3334L9.16666 10.8334M18.3333 1.66669L1.66666 7.50002L9.16666 10.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.8333 9.16669H4.16667C3.24619 9.16669 2.5 9.91288 2.5 10.8334V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V10.8334C17.5 9.91288 16.7538 9.16669 15.8333 9.16669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.83334 9.16667V5.83333C5.83334 4.72826 6.27232 3.66846 7.05372 2.88706C7.83512 2.10565 8.89493 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10565 12.9463 2.88706C13.7277 3.66846 14.1667 4.72826 14.1667 5.83333V9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EnvelopeIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.5 4.16669H2.5C1.57953 4.16669 0.833336 4.91288 0.833336 5.83335V14.1667C0.833336 15.0872 1.57953 15.8334 2.5 15.8334H17.5C18.4205 15.8334 19.1667 15.0872 19.1667 14.1667V5.83335C19.1667 4.91288 18.4205 4.16669 17.5 4.16669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.66666 5.83331L10 11.6666L18.3333 5.83331" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = EnvelopeIcon;

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66667C5.78261 12.5 4.93476 12.8512 4.30964 13.4763C3.68452 14.1014 3.33334 14.9493 3.33334 15.8333V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 9.16667C11.8409 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.8409 2.5 10 2.5C8.15905 2.5 6.66667 3.99238 6.66667 5.83333C6.66667 7.67428 8.15905 9.16667 10 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const UserCircleIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 11.6667C11.8409 11.6667 13.3333 10.1743 13.3333 8.33333C13.3333 6.49238 11.8409 5 10 5C8.15905 5 6.66667 6.49238 6.66667 8.33333C6.66667 10.1743 8.15905 11.6667 10 11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.16667 16.6667C4.16667 14.3655 6.77868 12.5 10 12.5C13.2213 12.5 15.8333 14.3655 15.8333 16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CalenderIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.8333 3.33331H4.16667C3.24619 3.33331 2.5 4.07951 2.5 4.99998V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V4.99998C17.5 4.07951 16.7538 3.33331 15.8333 3.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.3333 1.66669V5.00002M6.66666 1.66669V5.00002M2.5 8.33335H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.66666 10C1.66666 10 4.99999 3.33334 10 3.33334C15 3.33334 18.3333 10 18.3333 10C18.3333 10 15 16.6667 10 16.6667C4.99999 16.6667 1.66666 10 1.66666 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EyeCloseIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2.5 2.5L17.5 17.5M8.99999 9C8.99999 9.55228 9.44771 10 10 10C10.5523 10 11 9.55228 11 9C11 8.44772 10.5523 8 10 8C9.44771 8 8.99999 8.44772 8.99999 9ZM5.57833 5.58667C3.89667 6.84 2.5 8.64167 2.5 10C2.5 13.3333 5.83333 16.6667 10 16.6667C11.6267 16.6667 13.1417 16.035 14.415 14.945M8.33333 3.61667C8.875 3.42833 9.42833 3.33333 10 3.33333C14.1667 3.33333 17.5 6.66667 17.5 10C17.5 10.975 17.065 12.025 16.3267 13.0033" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TimeIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 5V10L13.3333 11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CopyIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M13.3333 7.5V4.16667C13.3333 3.24619 12.5871 2.5 11.6667 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V11.6667C2.5 12.5871 3.24619 13.3333 4.16667 13.3333H7.5M8.33333 6.66667H15.8333C16.7538 6.66667 17.5 7.41286 17.5 8.33333V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H8.33333C7.41286 17.5 6.66667 16.7538 6.66667 15.8333V8.33333C6.66667 7.41286 7.41286 6.66667 8.33333 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TaskIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.5 4.16669H5C4.07953 4.16669 3.33334 4.91288 3.33334 5.83335V16.6667C3.33334 17.5872 4.07953 18.3334 5 18.3334H15C15.9205 18.3334 16.6667 17.5872 16.6667 16.6667V5.83335C16.6667 4.91288 15.9205 4.16669 15 4.16669H12.5M7.5 4.16669C7.5 4.60872 7.67559 5.03264 7.98816 5.3452C8.30072 5.65776 8.72464 5.83335 9.16667 5.83335H10.8333C11.2754 5.83335 11.6993 5.65776 12.0118 5.3452C12.3244 5.03264 12.5 4.60872 12.5 4.16669M7.5 4.16669C7.5 3.72466 7.67559 3.30074 7.98816 2.98818C8.30072 2.67562 8.72464 2.50002 9.16667 2.50002H10.8333C11.2754 2.50002 11.6993 2.67562 12.0118 2.98818C12.3244 3.30074 12.5 3.72466 12.5 4.16669M7.5 10.8334L9.16667 12.5001L13.3333 8.33335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ListIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6.66666 5H17.5M6.66666 10H17.5M6.66666 15H17.5M2.5 5H2.50833M2.5 10H2.50833M2.5 15H2.50833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TableIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2.5 4.16669C2.5 3.24621 3.24619 2.50002 4.16667 2.50002H15.8333C16.7538 2.50002 17.5 3.24621 17.5 4.16669V15.8334C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8334V4.16669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 7.5H17.5M7.5 7.5V17.5M12.5 7.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PieChartIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.6833 8.33331C17.1583 4.54998 14.1167 1.62498 10.3333 1.62498V9.66665H18.375C18.375 9.20831 18.1417 8.74998 17.6833 8.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.16666 3.33331C5.48333 3.66665 2.5 6.78331 2.5 10.55C2.5 14.625 5.79167 17.9166 9.86667 17.9166C13.6333 17.9166 16.75 14.9333 17.0833 11.25H9.16666V3.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlugInIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 1.66669V5.00002M15 1.66669V5.00002M6.66667 5.00002H18.3333V10C18.3333 13.6819 15.3486 16.6667 11.6667 16.6667H10.8333C7.15143 16.6667 4.16667 13.6819 4.16667 10V5.00002H6.66667ZM11.25 16.6667V18.3334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HorizontaLDots: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.16667 10.8333C4.6269 10.8333 5 10.4602 5 10C5 9.53976 4.6269 9.16667 4.16667 9.16667C3.70643 9.16667 3.33333 9.53976 3.33333 10C3.33333 10.4602 3.70643 10.8333 4.16667 10.8333Z" fill="currentColor" />
    <path d="M10 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53976 10.4602 9.16667 10 9.16667C9.53976 9.16667 9.16666 9.53976 9.16666 10C9.16666 10.4602 9.53976 10.8333 10 10.8333Z" fill="currentColor" />
    <path d="M15.8333 10.8333C16.2936 10.8333 16.6667 10.4602 16.6667 10C16.6667 9.53976 16.2936 9.16667 15.8333 9.16667C15.3731 9.16667 15 9.53976 15 10C15 10.4602 15.3731 10.8333 15.8333 10.8333Z" fill="currentColor" />
  </svg>
);

export const MoreDotIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 4.16667C10.4602 4.16667 10.8333 3.79357 10.8333 3.33333C10.8333 2.8731 10.4602 2.5 10 2.5C9.53976 2.5 9.16667 2.8731 9.16667 3.33333C9.16667 3.79357 9.53976 4.16667 10 4.16667Z" fill="currentColor" />
    <path d="M10 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53976 10.4602 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4602 9.53976 10.8333 10 10.8333Z" fill="currentColor" />
    <path d="M10 17.5C10.4602 17.5 10.8333 17.1269 10.8333 16.6667C10.8333 16.2064 10.4602 15.8333 10 15.8333C9.53976 15.8333 9.16667 16.2064 9.16667 16.6667C9.16667 17.1269 9.53976 17.5 10 17.5Z" fill="currentColor" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 6.66667C15 3.90524 12.7614 1.66667 10 1.66667C7.23858 1.66667 5 3.90524 5 6.66667C5 11.6667 2.5 13.3333 2.5 13.3333H17.5C17.5 13.3333 15 11.6667 15 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.58334 16.6667C8.73031 16.9209 8.94475 17.1326 9.20235 17.2781C9.45995 17.4236 9.75168 17.5004 10.0483 17.5004C10.345 17.5004 10.6367 17.4236 10.8943 17.2781C11.1519 17.1326 11.3664 16.9209 11.5133 16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChatIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.5 9.16667C17.5 13.3088 14.1421 16.6667 10 16.6667C8.61864 16.6667 7.32454 16.2934 6.21379 15.6425L2.5 17.5L3.84417 13.9158C3.00384 12.5695 2.5 10.9577 2.5 9.16667C2.5 5.02453 5.85786 1.66667 10 1.66667C14.1421 1.66667 17.5 5.02453 17.5 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

