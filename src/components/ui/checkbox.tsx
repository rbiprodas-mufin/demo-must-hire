// components/ui/checkbox.tsx
"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    const [checked, setChecked] = React.useState<boolean>(
      props.checked ?? false
    );

    return (
      <label
        className={cn(
          "flex items-center gap-2 cursor-pointer select-none",
          className
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-center w-5 h-5 rounded border border-gray-300",
            checked ? "bg-blue-600 border-blue-600" : "bg-white"
          )}
        >
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              props.onChange?.(e);
            }}
            {...props}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
          {checked && <Check size={14} className="text-white" />}
        </div>
        {label && <span className="text-sm text-gray-700">{label}</span>}
        {error && <p className="text-red-500 text-xs ml-1">{error}</p>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
