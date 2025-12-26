import { useState } from "react";
import {
  Search,
  Plus,
  Users,
  GraduationCap,
  BookOpen,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const classes = [
  {
    id: 1,
    name: "Class 1",
    sections: [
      { name: "A", students: 35, capacity: 40, classTeacher: "Mrs. Anita Sharma", roomNo: "101" },
      { name: "B", students: 38, capacity: 40, classTeacher: "Mrs. Priya Gupta", roomNo: "102" },
    ],
    totalStudents: 73,
    subjects: 8,
  },
  {
    id: 2,
    name: "Class 2",
    sections: [
      { name: "A", students: 40, capacity: 40, classTeacher: "Mr. Rajesh Kumar", roomNo: "103" },
      { name: "B", students: 36, capacity: 40, classTeacher: "Mrs. Sunita Verma", roomNo: "104" },
    ],
    totalStudents: 76,
    subjects: 8,
  },
  {
    id: 10,
    name: "Class 10",
    sections: [
      { name: "A", students: 42, capacity: 45, classTeacher: "Dr. Anil Kumar", roomNo: "201" },
      { name: "B", students: 38, capacity: 45, classTeacher: "Mrs. Meena Singh", roomNo: "202" },
      { name: "C", students: 40, capacity: 45, classTeacher: "Mr. Sanjay Patel", roomNo: "203" },
    ],
    totalStudents: 120,
    subjects: 12,
  },
  {
    id: 11,
    name: "Class 11 - Science",
    sections: [
      { name: "A", students: 38, capacity: 45, classTeacher: "Dr. Priya Gupta", roomNo: "301" },
      { name: "B", students: 35, capacity: 45, classTeacher: "Mr. David Wilson", roomNo: "302" },
    ],
    totalStudents: 73,
    subjects: 10,
  },
  {
    id: 12,
    name: "Class 11 - Commerce",
    sections: [
      { name: "A", students: 42, capacity: 45, classTeacher: "Mr. Rakesh Mehta", roomNo: "303" },
    ],
    totalStudents: 42,
    subjects: 8,
  },
  {
    id: 13,
    name: "Class 12 - Science",
    sections: [
      { name: "A", students: 36, capacity: 40, classTeacher: "Dr. Anil Kumar", roomNo: "401" },
      { name: "B", students: 34, capacity: 40, classTeacher: "Ms. Anita Reddy", roomNo: "402" },
    ],
    totalStudents: 70,
    subjects: 10,
  },
  {
    id: 14,
    name: "Class 12 - Commerce",
    sections: [
      { name: "A", students: 40, capacity: 45, classTeacher: "Mr. Sanjay Patel", roomNo: "403" },
    ],
    totalStudents: 40,
    subjects: 8,
  },
];

const departments = [
  {
    id: 1,
    name: "Computer Science",
    years: [
      { year: "1st Year", divisions: 2, students: 120 },
      { year: "2nd Year", divisions: 2, students: 115 },
      { year: "3rd Year", divisions: 2, students: 108 },
      { year: "4th Year", divisions: 2, students: 95 },
    ],
    totalStudents: 438,
    hod: "Dr. Ramesh Sharma",
  },
  {
    id: 2,
    name: "Electronics & Communication",
    years: [
      { year: "1st Year", divisions: 2, students: 100 },
      { year: "2nd Year", divisions: 2, students: 96 },
      { year: "3rd Year", divisions: 2, students: 88 },
      { year: "4th Year", divisions: 1, students: 45 },
    ],
    totalStudents: 329,
    hod: "Dr. Priya Nair",
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    years: [
      { year: "1st Year", divisions: 3, students: 150 },
      { year: "2nd Year", divisions: 3, students: 142 },
      { year: "3rd Year", divisions: 2, students: 98 },
      { year: "4th Year", divisions: 2, students: 92 },
    ],
    totalStudents: 482,
    hod: "Prof. Vikram Singh",
  },
];

export default function Classes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [institutionType, setInstitutionType] = useState("school");

  return (
    <div className="min-h-screen">
      <Header title="Classes & Departments" subtitle="Manage academic structure" />
      
      <div className="p-6">
        <Tabs value={institutionType} onValueChange={setInstitutionType} className="w-full">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="grid w-[300px] grid-cols-2">
              <TabsTrigger value="school">School Structure</TabsTrigger>
              <TabsTrigger value="college">College Structure</TabsTrigger>
            </TabsList>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Button className="gap-2 gradient-primary border-0">
                <Plus className="h-4 w-4" />
                Add {institutionType === "school" ? "Class" : "Department"}
              </Button>
            </div>
          </div>

          {/* School View */}
          <TabsContent value="school" className="mt-0">
            <div className="mb-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="mt-1 text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Total Sections</p>
                <p className="mt-1 text-2xl font-bold text-primary">48</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="mt-1 text-2xl font-bold text-success">2,847</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Avg. per Section</p>
                <p className="mt-1 text-2xl font-bold text-info">38</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {classes.map((cls, index) => (
                <div
                  key={cls.id}
                  className="rounded-xl border border-border bg-card overflow-hidden animate-slide-up opacity-0"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                        <BookOpen className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{cls.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {cls.sections.length} sections · {cls.subjects} subjects
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="gap-1 bg-primary/10 text-primary hover:bg-primary/20">
                        <Users className="h-3 w-3" />
                        {cls.totalStudents}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" /> View Details
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
                  </div>

                  <div className="p-4 space-y-3">
                    {cls.sections.map((section) => (
                      <div
                        key={section.name}
                        className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-sm font-semibold text-secondary-foreground">
                            {section.name}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Section {section.name} · Room {section.roomNo}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <GraduationCap className="inline h-3 w-3 mr-1" />
                              {section.classTeacher}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              {section.students}/{section.capacity}
                            </p>
                            <Progress 
                              value={(section.students / section.capacity) * 100} 
                              className="h-1.5 w-20"
                            />
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* College View */}
          <TabsContent value="college" className="mt-0">
            <div className="mb-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="mt-1 text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Total Divisions</p>
                <p className="mt-1 text-2xl font-bold text-primary">56</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="mt-1 text-2xl font-bold text-success">4,250</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Faculty Members</p>
                <p className="mt-1 text-2xl font-bold text-info">186</p>
              </div>
            </div>

            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div
                  key={dept.id}
                  className="rounded-xl border border-border bg-card overflow-hidden animate-slide-up opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-info">
                        <GraduationCap className="h-5 w-5 text-info-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{dept.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          HOD: {dept.hod}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="gap-1 bg-success/10 text-success hover:bg-success/20">
                        <Users className="h-3 w-3" />
                        {dept.totalStudents} Students
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 p-4">
                    {dept.years.map((year) => (
                      <div
                        key={year.year}
                        className="rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <p className="text-sm font-medium text-foreground">{year.year}</p>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{year.divisions} div</span>
                          <span>{year.students} students</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
