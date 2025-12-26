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
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const location = useLocation();

  const renderNavItem = (item: typeof mainMenuItems[0]) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => onOpenChange(false)}
        className={cn(
          "sidebar-item group relative",
          isActive && "active"
        )}
      >
        <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", 
          isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
        )} />
        <span className="truncate">{item.label}</span>
        {isActive && (
          <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary-foreground" />
        )}
      </NavLink>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border">
        <SheetHeader className="h-16 flex flex-row items-center border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <SheetTitle className="text-base font-bold text-sidebar-foreground">EduManage</SheetTitle>
              <p className="text-xs text-sidebar-foreground/60">Institution ERP</p>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-3 py-4 h-[calc(100vh-200px)]">
          <nav className="flex flex-col gap-1">
            {mainMenuItems.map(renderNavItem)}
          </nav>
        </ScrollArea>

        <div className="border-t border-sidebar-border p-3">
          <nav className="flex flex-col gap-1">
            {bottomMenuItems.map(renderNavItem)}
          </nav>
          
          <Separator className="my-3 bg-sidebar-border" />
          
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
              <span className="text-sm font-medium text-sidebar-foreground">SA</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">Super Admin</p>
              <p className="truncate text-xs text-sidebar-foreground/60">admin@school.edu</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
