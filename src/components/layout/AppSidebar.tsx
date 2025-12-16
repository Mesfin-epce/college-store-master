import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Truck,
  FileText,
  BarChart3,
  Users,
  Settings,
  ClipboardList,
  PackageCheck,
  LogOut,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'store_keeper', 'department_head', 'staff', 'management'],
  },
  {
    label: 'Materials',
    href: '/materials',
    icon: Package,
    roles: ['admin', 'store_keeper', 'management'],
  },
  {
    label: 'Material Requests',
    href: '/requests',
    icon: FileText,
    roles: ['admin', 'store_keeper', 'department_head', 'staff'],
  },
  {
    label: 'Goods Receipt',
    href: '/receipts',
    icon: PackageCheck,
    roles: ['admin', 'store_keeper'],
  },
  {
    label: 'Vendors',
    href: '/vendors',
    icon: Truck,
    roles: ['admin', 'store_keeper'],
  },
  {
    label: 'Stocktake',
    href: '/stocktake',
    icon: ClipboardList,
    roles: ['admin', 'store_keeper'],
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['admin', 'store_keeper', 'management'],
  },
  {
    label: 'Users',
    href: '/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin'],
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredNavItems = navItems.filter(
    item => user && item.roles.includes(user.role)
  );

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: 'System Administrator',
      store_keeper: 'Store Keeper',
      department_head: 'Department Head',
      staff: 'Staff',
      management: 'Management',
    };
    return labels[role] || role;
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <Building2 className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-sidebar-foreground">MSMS</h1>
            <p className="text-xs text-sidebar-foreground/60">Material Store</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/60">{user && getRoleLabel(user.role)}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}
