import { useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  MapPin,
  Users,
  Clock,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
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

const events = [
  {
    id: 1,
    title: "Annual Sports Day",
    description: "Inter-house sports competition including athletics, team sports, and individual events.",
    date: "2025-01-15",
    time: "9:00 AM - 5:00 PM",
    location: "Main Sports Ground",
    category: "Sports",
    expectedAttendees: 500,
    confirmedAttendees: 420,
    status: "upcoming",
    color: "bg-success",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    description: "Term-end PTM for classes 9-12 to discuss student progress and performance.",
    date: "2025-01-18",
    time: "10:00 AM - 2:00 PM",
    location: "School Auditorium",
    category: "Academic",
    expectedAttendees: 300,
    confirmedAttendees: 185,
    status: "upcoming",
    color: "bg-info",
  },
  {
    id: 3,
    title: "Science Exhibition",
    description: "Annual science fair showcasing student projects and experiments.",
    date: "2025-01-22",
    time: "11:00 AM - 4:00 PM",
    location: "Science Block",
    category: "Academic",
    expectedAttendees: 200,
    confirmedAttendees: 150,
    status: "upcoming",
    color: "bg-primary",
  },
  {
    id: 4,
    title: "Republic Day Celebration",
    description: "Flag hoisting ceremony followed by cultural program.",
    date: "2025-01-26",
    time: "8:00 AM - 12:00 PM",
    location: "Main Ground",
    category: "Cultural",
    expectedAttendees: 600,
    confirmedAttendees: 0,
    status: "upcoming",
    color: "bg-warning",
  },
  {
    id: 5,
    title: "Annual Day Celebration",
    description: "Cultural performances, awards ceremony, and chief guest address.",
    date: "2024-12-20",
    time: "5:00 PM - 9:00 PM",
    location: "School Auditorium",
    category: "Cultural",
    expectedAttendees: 800,
    confirmedAttendees: 780,
    status: "completed",
    color: "bg-accent",
  },
  {
    id: 6,
    title: "Career Counseling Workshop",
    description: "Workshop for class 11-12 students on career options and entrance exam preparation.",
    date: "2024-12-15",
    time: "2:00 PM - 5:00 PM",
    location: "Seminar Hall",
    category: "Workshop",
    expectedAttendees: 150,
    confirmedAttendees: 142,
    status: "completed",
    color: "bg-destructive",
  },
];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
      <Header title="Events & Activities" subtitle="Manage institution events and activities" />
      
      <div className="p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Events</p>
            <p className="mt-1 text-2xl font-bold text-foreground">24</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Upcoming</p>
            <p className="mt-1 text-2xl font-bold text-info">8</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="mt-1 text-2xl font-bold text-primary">4</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Participants</p>
            <p className="mt-1 text-2xl font-bold text-success">2,450</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Cultural">Cultural</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
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
            Create Event
          </Button>
        </div>

        {/* Event Cards */}
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="group rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={cn("h-2", event.color)} />
              
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      {getStatusBadge(event.status)}
                    </div>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {event.category}
                    </Badge>
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
                        <Edit className="h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" /> Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.confirmedAttendees > 0 
                          ? `${event.confirmedAttendees} / ${event.expectedAttendees} confirmed`
                          : `${event.expectedAttendees} expected`
                        }
                      </span>
                    </div>
                    {event.status === "completed" && (
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
