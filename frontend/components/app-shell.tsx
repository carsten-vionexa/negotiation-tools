"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { appSignal, navigationGroups } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const SignalIcon = appSignal.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="border-border bg-card lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-r">
        <div className="flex min-h-full flex-col gap-6 px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <SignalIcon className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">Negotiation Tools</span>
              <span className="block text-xs text-muted-foreground">{appSignal.value}</span>
            </span>
          </Link>

          <nav className="flex flex-col gap-5" aria-label="Hauptnavigation">
            {navigationGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <p className="px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {group.label}
                </p>
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group flex items-start gap-3 rounded-md border border-transparent px-3 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                          isActive
                            ? "border-primary/40 bg-primary/10 text-foreground shadow-sm"
                            : "text-foreground hover:border-primary/20 hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <Icon
                          className={cn(
                            "mt-0.5 size-4 shrink-0 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                          )}
                        />
                        <span className="min-w-0">
                          <span className="block font-medium">{item.label}</span>
                          <span
                            className={cn(
                              "block text-xs leading-5 transition-colors",
                              isActive ? "text-foreground/75" : "text-muted-foreground group-hover:text-foreground/75",
                            )}
                          >
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <a
            href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/docs`}
            className="mt-auto inline-flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            API Docs
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </aside>

      <div className="lg:pl-72">
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-6 sm:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
