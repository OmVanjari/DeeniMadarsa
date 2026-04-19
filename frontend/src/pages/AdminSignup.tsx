import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Key, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { AdminAPI } from '@/lib/api';

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecretKey, setAdminSecret] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AdminAPI.signup({ email, password, adminSecretKey });
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.data.token);
        toast.success("Admin account created successfully");
        navigate('/admin');
      } else {
        toast.error(response.data.message || "Failed to create account");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">Admin Signup</CardTitle>
          <CardDescription className="text-gray-500">
            Create a new administrator account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminSecret">Admin Secret Key</Label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  id="adminSecret" 
                  type={showSecret ? "text" : "password"} 
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                  value={adminSecretKey}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-4">
            <Button type="submit" className="w-full text-base font-semibold py-6" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
            <div className="text-sm text-center text-gray-500">
              Already have an admin account?{' '}
              <button 
                type="button" 
                onClick={() => navigate('/admin/login')}
                className="text-primary font-medium hover:underline focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminSignup;
