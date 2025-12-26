import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { class: "Class 1", students: 85, fill: "hsl(239, 84%, 67%)" },
  { class: "Class 2", students: 92, fill: "hsl(262, 83%, 58%)" },
  { class: "Class 3", students: 78, fill: "hsl(172, 66%, 50%)" },
  { class: "Class 4", students: 88, fill: "hsl(199, 89%, 48%)" },
  { class: "Class 5", students: 95, fill: "hsl(142, 76%, 36%)" },
  { class: "Class 6", students: 72, fill: "hsl(38, 92%, 50%)" },
  { class: "Class 7", students: 81, fill: "hsl(239, 84%, 67%)" },
  { class: "Class 8", students: 90, fill: "hsl(262, 83%, 58%)" },
  { class: "Class 9", students: 68, fill: "hsl(172, 66%, 50%)" },
  { class: "Class 10", students: 75, fill: "hsl(199, 89%, 48%)" },
  { class: "Class 11", students: 55, fill: "hsl(142, 76%, 36%)" },
  { class: "Class 12", students: 48, fill: "hsl(38, 92%, 50%)" },
];

export function StudentDistributionChart() {
  return (
    <div className="chart-container">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Class-wise Distribution</h3>
          <p className="text-sm text-muted-foreground">Students per class</p>
        </div>
      </div>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
            <XAxis
              dataKey="class"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(214, 32%, 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [value, "Students"]}
            />
            <Bar dataKey="students" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
