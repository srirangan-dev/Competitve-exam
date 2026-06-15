import React, { useState } from 'react';
import { Camera, Save, Mail, Phone, MapPin, BookOpen } from 'lucide-react';
import { useAuthStore, useThemeStore } from '../../store';

const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  const { darkMode }            = useThemeStore();

  const [form, setForm] = useState({
    name:   user?.name   ?? '',
    email:  user?.email  ?? '',
    phone:  user?.phone  ?? '',
    city:   user?.city   ?? '',
    exam:   user?.exam   ?? 'JEE Advanced 2025',
    bio:    user?.bio    ?? '',
  });
  const [saved, setSaved] = useState(false);

  const bg  = darkMode ? '#1e293b' : '#fff';
  const bdr = darkMode ? '#334155' : '#e2e8f0';
  const txt = darkMode ? '#f1f5f9' : '#0f172a';
  const sub = darkMode ? '#94a3b8' : '#64748b';

  const initials = form.name
    ? form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    updateProfile({ ...user, ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: `0.5px solid ${bdr}`, background: bg,
    fontSize: 14, color: txt, outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', fontSize: 12, fontWeight: 600,
    color: sub, marginBottom: 6, letterSpacing: 0.4,
  };

  const chips = [
    { Icon: Mail,     val: form.email || 'Add email'  },
    { Icon: Phone,    val: form.phone || 'Add phone'  },
    { Icon: MapPin,   val: form.city  || 'Add city'   },
    { Icon: BookOpen, val: form.exam  || 'Add target' },
  ];

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>

      {/* Avatar card */}
      <div style={{
        background: bg, border: `0.5px solid ${bdr}`, borderRadius: 16,
        padding: '2rem', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
      }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #185FA5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, color: '#fff',
          }}>
            {initials}
          </div>
          <button style={{
            position: 'absolute', bottom: 2, right: 2,
            width: 26, height: 26, borderRadius: '50%',
            background: '#185FA5', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Camera size={12} color="#fff" />
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: txt, margin: '0 0 4px' }}>
            {form.name || 'Your Name'}
          </h1>
          <p style={{ fontSize: 13, color: '#185FA5', fontWeight: 500, margin: '0 0 12px' }}>
            {form.exam || 'JEE Aspirant'}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {chips.map(({ Icon, val }, i) => (
              <span key={i} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 12, color: sub,
                background: darkMode ? '#0f172a' : '#f8fafc',
                borderRadius: 99, padding: '3px 10px',
                border: `0.5px solid ${bdr}`,
              }}>
                <Icon size={11} /> {val}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div style={{
        background: bg, border: `0.5px solid ${bdr}`,
        borderRadius: 16, padding: '1.75rem',
      }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: txt, margin: '0 0 20px' }}>
          Edit profile
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {[
            { key: 'name',  label: 'FULL NAME', placeholder: 'Enter your full name'  },
            { key: 'email', label: 'EMAIL',      placeholder: 'your@email.com'        },
            { key: 'phone', label: 'PHONE',      placeholder: '+91 XXXXX XXXXX'       },
            { key: 'city',  label: 'CITY',       placeholder: 'Your city'             },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input
                style={inputStyle}
                value={form[key]}
                placeholder={placeholder}
                onChange={e => handleChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>TARGET EXAM</label>
          <select
            style={inputStyle}
            value={form.exam}
            onChange={e => handleChange('exam', e.target.value)}
          >
            {[
              'JEE Advanced 2026',
              'NEET 2026',
              'UPSC CSE 2026',
              'SSC CGL 2026',
              'CAT 2026',
              'GATE CS 2026',
            ].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>BIO</label>
          <textarea
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
            value={form.bio}
            placeholder="A short line about yourself..."
            onChange={e => handleChange('bio', e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={handleSave}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', borderRadius: 10, border: 'none',
              background: '#185FA5', color: '#fff',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          >
            <Save size={15} /> Save changes
          </button>
          {saved && (
            <span style={{ fontSize: 13, color: '#0F6E56', fontWeight: 500 }}>
              ✓ Profile saved!
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

export default Profile;