"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Icons from "react-icons/fa";
import { Check } from "lucide-react";
import { PlatformConfig } from "../helpers/types/add-link-types";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
interface Inputs {
  [key: string]: string;
}

interface PlatformInputProps {
  platform: PlatformConfig;
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
  errors: FieldErrors<Inputs>;
  removeCustomLink: (platformName: string) => void;
}
export const PlatformInput = ({ platform, register, watch, errors, removeCustomLink }: PlatformInputProps) => {
  const Icon = Icons[platform.icon as keyof typeof Icons];
  const value = watch(platform.name);
  const isCustom = 'isCustom' in platform;

  return (
    <div className="flex flex-col relative gap-1">
      <div className="flex items-center gap-2 relative">
        {Icon && <Icon className="w-6 h-6" />}
        <Label htmlFor={platform.name}>
          {platform.label}
          {isCustom && (
            <span className="text-xs ml-1 font-semibold px-2 py-0.5 rounded bg-primary/20 text-primary">
              Custom
            </span>
          )}
        </Label>
        {isCustom && (
          <button
            type="button"
            onClick={() => removeCustomLink(platform.name)}
            className="ml-auto p-1 rounded hover:bg-red-100"
          >
            <Icons.FaTrash className="w-4 h-4 text-red-600" />
          </button>
        )}
      </div>

      <Input
        id={platform.name}
        {...register(platform.name)}
        placeholder={
          isCustom
            ? "Enter full URL (https://...)"
            : `Enter ${platform.label} username`
        }
        className={`mt-2 text-muted-foreground pr-10 border rounded-md p-2 ${
          value ? "border-green-500" : "border-gray-300"
        }`}
      />

      {value && (
        <Check
          className="absolute -right-2 p-1 top-1/2 bg-green-600 rounded-full transform -translate-y-1/2 text-black"
          size={25}
        />
      )}

      {errors[platform.name] && (
        <span className="text-red-500 text-sm">{errors[platform.name]?.message}</span>
      )}
    </div>
  );
};
