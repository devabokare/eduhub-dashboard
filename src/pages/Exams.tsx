import { useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  FileText,
  BarChart3,
  Clock,
  Users,
  ChevronRight,
  Eye,
  Edit,
  Download,
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
                    <Calendar className="h-5 w-5 text-info" />
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
                      <Calendar className="h-4 w-4" />
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
                <Button variant="outline" size="sm" className="gap-2">
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
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Exam schedule view coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
