import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const categoryData = [
  { name: 'Lab Equipment', value: 45000 },
  { name: 'Chemicals', value: 32000 },
  { name: 'Office Supplies', value: 18000 },
  { name: 'Safety Gear', value: 12000 },
  { name: 'Electronics', value: 28000 },
];

const monthlyUsage = [
  { month: 'Jul', value: 4500 },
  { month: 'Aug', value: 5200 },
  { month: 'Sep', value: 4800 },
  { month: 'Oct', value: 6100 },
  { month: 'Nov', value: 5500 },
  { month: 'Dec', value: 4200 },
];

const COLORS = ['hsl(215, 60%, 25%)', 'hsl(174, 60%, 40%)', 'hsl(38, 92%, 50%)', 'hsl(142, 70%, 40%)', 'hsl(199, 89%, 48%)'];

export function InventoryChart() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Bar Chart */}
      <div className="rounded-xl border bg-card p-6 shadow-card">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Monthly Material Usage</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="month" stroke="hsl(215, 15%, 50%)" fontSize={12} />
              <YAxis stroke="hsl(215, 15%, 50%)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)', 
                  border: '1px solid hsl(214, 20%, 88%)',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="value" fill="hsl(215, 60%, 25%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="rounded-xl border bg-card p-6 shadow-card">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Inventory by Category (ETB)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)', 
                  border: '1px solid hsl(214, 20%, 88%)',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`ETB ${value.toLocaleString()}`, 'Value']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {categoryData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
