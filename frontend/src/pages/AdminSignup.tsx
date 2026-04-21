import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Key, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { AdminAPI } from '@/lib/api';
import logo from '../../public/schoollogo.png';

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
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a2618] via-[#1a5c38] to-[#0a2618] p-4">
      
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-yellow-700/20 flex flex-col md:flex-row">

        {/* ── LEFT PANEL — Logo + Info ── */}
        <div className="bg-gradient-to-b from-[#0d3320] to-[#1a5c38] flex flex-col items-center justify-center px-8 py-10 md:w-2/5 relative">
          
          {/* decorative pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          />

          {/* Gold top strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700" />

          {/* Logo */}
          <div className="w-36 h-36 rounded-full border-4 border-yellow-500/70 p-1 shadow-xl mb-5 relative z-10">
            <img
              src={logo}
              alt="School Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Org name */}
          <p className="text-yellow-300 font-bold text-base text-center leading-snug relative z-10">
            Darul Uloom Junaidia Ajmalia
          </p>
          <p className="text-white/50 text-xs text-center mt-1 relative z-10">
            Mahend, Dist–Ghazipur U.P.
          </p>

          {/* Decorative divider */}
          <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent relative z-10" />

          <p className="text-white/30 text-[10px] text-center mt-4 relative z-10 tracking-widest uppercase">
            Admin Portal
          </p>

          {/* Gold bottom strip */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700" />
        </div>

        {/* ── RIGHT PANEL — Form ── */}
        <div className="bg-[#fdf8f0] flex flex-col justify-center px-8 py-8 md:w-3/5">
          
          <h1 className="text-[#0d3320] text-2xl font-bold tracking-wide mb-1">
            Admin Signup
          </h1>
          <p className="text-gray-400 text-xs mb-6">
            Create a new administrator account
          </p>

          <form onSubmit={handleSignup} className="space-y-4">

            {/* Email */}
            <div className="space-y-1">
              <Label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-9 h-9 text-sm bg-white border-gray-200 focus-visible:ring-[#1a5c38]/30 focus-visible:border-[#1a5c38]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-9 pr-9 h-9 text-sm bg-white border-gray-200 focus-visible:ring-[#1a5c38]/30 focus-visible:border-[#1a5c38]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Admin Secret Key */}
            <div className="space-y-1">
              <Label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                Admin Secret Key
              </Label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type={showSecret ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-9 pr-9 h-9 text-sm bg-white border-gray-200 focus-visible:ring-[#1a5c38]/30 focus-visible:border-[#1a5c38]"
                  value={adminSecretKey}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 text-sm font-bold tracking-widest uppercase bg-[#0d3320] hover:bg-[#1a5c38] text-white transition-all duration-200 mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Creating...
                </span>
              ) : 'Sign Up'}
            </Button>

            <p className="text-center text-xs text-gray-400 pt-1">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/admin/login')}
                className="text-[#1a5c38] font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminSignup;