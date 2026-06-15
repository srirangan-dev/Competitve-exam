import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useThemeStore } from '../../store';

const FAQS = [
  { q: 'How do I reset my mock test score?',        a: 'Go to Mock Tests → select the test → click "Retake". Previous scores are still visible in History.' },
  { q: 'Can I download notes for offline use?',     a: 'Yes! Open any note and tap the Download icon (top-right). PDF is saved to your device.' },
  { q: 'How does the AI Doubt Solver work?',        a: 'Click the floating chat icon on any page. Type your doubt with subject context and get a step-by-step solution instantly.' },
  { q: 'How do I change my target exam?',           a: 'Go to Profile → Edit profile → select your exam under "Target Exam" → Save changes.' },
  { q: 'Are the mock tests based on latest pattern?', a: 'Yes, all mock tests are updated after each official JEE / NEET session to reflect the latest pattern and difficulty.' },
];

const Help = () => {
  const { darkMode } = useThemeStore();
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]       = useState(false);

  const bg   = darkMode ? '#1e293b' : '#fff';
  const bdr  = darkMode ? '#334155' : '#e2e8f0';
  const txt  = darkMode ? '#f1f5f9' : '#0f172a';
  const sub  = darkMode ? '#94a3b8' : '#64748b';
  const card = darkMode ? '#0f172a' : '#f8fafc';

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: `0.5px solid ${bdr}`, background: bg,
    fontSize: 14, color: txt, outline: 'none', boxSizing: 'border-box',
  };

  const handleSend = () => {
    // wire to your backend / email service here
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>

      {/* Quick contact tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { Icon: Mail,          label: 'Email us',       val: 'support@apexprep.in',    color: '#185FA5', bg: '#E6F1FB' },
          { Icon: Phone,         label: 'Call us',        val: '+91 98765 43210',         color: '#0F6E56', bg: '#EAF3DE' },
          { Icon: MessageCircle, label: 'Live chat',      val: 'Mon–Sat 9 am – 6 pm',    color: '#854F0B', bg: '#FAEEDA' },
        ].map(({ Icon, label, val, color, bg: cbg }) => (
          <div key={label} style={{
            background: bg, border: `0.5px solid ${bdr}`, borderRadius: 14,
            padding: '1.25rem', textAlign: 'center',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: cbg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px',
            }}>
              <Icon size={20} color={color} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: txt, margin: '0 0 2px' }}>{label}</p>
            <p style={{ fontSize: 12, color: sub, margin: 0 }}>{val}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ background: bg, border: `0.5px solid ${bdr}`, borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '14px 20px', borderBottom: `0.5px solid ${bdr}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#185FA5', margin: 0, letterSpacing: 0.5 }}>
            FREQUENTLY ASKED QUESTIONS
          </p>
        </div>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? `0.5px solid ${bdr}` : 'none' }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: txt }}>{faq.q}</span>
              {openFaq === i
                ? <ChevronUp size={16} color={sub} />
                : <ChevronDown size={16} color={sub} />}
            </button>
            {openFaq === i && (
              <div style={{ padding: '0 20px 14px', fontSize: 13, color: sub, lineHeight: 1.6 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div style={{ background: bg, border: `0.5px solid ${bdr}`, borderRadius: 16, padding: '1.75rem' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: txt, margin: '0 0 20px' }}>
          Send us a message
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: sub, marginBottom: 6, letterSpacing: 0.4 }}>
              NAME
            </label>
            <input
              style={inputStyle}
              placeholder="Your name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: sub, marginBottom: 6, letterSpacing: 0.4 }}>
              EMAIL
            </label>
            <input
              style={inputStyle}
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: sub, marginBottom: 6, letterSpacing: 0.4 }}>
            SUBJECT
          </label>
          <select
            style={inputStyle}
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          >
            <option value="">Select a topic</option>
            <option>Mock test issue</option>
            <option>Payment / subscription</option>
            <option>Account problem</option>
            <option>Feature request</option>
            <option>Other</option>
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: sub, marginBottom: 6, letterSpacing: 0.4 }}>
            MESSAGE
          </label>
          <textarea
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
            placeholder="Describe your issue or question..."
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={handleSend}
            disabled={!form.name || !form.email || !form.message}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', borderRadius: 10, border: 'none',
              background: (!form.name || !form.email || !form.message) ? '#94a3b8' : '#185FA5',
              color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: (!form.name || !form.email || !form.message) ? 'not-allowed' : 'pointer',
            }}
          >
            <Send size={15} /> Send message
          </button>
          {sent && (
            <span style={{ fontSize: 13, color: '#0F6E56', fontWeight: 500 }}>
              ✓ Message sent! We'll reply within 24 hrs.
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

export default Help;