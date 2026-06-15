import React from 'react';
import { BookOpen, Target, Trophy, Clock, Calendar, Flame, ChevronDown } from 'lucide-react';
import { useAuthStore, useExamSelectorStore, useDashboardStore, EXAM_SUBJECTS, EXAM_LIST } from '../../store';

// Professional Logo Component
const ProfessionalLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="10" fill="rgba(255,255,255,0.12)" />
      <path d="M12 16L22 10L32 16V28C32 30.209 27.18 32 22 32C16.82 32 12 30.209 12 28V16Z" 
            stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M22 10V32" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 24H29" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="22" cy="14" r="1.8" fill="#FFD66B" />
    </svg>
    <div style={{ lineHeight: 1.2 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '0.3px' }}>LEARNIFY</p>
      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', margin: '2px 0 0 0' }}>Exam Prep</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuthStore();
  const { selectedExam, setSelectedExam } = useExamSelectorStore();
  const { getExamData } = useDashboardStore();

  const userName = user?.name || 'Student';

  // Pull all stats from the exam-specific dataset for the currently selected exam
  const data = getExamData(selectedExam) || {};

  const daysToExam      = data.daysToExam ?? 0;
  const weeklyScores    = data.weeklyScores ?? [0, 0, 0, 0, 0, 0, 0];
  const upcomingTests   = data.upcomingTests ?? [];
  const recentActivity  = data.recentActivity ?? [];

  // Subject mastery now derives dynamically from the selected exam's subject list
  const examSubjects = EXAM_SUBJECTS[selectedExam] || [];
  const subjects = examSubjects.map((s) => ({
    name: s.name,
    value: data.subjectMastery?.[s.key] ?? 0,
    color: s.color,
  }));

  const maxScore = Math.max(...weeklyScores, 1);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const subjectMeta = {
    Physics:   { color: '#185FA5', bg: '#E6F1FB', text: '#0C447C' },
    Chemistry: { color: '#0F6E56', bg: '#EAF3DE', text: '#085041' },
    Math:      { color: '#854F0B', bg: '#FAEEDA', text: '#633806' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 24 }}>

      {/* Banner with Logo and Professional Image */}
      <div style={{
        background: 'linear-gradient(135deg, #185FA5 0%, #1a4d8f 100%)',
        borderRadius: 16,
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden',
      }}>
        
        {/* Left section: Logo + Text */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flex: 1, minWidth: 280, zIndex: 2 }}>
          {/* Logo */}
          <ProfessionalLogo />
          
          {/* Text content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 8, letterSpacing: '0.5px', fontWeight: 600 }}>STUDENT DASHBOARD</p>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Welcome back, {userName}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              {/* Exam selector dropdown */}
              <div style={{ position: 'relative' }}>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  style={{
                    fontSize: 13,
                    color: '#fff',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: 8,
                    padding: '8px 32px 8px 12px',
                    appearance: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    fontWeight: 500,
                  }}
                >
                  {EXAM_LIST.map((exam) => (
                    <option key={exam} value={exam} style={{ color: '#0f172a' }}>{exam}</option>
                  ))}
                </select>
                <ChevronDown size={16} color="#fff" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>📅 {daysToExam} days remaining</span>
            </div>
          </div>
        </div>

        {/* Right section: Professional Image */}
        <div style={{ 
          width: 280, 
          height: 160, 
          borderRadius: 12, 
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          zIndex: 2,
        }}>
          {/* Professional Study/Learning Illustration */}
          <svg width="240" height="140" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Desk/Table */}
            <rect x="30" y="90" width="180" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
            
            {/* Books stack */}
            <rect x="50" y="60" width="30" height="35" rx="2" fill="#FFD66B" />
            <rect x="55" y="55" width="25" height="8" fill="#FFC107" />
            
            {/* Laptop/Computer */}
            <rect x="120" y="65" width="60" height="35" rx="3" fill="#9FE1CB" opacity="0.8" />
            <rect x="125" y="70" width="50" height="25" rx="2" fill="#4ECDC4" />
            
            {/* Light bulb (idea) */}
            <circle cx="180" cy="35" r="8" fill="#FFD66B" />
            <rect x="178" y="43" width="4" height="8" fill="#FFD66B" />
            <rect x="175" y="51" width="10" height="3" fill="rgba(255,255,255,0.3)" />
            
            {/* Stars */}
            <circle cx="40" cy="25" r="2" fill="#C0DD97" />
            <circle cx="200" cy="30" r="2" fill="#C0DD97" />
            <circle cx="100" cy="15" r="1.5" fill="#9FE1CB" />
            
            {/* Decorative line */}
            <path d="M 30 50 Q 120 40 210 50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

        {/* Subject mastery + weekly chart */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Subject mastery</p>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{selectedExam}</p>
          </div>
          <div style={{ padding: '18px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {subjects.length > 0 ? subjects.map(({ name, value, color }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#334155', width: 100, flexShrink: 0, fontWeight: 500 }}>{name}</span>
                <div style={{ flex: 1, height: 8, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 99, transition: 'width 0.3s ease' }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', width: 40, textAlign: 'right', flexShrink: 0 }}>{value}%</span>
              </div>
            )) : (
              <p style={{ fontSize: 12, color: '#94a3b8' }}>No subject data available for this exam yet.</p>
            )}

            {/* Weekly bar chart */}
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, marginTop: 6 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Weekly test scores</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
                {weeklyScores.map((score, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: Math.max(Math.round((score / maxScore) * 60), 3),
                    borderRadius: '4px 4px 0 0',
                    background: i === new Date().getDay() - 1 ? '#185FA5' : '#B5D4F4',
                    transition: 'height 0.3s ease',
                    cursor: 'pointer',
                  }} title={`${score}%`} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                {days.map(d => <span key={d} style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{d}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming tests + recent activity */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Upcoming tests</p>
            <a href="/mock-tests" style={{ fontSize: 12, color: '#185FA5', textDecoration: 'none', fontWeight: 600 }}>View all →</a>
          </div>

          {upcomingTests.length > 0 ? upcomingTests.map((test, i) => {
            const m = subjectMeta[test.subject] ?? subjectMeta['Math'];
            return (
              <div key={test.id} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px',
                borderBottom: i < upcomingTests.length - 1 ? '1px solid #f8fafc' : 'none',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={18} color={m.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{test.name}</p>
                  <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{test.date} · {test.duration} · {test.questions} Qs</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 6, background: m.bg, color: m.text, flexShrink: 0 }}>{test.subject}</span>
              </div>
            );
          }) : (
            <div style={{ padding: '16px 18px' }}>
              <p style={{ fontSize: 12, color: '#94a3b8' }}>No upcoming tests scheduled.</p>
            </div>
          )}

          {/* Recent activity */}
          <div style={{ borderTop: '1px solid #f1f5f9', padding: '16px 18px', background: '#f8fafc' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Recent activity</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentActivity.length > 0 ? recentActivity.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.dotColor, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#334155', flex: 1 }}>{item.label}</span>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.meta}</span>
                </div>
              )) : (
                <p style={{ fontSize: 12, color: '#94a3b8' }}>No recent activity.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;