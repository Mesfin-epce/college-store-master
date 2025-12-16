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
import { ClipboardList, Search, Play, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StocktakeSession {
  id: string;
  location: string;
  startDate: string;
  endDate?: string;
  itemsCounted: number;
  totalItems: number;
  adjustments: number;
  status: 'in_progress' | 'completed' | 'pending';
  conductedBy: string;
}

const mockStocktakes: StocktakeSession[] = [
  { id: 'ST-001', location: 'Main Store', startDate: '2024-01-15', itemsCounted: 45, totalItems: 45, adjustments: 3, status: 'completed', conductedBy: 'John Bekele' },
  { id: 'ST-002', location: 'Chemistry Lab', startDate: '2024-01-14', itemsCounted: 28, totalItems: 32, adjustments: 0, status: 'in_progress', conductedBy: 'John Bekele' },
  { id: 'ST-003', location: 'Biology Lab', startDate: '2024-01-10', endDate: '2024-01-10', itemsCounted: 25, totalItems: 25, adjustments: 1, status: 'completed', conductedBy: 'John Bekele' },
  { id: 'ST-004', location: 'Admin Store', startDate: '2024-01-08', endDate: '2024-01-08', itemsCounted: 18, totalItems: 18, adjustments: 2, status: 'completed', conductedBy: 'John Bekele' },
];

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, className: 'bg-muted text-muted-foreground' },
  in_progress: { label: 'In Progress', icon: Play, className: 'bg-info/10 text-info' },
  completed: { label: 'Completed', icon: CheckCircle, className: 'bg-success/10 text-success' },
};

const locations = ['Main Store', 'Chemistry Lab', 'Biology Lab', 'Admin Store', 'Physics Lab'];

export default function StocktakePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);

  const filteredStocktakes = mockStocktakes.filter((st) => {
    const matchesSearch =
      st.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || st.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  return (
    <DashboardLayout title="Stocktake" subtitle="Physical inventory count and reconciliation">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stocktakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isStartDialogOpen} onOpenChange={setIsStartDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Start Stocktake
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Start New Stocktake</DialogTitle>
                <DialogDescription>
                  Begin a physical inventory count for a specific location.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="chemicals">Chemicals</SelectItem>
                      <SelectItem value="lab-equipment">Lab Equipment</SelectItem>
                      <SelectItem value="safety-gear">Safety Gear</SelectItem>
                      <SelectItem value="office-supplies">Office Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Any notes about this stocktake..." />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsStartDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Start Counting</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stocktake Sessions Table */}
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Session ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-center">Adjustments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Conducted By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocktakes.map((stocktake, index) => {
                const StatusIcon = statusConfig[stocktake.status].icon;
                const progress = Math.round((stocktake.itemsCounted / stocktake.totalItems) * 100);
                return (
                  <TableRow
                    key={stocktake.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <ClipboardList className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-mono font-medium">{stocktake.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{stocktake.location}</TableCell>
                    <TableCell>{new Date(stocktake.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {stocktake.itemsCounted}/{stocktake.totalItems}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {stocktake.adjustments > 0 ? (
                        <span className="inline-flex items-center justify-center rounded-full bg-warning/10 text-warning px-2 py-0.5 text-sm font-medium">
                          {stocktake.adjustments}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('font-medium gap-1', statusConfig[stocktake.status].className)}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[stocktake.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{stocktake.conductedBy}</TableCell>
                    <TableCell className="text-right">
                      {stocktake.status === 'in_progress' ? (
                        <Button size="sm" variant="outline">
                          Continue
                        </Button>
                      ) : stocktake.status === 'completed' ? (
                        <Button size="sm" variant="ghost">
                          View Report
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
