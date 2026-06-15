import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

// Step 1 — enter email → request OTP
// Step 2 — enter 6-digit OTP + new password → reset
// Step 3 — success screen

const ForgotPassword = () => {
  const [step, setStep]           = useState(1);
  const [email, setEmail]         = useState('');
  const [otp, setOtp]             = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  const otpRefs = Array.from({ length: 6 }, () => React.useRef(null));

  // ── Step 1: request OTP ──────────────────────────────────────────────────
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.message || 'Something went wrong.'); return; }
      setStep(2);
    } catch {
      setError('Cannot reach server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // ── OTP input handling ───────────────────────────────────────────────────
  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) otpRefs[idx + 1].current?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next   = [...otp];
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    otpRefs[Math.min(pasted.length, 5)].current?.focus();
  };

  // ── Step 2: reset password ───────────────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    const otpStr = otp.join('');
    if (otpStr.length < 6)       { setError('Please enter the full 6-digit OTP.'); return; }
    if (newPassword.length < 6)  { setError('Password must be at least 6 characters.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpStr, newPassword }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.message || 'Invalid or expired OTP.'); return; }
      setStep(3);
    } catch {
      setError('Cannot reach server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // ── Shared styles ────────────────────────────────────────────────────────
  const inputBase = {
    width: '100%', padding: '12px 14px 12px 44px',
    borderRadius: 12, border: '2px solid #e2e8f0',
    background: '#f8fafc', fontSize: 14, color: '#0f172a',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
  };

  const btnPrimary = {
    width: '100%', padding: '14px', borderRadius: 12, border: 'none',
    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(14,165,233,0.35)',
    opacity: loading ? 0.65 : 1,
  };

  const iconWrap = {
    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
    display: 'flex', alignItems: 'center', pointerEvents: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>

      {/* Left panel */}
      <div style={{
        display: 'none',
        width: '50%',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #075985 100%)',
        position: 'relative', overflow: 'hidden',
      }}
        className="lg-panel"
      >
        {/* decorative circles */}
        {[
          { top: '-100px', left: '-100px', size: 380 },
          { bottom: '-80px', right: '-80px', size: 320 },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', borderRadius: '50%',
            width: s.size, height: s.size,
            background: 'rgba(255,255,255,0.15)',
            top: s.top, left: s.left, bottom: s.bottom, right: s.right,
          }} />
        ))}
        <div style={{
          position: 'relative', zIndex: 10, display: 'flex',
          flexDirection: 'column', justifyContent: 'center', padding: '0 4rem', color: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 16, background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              <span style={{ fontWeight: 800, fontSize: 16 }}>AP</span>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800 }}>ApexPrep</span>
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px' }}>
            Secure account<br />
            <span style={{ color: '#bae6fd' }}>recovery</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0 }}>
            We'll send a one-time password to your registered email so you can securely reset your credentials.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Card */}
          <div style={{
            background: '#fff', borderRadius: 24, padding: '2.5rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9',
          }}>

            {/* ── Step 1: Email ─────────────────────────────────────────── */}
            {step === 1 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 16,
                    background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>
                    <Mail size={26} color="#0284c7" />
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                    Forgot password?
                  </h2>
                  <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                    Enter your email and we'll send you an OTP
                  </p>
                </div>

                {error && (
                  <div style={{
                    marginBottom: 20, padding: '12px 14px', borderRadius: 10,
                    background: '#fff5f5', border: '1.5px solid #fca5a5',
                    fontSize: 13, color: '#dc2626',
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleRequestOTP}>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                      Email address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}><Mail size={17} color="#94a3b8" /></span>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        style={inputBase}
                        onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                        onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={loading} style={btnPrimary}>
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <span style={{
                          width: 18, height: 18, border: '2px solid #fff',
                          borderTopColor: 'transparent', borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite', display: 'inline-block',
                        }} />
                        Sending OTP...
                      </span>
                    ) : 'Send OTP →'}
                  </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#64748b' }}>
                  Remember your password?{' '}
                  <a href="/login" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none' }}>
                    Sign in
                  </a>
                </p>
              </>
            )}

            {/* ── Step 2: OTP + new password ────────────────────────────── */}
            {step === 2 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 16,
                    background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>
                    <KeyRound size={26} color="#0284c7" />
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                    Check your email
                  </h2>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                    We sent a 6-digit OTP to <strong style={{ color: '#0f172a' }}>{email}</strong>
                  </p>
                </div>

                {error && (
                  <div style={{
                    marginBottom: 20, padding: '12px 14px', borderRadius: 10,
                    background: '#fff5f5', border: '1.5px solid #fca5a5',
                    fontSize: 13, color: '#dc2626',
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleResetPassword}>
                  {/* OTP boxes */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 10 }}>
                      Enter OTP
                    </label>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={otpRefs[idx]}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleOtpChange(e.target.value, idx)}
                          onKeyDown={e => handleOtpKeyDown(e, idx)}
                          onPaste={idx === 0 ? handleOtpPaste : undefined}
                          style={{
                            width: 48, height: 54, textAlign: 'center',
                            fontSize: 20, fontWeight: 700, color: '#0f172a',
                            border: `2px solid ${digit ? '#0ea5e9' : '#e2e8f0'}`,
                            borderRadius: 12, background: digit ? '#f0f9ff' : '#f8fafc',
                            outline: 'none', transition: 'all 0.15s',
                          }}
                          onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                          onBlur={e  => e.target.style.borderColor = otp[idx] ? '#0ea5e9' : '#e2e8f0'}
                        />
                      ))}
                    </div>
                  </div>

                  {/* New password */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                      New password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}><Lock size={17} color="#94a3b8" /></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        style={{ ...inputBase, paddingRight: 44 }}
                        onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                        onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        style={{
                          position: 'absolute', right: 14, top: '50%',
                          transform: 'translateY(-50%)', background: 'none',
                          border: 'none', cursor: 'pointer', color: '#94a3b8',
                        }}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div style={{ marginBottom: 22 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                      Confirm password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}><Lock size={17} color="#94a3b8" /></span>
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        style={{ ...inputBase, paddingRight: 44 }}
                        onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                        onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(v => !v)}
                        style={{
                          position: 'absolute', right: 14, top: '50%',
                          transform: 'translateY(-50%)', background: 'none',
                          border: 'none', cursor: 'pointer', color: '#94a3b8',
                        }}
                      >
                        {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} style={btnPrimary}>
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <span style={{
                          width: 18, height: 18, border: '2px solid #fff',
                          borderTopColor: 'transparent', borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite', display: 'inline-block',
                        }} />
                        Resetting...
                      </span>
                    ) : 'Reset password →'}
                  </button>
                </form>

                <button
                  onClick={() => { setStep(1); setError(''); setOtp(['','','','','','']); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 6, width: '100%', marginTop: 14, padding: '10px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 13, color: '#64748b',
                  }}
                >
                  <ArrowLeft size={14} /> Wrong email? Go back
                </button>

                {/* Resend OTP */}
                <p style={{ textAlign: 'center', marginTop: 4, fontSize: 13, color: '#94a3b8' }}>
                  Didn't receive it?{' '}
                  <button
                    type="button"
                    onClick={handleRequestOTP}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7', fontWeight: 700, fontSize: 13 }}
                  >
                    Resend OTP
                  </button>
                </p>
              </>
            )}

            {/* ── Step 3: Success ───────────────────────────────────────── */}
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <ShieldCheck size={34} color="#059669" />
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>
                  Password reset!
                </h2>
                <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>
                  Your password has been updated successfully.<br />
                  You can now sign in with your new password.
                </p>
                <a
                  href="/login"
                  style={{
                    display: 'block', padding: '13px', borderRadius: 12,
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                    color: '#fff', fontWeight: 700, fontSize: 15,
                    textDecoration: 'none',
                    boxShadow: '0 8px 25px rgba(14,165,233,0.35)',
                  }}
                >
                  Go to login →
                </a>
              </div>
            )}
          </div>

          {/* Step indicator */}
          {step < 3 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
              {[1, 2].map(s => (
                <div key={s} style={{
                  height: 4, width: step === s ? 28 : 14, borderRadius: 99,
                  background: step === s ? '#0284c7' : '#cbd5e1',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @media(min-width:1024px){.lg-panel{display:flex;}}`}</style>
    </div>
  );
};

export default ForgotPassword;