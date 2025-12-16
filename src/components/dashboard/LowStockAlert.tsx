import { AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LowStockItem {
  id: string;
  name: string;
  currentStock: number;
  reorderLevel: number;
  unit: string;
}

const lowStockItems: LowStockItem[] = [
  { id: '1', name: 'Safety Goggles', currentStock: 15, reorderLevel: 50, unit: 'pieces' },
  { id: '2', name: 'Lab Coats (L)', currentStock: 8, reorderLevel: 30, unit: 'pieces' },
  { id: '3', name: 'Sulfuric Acid', currentStock: 2, reorderLevel: 10, unit: 'liters' },
  { id: '4', name: 'Printer Cartridges', currentStock: 5, reorderLevel: 20, unit: 'pieces' },
];

export function LowStockAlert() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h3 className="text-lg font-semibold text-card-foreground">Low Stock Alerts</h3>
      </div>
      <div className="space-y-4">
        {lowStockItems.map((item, index) => {
          const percentage = (item.currentStock / item.reorderLevel) * 100;
          return (
            <div 
              key={item.id} 
              className="space-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground">
                  {item.currentStock} / {item.reorderLevel} {item.unit}
                </span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
