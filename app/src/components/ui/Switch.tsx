import { cn } from "~/lib/cn";
import { useState, useEffect, useCallback, useMemo, useRef, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { undefinedProps } from "./undefined";

// ─── Types ───

export type SwitchVariant = "default" | "primary" | "secondary" | "destructive";
export type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SwitchProps {
  className?: string;
  children?: React.ReactNode;
  variant?: SwitchVariant;
  size?: SwitchSize;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  testId?: string;
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
}

const switchVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "bg-primary-500 text-white hover:bg-primary-600",
        secondary: "bg-secondary-500 text-white hover:bg-secondary-600",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        xs: "px-2 py-0.5 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

// ─── Component ───

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(function Switch(
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
      "switch",
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
      data-testid={testId ?? "Switch"}
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
            <span className="text-white font-semibold text-sm">SW</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Switch</h3>
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
        <div className="min-h-[2rem]">
          {children}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">
        <span>ui/Switch</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
});

export default Switch;
