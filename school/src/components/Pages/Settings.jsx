import React, { useState } from 'react';
import { Moon, Sun, Bell, Shield, Trash2, Download } from 'lucide-react';
import { useThemeStore, useAuthStore } from '../../store';

const Toggle = ({ on, onChange, disabled }) => (
  <button
    onClick={() => !disabled && onChange(!on)}
    style={{
      width: 44, height: 24, borderRadius: 99, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
      background: on ? '#185FA5' : '#cbd5e1', position: 'relative',
      transition: 'background 0.2s', opacity: disabled ? 0.5 : 1,
    }}
  >
    <span style={{
      position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18,
      borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
    }} />
  </button>
);

const Settings = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const { user }                     = useAuthStore();

  const [notifs, setNotifs] = useState({
    mockReminders:  true,
    studyReminders: true,
    examAlerts:     true,
    weeklyReport:   false,
  });

  const bg  = darkMode ? '#1e293b' : '#fff';
  const bdr = darkMode ? '#334155' : '#e2e8f0';
  const txt = darkMode ? '#f1f5f9' : '#0f172a';
  const sub = darkMode ? '#94a3b8' : '#64748b';

  const SectionCard = ({ title, children }) => (
    <div style={{
      background: bg, border: `0.5px solid ${bdr}`, borderRadius: 16,
      overflow: 'hidden', marginBottom: 20,
    }}>
      <div style={{ padding: '14px 20px', borderBottom: `0.5px solid ${bdr}` }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#185FA5', margin: 0, letterSpacing: 0.5 }}>
          {title}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );

  const Row = ({ icon: Icon, label, desc, right }) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px', borderBottom: `0.5px solid ${bdr}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: '#E6F1FB',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={16} color="#185FA5" />
        </div>
        <div>
          <p style={{ fontSize: 14, color: txt, margin: 0, fontWeight: 500 }}>{label}</p>
          {desc && <p style={{ fontSize: 12, color: sub, margin: 0 }}>{desc}</p>}
        </div>
      </div>
      {right}
    </div>
  );

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>

      <SectionCard title="APPEARANCE">
        <Row
          icon={darkMode ? Moon : Sun}
          label="Dark mode"
          desc="Switch between light and dark themes"
          right={<Toggle on={darkMode} onChange={toggleDarkMode} />}
        />
      </SectionCard>

      <SectionCard title="NOTIFICATIONS">
        {[
          { key: 'mockReminders',  label: 'Mock test reminders',  desc: 'Alerts before scheduled mock tests' },
          { key: 'studyReminders', label: 'Study plan reminders', desc: 'Daily study schedule nudges' },
          { key: 'examAlerts',     label: 'Exam date alerts',     desc: 'Upcoming JEE / NEET deadlines' },
        ].map(({ key, label, desc }) => (
          <Row
            key={key}
            icon={Bell}
            label={label}
            desc={desc}
            right={
              <Toggle
                on={notifs[key]}
                onChange={v => setNotifs(n => ({ ...n, [key]: v }))}
              />
            }
          />
        ))}
      </SectionCard>

      <SectionCard title="ACCOUNT">
        <Row
          icon={Shield}
          label="Change password"
          desc="Update your login credentials"
          right={
            <button style={{
              fontSize: 13, color: '#185FA5', background: '#E6F1FB',
              border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
            }}>
              Change
            </button>
          }
        />
        <Row
          icon={Download}
          label="Export my data"
          desc="Download all your notes, plans, and results"
          right={
            <button style={{
              fontSize: 13, color: '#185FA5', background: '#E6F1FB',
              border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
            }}>
              Export
            </button>
          }
        />
        <Row
          icon={Trash2}
          label="Delete account"
          desc="Permanently remove your account and data"
          right={
            <button style={{
              fontSize: 13, color: '#e11d48', background: '#fff0f3',
              border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
            }}>
              Delete
            </button>
          }
        />
      </SectionCard>

    </div>
  );
};

export default Settings;