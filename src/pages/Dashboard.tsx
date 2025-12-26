import { Users, GraduationCap, BookOpen, DollarSign, CalendarCheck, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { StudentDistributionChart } from "@/components/dashboard/StudentDistributionChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { FeesSummary } from "@/components/dashboard/FeesSummary";

const stats = [
  {
    title: "Total Students",
    value: "2,847",
    change: { value: "12%", positive: true },
    icon: Users,
    gradient: "primary" as const,
  },
  {
    title: "Total Teachers",
    value: "156",
    change: { value: "4%", positive: true },
    icon: GraduationCap,
    gradient: "info" as const,
  },
  {
    title: "Classes / Sections",
    value: "48",
    change: { value: "2%", positive: true },
    icon: BookOpen,
    gradient: "accent" as const,
  },
  {
    title: "Today's Attendance",
    value: "94.2%",
    change: { value: "1.5%", positive: true },
    icon: CalendarCheck,
    gradient: "success" as const,
  },
  {
    title: "Fees Collected",
    value: "₹28.5L",
    change: { value: "8%", positive: true },
    icon: DollarSign,
    gradient: "warning" as const,
  },
  {
    title: "Exam Pass Rate",
    value: "89.3%",
    change: { value: "3%", positive: true },
    icon: TrendingUp,
    gradient: "primary" as const,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Header 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening at your institution."
      />
      
      <div className="p-4 md:p-6">
        {/* Stats Grid */}
        <div className="mb-6 md:mb-8 grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            className={`animate-slide-up opacity-0 stagger-${index + 1}`}
          />
        ))}
        </div>

        {/* Charts Row */}
        <div className="mb-6 md:mb-8 grid gap-4 md:gap-6 lg:grid-cols-2">
          <div className="animate-slide-up opacity-0 stagger-2">
            <AttendanceChart />
          </div>
          <div className="animate-slide-up opacity-0 stagger-3">
            <StudentDistributionChart />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-slide-up opacity-0 stagger-4">
            <RecentActivity />
          </div>
          <div className="animate-slide-up opacity-0 stagger-4">
            <FeesSummary />
          </div>
        </div>

        {/* Events Section */}
        <div className="mt-6 md:mt-8 animate-slide-up opacity-0 stagger-5">
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
