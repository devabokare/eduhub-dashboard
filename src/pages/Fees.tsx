import { useState } from "react";
import {
  Search,
  Download,
  Filter,
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Eye,
  Receipt,
  Send,
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
import { toast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

const feeRecords = [
  {
    id: "FEE001",
    studentId: "STU2024001",
    studentName: "Aarav Sharma",
    class: "10-A",
    totalFee: 45000,
    paid: 45000,
    pending: 0,
    status: "paid",
    lastPayment: "2024-12-15",
    installments: [
      { amount: 15000, date: "2024-04-15", status: "paid" },
      { amount: 15000, date: "2024-08-15", status: "paid" },
      { amount: 15000, date: "2024-12-15", status: "paid" },
    ],
  },
  {
    id: "FEE002",
    studentId: "STU2024002",
    studentName: "Priya Patel",
    class: "10-A",
    totalFee: 45000,
    paid: 30000,
    pending: 15000,
    status: "partial",
    lastPayment: "2024-08-20",
    dueDate: "2024-12-31",
    installments: [
      { amount: 15000, date: "2024-04-20", status: "paid" },
      { amount: 15000, date: "2024-08-20", status: "paid" },
      { amount: 15000, date: "2024-12-31", status: "pending" },
    ],
  },
  {
    id: "FEE003",
    studentId: "STU2024003",
    studentName: "Rohan Gupta",
    class: "10-B",
    totalFee: 45000,
    paid: 15000,
    pending: 30000,
    status: "overdue",
    lastPayment: "2024-04-10",
    dueDate: "2024-08-15",
    installments: [
      { amount: 15000, date: "2024-04-10", status: "paid" },
      { amount: 15000, date: "2024-08-15", status: "overdue" },
      { amount: 15000, date: "2024-12-15", status: "pending" },
    ],
  },
  {
    id: "FEE004",
    studentId: "STU2024004",
    studentName: "Ananya Singh",
    class: "9-A",
    totalFee: 42000,
    paid: 42000,
    pending: 0,
    status: "paid",
    lastPayment: "2024-11-28",
    installments: [
      { amount: 14000, date: "2024-04-12", status: "paid" },
      { amount: 14000, date: "2024-07-28", status: "paid" },
      { amount: 14000, date: "2024-11-28", status: "paid" },
    ],
  },
  {
    id: "FEE005",
    studentId: "STU2024005",
    studentName: "Arjun Kumar",
    class: "9-B",
    totalFee: 42000,
    paid: 28000,
    pending: 14000,
    status: "partial",
    lastPayment: "2024-07-30",
    dueDate: "2024-12-15",
    installments: [
      { amount: 14000, date: "2024-04-15", status: "paid" },
      { amount: 14000, date: "2024-07-30", status: "paid" },
      { amount: 14000, date: "2024-12-15", status: "pending" },
    ],
  },
];

const feeStructure = [
  { class: "Class 1-5", tuition: 25000, activity: 5000, transport: 12000, total: 42000 },
  { class: "Class 6-8", tuition: 30000, activity: 6000, transport: 12000, total: 48000 },
  { class: "Class 9-10", tuition: 35000, activity: 7000, transport: 12000, total: 54000 },
  { class: "Class 11-12", tuition: 40000, activity: 8000, transport: 12000, total: 60000 },
];

export default function Fees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRecords = feeRecords.filter((record) => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid": 
        return <Badge className="bg-success/10 text-success border-0">Paid</Badge>;
      case "partial": 
        return <Badge className="bg-warning/10 text-warning border-0">Partial</Badge>;
      case "overdue": 
        return <Badge className="bg-destructive/10 text-destructive border-0">Overdue</Badge>;
      case "pending": 
        return <Badge className="bg-info/10 text-info border-0">Pending</Badge>;
      default: 
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleExport = () => {
    const exportData = filteredRecords.map((record) => ({
      "Fee ID": record.id,
      "Student ID": record.studentId,
      "Student Name": record.studentName,
      "Class": record.class,
      "Total Fee": record.totalFee,
      "Paid": record.paid,
      "Pending": record.pending,
      "Status": record.status.charAt(0).toUpperCase() + record.status.slice(1),
      "Last Payment": record.lastPayment,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fees");

    worksheet["!cols"] = [
      { wch: 10 }, { wch: 15 }, { wch: 20 }, { wch: 10 },
      { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 10 },
      { wch: 15 },
    ];

    XLSX.writeFile(workbook, `Fees_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Report Exported",
      description: `${filteredRecords.length} fee records exported successfully.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Header title="Fees Management" subtitle="Track fee collection and payments" />
      
      <div className="p-6">
        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="collection">Fee Collection</TabsTrigger>
            <TabsTrigger value="structure">Fee Structure</TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="mt-0">
            {/* Stats */}
            <div className="mb-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Expected</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">₹36.5L</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
                    <DollarSign className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Collected</p>
                    <p className="mt-1 text-2xl font-bold text-success">₹28.5L</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                </div>
                <Progress value={78} className="mt-3 h-1.5" />
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="mt-1 text-2xl font-bold text-warning">₹6.5L</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                    <Clock className="h-5 w-5 text-warning" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="mt-1 text-2xl font-bold text-destructive">₹1.5L</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircle className="h-5 w-5 text-destructive" />
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
                    placeholder="Search by name or ID..."
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
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
              <Button variant="outline" className="gap-2" onClick={handleExport}>
                <Download className="h-4 w-4" />
                Export
              </Button>
                <Button className="gap-2 gradient-primary border-0">
                  <CreditCard className="h-4 w-4" />
                  Record Payment
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Total Fee</th>
                      <th>Paid</th>
                      <th>Pending</th>
                      <th>Status</th>
                      <th>Last Payment</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <tr 
                        key={record.id}
                        className="animate-fade-in opacity-0"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td>
                          <div>
                            <p className="font-medium text-foreground">{record.studentName}</p>
                            <p className="text-xs text-muted-foreground">{record.studentId}</p>
                          </div>
                        </td>
                        <td>
                          <Badge variant="secondary">{record.class}</Badge>
                        </td>
                        <td className="font-medium">{formatCurrency(record.totalFee)}</td>
                        <td className="text-success font-medium">{formatCurrency(record.paid)}</td>
                        <td className={cn(
                          "font-medium",
                          record.pending > 0 ? "text-warning" : "text-muted-foreground"
                        )}>
                          {formatCurrency(record.pending)}
                        </td>
                        <td>{getStatusBadge(record.status)}</td>
                        <td className="text-muted-foreground">{record.lastPayment}</td>
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
                                  <Eye className="h-4 w-4" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Receipt className="h-4 w-4" /> Generate Receipt
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Send className="h-4 w-4" /> Send Reminder
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
            </div>
          </TabsContent>

          <TabsContent value="structure" className="mt-0">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-muted/30 px-5 py-4">
                <h3 className="font-semibold text-foreground">Fee Structure 2024-25</h3>
                <p className="text-sm text-muted-foreground">Annual fee breakup by class</p>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Class Range</th>
                      <th>Tuition Fee</th>
                      <th>Activity Fee</th>
                      <th>Transport Fee</th>
                      <th>Total Annual</th>
                      <th>Per Installment (3)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructure.map((fee, index) => (
                      <tr 
                        key={fee.class}
                        className="animate-fade-in opacity-0"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="font-medium text-foreground">{fee.class}</td>
                        <td>{formatCurrency(fee.tuition)}</td>
                        <td>{formatCurrency(fee.activity)}</td>
                        <td>{formatCurrency(fee.transport)}</td>
                        <td className="font-semibold text-primary">{formatCurrency(fee.total)}</td>
                        <td className="text-muted-foreground">{formatCurrency(fee.total / 3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
