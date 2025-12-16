import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, TrendingUp, Package, Banknote, Calendar } from 'lucide-react';

const usageByDepartment = [
  { department: 'Chemistry', value: 45000 },
  { department: 'Physics', value: 32000 },
  { department: 'Biology', value: 28000 },
  { department: 'Admin', value: 15000 },
  { department: 'IT', value: 22000 },
];

const monthlyTrend = [
  { month: 'Jul', receipts: 85000, issues: 65000 },
  { month: 'Aug', receipts: 92000, issues: 78000 },
  { month: 'Sep', receipts: 78000, issues: 72000 },
  { month: 'Oct', receipts: 105000, issues: 88000 },
  { month: 'Nov', receipts: 95000, issues: 82000 },
  { month: 'Dec', receipts: 88000, issues: 75000 },
];

const categoryDistribution = [
  { name: 'Lab Equipment', value: 35 },
  { name: 'Chemicals', value: 25 },
  { name: 'Office Supplies', value: 20 },
  { name: 'Safety Gear', value: 12 },
  { name: 'Electronics', value: 8 },
];

const COLORS = ['hsl(215, 60%, 25%)', 'hsl(174, 60%, 40%)', 'hsl(38, 92%, 50%)', 'hsl(142, 70%, 40%)', 'hsl(199, 89%, 48%)'];

const reportTypes = [
  { id: 'stock-level', name: 'Stock Level Report', description: 'Current inventory levels and reorder alerts', icon: Package },
  { id: 'usage', name: 'Usage Report', description: 'Material consumption by department and period', icon: TrendingUp },
  { id: 'transaction', name: 'Transaction History', description: 'Detailed audit trail of all receipts and issues', icon: FileText },
  { id: 'valuation', name: 'Stock Valuation', description: 'Financial value of current inventory', icon: Banknote },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  return (
    <DashboardLayout title="Reports" subtitle="Analytics and inventory insights">
      <div className="space-y-6">
        {/* Period Filter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Reports */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reportTypes.map((report, index) => (
            <Card 
              key={report.id} 
              className="cursor-pointer transition-all duration-200 hover:shadow-card-hover animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-base">{report.name}</CardTitle>
                <CardDescription className="text-sm mt-1">{report.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Trend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Receipt vs Issue Trend</CardTitle>
              <CardDescription>Monthly comparison of goods received and issued (ETB)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                    <XAxis dataKey="month" stroke="hsl(215, 15%, 50%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 15%, 50%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0, 0%, 100%)',
                        border: '1px solid hsl(214, 20%, 88%)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`ETB ${value.toLocaleString()}`, '']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="receipts" 
                      stroke="hsl(142, 70%, 40%)" 
                      strokeWidth={2}
                      name="Receipts"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="issues" 
                      stroke="hsl(215, 60%, 25%)" 
                      strokeWidth={2}
                      name="Issues"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span className="text-sm text-muted-foreground">Receipts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Issues</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage by Department */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Usage by Department</CardTitle>
              <CardDescription>Material consumption breakdown (ETB)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageByDepartment} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                    <XAxis type="number" stroke="hsl(215, 15%, 50%)" fontSize={12} />
                    <YAxis dataKey="department" type="category" stroke="hsl(215, 15%, 50%)" fontSize={12} width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0, 0%, 100%)',
                        border: '1px solid hsl(214, 20%, 88%)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`ETB ${value.toLocaleString()}`, 'Usage']}
                    />
                    <Bar dataKey="value" fill="hsl(174, 60%, 40%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Inventory Distribution by Category</CardTitle>
            <CardDescription>Percentage breakdown of current stock value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${value}%`}
                    >
                      {categoryDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0, 0%, 100%)',
                        border: '1px solid hsl(214, 20%, 88%)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Share']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center space-y-3">
                {categoryDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
