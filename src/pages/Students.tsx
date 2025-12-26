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
  ChevronLeft,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const students = [
  {
    id: "STU2024001",
    name: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    phone: "+91 98765 43210",
    class: "10-A",
    rollNo: 1,
    gender: "Male",
    status: "Active",
    avatar: "",
    parentName: "Rajesh Sharma",
    admissionDate: "2020-04-15",
  },
  {
    id: "STU2024002",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 98765 43211",
    class: "10-A",
    rollNo: 2,
    gender: "Female",
    status: "Active",
    avatar: "",
    parentName: "Amit Patel",
    admissionDate: "2020-04-15",
  },
  {
    id: "STU2024003",
    name: "Rohan Gupta",
    email: "rohan.gupta@email.com",
    phone: "+91 98765 43212",
    class: "10-B",
    rollNo: 3,
    gender: "Male",
    status: "Active",
    avatar: "",
    parentName: "Suresh Gupta",
    admissionDate: "2020-04-16",
  },
  {
    id: "STU2024004",
    name: "Ananya Singh",
    email: "ananya.singh@email.com",
    phone: "+91 98765 43213",
    class: "9-A",
    rollNo: 1,
    gender: "Female",
    status: "Active",
    avatar: "",
    parentName: "Vikram Singh",
    admissionDate: "2021-04-10",
  },
  {
    id: "STU2024005",
    name: "Arjun Kumar",
    email: "arjun.kumar@email.com",
    phone: "+91 98765 43214",
    class: "9-B",
    rollNo: 5,
    gender: "Male",
    status: "Inactive",
    avatar: "",
    parentName: "Manoj Kumar",
    admissionDate: "2021-04-10",
  },
  {
    id: "STU2024006",
    name: "Ishita Verma",
    email: "ishita.verma@email.com",
    phone: "+91 98765 43215",
    class: "11-Science",
    rollNo: 1,
    gender: "Female",
    status: "Active",
    avatar: "",
    parentName: "Sanjay Verma",
    admissionDate: "2019-04-12",
  },
  {
    id: "STU2024007",
    name: "Karan Mehta",
    email: "karan.mehta@email.com",
    phone: "+91 98765 43216",
    class: "12-Commerce",
    rollNo: 8,
    gender: "Male",
    status: "Active",
    avatar: "",
    parentName: "Rakesh Mehta",
    admissionDate: "2018-04-15",
  },
  {
    id: "STU2024008",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 98765 43217",
    class: "8-A",
    rollNo: 12,
    gender: "Female",
    status: "Active",
    avatar: "",
    parentName: "Venkat Reddy",
    admissionDate: "2022-04-10",
  },
];

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="min-h-screen">
      <Header title="Students" subtitle="Manage student records and information" />
      
      <div className="p-6">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="8-A">Class 8-A</SelectItem>
                <SelectItem value="9-A">Class 9-A</SelectItem>
                <SelectItem value="9-B">Class 9-B</SelectItem>
                <SelectItem value="10-A">Class 10-A</SelectItem>
                <SelectItem value="10-B">Class 10-B</SelectItem>
                <SelectItem value="11-Science">Class 11-Science</SelectItem>
                <SelectItem value="12-Commerce">Class 12-Commerce</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2 gradient-primary border-0">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="mt-1 text-2xl font-bold text-foreground">2,847</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="mt-1 text-2xl font-bold text-success">2,789</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Inactive</p>
            <p className="mt-1 text-2xl font-bold text-warning">58</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">New This Month</p>
            <p className="mt-1 text-2xl font-bold text-info">24</p>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>ID</th>
                  <th>Class</th>
                  <th>Roll No</th>
                  <th>Contact</th>
                  <th>Parent</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr 
                    key={student.id}
                    className="animate-fade-in opacity-0"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                            {student.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-xs">{student.id}</td>
                    <td>
                      <Badge variant="secondary" className="font-medium">
                        {student.class}
                      </Badge>
                    </td>
                    <td>{student.rollNo}</td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-xs">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {student.email}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {student.phone}
                        </span>
                      </div>
                    </td>
                    <td className="text-muted-foreground">{student.parentName}</td>
                    <td>
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        student.status === "Active" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      )}>
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                              <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Showing 1 to {filteredStudents.length} of 2,847 students
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline" size="sm">142</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
