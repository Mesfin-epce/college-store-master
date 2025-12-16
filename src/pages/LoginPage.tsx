import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Loader2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await login(email, password);

    if (success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  const demoAccounts = [
    { email: 'admin@college.edu', role: 'System Administrator' },
    { email: 'storekeeper@college.edu', role: 'Store Keeper' },
    { email: 'head@college.edu', role: 'Department Head' },
    { email: 'staff@college.edu', role: 'Staff' },
    { email: 'management@college.edu', role: 'Management' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-center animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent">
              <Building2 className="h-10 w-10 text-accent-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            Material Store Management System
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Streamline inventory operations, manage material requests, and track stock levels for Adama Science and Technology College.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Inventory Tracking', 'Request Management', 'Real-time Reports'].map((feature) => (
              <span 
                key={feature}
                className="px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary mb-4">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">MSMS</h1>
          </div>

          <Card className="border-0 shadow-card-hover">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>

              {/* Demo Accounts */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-3 text-center">
                  Demo accounts (password: <code className="bg-muted px-1 py-0.5 rounded text-xs">demo123</code>)
                </p>
                <div className="space-y-2">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.email}
                      type="button"
                      onClick={() => {
                        setEmail(account.email);
                        setPassword('demo123');
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      <span className="text-foreground">{account.email}</span>
                      <span className="text-xs text-muted-foreground">{account.role}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
