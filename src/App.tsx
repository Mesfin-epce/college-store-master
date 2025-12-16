import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MaterialsPage from "./pages/MaterialsPage";
import RequestsPage from "./pages/RequestsPage";
import VendorsPage from "./pages/VendorsPage";
import ReceiptsPage from "./pages/ReceiptsPage";
import StocktakePage from "./pages/StocktakePage";
import ReportsPage from "./pages/ReportsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/materials" element={
              <ProtectedRoute allowedRoles={['admin', 'store_keeper', 'management']}>
                <MaterialsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/requests" element={
              <ProtectedRoute allowedRoles={['admin', 'store_keeper', 'department_head', 'staff']}>
                <RequestsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/vendors" element={
              <ProtectedRoute allowedRoles={['admin', 'store_keeper']}>
                <VendorsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/receipts" element={
              <ProtectedRoute allowedRoles={['admin', 'store_keeper']}>
                <ReceiptsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/stocktake" element={
              <ProtectedRoute allowedRoles={['admin', 'store_keeper']}>
                <StocktakePage />
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={['admin', 'store_keeper', 'management']}>
                <ReportsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UsersPage />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
