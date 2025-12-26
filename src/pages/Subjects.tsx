import { useState } from "react";
import {
  Search,
  Plus,
  BookOpen,
  Users,
  Clock,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  FileText,
  GraduationCap,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    code: "MATH101",
    classes: ["10-A", "10-B", "10-C"],
    teachers: ["Dr. Anil Kumar", "Mrs. Sunita Sharma"],
    hoursPerWeek: 6,
    type: "Core",
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Physics",
    code: "PHY101",
    classes: ["11-Science", "12-Science"],
    teachers: ["Dr. Anil Kumar"],
    hoursPerWeek: 5,
    type: "Core",
    color: "bg-info",
  },
  {
    id: 3,
    name: "Chemistry",
    code: "CHEM101",
    classes: ["11-Science", "12-Science"],
    teachers: ["Dr. Priya Gupta"],
    hoursPerWeek: 5,
    type: "Core",
    color: "bg-success",
  },
  {
    id: 4,
    name: "English Literature",
    code: "ENG101",
    classes: ["9-A", "9-B", "10-A", "10-B"],
    teachers: ["Mr. Rajesh Verma"],
    hoursPerWeek: 5,
    type: "Core",
    color: "bg-warning",
  },
  {
    id: 5,
    name: "Computer Science",
    code: "CS101",
    classes: ["9-A", "9-B", "10-A", "10-B", "11-Science", "12-Science"],
    teachers: ["Ms. Anita Reddy"],
    hoursPerWeek: 4,
    type: "Elective",
    color: "bg-accent",
  },
  {
    id: 6,
    name: "Accountancy",
    code: "ACC101",
    classes: ["11-Commerce", "12-Commerce"],
    teachers: ["Mr. Sanjay Patel"],
    hoursPerWeek: 6,
    type: "Core",
    color: "bg-destructive",
  },
  {
    id: 7,
    name: "Hindi",
    code: "HIN101",
    classes: ["9-A", "9-B", "10-A", "10-B"],
    teachers: ["Mrs. Meena Singh"],
    hoursPerWeek: 5,
    type: "Core",
    color: "bg-primary",
  },
  {
    id: 8,
    name: "Physical Education",
    code: "PE101",
    classes: ["All Classes"],
    teachers: ["Mr. David Wilson"],
    hoursPerWeek: 3,
    type: "Mandatory",
    color: "bg-success",
  },
];

export default function Subjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || subject.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen">
      <Header title="Subjects & Courses" subtitle="Manage curriculum and course assignments" />
      
      <div className="p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Subjects</p>
            <p className="mt-1 text-2xl font-bold text-foreground">24</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Core Subjects</p>
            <p className="mt-1 text-2xl font-bold text-primary">16</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Electives</p>
            <p className="mt-1 text-2xl font-bold text-info">6</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Faculty Assigned</p>
            <p className="mt-1 text-2xl font-bold text-success">48</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
                <SelectItem value="Elective">Elective</SelectItem>
                <SelectItem value="Mandatory">Mandatory</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="gap-2 gradient-primary border-0">
            <Plus className="h-4 w-4" />
            Add Subject
          </Button>
        </div>

        {/* Subject Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSubjects.map((subject, index) => (
            <div
              key={subject.id}
              className="group rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={cn("h-2", subject.color)} />
              
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      subject.color,
                      "bg-opacity-20"
                    )}>
                      <BookOpen className={cn("h-5 w-5", subject.color.replace("bg-", "text-"))} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{subject.name}</h3>
                      <p className="text-xs text-muted-foreground">{subject.code}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <FileText className="h-4 w-4" /> Syllabus
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4">
                  <Badge variant="secondary" className="text-xs">
                    {subject.type}
                  </Badge>
                </div>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="truncate">
                      {subject.classes.length > 2 
                        ? `${subject.classes.slice(0, 2).join(", ")} +${subject.classes.length - 2}` 
                        : subject.classes.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span className="truncate">{subject.teachers[0]}</span>
                    {subject.teachers.length > 1 && (
                      <Badge variant="outline" className="text-xs">
                        +{subject.teachers.length - 1}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{subject.hoursPerWeek} hrs/week</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1 text-xs h-8">
                    View Syllabus
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs h-8">
                    Materials
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
