import React from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useAuthStore();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        window.location.href = '/dashboard';
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #075985 100%)' }}>
        
        {/* Decorative circles */}
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full opacity-20"
          style={{ background: 'rgba(255,255,255,0.3)' }} />
        <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20"
          style={{ background: 'rgba(255,255,255,0.2)' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'rgba(255,255,255,0.4)' }} />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <span className="text-xl font-bold">AP</span>
            </div>
            <span className="text-2xl font-bold">ApexPrep</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Master Your<br />
            <span style={{ color: '#bae6fd' }}>Competitive</span><br />
            Exams
          </h1>
          <p className="text-white/80 text-lg mb-12 leading-relaxed">
            Join thousands of students achieving their dream ranks with AI-powered preparation.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '50K+', label: 'Students' },
              { value: '95%', label: 'Success Rate' },
              { value: '10K+', label: 'Questions' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }}>
                <span className="text-white font-bold">AP</span>
              </div>
              <span className="text-xl font-bold text-slate-900">ApexPrep</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back 👋</h2>
              <p className="text-slate-500">Sign in to continue your learning journey</p>
            </div>

            {/* Error */}
            {errors.submit && (
              <div className="mb-6 p-4 rounded-xl border-2 border-red-200 bg-red-50 text-red-700 text-sm">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 text-slate-900 placeholder-slate-400 outline-none transition-all"
                    style={{
                      borderColor: errors.email ? '#fca5a5' : '#e2e8f0',
                      background: errors.email ? '#fff5f5' : '#f8fafc',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = errors.email ? '#fca5a5' : '#e2e8f0'}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: '' }); }}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 text-slate-900 placeholder-slate-400 outline-none transition-all"
                    style={{
                      borderColor: errors.password ? '#fca5a5' : '#e2e8f0',
                      background: errors.password ? '#fff5f5' : '#f8fafc',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = errors.password ? '#fca5a5' : '#e2e8f0'}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-sky-500" />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm font-semibold text-sky-600 hover:text-sky-700">Forgot password?</a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-white font-bold text-base transition-all duration-200 disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  boxShadow: '0 8px 25px rgba(14, 165, 233, 0.4)',
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : 'Sign In →'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-slate-400 text-sm">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Sign up */}
            <p className="text-center text-slate-500 text-sm">
              Don't have an account?{' '}
              <a href="/signup" className="font-bold text-sky-600 hover:text-sky-700">Sign up free</a>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 p-4 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur text-center">
            <p className="text-xs font-semibold text-slate-500 mb-1">Demo Credentials</p>
            <p className="text-xs text-slate-600 font-mono">demo@apexprep.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;