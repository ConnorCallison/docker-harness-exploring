import { cn } from "~/lib/cn";
import { useState, useEffect, useCallback, useMemo, useRef, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import type { SortConfigFormProps } from "./SortConfigForm";
import type { LayoutConfigFormProps } from "./LayoutConfigForm";
import type { ThemeConfigFormProps } from "./ThemeConfigForm";

// ─── Types ───

export type LocaleConfigFormVariant = "default" | "primary" | "secondary" | "destructive" | "outline" | "ghost";
export type LocaleConfigFormSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface LocaleConfigFormProps {
  className?: string;
  children?: React.ReactNode;
  variant?: LocaleConfigFormVariant;
  size?: LocaleConfigFormSize;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  testId?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  description?: string;
  onChange?: (value: unknown) => void;
  onBlur?: () => void;
  defaultValue?: unknown;
  autoFocus?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
}

// ─── Component ───

export const LocaleConfigForm = forwardRef<HTMLDivElement, LocaleConfigFormProps>(function LocaleConfigForm(
  { className, children, variant = "default", size = "md", disabled = false, loading = false, id, testId, onClick, onKeyDown, ...props },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [internalState, setInternalState] = useState<Record<string, unknown>>({});
  const mountedRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (disabled || loading) return;
    setIsActive(true);
    timerRef.current = setTimeout(() => mountedRef.current && setIsActive(false), 150);
    onClick?.(e);
  }, [disabled, loading, onClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
    onKeyDown?.(e);
  }, [handleClick, onKeyDown]);

  const computedClassName = useMemo(() => {
    const baseClasses = [
      "locale-config-form",
      `variant-${variant}`,
      `size-${size}`,
      isHovered && "is-hovered",
      isFocused && "is-focused",
      isActive && "is-active",
      disabled && "is-disabled",
      loading && "is-loading",
    ].filter(Boolean);
    return cn(...baseClasses, className);
  }, [variant, size, isHovered, isFocused, isActive, disabled, loading, className]);

  return (
    <div
      ref={ref}
      id={id}
      data-testid={testId ?? "LocaleConfigForm"}
      className={computedClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role={props.role ?? "button"}
      tabIndex={props.tabIndex ?? (disabled ? -1 : 0)}
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
      aria-disabled={disabled}
      aria-busy={loading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-inherit z-10">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
        </div>
      )}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">LO</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Locale Config Form</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Variant: {variant} &middot; Size: {size}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isHovered && <span className="text-xs text-blue-500">Hovered</span>}
          {isFocused && <span className="text-xs text-green-500">Focused</span>}
          {isActive && <span className="text-xs text-orange-500">Active</span>}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-3">
          {(props as LocaleConfigFormProps).label && (
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {(props as LocaleConfigFormProps).label}
              {(props as LocaleConfigFormProps).required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <div className="relative">
            <input
              type="text"
              name={(props as LocaleConfigFormProps).name}
              placeholder={(props as LocaleConfigFormProps).placeholder}
              disabled={disabled}
              autoFocus={(props as LocaleConfigFormProps).autoFocus}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          {(props as LocaleConfigFormProps).description && (
            <p className="text-xs text-gray-500">{(props as LocaleConfigFormProps).description}</p>
          )}
          {(props as LocaleConfigFormProps).error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="inline-block w-3 h-3">⚠</span>
              {(props as LocaleConfigFormProps).error}
            </p>
          )}
        </div>
        <div className="min-h-[2rem]">
          {children}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">
        <span>forms/LocaleConfigForm</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
});

export default LocaleConfigForm;
