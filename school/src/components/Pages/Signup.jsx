import React from 'react';
import { Mail, Lock, Eye, EyeOff, User, BookOpen } from 'lucide-react';
import { useAuthStore } from '../../store';

const Signup = () => {
  const [form, setForm] = React.useState({ name: '', email: '', password: '', confirm: '', exam: 'JEE_MAIN' });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const { signup } = useAuthStore();

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email is invalid';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const result = await signup(form);
      if (result.success) window.location.href = '/dashboard';
      else setErrors({ submit: result.error });
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field) => ({
    borderColor: errors[field] ? '#fca5a5' : '#e2e8f0',
    background: errors[field] ? '#fff5f5' : '#f8fafc',
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-center px-16"
        style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #075985 100%)' }}>
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />

        <div className="relative z-10 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
              <span className="text-xl font-bold">AP</span>
            </div>
            <span className="text-2xl font-bold">ApexPrep</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Start Your<br />
            <span style={{ color: '#bae6fd' }}>Success</span><br />
            Journey
          </h1>
          <p className="text-white/80 text-lg mb-12 leading-relaxed">
            Create your free account and join thousands of students cracking JEE, NEET, and more.
          </p>

          <div className="space-y-4">
            {[
              'AI-powered doubt solving',
              'Personalized study plans',
              'Mock tests with analytics',
              'Real-time performance tracking',
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>✓</div>
                <span className="text-white/90 text-sm">{f}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12">
            {[{ value: '50K+', label: 'Students' }, { value: '95%', label: 'Success Rate' }, { value: '10K+', label: 'Questions' }].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-white/70 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 overflow-y-auto"
        style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)' }}>
        <div className="w-full max-w-md py-6">

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }}>
                <span className="text-white font-bold text-sm">AP</span>
              </div>
              <span className="text-lg font-bold text-slate-900">ApexPrep</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100"
            style={{ boxShadow: '0 25px 50px rgba(14, 165, 233, 0.15), 0 10px 20px rgba(0,0,0,0.08)' }}>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Create Account 🚀</h2>
              <p className="text-slate-500 text-sm">Join ApexPrep and start your exam preparation</p>
            </div>

            {errors.submit && (
              <div className="mb-4 p-3 rounded-xl border-2 border-red-200 bg-red-50 text-red-700 text-sm">{errors.submit}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 text-slate-900 placeholder-slate-400 outline-none text-sm"
                    style={inputClass('name')}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = errors.name ? '#fca5a5' : '#e2e8f0'}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 text-slate-900 placeholder-slate-400 outline-none text-sm"
                    style={inputClass('email')}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = errors.email ? '#fca5a5' : '#e2e8f0'}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Target Exam */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Target Exam</label>
                <div className="relative">
                  <BookOpen size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={form.exam}
                    onChange={e => update('exam', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 text-slate-900 outline-none text-sm appearance-none cursor-pointer"
                    style={{ background: '#f8fafc' }}
                  >
                    <option value="JEE_MAIN">JEE Main</option>
                    <option value="JEE_ADVANCED">JEE Advanced</option>
                    <option value="NEET">NEET</option>
                    <option value="BITSAT">BITSAT</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => update('password', e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border-2 text-slate-900 placeholder-slate-400 outline-none text-sm"
                    style={inputClass('password')}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = errors.password ? '#fca5a5' : '#e2e8f0'}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={e => update('confirm', e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border-2 text-slate-900 placeholder-slate-400 outline-none text-sm"
                    style={inputClass('confirm')}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = errors.confirm ? '#fca5a5' : '#e2e8f0'}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input type="checkbox" required className="w-4 h-4 mt-0.5 accent-sky-500 cursor-pointer" />
                <span className="text-xs text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="text-sky-600 font-semibold hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-sky-600 font-semibold hover:underline">Privacy Policy</a>
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-200 disabled:opacity-60 mt-1"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  boxShadow: '0 8px 25px rgba(14, 165, 233, 0.35)',
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : 'Create Account →'}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-slate-400 text-xs">already have an account?</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <a href="/login"
              className="block w-full py-3 rounded-xl text-center font-bold text-sm border-2 border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-600 transition-all">
              Sign In Instead
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;