import { useState } from "react";
import {
  Calendar,
  Download,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const attendanceData = [
  { id: 1, name: "Aarav Sharma", rollNo: 1, status: "present", time: "8:15 AM" },
  { id: 2, name: "Priya Patel", rollNo: 2, status: "present", time: "8:20 AM" },
  { id: 3, name: "Rohan Gupta", rollNo: 3, status: "absent", time: null },
  { id: 4, name: "Ananya Singh", rollNo: 4, status: "present", time: "8:10 AM" },
  { id: 5, name: "Arjun Kumar", rollNo: 5, status: "late", time: "9:05 AM" },
  { id: 6, name: "Ishita Verma", rollNo: 6, status: "present", time: "8:25 AM" },
  { id: 7, name: "Karan Mehta", rollNo: 7, status: "present", time: "8:18 AM" },
  { id: 8, name: "Sneha Reddy", rollNo: 8, status: "absent", time: null },
  { id: 9, name: "Vikram Singh", rollNo: 9, status: "present", time: "8:12 AM" },
  { id: 10, name: "Meera Joshi", rollNo: 10, status: "present", time: "8:22 AM" },
  { id: 11, name: "Rahul Verma", rollNo: 11, status: "late", time: "8:45 AM" },
  { id: 12, name: "Kavya Sharma", rollNo: 12, status: "present", time: "8:08 AM" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentWeek = [
  { day: "Mon", date: 23, attendance: 94 },
  { day: "Tue", date: 24, attendance: 92 },
  { day: "Wed", date: 25, attendance: 96 },
  { day: "Thu", date: 26, attendance: 91, today: true },
  { day: "Fri", date: 27, attendance: null },
  { day: "Sat", date: 28, attendance: null },
];

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [selectedDate, setSelectedDate] = useState("2024-12-26");

  const present = attendanceData.filter(s => s.status === "present").length;
  const absent = attendanceData.filter(s => s.status === "absent").length;
  const late = attendanceData.filter(s => s.status === "late").length;
  const total = attendanceData.length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "absent": return <XCircle className="h-5 w-5 text-destructive" />;
      case "late": return <Clock className="h-5 w-5 text-warning" />;
      default: return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "present": return "bg-success/5 border-success/20";
      case "absent": return "bg-destructive/5 border-destructive/20";
      case "late": return "bg-warning/5 border-warning/20";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Attendance" subtitle="Track daily attendance records" />
      
      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10-A">Class 10-A</SelectItem>
                <SelectItem value="10-B">Class 10-B</SelectItem>
                <SelectItem value="9-A">Class 9-A</SelectItem>
                <SelectItem value="9-B">Class 9-B</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 px-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">December 2024</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-2 gradient-primary border-0">
              Mark Attendance
            </Button>
          </div>
        </div>

        {/* Week View */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">This Week</h3>
            <span className="text-sm text-muted-foreground">Week 52, December 2024</span>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {currentWeek.map((day) => (
              <div
                key={day.day}
                className={cn(
                  "rounded-lg border p-3 text-center transition-all cursor-pointer",
                  day.today 
                    ? "border-primary bg-primary/5" 
                    : day.attendance 
                      ? "border-border hover:border-primary/30" 
                      : "border-dashed border-border/50 bg-muted/30"
                )}
              >
                <p className={cn(
                  "text-xs font-medium",
                  day.today ? "text-primary" : "text-muted-foreground"
                )}>
                  {day.day}
                </p>
                <p className={cn(
                  "text-lg font-bold mt-1",
                  day.today ? "text-primary" : "text-foreground"
                )}>
                  {day.date}
                </p>
                {day.attendance !== null && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "mt-2 text-xs",
                      day.attendance >= 95 ? "bg-success/10 text-success" :
                      day.attendance >= 90 ? "bg-info/10 text-info" :
                      "bg-warning/10 text-warning"
                    )}
                  >
                    {day.attendance}%
                  </Badge>
                )}
                {day.attendance === null && (
                  <p className="mt-2 text-xs text-muted-foreground">-</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{total}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="mt-1 text-2xl font-bold text-success">{present}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="mt-1 text-2xl font-bold text-destructive">{absent}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="mt-1 text-2xl font-bold text-warning">{late}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Grid */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border bg-muted/30 px-5 py-4">
            <h3 className="font-semibold text-foreground">
              Class {selectedClass} · Today's Attendance
            </h3>
            <p className="text-sm text-muted-foreground">
              {present + late} of {total} present ({Math.round(((present + late) / total) * 100)}%)
            </p>
          </div>
          
          <div className="p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {attendanceData.map((student, index) => (
              <div
                key={student.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 transition-all animate-scale-in opacity-0",
                  getStatusBg(student.status)
                )}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {student.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                  <p className="text-xs text-muted-foreground">Roll No: {student.rollNo}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {getStatusIcon(student.status)}
                  {student.time && (
                    <span className="text-xs text-muted-foreground">{student.time}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
