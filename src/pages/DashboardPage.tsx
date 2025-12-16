import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { InventoryChart } from '@/components/dashboard/InventoryChart';
import { useAuth } from '@/contexts/AuthContext';
import { Package, AlertTriangle, FileText, Banknote, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const getRoleGreeting = () => {
    switch (user?.role) {
      case 'admin':
        return 'System Overview';
      case 'store_keeper':
        return 'Store Operations';
      case 'department_head':
      case 'staff':
        return 'Your Requests';
      case 'management':
        return 'Inventory Overview';
      default:
        return 'Dashboard';
    }
  };

  return (
    <DashboardLayout 
      title={`Welcome, ${user?.name?.split(' ')[0]}`}
      subtitle={getRoleGreeting()}
    >
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Materials"
            value="1,247"
            change="+12 this month"
            changeType="positive"
            icon={Package}
            iconColor="bg-primary"
          />
          <StatCard
            title="Low Stock Items"
            value="23"
            change="4 critical"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-warning"
          />
          <StatCard
            title="Pending Requests"
            value="8"
            change="3 awaiting approval"
            changeType="neutral"
            icon={FileText}
            iconColor="bg-info"
          />
          <StatCard
            title="Total Inventory Value"
            value="ETB 135K"
            change="+8.2% vs last month"
            changeType="positive"
            icon={Banknote}
            iconColor="bg-success"
          />
        </div>

        {/* Charts */}
        <InventoryChart />

        {/* Activity and Alerts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivity />
          <LowStockAlert />
        </div>
      </div>
    </DashboardLayout>
  );
}
