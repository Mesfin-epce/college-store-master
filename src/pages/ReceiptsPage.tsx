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
import { Plus, Search, PackageCheck, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoodsReceipt {
  id: string;
  vendorName: string;
  receiptDate: string;
  itemsCount: number;
  totalValue: number;
  qualityStatus: 'accepted' | 'damaged' | 'on_hold';
  receivedBy: string;
}

const mockReceipts: GoodsReceipt[] = [
  { id: 'GRN-001', vendorName: 'Adama Lab Supplies Co.', receiptDate: '2024-01-15', itemsCount: 8, totalValue: 45000, qualityStatus: 'accepted', receivedBy: 'John Bekele' },
  { id: 'GRN-002', vendorName: 'City Office Traders', receiptDate: '2024-01-14', itemsCount: 5, totalValue: 12500, qualityStatus: 'accepted', receivedBy: 'John Bekele' },
  { id: 'GRN-003', vendorName: 'National Chemical Import', receiptDate: '2024-01-12', itemsCount: 3, totalValue: 28000, qualityStatus: 'on_hold', receivedBy: 'John Bekele' },
  { id: 'GRN-004', vendorName: 'Tech Solutions Ethiopia', receiptDate: '2024-01-10', itemsCount: 2, totalValue: 85000, qualityStatus: 'accepted', receivedBy: 'John Bekele' },
  { id: 'GRN-005', vendorName: 'Safety First PLC', receiptDate: '2024-01-08', itemsCount: 10, totalValue: 35000, qualityStatus: 'damaged', receivedBy: 'John Bekele' },
];

const qualityStatusConfig = {
  accepted: { label: 'Accepted', className: 'bg-success/10 text-success' },
  damaged: { label: 'Damaged', className: 'bg-destructive/10 text-destructive' },
  on_hold: { label: 'On Hold', className: 'bg-warning/10 text-warning' },
};

export default function ReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredReceipts = mockReceipts.filter((receipt) => {
    const matchesSearch =
      receipt.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || receipt.qualityStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout title="Goods Receipt" subtitle="Record incoming materials">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by GRN or vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Quality Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Record Receipt
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Record Goods Receipt</DialogTitle>
                <DialogDescription>
                  Record incoming materials from a vendor.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Adama Lab Supplies Co.</SelectItem>
                        <SelectItem value="2">City Office Traders</SelectItem>
                        <SelectItem value="3">National Chemical Import</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiptDate">Receipt Date</Label>
                    <Input id="receiptDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualityStatus">Quality Check Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                      <SelectItem value="on_hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Received Items</Label>
                    <Button type="button" variant="outline" size="sm">
                      <Plus className="mr-1 h-3 w-3" />
                      Add Item
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="grid gap-3 sm:grid-cols-[1fr,80px,100px]">
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
                      <Input type="number" placeholder="Price" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Any additional notes about this receipt..." />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Receipt</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Receipts Table */}
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>GRN Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Receipt Date</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead>Quality Status</TableHead>
                <TableHead>Received By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.map((receipt, index) => (
                <TableRow
                  key={receipt.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                        <PackageCheck className="h-5 w-5 text-success" />
                      </div>
                      <span className="font-mono font-medium">{receipt.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{receipt.vendorName}</TableCell>
                  <TableCell>{new Date(receipt.receiptDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center">{receipt.itemsCount}</TableCell>
                  <TableCell className="text-right font-medium">
                    ETB {receipt.totalValue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('font-medium', qualityStatusConfig[receipt.qualityStatus].className)}>
                      {qualityStatusConfig[receipt.qualityStatus].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{receipt.receivedBy}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
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
