import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  BarChart3, BookOpen, Calendar, RotateCcw, Newspaper,
  PlayCircle, Settings, HelpCircle, StickyNote, ListChecks,
  Bell, User,
} from 'lucide-react';
import { useThemeStore } from '../../store';

const iconMap = {
  BarChart3, BookOpen, Calendar, RotateCcw, Newspaper,
  PlayCircle, Settings, HelpCircle, StickyNote, ListChecks,
  Bell, User,
};

const MENU_ITEMS = [
  { id: 'dashboard',          label: 'Dashboard',          icon: 'BarChart3',  path: '/dashboard' },
  { id: 'mock-tests',         label: 'Mock Tests',         icon: 'BookOpen',   path: '/mock-tests' },
  { id: 'question-bank',      label: 'Question Bank',      icon: 'ListChecks', path: '/question-bank' },
  { id: 'study-planner',      label: 'Study Planner',      icon: 'Calendar',   path: '/study-planner' },
  { id: 'notes',              label: 'Notes',              icon: 'StickyNote', path: '/notes' },
  { id: 'revisions',          label: 'Revisions',          icon: 'RotateCcw',  path: '/revisions' },
  { id: 'exam-notifications', label: 'Exam Notifications', icon: 'Bell',       path: '/exam-notifications' },
  { id: 'current-affairs',    label: 'Current Affairs',    icon: 'Newspaper',  path: '/current-affairs' },
  { id: 'videos',             label: 'Video Lectures',     icon: 'PlayCircle', path: '/videos' },
];

const FOOTER_ITEMS = [
  { id: 'profile',  label: 'Profile',        icon: 'User',        path: '/profile' },
  { id: 'settings', label: 'Settings',       icon: 'Settings',    path: '/settings' },
  { id: 'help',     label: 'Help & Support', icon: 'HelpCircle',  path: '/help' },
];

const Sidebar = () => {
  const location   = useLocation();
  const { darkMode } = useThemeStore();

  const isActive = (path) => location.pathname === path;

  const SidebarLink = ({ item }) => {
    const Icon   = iconMap[item.icon];
    const active = isActive(item.path);

    return (
      <Link
        to={item.path}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 16px', borderRadius: 10, textDecoration: 'none',
          fontSize: 14, fontWeight: 500,
          color:      active ? '#185FA5' : (darkMode ? '#94a3b8' : '#475569'),
          background: active ? '#E6F1FB' : 'transparent',
          borderLeft: active ? '3px solid #185FA5' : '3px solid transparent',
          marginBottom: 4, transition: 'all 0.15s ease',
        }}
      >
        <Icon size={18} color={active ? '#185FA5' : (darkMode ? '#64748b' : '#64748b')} />
        <span>{item.label}</span>
      </Link>
    );
  };

  const sideStyle = {
    width: 240, minHeight: '100vh',
    background: darkMode ? '#1e293b' : '#fff',
    borderRight: `0.5px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
    display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: 0,
  };

  return (
    <aside style={sideStyle}>
      <div style={{ padding: '1.25rem 1rem', borderBottom: `0.5px solid ${darkMode ? '#334155' : '#f1f5f9'}` }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#185FA5', letterSpacing: 1, margin: 0 }}>MENU</p>
      </div>

      <nav style={{ padding: '0.75rem', flex: 1 }}>
        {MENU_ITEMS.map(item => <SidebarLink key={item.id} item={item} />)}
      </nav>

      <div style={{ height: 1, background: darkMode ? '#334155' : '#f1f5f9', margin: '0 1rem' }} />

      <nav style={{ padding: '0.75rem' }}>
        {FOOTER_ITEMS.map(item => <SidebarLink key={item.id} item={item} />)}
      </nav>
    </aside>
  );
};

export default Sidebar;