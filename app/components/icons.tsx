type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function DropletIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 2.5c3.5 4.5 7 8.7 7 12.4a7 7 0 1 1-14 0c0-3.7 3.5-7.9 7-12.4Z" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </svg>
  );
}

export function ToolIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 4.6L4 16.2V20h3.8l5.3-5.3a4 4 0 0 0 4.6-5.4l-2.9 2.9-2.1-2.1 2.9-2.9Z" />
    </svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3.5 5 6v6c0 4.4 3 8 7 9 4-1 7-4.6 7-9V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 21s7-6.6 7-11.5a7 7 0 1 0-14 0C5 14.4 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.3 2.3 2.3 4.7-4.9" />
    </svg>
  );
}

export function BadgeCheckIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="m9 3.5 1.6-1 1.4 1 2-.4 1 1.7 1.9.7-.1 2 1.4 1.4-1.4 1.4.1 2-1.9.7-1 1.7-2-.4-1.4 1-1.6-1-2 .4-1-1.7-1.9-.7.1-2L2.7 9l1.4-1.4-.1-2 1.9-.7 1-1.7 2 .4Z" />
      <path d="m8.7 12.2 2.2 2.2 4.4-4.6" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="2.5" y="7" width="12" height="10" rx="1.2" />
      <path d="M14.5 10.5h3.6l3.4 3.4V17h-7v-6.5Z" />
      <circle cx="7" cy="18.5" r="1.6" />
      <circle cx="17" cy="18.5" r="1.6" />
    </svg>
  );
}

export function RulerIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="8.5" width="18" height="7" rx="1.2" transform="rotate(-8 12 12)" />
      <path d="m7.3 9.4-.7 2M10.9 8.9l-.7 2M14.5 8.4l-.7 2" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9.5h12V10" />
    </svg>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="5" y="3.5" width="14" height="17" rx="1" />
      <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
    </svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 5.5c2-1 5-1 8 .5 3-1.5 6-1.5 8-.5v13c-2-1-5-1-8 .5-3-1.5-6-1.5-8-.5Z" />
      <path d="M12 6v13" />
    </svg>
  );
}
