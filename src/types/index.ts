export type UserRole = 'admin' | 'store_keeper' | 'department_head' | 'staff' | 'management';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  sku: string;
  unit: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  location: string;
  unitPrice: number;
  batchNumber?: string;
  expirationDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
}

export type RequestStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'issued';

export interface MaterialRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  department: string;
  items: MaterialRequestItem[];
  purpose: string;
  dateNeeded: string;
  status: RequestStatus;
  approvedBy?: string;
  approvedAt?: string;
  issuedBy?: string;
  issuedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialRequestItem {
  materialId: string;
  materialName: string;
  requestedQuantity: number;
  issuedQuantity?: number;
}

export interface GoodsReceipt {
  id: string;
  vendorId: string;
  vendorName: string;
  receiptDate: string;
  items: GoodsReceiptItem[];
  qualityStatus: 'accepted' | 'damaged' | 'on_hold';
  receivedBy: string;
  notes?: string;
  createdAt: string;
}

export interface GoodsReceiptItem {
  materialId: string;
  materialName: string;
  quantity: number;
  unitPrice: number;
  batchNumber?: string;
  expirationDate?: string;
}

export interface StockAdjustment {
  id: string;
  materialId: string;
  materialName: string;
  previousQuantity: number;
  newQuantity: number;
  reason: string;
  adjustedBy: string;
  createdAt: string;
}

export interface DashboardStats {
  totalMaterials: number;
  lowStockItems: number;
  pendingRequests: number;
  totalValue: number;
  recentTransactions: number;
}
