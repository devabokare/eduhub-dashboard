import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 89 },
  { month: "Jun", attendance: 94 },
  { month: "Jul", attendance: 87 },
  { month: "Aug", attendance: 93 },
  { month: "Sep", attendance: 96 },
  { month: "Oct", attendance: 90 },
  { month: "Nov", attendance: 92 },
  { month: "Dec", attendance: 88 },
];

export function AttendanceChart() {
  return (
    <div className="chart-container">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Attendance Trend</h3>
          <p className="text-sm text-muted-foreground">Monthly attendance percentage</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-success/10 px-3 py-1">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-sm font-medium text-success">91.3% avg</span>
        </div>
      </div>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }}
            />
            <YAxis
              domain={[80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(214, 32%, 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [`${value}%`, "Attendance"]}
            />
            <Area
              type="monotone"
              dataKey="attendance"
              stroke="hsl(239, 84%, 67%)"
              strokeWidth={2}
              fill="url(#attendanceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
