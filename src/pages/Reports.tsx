import { useState } from "react";
import {
  Download,
  FileText,
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Printer,
  Mail,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const reportCategories = [
  {
    id: "academic",
    title: "Academic Reports",
    icon: BarChart3,
    color: "bg-primary",
    reports: [
      { id: 1, name: "Class-wise Performance Report", description: "Detailed analysis of student performance across classes", format: "PDF/Excel" },
      { id: 2, name: "Subject-wise Analysis", description: "Performance breakdown by subject", format: "PDF/Excel" },
      { id: 3, name: "Student Progress Report", description: "Individual student academic progress", format: "PDF" },
      { id: 4, name: "Exam Results Summary", description: "Consolidated exam results by class", format: "PDF/Excel" },
    ],
  },
  {
    id: "attendance",
    title: "Attendance Reports",
    icon: Calendar,
    color: "bg-success",
    reports: [
      { id: 5, name: "Daily Attendance Report", description: "Day-wise attendance for all classes", format: "PDF/Excel" },
      { id: 6, name: "Monthly Attendance Summary", description: "Monthly attendance statistics", format: "PDF/Excel" },
      { id: 7, name: "Student Attendance History", description: "Individual student attendance record", format: "PDF" },
      { id: 8, name: "Low Attendance Alert", description: "Students with attendance below threshold", format: "PDF/Excel" },
    ],
  },
  {
    id: "financial",
    title: "Financial Reports",
    icon: DollarSign,
    color: "bg-warning",
    reports: [
      { id: 9, name: "Fee Collection Report", description: "Class-wise fee collection status", format: "PDF/Excel" },
      { id: 10, name: "Pending Fees Report", description: "List of students with pending fees", format: "PDF/Excel" },
      { id: 11, name: "Payment History", description: "Detailed payment transactions", format: "PDF/Excel" },
      { id: 12, name: "Revenue Summary", description: "Monthly/yearly revenue analysis", format: "PDF" },
    ],
  },
  {
    id: "student",
    title: "Student Reports",
    icon: Users,
    color: "bg-info",
    reports: [
      { id: 13, name: "Student Directory", description: "Complete list of all students", format: "PDF/Excel" },
      { id: 14, name: "Class-wise Student List", description: "Students organized by class", format: "PDF/Excel" },
      { id: 15, name: "New Admissions Report", description: "Recently enrolled students", format: "PDF" },
      { id: 16, name: "Student Demographics", description: "Statistical analysis of student data", format: "PDF" },
    ],
  },
];

const recentReports = [
  { name: "Monthly Attendance - December 2024", date: "2024-12-26", size: "2.4 MB", type: "PDF" },
  { name: "Fee Collection Summary - Q3 2024", date: "2024-12-20", size: "1.8 MB", type: "Excel" },
  { name: "Class 10 Performance Analysis", date: "2024-12-18", size: "3.1 MB", type: "PDF" },
  { name: "Student Directory 2024-25", date: "2024-12-15", size: "5.2 MB", type: "Excel" },
];

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  return (
    <div className="min-h-screen">
      <Header title="Reports & Analytics" subtitle="Generate and download institutional reports" />
      
      <div className="p-6">
        {/* Quick Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Reports Generated</p>
            <p className="mt-1 text-2xl font-bold text-foreground">156</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Downloads</p>
            <p className="mt-1 text-2xl font-bold text-primary">342</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Scheduled Reports</p>
            <p className="mt-1 text-2xl font-bold text-info">12</p>
            <p className="text-xs text-muted-foreground mt-1">Active</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Data Coverage</p>
            <p className="mt-1 text-2xl font-bold text-success">98.5%</p>
            <p className="text-xs text-muted-foreground mt-1">Complete</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="attendance">Attendance</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="1-5">Class 1-5</SelectItem>
              <SelectItem value="6-8">Class 6-8</SelectItem>
              <SelectItem value="9-10">Class 9-10</SelectItem>
              <SelectItem value="11-12">Class 11-12</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Academic Year</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Report Categories */}
          <div className="lg:col-span-2 space-y-6">
            {reportCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="rounded-xl border border-border bg-card overflow-hidden animate-slide-up opacity-0"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-5 py-4">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      category.color
                    )}>
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">{category.title}</h3>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {category.reports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{report.name}</h4>
                          <p className="text-sm text-muted-foreground mt-0.5">{report.description}</p>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {report.format}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="h-4 w-4" />
                            Generate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Reports */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card overflow-hidden animate-slide-up opacity-0 stagger-2">
              <div className="border-b border-border bg-muted/30 px-5 py-4">
                <h3 className="font-semibold text-foreground">Recent Reports</h3>
                <p className="text-sm text-muted-foreground">Previously generated</p>
              </div>
              
              <div className="divide-y divide-border">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{report.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>{report.date}</span>
                          <span>·</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t border-border px-5 py-3">
                <Button variant="ghost" className="w-full text-sm">
                  View All Reports
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-border bg-card p-5 animate-slide-up opacity-0 stagger-3">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Generate Performance Summary
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4" />
                  Monthly Attendance Report
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <DollarSign className="h-4 w-4" />
                  Fee Collection Status
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
