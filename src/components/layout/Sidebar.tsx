import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  DollarSign,
  CalendarDays,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  Bell,
  LogOut,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Students", path: "/students" },
  { icon: GraduationCap, label: "Teachers", path: "/teachers" },
  { icon: Building2, label: "Classes", path: "/classes" },
  { icon: BookOpen, label: "Subjects", path: "/subjects" },
  { icon: Calendar, label: "Attendance", path: "/attendance" },
  { icon: ClipboardCheck, label: "Exams", path: "/exams" },
  { icon: DollarSign, label: "Fees", path: "/fees" },
  { icon: CalendarDays, label: "Events", path: "/events" },
  { icon: FileText, label: "Reports", path: "/reports" },
];

const bottomMenuItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  const renderNavItem = (item: typeof mainMenuItems[0]) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    const content = (
      <NavLink
        to={item.path}
        className={cn(
          "sidebar-item group relative",
          isActive && "active"
        )}
      >
        <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", 
          isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
        )} />
        {!collapsed && (
          <span className="truncate">{item.label}</span>
        )}
        {isActive && (
          <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary-foreground" />
        )}
      </NavLink>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.path} delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.path}>{content}</div>;
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex h-16 items-center border-b border-sidebar-border px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-sidebar-foreground">EduManage</h1>
              <p className="text-xs text-sidebar-foreground/60">Institution ERP</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {mainMenuItems.map(renderNavItem)}
        </nav>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-3">
        <nav className="flex flex-col gap-1">
          {bottomMenuItems.map(renderNavItem)}
        </nav>
        
        <Separator className="my-3 bg-sidebar-border" />
        
        {/* User Profile */}
        <div className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2",
          collapsed ? "justify-center" : ""
        )}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
            <span className="text-sm font-medium text-sidebar-foreground">SA</span>
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">Super Admin</p>
              <p className="truncate text-xs text-sidebar-foreground/60">admin@school.edu</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 z-50 h-6 w-6 rounded-full border border-border bg-card shadow-md hover:bg-muted"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="h-3 w-3 text-muted-foreground" />
        )}
      </Button>
    </aside>
  );
}
