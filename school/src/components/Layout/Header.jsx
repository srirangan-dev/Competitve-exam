import React from 'react';
import { LogOut, Settings, User, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useThemeStore } from '../../store';

const Header = () => {
  const { user, logout }           = useAuthStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  const navigate                   = useNavigate();

  const [profileOpen, setProfileOpen] = React.useState(false);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  React.useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('#profile-root')) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.style.background = darkMode ? '#0f172a' : '';
    document.body.style.color      = darkMode ? '#f1f5f9' : '';
  }, [darkMode]);

  const hdr = darkMode
    ? { bg: '#1e293b', border: '#334155', text: '#f1f5f9', sub: '#94a3b8', hover: '#334155', card: '#1e293b', cardBorder: '#334155' }
    : { bg: '#fff',    border: '#e2e8f0', text: '#0f172a', sub: '#94a3b8', hover: '#f8fafc', card: '#fff',    cardBorder: '#e2e8f0' };

  const iconBtn = {
    position: 'relative', padding: 8, borderRadius: 10, border: 'none',
    background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
  };

  const dropdown = {
    position: 'absolute', right: 0, top: 'calc(100% + 10px)', zIndex: 50,
    background: hdr.card, border: `0.5px solid ${hdr.cardBorder}`,
    borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  };

  const goto = (path) => { navigate(path); setProfileOpen(false); };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40, width: '100%',
      background: hdr.bg, borderBottom: `0.5px solid ${hdr.border}`,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'background 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: 60 }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, background: '#185FA5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '-0.5px' }}>AP</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.4px', color: '#185FA5' }}>
            ApexPrep
          </span>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              ...iconBtn,
              background: darkMode ? '#334155' : '#f1f5f9',
              borderRadius: 99, padding: '6px 12px', gap: 6,
              border: `0.5px solid ${hdr.border}`,
              fontSize: 12, color: hdr.text, fontWeight: 500,
            }}
          >
            {darkMode
              ? <><Sun size={15} color="#FAC775" /><span>Light</span></>
              : <><Moon size={15} color="#534AB7" /><span>Dark</span></>
            }
          </button>

          {/* Profile dropdown */}
          <div id="profile-root" style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px',
                borderRadius: 12, border: `0.5px solid ${hdr.border}`,
                background: hdr.hover, cursor: 'pointer',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7C3AED, #185FA5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>{initials}</span>
              </div>
              <div style={{ textAlign: 'left', lineHeight: 1.3 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: hdr.text, margin: 0 }}>
                  {user?.name?.split(' ')[0] ?? 'Student'}
                </p>
                <p style={{ fontSize: 11, color: hdr.sub, margin: 0 }}>JEE Aspirant</p>
              </div>
            </button>

            {profileOpen && (
              <div style={{ ...dropdown, width: 192, padding: '6px 0' }}>
                {[
                  { icon: <User size={15} />,     label: 'Profile',  path: '/profile' },
                  { icon: <Settings size={15} />, label: 'Settings', path: '/settings' },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => goto(item.path)}
                    style={{
                      width: '100%', padding: '9px 16px', border: 'none', background: 'transparent',
                      display: 'flex', alignItems: 'center', gap: 10, fontSize: 13,
                      color: hdr.text, cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{ color: hdr.sub }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <div style={{ height: 1, background: hdr.border, margin: '4px 0' }} />
                <button
                  onClick={() => { logout(); setProfileOpen(false); }}
                  style={{
                    width: '100%', padding: '9px 16px', border: 'none', background: 'transparent',
                    display: 'flex', alignItems: 'center', gap: 10, fontSize: 13,
                    color: '#e11d48', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;