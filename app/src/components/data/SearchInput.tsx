import { cn } from "~/lib/cn";
import { useState, useEffect, useCallback, useMemo, useRef, forwardRef } from "react";
import { formatNumber, formatCurrency, formatRelative } from "~/lib/format";
import { motion, AnimatePresence } from "framer-motion";
import type { PivotTableProps } from "./PivotTable";
import type { GroupedListProps } from "./GroupedList";

// ─── Types ───

export type SearchInputVariant = "default" | "primary" | "secondary" | "destructive" | "outline";
export type SearchInputSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SearchInputProps {
  className?: string;
  children?: React.ReactNode;
  variant?: SearchInputVariant;
  size?: SearchInputSize;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  testId?: string;
  data?: Record<string, unknown>[];
  columns?: { key: string; label: string; sortable?: boolean; width?: number }[];
  onSort?: (key: string, direction: "asc" | "desc") => void;
  onFilter?: (filters: Record<string, string>) => void;
  onSelect?: (ids: string[]) => void;
  selectable?: boolean;
  pagination?: { page: number; perPage: number; total: number };
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
  searchable?: boolean;
  exportable?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
}

// ─── Component ───

export const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(function SearchInput(
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
      "search-input",
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

  const processedData = useMemo(() => {
    const raw = (props as SearchInputProps).data ?? [];
    return raw.map((item, index) => ({
      ...item,
      _index: index,
      _id: (item as Record<string, unknown>).id ?? `row-${index}`,
      _formatted: Object.fromEntries(
        Object.entries(item).map(([k, v]) => [
          k,
          typeof v === "number" ? formatNumber(v) : String(v ?? ""),
        ])
      ),
    }));
  }, [(props as SearchInputProps).data]);

  return (
    <div
      ref={ref}
      id={id}
      data-testid={testId ?? "SearchInput"}
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
            <span className="text-white font-semibold text-sm">SE</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Search Input</h3>
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                {((props as SearchInputProps).columns ?? []).map((col) => (
                  <th key={col.key} className="px-3 py-2 text-left font-medium text-gray-500">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processedData.slice(0, 10).map((row) => (
                <tr key={row._id as string} className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {((props as SearchInputProps).columns ?? []).map((col) => (
                    <td key={col.key} className="px-3 py-2 text-gray-700 dark:text-gray-300">
                      {(row._formatted as Record<string, string>)[col.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="min-h-[2rem]">
          {children}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">
        <span>data/SearchInput</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
});

export default SearchInput;
