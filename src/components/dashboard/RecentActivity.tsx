import { Package, FileText, PackageCheck, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'receipt' | 'issue' | 'request' | 'alert';
  message: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'receipt',
    message: 'Received 500 units of Lab Chemicals from Adama Supplies',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'issue',
    message: 'Issued 20 units of Printer Paper to Chemistry Dept.',
    time: '3 hours ago',
  },
  {
    id: '3',
    type: 'request',
    message: 'New material request from Physics Department',
    time: '5 hours ago',
  },
  {
    id: '4',
    type: 'alert',
    message: 'Safety Goggles stock below reorder level',
    time: '1 day ago',
  },
  {
    id: '5',
    type: 'receipt',
    message: 'Received 100 units of Office Supplies from City Traders',
    time: '2 days ago',
  },
];

const iconMap = {
  receipt: PackageCheck,
  issue: Package,
  request: FileText,
  alert: AlertTriangle,
};

const colorMap = {
  receipt: 'bg-success/10 text-success',
  issue: 'bg-info/10 text-info',
  request: 'bg-primary/10 text-primary',
  alert: 'bg-warning/10 text-warning',
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-card">
      <h3 className="mb-4 text-lg font-semibold text-card-foreground">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div 
              key={activity.id} 
              className="flex items-start gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn('rounded-lg p-2', colorMap[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
