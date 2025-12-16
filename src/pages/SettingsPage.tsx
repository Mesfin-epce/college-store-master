import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, Bell, Shield, Database, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings" subtitle="Configure system preferences">
      <div className="space-y-6 max-w-4xl">
        {/* Organization Settings */}
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Organization</CardTitle>
                <CardDescription>Basic information about your institution</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue="Adama Science and Technology University" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgCode">Organization Code</Label>
                <Input id="orgCode" defaultValue="ASTU" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="ETB">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fiscalYear">Fiscal Year Start</Label>
                <Select defaultValue="july">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Settings */}
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '50ms' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                <Database className="h-5 w-5 text-info" />
              </div>
              <div>
                <CardTitle>Inventory Settings</CardTitle>
                <CardDescription>Configure inventory management preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="valuation">Stock Valuation Method</Label>
                <Select defaultValue="average">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fifo">FIFO (First In, First Out)</SelectItem>
                    <SelectItem value="lifo">LIFO (Last In, First Out)</SelectItem>
                    <SelectItem value="average">Weighted Average Cost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultReorder">Default Reorder Level</Label>
                <Input id="defaultReorder" type="number" defaultValue="20" />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Batch Tracking</Label>
                  <p className="text-sm text-muted-foreground">Track batch numbers for materials</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Expiration Tracking</Label>
                  <p className="text-sm text-muted-foreground">Track expiration dates for perishables</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-generate SKU</Label>
                  <p className="text-sm text-muted-foreground">Automatically generate SKU for new items</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Bell className="h-5 w-5 text-warning" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure alert and notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">Notify when items fall below reorder level</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Request Approval Notifications</Label>
                <p className="text-sm text-muted-foreground">Notify approvers of pending requests</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Expiration Warnings</Label>
                <p className="text-sm text-muted-foreground">Alert before materials expire</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDays">Expiration Warning Days</Label>
              <Input id="expirationDays" type="number" defaultValue="30" className="max-w-[200px]" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '150ms' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Shield className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Security and access control settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Approval for All Requests</Label>
                <p className="text-sm text-muted-foreground">All material requests need approval</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Require 2FA for admin users</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="30" className="max-w-[200px]" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
