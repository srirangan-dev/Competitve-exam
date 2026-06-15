import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  FileText,
  CheckCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Bell,
  BellRing,
  Loader2,
  Radio,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const ExamNotifications = () => {
  const [exams, setExams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filter, setFilter] = useState('upcoming');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifyingId, setNotifyingId] = useState(null);
  const [notifyStatus, setNotifyStatus] = useState({});

  useEffect(() => {
    const examData = [
      {
        id: 1,
        name: 'UPSC Civil Services 2026',
        category: 'civil-service',
        notificationDate: '2025-01-15',
        admitCardDate: '2025-05-20',
        examDate: '2025-06-15',
        resultDate: '2025-08-30',
        status: 'result-out',
        location: 'All India',
        link: 'https://www.upsc.gov.in',
      },
      {
        id: 2,
        name: 'SSC CGL 2026',
        category: 'ssc',
        notificationDate: '2025-03-01',
        admitCardDate: '2026-05-15',
        examDate: '2026-06-20',
        resultDate: '2026-08-28',
        status: 'ongoing',
        location: 'All India',
        link: 'https://www.ssc.nic.in',
      },
      {
        id: 3,
        name: 'NEET UG 2026',
        category: 'medical',
        notificationDate: '2025-01-10',
        admitCardDate: '2026-04-10',
        examDate: '2026-05-05',
        resultDate: '2026-06-15',
        status: 'result-out',
        location: 'All India',
        link: 'https://www.neet.nta.ac.in',
      },
      {
        id: 4,
        name: 'JEE Main 2026',
        category: 'engineering',
        notificationDate: '2024-11-20',
        admitCardDate: '2026-03-15',
        examDate: '2026-04-01',
        resultDate: '2026-05-30',
        status: 'result-out',
        location: 'All India',
        link: 'https://www.jeemain.nta.ac.in',
      },
      {
        id: 5,
        name: 'GATE 2027',
        category: 'engineering',
        notificationDate: '2025-09-01',
        admitCardDate: '2027-01-02',
        examDate: '2027-02-01',
        resultDate: '2027-03-21',
        status: 'upcoming',
        location: 'All India',
        link: 'https://gate.iitm.ac.in',
      },
      {
        id: 6,
        name: 'CAT 2026',
        category: 'mba',
        notificationDate: '2026-07-15',
        admitCardDate: '2026-10-15',
        examDate: '2026-11-30',
        resultDate: '2027-01-15',
        status: 'upcoming',
        location: 'All India',
        link: 'https://www.iimcat.ac.in',
      },
      {
        id: 7,
        name: 'Bank PO 2026',
        category: 'banking',
        notificationDate: '2026-02-01',
        admitCardDate: '2026-04-01',
        examDate: '2026-05-04',
        resultDate: '2026-06-30',
        status: 'result-out',
        location: 'All India',
        link: 'https://www.ibps.in',
      },
      {
        id: 8,
        name: 'RRB NTPC 2026',
        category: 'railway',
        notificationDate: '2026-01-20',
        admitCardDate: '2026-05-01',
        examDate: '2026-06-15',
        resultDate: '2026-08-30',
        status: 'ongoing',
        location: 'All India',
        link: 'https://www.rrbcdg.gov.in',
      },
      {
        id: 9,
        name: 'Delhi University DU JAT 2026',
        category: 'university',
        notificationDate: '2026-03-10',
        admitCardDate: '2026-06-05',
        examDate: '2026-07-18',
        resultDate: '2026-08-15',
        status: 'upcoming',
        location: 'Delhi',
        link: 'https://www.du.ac.in',
      },
      {
        id: 10,
        name: 'NTA CUET UG 2026',
        category: 'university',
        notificationDate: '2025-12-15',
        admitCardDate: '2026-04-20',
        examDate: '2026-05-15',
        resultDate: '2026-06-25',
        status: 'result-out',
        location: 'All India',
        link: 'https://www.nta.ac.in',
      },
      {
        id: 11,
        name: 'CLAT 2027',
        category: 'law',
        notificationDate: '2026-08-01',
        admitCardDate: '2026-10-20',
        examDate: '2026-12-12',
        resultDate: '2027-01-20',
        status: 'upcoming',
        location: 'All India',
        link: 'https://www.consortiumofnlus.ac.in',
      },
      {
        id: 12,
        name: 'AFCAT 2026',
        category: 'defence',
        notificationDate: '2026-02-15',
        admitCardDate: '2026-04-10',
        examDate: '2026-06-21',
        resultDate: '2026-07-30',
        status: 'ongoing',
        location: 'All India',
        link: 'https://www.afcat.cdac.in',
      },
      {
        id: 13,
        name: 'IISER Aptitude Test 2026',
        category: 'science',
        notificationDate: '2026-01-05',
        admitCardDate: '2026-04-01',
        examDate: '2026-05-25',
        resultDate: '2026-06-10',
        status: 'result-out',
        location: 'All India',
        link: 'https://www.iiser.ac.in',
      },
      {
        id: 14,
        name: 'CUET PG 2026',
        category: 'university',
        notificationDate: '2026-01-10',
        admitCardDate: '2026-04-25',
        examDate: '2026-05-28',
        resultDate: '2026-06-22',
        status: 'result-out',
        location: 'All India',
        link: 'https://www.nta.ac.in/cuet-pg',
      },
      {
        id: 15,
        name: 'Insurance Awareness Foundation 2026',
        category: 'banking',
        notificationDate: '2026-02-20',
        admitCardDate: '2026-06-10',
        examDate: '2026-07-15',
        resultDate: '2026-08-20',
        status: 'upcoming',
        location: 'All India',
        link: 'https://www.irdai.gov.in',
      },
    ];
    setExams(examData);
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  const categories = [
    { id: 'all', label: 'All Exams' },
    { id: 'civil-service', label: 'Civil Service' },
    { id: 'ssc', label: 'SSC' },
    { id: 'medical', label: 'Medical (NEET)' },
    { id: 'engineering', label: 'Engineering (JEE/GATE)' },
    { id: 'mba', label: 'MBA (CAT)' },
    { id: 'banking', label: 'Banking' },
    { id: 'railway', label: 'Railway' },
    { id: 'university', label: 'University (CUET/DU)' },
    { id: 'law', label: 'Law (CLAT)' },
    { id: 'defence', label: 'Defence (AFCAT)' },
    { id: 'science', label: 'Science (IISER)' },
  ];

  const statusMeta = (status) => {
    switch (status) {
      case 'upcoming':
        return { bg: '#FEF3C7', text: '#92400E', Icon: Bell, label: 'Upcoming' };
      case 'ongoing':
        return { bg: '#DBEAFE', text: '#1E40AF', Icon: Radio, label: 'Ongoing' };
      case 'result-out':
        return { bg: '#DCFCE7', text: '#166534', Icon: CheckCircle2, label: 'Result Out' };
      default:
        return { bg: '#F3F4F6', text: '#374151', Icon: Clock, label: 'Scheduled' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredExams = exams.filter((exam) => {
    const categoryMatch = selectedCategory === 'all' || exam.category === selectedCategory;
    const statusMatch = filter === 'all' || exam.status === filter;
    return categoryMatch && statusMatch;
  });

  const upcomingCount = exams.filter((e) => e.status === 'upcoming' || e.status === 'ongoing').length;

  // ── Email reminder requests ────────────────────────────────────────────
  const sendReminder = async (path, key) => {
    if (!isAuthenticated) {
      setNotifyStatus((prev) => ({
        ...prev,
        [key]: { type: 'error', message: 'Sign in to ApexPrep to get this emailed to you.' },
      }));
      setTimeout(() => {
        setNotifyStatus((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 6000);
      return;
    }

    setNotifyingId(key);
    setNotifyStatus((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Could not send the reminder email.');
      }

      setNotifyStatus((prev) => ({
        ...prev,
        [key]: { type: 'success', message: data.message || 'Reminder email sent.' },
      }));
    } catch (err) {
      setNotifyStatus((prev) => ({
        ...prev,
        [key]: { type: 'error', message: err.message || 'Something went wrong. Try again.' },
      }));
    } finally {
      setNotifyingId(null);
      setTimeout(() => {
        setNotifyStatus((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 6000);
    }
  };

  const handleNotify = (examId) => sendReminder(`/exams/${examId}/notify-me`, examId);
  const handleNotifyAll = () => sendReminder('/exams/notify-all', 'all');

  // ── Sub-components ──────────────────────────────────────────────────────
  const TimelineItem = ({ icon, label, date }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        {icon}
        <span style={{ fontSize: 12, fontWeight: 500, color: '#6b7280' }}>{label}</span>
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{date}</span>
    </div>
  );

  const ExamCard = ({ exam }) => {
    const { bg, text, Icon, label } = statusMeta(exam.status);
    const isLoading = notifyingId === exam.id;
    const status = notifyStatus[exam.id];

    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#185FA5', margin: 0, marginBottom: 8 }}>
              {exam.name}
            </h3>
            <p style={{ fontSize: 13, color: '#6b7280', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={13} /> {exam.location}
            </p>
          </div>
          <span
            style={{
              background: bg,
              color: text,
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              whiteSpace: 'nowrap',
            }}
          >
            <Icon size={14} /> {label}
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <TimelineItem
            icon={<FileText size={18} color="#185FA5" />}
            label="Notification"
            date={formatDate(exam.notificationDate)}
          />
          <TimelineItem
            icon={<AlertCircle size={18} color="#F59E0B" />}
            label="Admit Card"
            date={formatDate(exam.admitCardDate)}
          />
          <TimelineItem
            icon={<Clock size={18} color="#3B82F6" />}
            label="Exam Date"
            date={formatDate(exam.examDate)}
          />
          <TimelineItem
            icon={<CheckCircle size={18} color="#10B981" />}
            label="Result"
            date={formatDate(exam.resultDate)}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <a
            href={exam.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#185FA5',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1454a8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#185FA5';
            }}
          >
            Visit official website <ExternalLink size={14} />
          </a>

          <button
            onClick={() => handleNotify(exam.id)}
            disabled={isLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#fff',
              color: '#185FA5',
              border: '1px solid #185FA5',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: isLoading ? 'default' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = '#185FA5';
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#185FA5';
            }}
          >
            {isLoading ? <Loader2 size={14} className="apex-spin" /> : <Bell size={14} />}
            {isLoading ? 'Sending…' : 'Email me these dates'}
          </button>
        </div>

        {status && (
          <div
            style={{
              marginTop: 10,
              fontSize: 12,
              fontWeight: 500,
              color: status.type === 'success' ? '#166534' : '#92400E',
            }}
          >
            {status.message}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <style>{`
        @keyframes apex-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .apex-spin { animation: apex-spin 0.8s linear infinite; }
      `}</style>

      {/* Header / Logo */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #185FA5 0%, #103E68 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: '-0.5px',
              boxShadow: '0 4px 10px rgba(24,95,165,0.25)',
              flexShrink: 0,
            }}
          >
            AP
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.4px' }}>ApexPrep</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#185FA5', letterSpacing: '1.5px', marginTop: 2 }}>
              YEAR 2026
            </div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0, maxWidth: 420, textAlign: 'right' }}>
          Track notification releases, admit cards, exam dates, and results — and get reminders sent straight to
          your inbox. Current date: June 14, 2026
        </p>
      </div>

      {/* Email reminders banner (signature element) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #185FA5 0%, #103E68 100%)',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BellRing size={28} color="#fff" />
          <div>
            <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>Stay ahead of every deadline</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 2 }}>
              Get an email with key dates for all {upcomingCount} upcoming and ongoing exams.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <button
            onClick={handleNotifyAll}
            disabled={notifyingId === 'all'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#fff',
              color: '#185FA5',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: notifyingId === 'all' ? 'default' : 'pointer',
              opacity: notifyingId === 'all' ? 0.8 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {notifyingId === 'all' ? <Loader2 size={15} className="apex-spin" /> : <BellRing size={15} />}
            {notifyingId === 'all' ? 'Sending…' : 'Email me all reminders'}
          </button>
          {notifyStatus['all'] && (
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: notifyStatus['all'].type === 'success' ? '#DCFCE7' : '#FEF3C7',
                textAlign: 'right',
              }}
            >
              {notifyStatus['all'].message}
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 20,
          marginBottom: 32,
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1f2937', margin: 0, marginBottom: 12 }}>
            Filter by Category
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: selectedCategory === cat.id ? '#185FA5' : '#f3f4f6',
                  color: selectedCategory === cat.id ? '#fff' : '#6b7280',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1f2937', margin: 0, marginBottom: 12 }}>
            Filter by Status
          </h3>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'ongoing', label: 'Ongoing' },
              { id: 'result-out', label: 'Result Out' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setFilter(s.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: filter === s.id ? '#185FA5' : '#f3f4f6',
                  color: filter === s.id ? '#fff' : '#6b7280',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div>
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
        ) : (
          <div
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: 40,
              textAlign: 'center',
            }}
          >
            <AlertCircle size={48} color="#9ca3af" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontSize: 16, color: '#6b7280', margin: 0 }}>No exams found matching your filters</p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div
        style={{
          background: '#F8FAFC',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 20,
          marginTop: 32,
        }}
      >
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1f2937',
            margin: 0,
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Lightbulb size={16} color="#185FA5" /> Tips
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: '#374151' }}>
          <li style={{ fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>
            Use "Email me these dates" on any exam to get its full timeline sent to your inbox for quick reference.
          </li>
          <li style={{ fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>
            Download your admit card as soon as it's released and keep multiple copies.
          </li>
          <li style={{ fontSize: 13, marginBottom: 0, lineHeight: 1.6 }}>
            Official dates can shift — check the linked website periodically for updates.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExamNotifications;