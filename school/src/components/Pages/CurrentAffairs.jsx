import React from 'react';
import { Lightbulb, Calendar, Newspaper, BookOpen, Bookmark } from 'lucide-react';

const articles = [
  {
    id: 1, subject: 'Physics', color: '#185FA5', bg: '#E6F1FB',
    date: 'Jun 10, 2025',
    title: 'Scientists achieve room-temperature superconductivity milestone',
    body: 'Korean researchers demonstrated near-zero electrical resistance at 22°C using a modified LK-99 compound, potentially revolutionizing power transmission and electronics.',
    relevance: 'JEE relevance: Semiconductors, resistance, band theory',
    examRelevance: ['JEE', 'UPSC']
  },
  {
    id: 2, subject: 'Chemistry', color: '#0F6E56', bg: '#EAF3DE',
    date: 'Jun 8, 2025',
    title: 'New catalyst converts CO₂ into aviation fuel at record efficiency',
    body: 'IIT Delhi & CSIR developed an iron-cobalt bimetallic catalyst achieving 87% conversion efficiency, marking a major step in carbon capture utilization technology.',
    relevance: 'JEE relevance: Catalysis, redox reactions, carbon chemistry',
    examRelevance: ['JEE', 'NEET', 'UPSC']
  },
  {
    id: 3, subject: 'Biology', color: '#854F0B', bg: '#FAEEDA',
    date: 'Jun 7, 2025',
    title: 'CRISPR-Cas9 used to reverse Type 1 diabetes in clinical trial',
    body: 'Shanghai trial showed insulin independence in 12 of 15 patients after gene-edited stem cell transplants restored pancreatic beta cell function permanently.',
    relevance: 'NEET relevance: Biotechnology, genetic engineering, endocrinology',
    examRelevance: ['NEET', 'UPSC']
  },
  {
    id: 4, subject: 'Space', color: '#993C1D', bg: '#FAECE7',
    date: 'Jun 5, 2025',
    title: "ISRO's Gaganyaan crew completes 3-day orbital mission successfully",
    body: "India's first crewed spaceflight circled Earth 48 times at 400 km altitude before splashing down in the Bay of Bengal, making India the 4th nation with human spaceflight capability.",
    relevance: 'JEE relevance: Orbital mechanics, gravitation, projectile motion',
    examRelevance: ['JEE', 'UPSC', 'SSC']
  },
  {
    id: 5, subject: 'Mathematics', color: '#534AB7', bg: '#EEEDFE',
    date: 'Jun 3, 2025',
    title: 'Fields Medal 2025 awarded for proof of Langlands conjecture subset',
    body: 'Ukrainian mathematician proved a major portion of the geometric Langlands program, bridging number theory, algebraic geometry and quantum physics.',
    relevance: 'JEE relevance: Number theory, functions, modern algebra',
    examRelevance: ['JEE', 'UPSC']
  },
  {
    id: 6, subject: 'Technology', color: '#A32D2D', bg: '#FCEBEB',
    date: 'Jun 1, 2025',
    title: "Quantum computer solves 1,000-qubit problem — 47 years faster than classical",
    body: "Google's Willow chip achieved quantum advantage on a lattice sampling problem, completing in 5 minutes what would take a classical supercomputer longer than the age of the universe.",
    relevance: 'JEE relevance: Quantum mechanics, atomic theory, wave-particle duality',
    examRelevance: ['JEE', 'UPSC', 'Bank PO']
  },
  {
    id: 7, subject: 'Economics', color: '#C84A31', bg: '#FEF0EC',
    date: 'May 30, 2025',
    title: 'RBI announces new digital rupee framework for cross-border payments',
    body: 'Reserve Bank of India launched digital rupee (e₹) integration with Asian central banks, enabling seamless cross-border transactions without intermediaries.',
    relevance: 'UPSC/Bank PO relevance: Monetary policy, fintech, international trade',
    examRelevance: ['UPSC', 'Bank PO', 'SSC']
  },
  {
    id: 8, subject: 'Environment', color: '#2D5F2E', bg: '#F0FDF4',
    date: 'May 28, 2025',
    title: 'India ranks 4th in renewable energy capacity globally',
    body: 'India added 50 GW of renewable energy capacity in 2025, reaching 220 GW total, cementing its position as a clean energy leader ahead of developed nations.',
    relevance: 'UPSC/SSC relevance: Sustainable development, energy policy, environment',
    examRelevance: ['UPSC', 'SSC']
  },
];

const quickFacts = [
  { label: 'Superconductivity temp', value: '22°C' },
  { label: 'Gaganyaan altitude', value: '400 km' },
  { label: 'CO₂ catalyst efficiency', value: '87%' },
  { label: 'Willow qubit count', value: '1,000' },
];

const CATEGORIES = ['All', 'Physics', 'Chemistry', 'Biology', 'Space', 'Mathematics', 'Technology', 'Economics', 'Environment'];
const EXAMS = ['All Exams', 'JEE', 'NEET', 'UPSC', 'SSC', 'Bank PO'];

const CurrentAffairs = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeExam, setActiveExam] = React.useState('All Exams');
  const [bookmarked, setBookmarked] = React.useState(new Set());
  const [showBookmarkedOnly, setShowBookmarkedOnly] = React.useState(false);

  const toggleBookmark = (id) => {
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id);
    } else {
      newBookmarked.add(id);
    }
    setBookmarked(newBookmarked);
  };

  let filtered = articles;

  // Filter by category
  if (activeCategory !== 'All') {
    filtered = filtered.filter(a => a.subject === activeCategory);
  }

  // Filter by exam relevance
  if (activeExam !== 'All Exams') {
    filtered = filtered.filter(a => a.examRelevance.includes(activeExam));
  }

  // Filter by bookmarked only
  if (showBookmarkedOnly) {
    filtered = filtered.filter(a => bookmarked.has(a.id));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#0f172a' }}>Current affairs</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>Science & tech news for JEE/NEET/UPSC/SSC aspirants</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc', padding: '6px 12px', borderRadius: 8, border: '0.5px solid #e2e8f0' }}>
          <Calendar size={14} color="#64748b" />
          <span style={{ fontSize: 12, color: '#64748b' }}>June 2025</span>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#475569', marginBottom: 8 }}>By Subject</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px', borderRadius: 99, fontSize: 12, cursor: 'pointer',
                border: activeCategory === cat ? 'none' : '0.5px solid #e2e8f0',
                background: activeCategory === cat ? '#185FA5' : '#f8fafc',
                color: activeCategory === cat ? '#fff' : '#64748b',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Relevance Filter */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#475569', marginBottom: 8 }}>By Exam</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {EXAMS.map(exam => (
            <button
              key={exam}
              onClick={() => setActiveExam(exam)}
              style={{
                padding: '6px 14px', borderRadius: 99, fontSize: 12, cursor: 'pointer',
                border: activeExam === exam ? 'none' : '0.5px solid #cbd5e1',
                background: activeExam === exam ? '#0F6E56' : '#f1f5f9',
                color: activeExam === exam ? '#fff' : '#475569',
                transition: 'all 0.2s ease',
              }}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmark Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#f8fafc', borderRadius: 10, border: '0.5px solid #e2e8f0' }}>
        <button
          onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6,
            border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500,
            background: showBookmarkedOnly ? '#185FA5' : '#e2e8f0',
            color: showBookmarkedOnly ? '#fff' : '#475569',
            transition: 'all 0.2s ease',
          }}
        >
          <Bookmark size={14} fill={showBookmarkedOnly ? '#fff' : 'none'} />
          Saved Articles ({bookmarked.size})
        </button>
      </div>

      {/* Articles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
        {filtered.length > 0 ? (
          filtered.map(article => (
            <div key={article.id} style={{
              background: '#fff', borderRadius: 14,
              border: '0.5px solid #e2e8f0',
              borderLeft: `3px solid ${article.color}`,
              padding: '1rem 1.25rem',
              boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
              position: 'relative',
            }}>
              {/* Bookmark Button */}
              <button
                onClick={() => toggleBookmark(article.id)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Bookmark
                  size={18}
                  color={bookmarked.has(article.id) ? '#185FA5' : '#cbd5e1'}
                  fill={bookmarked.has(article.id) ? '#185FA5' : 'none'}
                />
              </button>

              {/* Content */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginRight: 20 }}>
                <span style={{
                  fontSize: 11, fontWeight: 500, padding: '2px 10px', borderRadius: 99,
                  background: article.bg, color: article.color,
                }}>
                  {article.subject}
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{article.date}</span>
              </div>

              <h3 style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', marginBottom: 8, lineHeight: 1.4 }}>
                {article.title}
              </h3>

              <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, marginBottom: 10 }}>
                {article.body}
              </p>

              {/* Relevance */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Lightbulb size={13} color={article.color} />
                <span style={{ fontSize: 11, color: article.color, fontWeight: 500 }}>{article.relevance}</span>
              </div>

              {/* Exam Tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {article.examRelevance.map(exam => (
                  <span
                    key={exam}
                    style={{
                      fontSize: 10, fontWeight: 500, padding: '3px 8px', borderRadius: 99,
                      background: '#f1f5f9', color: '#475569', border: '0.5px solid #cbd5e1',
                    }}
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={{
            gridColumn: '1 / -1', padding: '2rem', textAlign: 'center',
            background: '#f8fafc', borderRadius: 14, border: '0.5px solid #e2e8f0',
          }}>
            <p style={{ fontSize: 13, color: '#64748b' }}>No articles found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Quick Facts */}
      <div style={{ background: '#f8fafc', borderRadius: 14, padding: '1rem 1.25rem', border: '0.5px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <BookOpen size={16} color="#185FA5" />
          <p style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>Quick revision: This week's key facts</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
          {quickFacts.map((f, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', border: '0.5px solid #e2e8f0' }}>
              <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3 }}>{f.label}</p>
              <p style={{ fontSize: 16, fontWeight: 500, color: '#0f172a' }}>{f.value}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CurrentAffairs;