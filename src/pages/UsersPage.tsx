import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Search, Edit, Trash2, Shield, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}

const mockUsers: SystemUser[] = [
  { id: '1', name: 'System Administrator', email: 'admin@college.edu', role: 'admin', status: 'active', lastLogin: '2024-01-16', createdAt: '2023-01-01' },
  { id: '2', name: 'John Bekele', email: 'storekeeper@college.edu', role: 'store_keeper', status: 'active', lastLogin: '2024-01-16', createdAt: '2023-03-15' },
  { id: '3', name: 'Dr. Alemu Tadesse', email: 'head@college.edu', role: 'department_head', department: 'Chemistry Department', status: 'active', lastLogin: '2024-01-15', createdAt: '2023-02-10' },
  { id: '4', name: 'Meron Hailu', email: 'staff@college.edu', role: 'staff', department: 'Physics Department', status: 'active', lastLogin: '2024-01-14', createdAt: '2023-06-20' },
  { id: '5', name: 'Dean Kebede', email: 'management@college.edu', role: 'management', status: 'active', lastLogin: '2024-01-12', createdAt: '2023-01-05' },
  { id: '6', name: 'Sara Teshome', email: 'sara@college.edu', role: 'staff', department: 'Admin Office', status: 'inactive', createdAt: '2023-08-10' },
];

const roleConfig: Record<UserRole, { label: string; className: string }> = {
  admin: { label: 'System Admin', className: 'bg-destructive/10 text-destructive' },
  store_keeper: { label: 'Store Keeper', className: 'bg-primary/10 text-primary' },
  department_head: { label: 'Dept. Head', className: 'bg-info/10 text-info' },
  staff: { label: 'Staff', className: 'bg-muted text-muted-foreground' },
  management: { label: 'Management', className: 'bg-success/10 text-success' },
};

const departments = ['Chemistry Department', 'Physics Department', 'Biology Department', 'Admin Office', 'IT Department'];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout title="User Management" subtitle="Manage system users and roles">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">System Admin</SelectItem>
                <SelectItem value="store_keeper">Store Keeper</SelectItem>
                <SelectItem value="department_head">Dept. Head</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="management">Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with role-based access.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="user@college.edu" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">System Admin</SelectItem>
                        <SelectItem value="store_keeper">Store Keeper</SelectItem>
                        <SelectItem value="department_head">Dept. Head</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">N/A</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input id="password" type="password" placeholder="Set initial password" />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create User</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={cn('font-medium gap-1', roleConfig[user.role].className)}>
                      {user.role === 'admin' && <Shield className="h-3 w-3" />}
                      {roleConfig[user.role].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.department || '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="gap-1">
                      {user.status === 'active' && <UserCheck className="h-3 w-3" />}
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        disabled={user.role === 'admin'}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
