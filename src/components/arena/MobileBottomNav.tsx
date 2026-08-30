import { Link, useLocation } from "@tanstack/react-router";
import { Home, CalendarCheck, History, User, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PUBLIC_NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/book", label: "Book", icon: CalendarCheck, highlight: true },
  { to: "/history", label: "History", icon: History },
  { to: "/pricing", label: "Pricing", icon: User },
];

export function MobileBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Do not render bottom nav inside admin panel
  if (currentPath.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/80 bg-background/95 p-1.5 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {PUBLIC_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPath === item.to || (item.to !== "/" && currentPath.startsWith(item.to));

          if (item.highlight) {
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative -top-3 flex size-12 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_24px_-4px_var(--neon)] transition-transform duration-300 active:scale-95"
              >
                <Icon className="size-5" />
                <span className="sr-only">Book</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center py-1.5 px-2 font-ui text-[0.6rem] font-bold tracking-wider uppercase transition-colors duration-200",
                isActive
                  ? "text-primary font-black"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "size-5 mb-0.5 transition-transform duration-200",
                  isActive && "scale-110 text-primary",
                )}
              />
              <span>{item.label}</span>
              {isActive && <span className="mt-0.5 size-1 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
