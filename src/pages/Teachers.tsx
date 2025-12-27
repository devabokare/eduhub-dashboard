import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Award,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

const teachers = [
  {
    id: "TCH001",
    name: "Dr. Anil Kumar",
    email: "anil.kumar@school.edu",
    phone: "+91 98765 12345",
    department: "Science",
    subjects: ["Physics", "Mathematics"],
    experience: "15 years",
    qualification: "Ph.D. Physics",
    status: "Active",
    classTeacher: "12-Science A",
    avatar: "",
  },
  {
    id: "TCH002",
    name: "Mrs. Sunita Sharma",
    email: "sunita.sharma@school.edu",
    phone: "+91 98765 12346",
    department: "Mathematics",
    subjects: ["Mathematics", "Statistics"],
    experience: "12 years",
    qualification: "M.Sc. Mathematics",
    status: "Active",
    classTeacher: "11-Science B",
    avatar: "",
  },
  {
    id: "TCH003",
    name: "Mr. Rajesh Verma",
    email: "rajesh.verma@school.edu",
    phone: "+91 98765 12347",
    department: "English",
    subjects: ["English Literature", "Grammar"],
    experience: "10 years",
    qualification: "M.A. English",
    status: "Active",
    classTeacher: "10-A",
    avatar: "",
  },
  {
    id: "TCH004",
    name: "Dr. Priya Gupta",
    email: "priya.gupta@school.edu",
    phone: "+91 98765 12348",
    department: "Science",
    subjects: ["Chemistry", "Biology"],
    experience: "8 years",
    qualification: "Ph.D. Chemistry",
    status: "Active",
    classTeacher: null,
    avatar: "",
  },
  {
    id: "TCH005",
    name: "Mr. Sanjay Patel",
    email: "sanjay.patel@school.edu",
    phone: "+91 98765 12349",
    department: "Commerce",
    subjects: ["Accountancy", "Business Studies"],
    experience: "14 years",
    qualification: "M.Com, CA",
    status: "Active",
    classTeacher: "12-Commerce",
    avatar: "",
  },
  {
    id: "TCH006",
    name: "Mrs. Meena Singh",
    email: "meena.singh@school.edu",
    phone: "+91 98765 12350",
    department: "Hindi",
    subjects: ["Hindi", "Sanskrit"],
    experience: "18 years",
    qualification: "M.A. Hindi",
    status: "On Leave",
    classTeacher: null,
    avatar: "",
  },
  {
    id: "TCH007",
    name: "Mr. David Wilson",
    email: "david.wilson@school.edu",
    phone: "+91 98765 12351",
    department: "Physical Education",
    subjects: ["Physical Education", "Sports"],
    experience: "6 years",
    qualification: "B.P.Ed",
    status: "Active",
    classTeacher: null,
    avatar: "",
  },
  {
    id: "TCH008",
    name: "Ms. Anita Reddy",
    email: "anita.reddy@school.edu",
    phone: "+91 98765 12352",
    department: "Computer Science",
    subjects: ["Computer Science", "IT"],
    experience: "9 years",
    qualification: "M.Tech CS",
    status: "Active",
    classTeacher: "9-B",
    avatar: "",
  },
];

export default function Teachers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "all" || teacher.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/10 text-success";
      case "On Leave": return "bg-warning/10 text-warning";
      case "Inactive": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleExport = () => {
    const exportData = filteredTeachers.map((teacher) => ({
      "Teacher ID": teacher.id,
      "Name": teacher.name,
      "Email": teacher.email,
      "Phone": teacher.phone,
      "Department": teacher.department,
      "Subjects": teacher.subjects.join(", "),
      "Experience": teacher.experience,
      "Qualification": teacher.qualification,
      "Class Teacher": teacher.classTeacher || "N/A",
      "Status": teacher.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teachers");

    worksheet["!cols"] = [
      { wch: 10 }, { wch: 20 }, { wch: 25 }, { wch: 18 },
      { wch: 18 }, { wch: 30 }, { wch: 12 }, { wch: 18 },
      { wch: 15 }, { wch: 10 },
    ];

    XLSX.writeFile(workbook, `Teachers_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Report Exported",
      description: `${filteredTeachers.length} teacher records exported successfully.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Header title="Teachers & Staff" subtitle="Manage faculty and staff members" />
      
      <div className="p-6">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Commerce">Commerce</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Physical Education">Physical Education</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2 gradient-primary border-0">
              <Plus className="h-4 w-4" />
              Add Teacher
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Staff</p>
            <p className="mt-1 text-2xl font-bold text-foreground">156</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Teaching Staff</p>
            <p className="mt-1 text-2xl font-bold text-primary">124</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Non-Teaching</p>
            <p className="mt-1 text-2xl font-bold text-info">32</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">On Leave</p>
            <p className="mt-1 text-2xl font-bold text-warning">5</p>
          </div>
        </div>

        {/* Teacher Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTeachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between">
                <Avatar className="h-14 w-14 border-2 border-border">
                  <AvatarImage src={teacher.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {teacher.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="h-4 w-4" /> View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Edit className="h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" /> Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-foreground">{teacher.name}</h3>
                <p className="text-sm text-muted-foreground">{teacher.id}</p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {teacher.department}
                </Badge>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", getStatusColor(teacher.status))}>
                  {teacher.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span className="truncate">{teacher.subjects.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>{teacher.experience}</span>
                </div>
                {teacher.classTeacher && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">
                      Class Teacher: {teacher.classTeacher}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs h-8">
                  <Mail className="h-3 w-3" />
                  Email
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 gap-1 text-xs h-8">
                  <Phone className="h-3 w-3" />
                  Call
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
