import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Search, Truck, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  totalOrders: number;
}

const mockVendors: Vendor[] = [
  { id: '1', name: 'Adama Lab Supplies Co.', contactPerson: 'Ato Tesfaye Bekele', phone: '+251-22-111-2233', email: 'sales@adamalab.com', address: 'Adama, Ethiopia', totalOrders: 45 },
  { id: '2', name: 'City Office Traders', contactPerson: 'W/ro Hiwot Alemu', phone: '+251-22-333-4455', email: 'info@cityoffice.et', address: 'Addis Ababa, Ethiopia', totalOrders: 32 },
  { id: '3', name: 'National Chemical Import', contactPerson: 'Ato Dawit Haile', phone: '+251-11-555-6677', email: 'orders@nci.com.et', address: 'Dire Dawa, Ethiopia', totalOrders: 28 },
  { id: '4', name: 'Tech Solutions Ethiopia', contactPerson: 'Ato Yonas Kebede', phone: '+251-11-888-9900', email: 'supply@techsol.et', address: 'Addis Ababa, Ethiopia', totalOrders: 15 },
  { id: '5', name: 'Safety First PLC', contactPerson: 'W/ro Marta Girma', phone: '+251-22-444-5566', email: 'contact@safetyfirst.et', address: 'Adama, Ethiopia', totalOrders: 22 },
];

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredVendors = mockVendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Vendors" subtitle="Manage supplier information">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>
                  Add a new supplier to the vendor directory.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input id="vendorName" placeholder="Company name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input id="contactPerson" placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+251-XX-XXX-XXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="email@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="City, Country" />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Vendor</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Vendors Table */}
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Vendor</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-center">Total Orders</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor, index) => (
                <TableRow 
                  key={vendor.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{vendor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.contactPerson}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{vendor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{vendor.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{vendor.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-muted px-2.5 py-0.5 text-sm font-medium">
                      {vendor.totalOrders}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
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
