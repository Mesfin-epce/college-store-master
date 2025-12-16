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
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Eye, Check, X, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { RequestStatus } from '@/types';

interface MaterialRequest {
  id: string;
  requesterName: string;
  department: string;
  itemsCount: number;
  purpose: string;
  dateNeeded: string;
  status: RequestStatus;
  createdAt: string;
}

const mockRequests: MaterialRequest[] = [
  { id: 'REQ-001', requesterName: 'Dr. Alemu Tadesse', department: 'Chemistry Department', itemsCount: 5, purpose: 'Lab practical session', dateNeeded: '2024-01-20', status: 'submitted', createdAt: '2024-01-15' },
  { id: 'REQ-002', requesterName: 'Meron Hailu', department: 'Physics Department', itemsCount: 3, purpose: 'Equipment maintenance', dateNeeded: '2024-01-22', status: 'approved', createdAt: '2024-01-14' },
  { id: 'REQ-003', requesterName: 'Prof. Bekele Girma', department: 'Biology Department', itemsCount: 8, purpose: 'Research project', dateNeeded: '2024-01-25', status: 'issued', createdAt: '2024-01-12' },
  { id: 'REQ-004', requesterName: 'Sara Teshome', department: 'Admin Office', itemsCount: 2, purpose: 'Office supplies replenishment', dateNeeded: '2024-01-18', status: 'rejected', createdAt: '2024-01-13' },
  { id: 'REQ-005', requesterName: 'Dr. Alemu Tadesse', department: 'Chemistry Department', itemsCount: 4, purpose: 'Student experiments', dateNeeded: '2024-01-28', status: 'draft', createdAt: '2024-01-16' },
];

const statusConfig: Record<RequestStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  submitted: { label: 'Submitted', className: 'bg-info/10 text-info' },
  approved: { label: 'Approved', className: 'bg-success/10 text-success' },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive' },
  issued: { label: 'Issued', className: 'bg-primary/10 text-primary' },
};

export default function RequestsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const canCreateRequest = user?.role === 'staff' || user?.role === 'department_head';
  const canApprove = user?.role === 'department_head' || user?.role === 'admin';
  const canIssue = user?.role === 'store_keeper' || user?.role === 'admin';

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch = 
      request.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout title="Material Requests" subtitle="Manage and track material requests">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by ID, requester, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {canCreateRequest && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create Material Request</DialogTitle>
                  <DialogDescription>
                    Submit a new request for materials from the store.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" value={user?.department || ''} readOnly className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateNeeded">Date Needed</Label>
                      <Input id="dateNeeded" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose / Justification</Label>
                    <Textarea id="purpose" placeholder="Describe why these materials are needed..." />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Requested Items</Label>
                      <Button type="button" variant="outline" size="sm">
                        <Plus className="mr-1 h-3 w-3" />
                        Add Item
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="grid gap-3 sm:grid-cols-[1fr,100px]">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select material" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="safety-goggles">Safety Goggles</SelectItem>
                            <SelectItem value="lab-coats">Lab Coats (Large)</SelectItem>
                            <SelectItem value="beakers">Beakers (500ml)</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="number" placeholder="Qty" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Save as Draft
                    </Button>
                    <Button type="submit">Submit Request</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Requests Table */}
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Request ID</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead>Date Needed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request, index) => (
                <TableRow 
                  key={request.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-mono font-medium">{request.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{request.requesterName}</TableCell>
                  <TableCell className="text-muted-foreground">{request.department}</TableCell>
                  <TableCell className="text-center">{request.itemsCount}</TableCell>
                  <TableCell>{new Date(request.dateNeeded).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={cn('font-medium', statusConfig[request.status].className)}>
                      {statusConfig[request.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {canApprove && request.status === 'submitted' && (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {canIssue && request.status === 'approved' && (
                        <Button size="sm" variant="outline" className="h-8">
                          Issue
                        </Button>
                      )}
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
