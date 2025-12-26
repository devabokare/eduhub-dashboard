import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Collected", value: 2850000, color: "hsl(142, 76%, 36%)" },
  { name: "Pending", value: 650000, color: "hsl(38, 92%, 50%)" },
  { name: "Overdue", value: 150000, color: "hsl(0, 84%, 60%)" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${(value / 1000).toFixed(0)}K`;
};

export function FeesSummary() {
  return (
    <div className="chart-container">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Fees Summary</h3>
        <p className="text-sm text-muted-foreground">Current academic year</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative h-[180px] w-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(214, 32%, 91%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [formatCurrency(value), ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">
              {formatCurrency(total)}
            </span>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
          
          <div className="pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Collection Rate</span>
              <span className="font-semibold text-success">78.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
