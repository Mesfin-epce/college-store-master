import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="animate-pulse text-center">
        <div className="h-12 w-12 rounded-xl bg-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading MSMS...</p>
      </div>
    </div>
  );
};

export default Index;
