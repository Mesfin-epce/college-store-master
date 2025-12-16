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
import { Plus, Search, Filter, Package, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Material {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  unit: string;
  location: string;
  unitPrice: number;
}

const mockMaterials: Material[] = [
  { id: '1', name: 'Safety Goggles', sku: 'SAF-001', category: 'Safety Gear', quantity: 15, reorderLevel: 50, unit: 'pieces', location: 'Main Store', unitPrice: 150 },
  { id: '2', name: 'Lab Coats (Large)', sku: 'SAF-002', category: 'Safety Gear', quantity: 8, reorderLevel: 30, unit: 'pieces', location: 'Main Store', unitPrice: 450 },
  { id: '3', name: 'Sulfuric Acid (1L)', sku: 'CHM-001', category: 'Chemicals', quantity: 45, reorderLevel: 20, unit: 'liters', location: 'Chemistry Lab', unitPrice: 280 },
  { id: '4', name: 'Beakers (500ml)', sku: 'LAB-001', category: 'Lab Equipment', quantity: 120, reorderLevel: 50, unit: 'pieces', location: 'Main Store', unitPrice: 85 },
  { id: '5', name: 'Printer Paper A4', sku: 'OFF-001', category: 'Office Supplies', quantity: 200, reorderLevel: 100, unit: 'reams', location: 'Admin Store', unitPrice: 180 },
  { id: '6', name: 'Microscope Slides', sku: 'LAB-002', category: 'Lab Equipment', quantity: 500, reorderLevel: 200, unit: 'pieces', location: 'Biology Lab', unitPrice: 12 },
  { id: '7', name: 'Ethanol (1L)', sku: 'CHM-002', category: 'Chemicals', quantity: 30, reorderLevel: 15, unit: 'liters', location: 'Chemistry Lab', unitPrice: 350 },
  { id: '8', name: 'Whiteboard Markers', sku: 'OFF-002', category: 'Office Supplies', quantity: 150, reorderLevel: 50, unit: 'pieces', location: 'Admin Store', unitPrice: 25 },
];

const categories = ['All Categories', 'Safety Gear', 'Chemicals', 'Lab Equipment', 'Office Supplies', 'Electronics'];
const locations = ['All Locations', 'Main Store', 'Chemistry Lab', 'Biology Lab', 'Admin Store'];

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || material.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || material.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getStockStatus = (quantity: number, reorderLevel: number) => {
    const ratio = quantity / reorderLevel;
    if (ratio <= 0.3) return { label: 'Critical', variant: 'destructive' as const };
    if (ratio <= 0.6) return { label: 'Low', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  return (
    <DashboardLayout title="Materials" subtitle="Manage your inventory catalog">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Material</DialogTitle>
                <DialogDescription>
                  Add a new material item to the inventory catalog.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Material Name</Label>
                    <Input id="name" placeholder="Enter name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU / Part Number</Label>
                    <Input id="sku" placeholder="e.g., SAF-001" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter description" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.slice(1).map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit of Measure</Label>
                    <Input id="unit" placeholder="e.g., pieces" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reorder">Reorder Level</Label>
                    <Input id="reorder" type="number" placeholder="50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Unit Price (ETB)</Label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Material</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Materials Table */}
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Material</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material, index) => {
                const status = getStockStatus(material.quantity, material.reorderLevel);
                return (
                  <TableRow 
                    key={material.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{material.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {material.sku}
                    </TableCell>
                    <TableCell>{material.category}</TableCell>
                    <TableCell className="text-right">
                      {material.quantity} {material.unit}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={status.variant}
                        className={cn(
                          status.variant === 'destructive' && 'bg-destructive/10 text-destructive hover:bg-destructive/20',
                          status.variant === 'secondary' && 'bg-warning/10 text-warning hover:bg-warning/20'
                        )}
                      >
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{material.location}</TableCell>
                    <TableCell className="text-right">
                      ETB {material.unitPrice.toLocaleString()}
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
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
