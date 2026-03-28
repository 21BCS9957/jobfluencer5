"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ collapsed }: { collapsed?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Next-themes hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={[
          "flex items-center gap-3 rounded-xl px-3 py-2.5",
          collapsed ? "justify-center" : "",
        ].join(" ")}
      >
        <div className="h-5 w-5 rounded-full bg-black/5 dark:bg-white/10 animate-pulse" />
        {!collapsed && (
          <div className="h-4 w-20 rounded bg-black/5 dark:bg-white/10 animate-pulse" />
        )}
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={[
        "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
        "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
        "dark:text-white/40 dark:hover:bg-white/[0.04] dark:hover:text-white/70",
        collapsed ? "justify-center" : "",
      ].join(" ")}
      aria-label={isDark ? "Enable Light Mode" : "Enable Dark Mode"}
    >
      <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
        <Sun
          size={18}
          className={[
            "absolute transition-all duration-300",
            isDark ? "scale-0 opacity-0 -rotate-90" : "scale-100 opacity-100 rotate-0",
          ].join(" ")}
        />
        <Moon
          size={18}
          className={[
            "absolute transition-all duration-300",
            isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-90",
          ].join(" ")}
        />
      </div>

      {!collapsed && (
        <span className="flex-1 text-left font-medium">
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      )}

      {/* Toggle Pill Animation */}
      {!collapsed && (
        <div className="flex h-5 w-8 items-center rounded-full bg-gray-200 p-0.5 transition-colors duration-300 dark:bg-white/[0.1]">
          <div
            className={[
              "h-4 w-4 rounded-full bg-white transition-transform duration-300",
              isDark ? "translate-x-3 bg-white" : "translate-x-0 shadow-sm",
            ].join(" ")}
          />
        </div>
      )}

      {/* Tooltip for collapsed view */}
      {collapsed && (
        <div className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/10">
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </div>
      )}
    </button>
  );
}
