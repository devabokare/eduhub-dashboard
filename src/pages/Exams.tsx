import { useState } from "react";
import {
  Search,
  Plus,
  Calendar as CalendarIcon,
  FileText,
  BarChart3,
  Clock,
  Users,
  ChevronRight,
  Eye,
  Edit,
  Download,
  ChevronLeft,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  parseISO,
} from "date-fns";

const exams = [
  {
    id: 1,
    name: "Mid-Term Examination",
    type: "Mid-Term",
    startDate: "2025-01-15",
    endDate: "2025-01-25",
    classes: ["9", "10", "11", "12"],
    status: "upcoming",
    subjects: 8,
    totalStudents: 1200,
  },
  {
    id: 2,
    name: "Unit Test 3",
    type: "Unit Test",
    startDate: "2024-12-10",
    endDate: "2024-12-12",
    classes: ["6", "7", "8"],
    status: "completed",
    subjects: 5,
    totalStudents: 850,
    avgScore: 72,
  },
  {
    id: 3,
    name: "Pre-Board Examination",
    type: "Board Prep",
    startDate: "2025-02-01",
    endDate: "2025-02-15",
    classes: ["10", "12"],
    status: "upcoming",
    subjects: 6,
    totalStudents: 400,
  },
  {
    id: 4,
    name: "First Term Examination",
    type: "Term",
    startDate: "2024-09-20",
    endDate: "2024-10-05",
    classes: ["1", "2", "3", "4", "5"],
    status: "completed",
    subjects: 5,
    totalStudents: 600,
    avgScore: 78,
  },
];

const recentResults = [
  { class: "10-A", subject: "Mathematics", avgScore: 76, highest: 98, lowest: 42, passed: 92 },
  { class: "10-A", subject: "Physics", avgScore: 71, highest: 95, lowest: 38, passed: 88 },
  { class: "10-A", subject: "Chemistry", avgScore: 74, highest: 96, lowest: 45, passed: 90 },
  { class: "10-A", subject: "English", avgScore: 82, highest: 99, lowest: 55, passed: 95 },
  { class: "10-A", subject: "Computer Science", avgScore: 85, highest: 100, lowest: 60, passed: 98 },
];

export default function Exams() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming": 
        return <Badge className="bg-info/10 text-info border-0">Upcoming</Badge>;
      case "ongoing": 
        return <Badge className="bg-warning/10 text-warning border-0">Ongoing</Badge>;
      case "completed": 
        return <Badge className="bg-success/10 text-success border-0">Completed</Badge>;
      default: 
        return null;
    }
  };

  const getExamsForDate = (date: Date) => {
    return exams.filter((exam) => {
      const start = parseISO(exam.startDate);
      const end = parseISO(exam.endDate);
      return isWithinInterval(date, { start, end });
    });
  };

  const getExamColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-info";
      case "ongoing":
        return "bg-warning";
      case "completed":
        return "bg-success";
      default:
        return "bg-primary";
    }
  };

  const handleExportExams = () => {
    const exportData = exams.map((exam) => ({
      "Exam Name": exam.name,
      "Type": exam.type,
      "Start Date": exam.startDate,
      "End Date": exam.endDate,
      "Classes": exam.classes.join(", "),
      "Subjects": exam.subjects,
      "Total Students": exam.totalStudents,
      "Status": exam.status.charAt(0).toUpperCase() + exam.status.slice(1),
      "Avg Score": exam.avgScore ? `${exam.avgScore}%` : "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exams");

    worksheet["!cols"] = [
      { wch: 25 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
      { wch: 20 }, { wch: 10 }, { wch: 15 }, { wch: 12 },
      { wch: 12 },
    ];

    XLSX.writeFile(workbook, `Exams_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Report Exported",
      description: `${exams.length} exam records exported successfully.`,
    });
  };

  const handleExportResults = () => {
    const exportData = recentResults.map((result) => ({
      "Class": result.class,
      "Subject": result.subject,
      "Average Score": `${result.avgScore}%`,
      "Highest": result.highest,
      "Lowest": result.lowest,
      "Pass Rate": `${result.passed}%`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    worksheet["!cols"] = [
      { wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 10 },
      { wch: 10 }, { wch: 12 },
    ];

    XLSX.writeFile(workbook, `Exam_Results_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Report Exported",
      description: "Exam results exported successfully.",
    });
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const selectedDateExams = selectedDate ? getExamsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen">
      <Header title="Exams & Results" subtitle="Manage examinations and academic performance" />
      
      <div className="p-6">
        <Tabs defaultValue="exams" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="exams">Examinations</TabsTrigger>
            <TabsTrigger value="results">Results & Analytics</TabsTrigger>
            <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="exams" className="mt-0">
            {/* Stats */}
            <div className="mb-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Exams</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">12</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                    <p className="mt-1 text-2xl font-bold text-info">3</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-info/10">
                    <CalendarIcon className="h-5 w-5 text-info" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="mt-1 text-2xl font-bold text-success">8</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                    <BarChart3 className="h-5 w-5 text-success" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Pass Rate</p>
                    <p className="mt-1 text-2xl font-bold text-success">89.3%</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search exams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="gap-2 gradient-primary border-0">
                <Plus className="h-4 w-4" />
                Create Exam
              </Button>
            </div>

            {/* Exam Cards */}
            <div className="grid gap-4 lg:grid-cols-2">
              {exams.map((exam, index) => (
                <div
                  key={exam.id}
                  className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover animate-slide-up opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{exam.name}</h3>
                        {getStatusBadge(exam.status)}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{exam.type}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{exam.startDate} - {exam.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{exam.totalStudents} Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{exam.subjects} Subjects</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Classes: {exam.classes.join(", ")}</span>
                    </div>
                  </div>

                  {exam.avgScore && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Average Score</span>
                        <span className="font-semibold text-foreground">{exam.avgScore}%</span>
                      </div>
                      <Progress value={exam.avgScore} className="mt-2 h-2" />
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-border flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Download className="h-4 w-4" />
                      Results
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-0">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-muted/30 px-5 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Recent Results - Class 10-A</h3>
                  <p className="text-sm text-muted-foreground">Unit Test 3 - December 2024</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={handleExportResults}>
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Average Score</th>
                      <th>Highest</th>
                      <th>Lowest</th>
                      <th>Pass Rate</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentResults.map((result, index) => (
                      <tr 
                        key={result.subject}
                        className="animate-fade-in opacity-0"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td className="font-medium text-foreground">{result.subject}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Progress value={result.avgScore} className="w-20 h-2" />
                            <span className="text-sm">{result.avgScore}%</span>
                          </div>
                        </td>
                        <td className="text-success font-medium">{result.highest}</td>
                        <td className="text-destructive">{result.lowest}</td>
                        <td>
                          <Badge className={cn(
                            "border-0",
                            result.passed >= 90 ? "bg-success/10 text-success" :
                            result.passed >= 80 ? "bg-info/10 text-info" :
                            "bg-warning/10 text-warning"
                          )}>
                            {result.passed}%
                          </Badge>
                        </td>
                        <td>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View Details
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Calendar */}
              <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {format(currentMonth, "MMMM yyyy")}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="py-2 text-center text-sm font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((day, index) => {
                    const dayExams = getExamsForDate(day);
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isToday = isSameDay(day, new Date());
                    const isSelected = selectedDate && isSameDay(day, selectedDate);

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(day)}
                        className={cn(
                          "relative min-h-[80px] p-2 border border-border rounded-lg transition-all text-left",
                          !isCurrentMonth && "bg-muted/30 text-muted-foreground",
                          isCurrentMonth && "bg-card hover:bg-muted/50",
                          isToday && "ring-2 ring-primary",
                          isSelected && "bg-primary/10 border-primary"
                        )}
                      >
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isToday && "text-primary font-bold"
                          )}
                        >
                          {format(day, "d")}
                        </span>
                        <div className="mt-1 space-y-1">
                          {dayExams.slice(0, 2).map((exam) => (
                            <div
                              key={exam.id}
                              className={cn(
                                "text-xs px-1.5 py-0.5 rounded truncate text-white",
                                getExamColor(exam.status)
                              )}
                              title={exam.name}
                            >
                              {exam.name}
                            </div>
                          ))}
                          {dayExams.length > 2 && (
                            <div className="text-xs text-muted-foreground px-1">
                              +{dayExams.length - 2} more
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-info" />
                    <span className="text-sm text-muted-foreground">Upcoming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-warning" />
                    <span className="text-sm text-muted-foreground">Ongoing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-success" />
                    <span className="text-sm text-muted-foreground">Completed</span>
                  </div>
                </div>
              </div>

              {/* Selected Date Details */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-4">
                  {selectedDate
                    ? format(selectedDate, "EEEE, MMMM d, yyyy")
                    : "Select a date"}
                </h3>

                {selectedDate ? (
                  selectedDateExams.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateExams.map((exam) => (
                        <div
                          key={exam.id}
                          className="p-4 rounded-lg border border-border bg-muted/30"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-medium text-foreground">{exam.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{exam.type}</p>
                            </div>
                            {getStatusBadge(exam.status)}
                          </div>
                          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{exam.startDate} - {exam.endDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{exam.totalStudents} Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>{exam.subjects} Subjects</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>Classes: {exam.classes.join(", ")}</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border">
                            <Button variant="outline" size="sm" className="w-full gap-1">
                              <Eye className="h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="h-10 w-10 mx-auto mb-3 opacity-50" />
                      <p>No exams scheduled for this date</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p>Click on a date to view exam details</p>
                  </div>
                )}

                {/* Upcoming Exams List */}
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-3">Upcoming Exams</h4>
                  <div className="space-y-2">
                    {exams
                      .filter((e) => e.status === "upcoming")
                      .map((exam) => (
                        <div
                          key={exam.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedDate(parseISO(exam.startDate))}
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{exam.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(parseISO(exam.startDate), "MMM d")} - {format(parseISO(exam.endDate), "MMM d")}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
