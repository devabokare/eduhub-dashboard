import { CalendarDays, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const events = [
  {
    id: 1,
    title: "Annual Sports Day",
    date: "Jan 15, 2025",
    time: "9:00 AM",
    location: "Main Ground",
    attendees: 450,
    color: "bg-success",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "Jan 18, 2025",
    time: "10:00 AM",
    location: "School Auditorium",
    attendees: 200,
    color: "bg-info",
  },
  {
    id: 3,
    title: "Science Exhibition",
    date: "Jan 22, 2025",
    time: "11:00 AM",
    location: "Science Lab",
    attendees: 150,
    color: "bg-warning",
  },
  {
    id: 4,
    title: "Republic Day Celebration",
    date: "Jan 26, 2025",
    time: "8:30 AM",
    location: "Main Ground",
    attendees: 500,
    color: "bg-primary",
  },
];

export function UpcomingEvents() {
  return (
    <div className="chart-container">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
        <button className="text-sm font-medium text-primary hover:underline">
          View calendar
        </button>
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="flex gap-4 rounded-lg border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/30 animate-slide-up opacity-0"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={cn(
              "flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg text-primary-foreground",
              event.color
            )}>
              <span className="text-xs font-medium">{event.date.split(" ")[0]}</span>
              <span className="text-lg font-bold">{event.date.split(" ")[1].replace(",", "")}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground">{event.title}</h4>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {event.attendees} expected
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
