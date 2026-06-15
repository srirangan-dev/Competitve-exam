import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Loader, Plus, Sparkles, ChevronDown } from 'lucide-react';
import { useAuthStore } from "../../store";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const QUICK_QUESTIONS = [
  "Explain Newton's laws of motion",
  "How does photosynthesis work?",
  "Solve: If 2x + 5 = 15, find x",
  "What is Ohm's law?",
  "Explain the structure of DNA",
];

const AIDoubtSolver = () => {
  const { token } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm StudyAI, your personal tutor for JEE, NEET, UPSC and more. What would you like to learn today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [subject, setSubject] = useState('General');
  const [error, setError] = useState(null);
  const [showSubjects, setShowSubjects] = useState(false);
  const messagesEndRef = useRef(null);

  const SUBJECTS = ['General', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(async (overrideInput) => {
    const textToSend = (overrideInput || input).trim();
    if (!textToSend || loading || !token) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: textToSend,
          sessionId: sessionId || undefined,
          subject,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && data.errors.length > 0) {
          throw new Error(data.errors.map(e => e.msg).join(', '));
        }
        throw new Error(data.message || 'Failed to get AI response');
      }

      const aiMsg = {
        id: Date.now() + 1,
        type: 'ai',
        content: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);

      if (!sessionId && data.sessionId) setSessionId(data.sessionId);
    } catch (err) {
      const errMsg = err.message || 'Failed to get response. Please try again.';
      setError(errMsg);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        content: `Something went wrong: ${errMsg}`,
        isError: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, token, sessionId, subject]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setMessages([{
      id: 1,
      type: 'ai',
      content: "Hello! I'm StudyAI, your personal tutor for JEE, NEET, UPSC and more. What would you like to learn today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setSessionId(null);
    setInput('');
    setError(null);
  };

  // ── Floating Button ──────────────────────────────────────────────────────────
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        title="Open StudyAI"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 58,
          height: 58,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #185FA5 0%, #0C447C 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          boxShadow: '0 4px 20px rgba(24,95,165,0.35)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(24,95,165,0.45)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(24,95,165,0.35)';
        }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="12" fill="rgba(255,255,255,0.15)" />
          <path d="M7 9.5C7 8.67 7.67 8 8.5 8h9C18.33 8 19 8.67 19 9.5v5c0 .83-.67 1.5-1.5 1.5H15l-2 2.5L11 16H8.5C7.67 16 7 15.33 7 14.5v-5z" fill="white" />
          <circle cx="10" cy="12" r="1" fill="#185FA5" />
          <circle cx="13" cy="12" r="1" fill="#185FA5" />
          <circle cx="16" cy="12" r="1" fill="#185FA5" />
        </svg>
      </button>
    );
  }

  // ── Chat Window ──────────────────────────────────────────────────────────────
  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      right: 28,
      width: 390,
      height: 620,
      background: '#fff',
      borderRadius: '20px',
      boxShadow: '0 12px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999,
      overflow: 'hidden',
      border: '0.5px solid rgba(0,0,0,0.08)',
    }}>

      {/* ── Header ── */}
      <div style={{
        padding: '14px 16px',
        background: 'linear-gradient(135deg, #185FA5 0%, #0C447C 100%)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        {/* Logo */}
        <div style={{
          width: 38,
          height: 38,
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 8C4 6.9 4.9 6 6 6h10c1.1 0 2 .9 2 2v4.5c0 1.1-.9 2-2 2H13.5l-2.5 3-2.5-3H6c-1.1 0-2-.9-2-2V8z" fill="white" />
            <circle cx="8" cy="10.2" r="1.1" fill="#185FA5" />
            <circle cx="11" cy="10.2" r="1.1" fill="#185FA5" />
            <circle cx="14" cy="10.2" r="1.1" fill="#185FA5" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '-0.1px' }}>StudyAI</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Online · {subject}</p>
          </div>
        </div>

        {/* Subject dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowSubjects(!showSubjects)}
            style={{
              padding: '5px 10px',
              background: 'rgba(255,255,255,0.15)',
              border: '0.5px solid rgba(255,255,255,0.3)',
              borderRadius: 8,
              color: '#fff',
              fontSize: 11,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {subject} <ChevronDown size={11} />
          </button>
          {showSubjects && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              border: '0.5px solid rgba(0,0,0,0.08)',
              overflow: 'hidden',
              zIndex: 100,
              minWidth: 120,
            }}>
              {SUBJECTS.map(s => (
                <button
                  key={s}
                  onClick={() => { setSubject(s); setShowSubjects(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 14px',
                    textAlign: 'left',
                    background: subject === s ? '#EBF4FF' : 'transparent',
                    border: 'none',
                    fontSize: 13,
                    color: subject === s ? '#185FA5' : '#374151',
                    cursor: 'pointer',
                    fontWeight: subject === s ? 500 : 400,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* New chat */}
        <button onClick={startNewChat} title="New chat" style={{
          padding: 6, background: 'rgba(255,255,255,0.15)', border: 'none',
          borderRadius: 8, cursor: 'pointer', color: '#fff', display: 'flex',
        }}>
          <Plus size={16} />
        </button>

        {/* Close */}
        <button onClick={() => setIsOpen(false)} style={{
          padding: 6, background: 'transparent', border: 'none',
          cursor: 'pointer', color: 'rgba(255,255,255,0.8)', display: 'flex',
        }}>
          <X size={17} />
        </button>
      </div>

      {/* ── Messages ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: '#F8FAFC',
      }}>

        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            gap: 8,
          }}>
            {/* AI avatar */}
            {msg.type === 'ai' && (
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #185FA5, #0C447C)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Sparkles size={13} color="#fff" />
              </div>
            )}

            <div style={{
              maxWidth: '75%',
              padding: '10px 13px',
              borderRadius: msg.type === 'user'
                ? '14px 4px 14px 14px'
                : '4px 14px 14px 14px',
              background: msg.type === 'user'
                ? 'linear-gradient(135deg, #185FA5, #0C447C)'
                : msg.isError ? '#FEF2F2' : '#fff',
              border: msg.type === 'ai' && !msg.isError ? '0.5px solid rgba(0,0,0,0.07)' : 'none',
              boxShadow: msg.type === 'ai' ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
            }}>
              <p style={{
                fontSize: 13,
                color: msg.type === 'user' ? '#fff' : msg.isError ? '#991B1B' : '#111827',
                lineHeight: 1.55,
                margin: 0,
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </p>
              <p style={{
                fontSize: 10,
                color: msg.type === 'user' ? 'rgba(255,255,255,0.55)' : '#9CA3AF',
                margin: '5px 0 0',
              }}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '9px',
              background: 'linear-gradient(135deg, #185FA5, #0C447C)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={13} color="#fff" />
            </div>
            <div style={{
              padding: '10px 14px',
              background: '#fff',
              borderRadius: '4px 14px 14px 14px',
              border: '0.5px solid rgba(0,0,0,0.07)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Loader size={13} color="#185FA5" style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 12, color: '#6B7280' }}>Thinking...</span>
            </div>
          </div>
        )}

        {/* Quick questions (only on first message) */}
        {messages.length === 1 && !loading && (
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 11, color: '#9CA3AF', margin: '0 0 8px 36px' }}>Try asking:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginLeft: 36 }}>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => token && handleSend(q)}
                  style={{
                    padding: '7px 12px',
                    background: '#fff',
                    border: '0.5px solid rgba(24,95,165,0.2)',
                    borderRadius: 10,
                    fontSize: 12,
                    color: '#185FA5',
                    cursor: token ? 'pointer' : 'not-allowed',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#EBF4FF'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <div style={{
        padding: '12px 14px',
        borderTop: '0.5px solid rgba(0,0,0,0.07)',
        background: '#fff',
      }}>
        {!token && (
          <p style={{ fontSize: 11, color: '#EF4444', textAlign: 'center', margin: '0 0 8px' }}>
            Please log in to use StudyAI
          </p>
        )}
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'flex-end',
          background: '#F8FAFC',
          border: '0.5px solid rgba(0,0,0,0.1)',
          borderRadius: 14,
          padding: '6px 6px 6px 12px',
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask anything…"
            rows={1}
            disabled={!token}
            style={{
              flex: 1,
              fontSize: 13,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: '#111827',
              fontFamily: 'inherit',
              resize: 'none',
              maxHeight: 100,
              minHeight: 24,
              lineHeight: 1.5,
              padding: '3px 0',
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading || !token}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: input.trim() && !loading && token
                ? 'linear-gradient(135deg, #185FA5, #0C447C)'
                : '#E5E7EB',
              border: 'none',
              cursor: input.trim() && !loading && token ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
          >
            <Send size={14} color={input.trim() && !loading && token ? '#fff' : '#9CA3AF'} />
          </button>
        </div>
        <p style={{ fontSize: 10, color: '#9CA3AF', textAlign: 'center', margin: '8px 0 0' }}>
          StudyAI · JEE · NEET · UPSC · SSC
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AIDoubtSolver;