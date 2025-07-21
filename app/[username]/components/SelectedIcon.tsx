"use client";
import { icons, IconKey } from "@/lib/icons";

interface SelectedIconProps {
  iconName: string | null | undefined; 
  className?: string;
}

export const SelectedIcon = ({ iconName, className }: SelectedIconProps) => {
  const IconComponent = icons[iconName as IconKey] ?? icons["mail"];
  return <IconComponent className={className || "h-6 w-6"} />;
};
