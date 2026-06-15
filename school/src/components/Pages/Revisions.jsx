import React from 'react';
import {
  ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight,
  Brain, BookOpen, Zap, RotateCcw, CheckCircle2, XCircle,
  Search, Trophy, Plus, X, Edit2, Trash2, Save, Bookmark,
} from 'lucide-react';

const INITIAL_DECKS = [
  {
    id: 1, subject: 'Physics', color: '#185FA5', bg: '#E6F1FB', border: '#B5D4F4',
    topics: [],
    cards: [],
  },
  {
    id: 2, subject: 'Chemistry', color: '#0F6E56', bg: '#EAF3DE', border: '#C0DD97',
    topics: [],
    cards: [],
  },
  {
    id: 3, subject: 'Mathematics', color: '#7C3AED', bg: '#F3EEFF', border: '#D4C0F4',
    topics: [],
    cards: [],
  },
];

const TYPE_META = {
  formula: { label: 'Formula',        color: '#185FA5', bg: '#E6F1FB' },
  concept: { label: 'Concept',        color: '#0F6E56', bg: '#EAF3DE' },
  trap:    { label: 'Common Mistake', color: '#B91C1C', bg: '#FEE2E2' },
};

const DIFF_META = {
  easy:   { label: 'Easy',   color: '#0F6E56', bg: '#EAF3DE' },
  medium: { label: 'Medium', color: '#854F0B', bg: '#FAEEDA' },
  hard:   { label: 'Hard',   color: '#B91C1C', bg: '#FEE2E2' },
};

const TAG_COLOR = {
  'Must Know':             { color: '#185FA5', bg: '#E6F1FB' },
  'High Weightage':        { color: '#0F6E56', bg: '#EAF3DE' },
  'Common Mistake':        { color: '#B91C1C', bg: '#FEE2E2' },
  'My Custom Card':        { color: '#7C3AED', bg: '#F3EEFF' },
};

const card = {
  background: '#fff', borderRadius: 14, border: '0.5px solid #e2e8f0',
  boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
};

const pill = (color, bg, text) => (
  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 99, background: bg, color, letterSpacing: '0.03em', display: 'inline-block' }}>
    {text}
  </span>
);

const AddCardModal = ({ isOpen, onClose, onSubmit, deckColor, editingCard = null }) => {
  const [form, setForm] = React.useState({
    front: '',
    back: '',
    type: 'formula',
    difficulty: 'medium',
    topic: 'General',
    tag: 'My Custom Card',
    examTags: 'JEE Main',
  });

  React.useEffect(() => {
    if (editingCard) {
      setForm({
        front: editingCard.front,
        back: editingCard.back,
        type: editingCard.type,
        difficulty: editingCard.difficulty,
        topic: editingCard.topic,
        tag: editingCard.tag,
        examTags: editingCard.examTags.join(', '),
      });
    } else {
      setForm({
        front: '',
        back: '',
        type: 'formula',
        difficulty: 'medium',
        topic: 'General',
        tag: 'My Custom Card',
        examTags: 'JEE Main',
      });
    }
  }, [editingCard, isOpen]);

  const handleSubmit = () => {
    if (!form.front.trim() || !form.back.trim()) {
      alert('Question and answer are required!');
      return;
    }
    onSubmit(form);
    setForm({
      front: '',
      back: '',
      type: 'formula',
      difficulty: 'medium',
      topic: 'General',
      tag: 'My Custom Card',
      examTags: 'JEE Main',
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000, padding: '1rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        maxWidth: 600, width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', margin: 0 }}>
            {editingCard ? 'Edit Card' : 'Create New Card'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <X size={20} color="#64748b" />
          </button>
        </div>

        {/* Question */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 6 }}>
            Question / Front Side *
          </label>
          <textarea
            value={form.front}
            onChange={e => setForm({ ...form, front: e.target.value })}
            placeholder="e.g., What is Newton's Second Law?"
            style={{
              width: '100%', minHeight: 70, padding: '10px 12px', fontSize: 13,
              borderRadius: 10, border: '0.5px solid #e2e8f0', outline: 'none',
              fontFamily: 'inherit', boxSizing: 'border-box', color: '#0f172a',
            }}
          />
        </div>

        {/* Answer */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 6 }}>
            Answer / Back Side *
          </label>
          <textarea
            value={form.back}
            onChange={e => setForm({ ...form, back: e.target.value })}
            placeholder="e.g., F = ma\n\nNet force = mass × acceleration..."
            style={{
              width: '100%', minHeight: 100, padding: '10px 12px', fontSize: 13,
              borderRadius: 10, border: '0.5px solid #e2e8f0', outline: 'none',
              fontFamily: 'inherit', boxSizing: 'border-box', color: '#0f172a',
            }}
          />
        </div>

        {/* Type */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 6 }}>
            Card Type
          </label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            style={{
              width: '100%', padding: '8px 12px', fontSize: 13, borderRadius: 10,
              border: '0.5px solid #e2e8f0', outline: 'none', color: '#0f172a',
              background: '#f8fafc',
            }}
          >
            <option value="formula">Formula</option>
            <option value="concept">Concept</option>
            <option value="trap">Common Mistake</option>
          </select>
        </div>

        {/* Difficulty */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 6 }}>
            Difficulty
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['easy', 'medium', 'hard'].map(d => (
              <button
                key={d}
                onClick={() => setForm({ ...form, difficulty: d })}
                style={{
                  flex: 1, padding: '8px 12px', borderRadius: 10, fontSize: 12, fontWeight: 500,
                  border: form.difficulty === d ? `0.5px solid ${DIFF_META[d].color}` : '0.5px solid #e2e8f0',
                  background: form.difficulty === d ? DIFF_META[d].bg : '#f8fafc',
                  color: form.difficulty === d ? DIFF_META[d].color : '#64748b',
                  cursor: 'pointer',
                }}
              >
                {DIFF_META[d].label}
              </button>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 6 }}>
            Topic
          </label>
          <input
            type="text"
            value={form.topic}
            onChange={e => setForm({ ...form, topic: e.target.value })}
            placeholder="e.g., Mechanics, Organic Chemistry..."
            style={{
              width: '100%', padding: '8px 12px', fontSize: 13, borderRadius: 10,
              border: '0.5px solid #e2e8f0', outline: 'none', color: '#0f172a',
              background: '#f8fafc', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Exam Tags */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 6 }}>
            Exam Tags (comma separated)
          </label>
          <input
            type="text"
            value={form.examTags}
            onChange={e => setForm({ ...form, examTags: e.target.value })}
            placeholder="e.g., JEE Main, NEET, UPSC"
            style={{
              width: '100%', padding: '8px 12px', fontSize: 13, borderRadius: 10,
              border: '0.5px solid #e2e8f0', outline: 'none', color: '#0f172a',
              background: '#f8fafc', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px', borderRadius: 10, border: '0.5px solid #e2e8f0',
              background: '#f8fafc', color: '#64748b', fontSize: 13, fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: '10px 20px', borderRadius: 10, border: 'none',
              background: deckColor, color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <Save size={14} /> {editingCard ? 'Update Card' : 'Add Card'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Revisions = () => {
  const [decks, setDecks] = React.useState(() => {
    try {
      const saved = localStorage.getItem('flashcard-decks');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
    } catch (e) {
      console.log('Could not load saved decks');
    }
    return INITIAL_DECKS;
  });

  const [savedCards, setSavedCards] = React.useState(() => {
    try {
      const saved = localStorage.getItem('saved-flashcards');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.log('Could not load saved cards');
    }
    return new Set();
  });

  const [activeDeckId, setActiveDeckId]   = React.useState(1);
  const [filterType,   setFilterType]     = React.useState('all');
  const [filterDiff,   setFilterDiff]     = React.useState('all');
  const [filterExam,   setFilterExam]     = React.useState('all');
  const [search,       setSearch]         = React.useState('');
  const [cardIdx,      setCardIdx]        = React.useState(0);
  const [flipped,      setFlipped]        = React.useState(false);
  const [results,      setResults]        = React.useState({});
  const [sessionDone,  setSessionDone]    = React.useState(false);
  const [view,         setView]           = React.useState('study');
  const [showAddModal, setShowAddModal]   = React.useState(false);
  const [editingCard,  setEditingCard]    = React.useState(null);
  const [showSaved,    setShowSaved]      = React.useState(false);

  const deck = decks.find(d => d.id === activeDeckId);
  const allExams = ['all', 'JEE Main', 'JEE Advanced', 'NEET', 'UPSC', 'SSC', 'Bank PO', 'CAT'];

  const saveDecks = (newDecks) => {
    setDecks(newDecks);
    try {
      localStorage.setItem('flashcard-decks', JSON.stringify(newDecks));
    } catch (e) {
      console.log('Could not save decks to localStorage');
    }
  };

  const saveSavedCards = (newSaved) => {
    setSavedCards(newSaved);
    try {
      localStorage.setItem('saved-flashcards', JSON.stringify(Array.from(newSaved)));
    } catch (e) {
      console.log('Could not save saved cards');
    }
  };

  const toggleSaveCard = (cardId) => {
    const newSaved = new Set(savedCards);
    if (newSaved.has(cardId)) {
      newSaved.delete(cardId);
    } else {
      newSaved.add(cardId);
    }
    saveSavedCards(newSaved);
  };

  const handleAddOrUpdateCard = (formData) => {
    const examTagsArray = formData.examTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t);

    const newDecks = decks.map(d => {
      if (d.id === activeDeckId) {
        if (editingCard) {
          // Update existing card
          return {
            ...d,
            cards: d.cards.map(c =>
              c.id === editingCard.id
                ? {
                    ...editingCard,
                    front: formData.front,
                    back: formData.back,
                    type: formData.type,
                    difficulty: formData.difficulty,
                    topic: formData.topic,
                    tag: formData.tag,
                    examTags: examTagsArray,
                  }
                : c
            ),
          };
        } else {
          // Add new card
          const newCard = {
            id: `card-${Date.now()}`,
            front: formData.front,
            back: formData.back,
            type: formData.type,
            difficulty: formData.difficulty,
            topic: formData.topic,
            tag: formData.tag,
            examTags: examTagsArray,
          };
          return {
            ...d,
            cards: [...d.cards, newCard],
          };
        }
      }
      return d;
    });

    saveDecks(newDecks);
    setShowAddModal(false);
    setEditingCard(null);
  };

  const deleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const newDecks = decks.map(d => {
        if (d.id === activeDeckId) {
          return {
            ...d,
            cards: d.cards.filter(c => c.id !== cardId),
          };
        }
        return d;
      });
      saveDecks(newDecks);
      if (cardIdx >= deck.cards.length - 1) {
        setCardIdx(Math.max(0, cardIdx - 1));
      }
    }
  };

  const getAllSavedCards = () => {
    const allCards = [];
    decks.forEach(d => {
      d.cards.forEach(c => {
        if (savedCards.has(c.id)) {
          allCards.push({ ...c, deckName: d.subject, deckColor: d.color });
        }
      });
    });
    return allCards;
  };

  const filtered = deck.cards.filter(c => {
    const typeOk   = filterType === 'all' || c.type === filterType;
    const diffOk   = filterDiff === 'all' || c.difficulty === filterDiff;
    const examOk   = filterExam === 'all' || (c.examTags && c.examTags.includes(filterExam));
    const searchOk = search === '' || c.front.toLowerCase().includes(search.toLowerCase()) || c.topic.toLowerCase().includes(search.toLowerCase());
    return typeOk && diffOk && examOk && searchOk;
  });

  const current       = filtered[cardIdx];
  const total         = filtered.length;
  const done          = Object.keys(results).filter(id => filtered.find(c => c.id === id)).length;
  const progress      = total ? Math.round((cardIdx / total) * 100) : 0;

  const goNext = () => {
    setFlipped(false);
    if (cardIdx < total - 1) setCardIdx(cardIdx + 1);
    else setSessionDone(true);
  };
  const goPrev = () => { setFlipped(false); if (cardIdx > 0) setCardIdx(cardIdx - 1); };

  const rate = (rating) => {
    setResults(r => ({ ...r, [current.id]: rating }));
    goNext();
  };

  const resetSession = () => {
    setCardIdx(0); setFlipped(false); setResults({}); setSessionDone(false);
  };

  const changeDeck = (id) => {
    setActiveDeckId(id); setCardIdx(0); setFlipped(false);
    setResults({}); setSessionDone(false); setFilterType('all');
    setFilterDiff('all'); setFilterExam('all'); setSearch('');
  };

  const typeMeta = current ? TYPE_META[current.type] : null;
  const diffMeta = current ? DIFF_META[current.difficulty] : null;
  const tagStyle = current ? (TAG_COLOR[current.tag] ?? { color: '#475569', bg: '#f1f5f9' }) : {};

  const allSavedCards = getAllSavedCards();
  const isCurrentCardSaved = current && savedCards.has(current.id);

  if (showSaved) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '2.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 500, color: '#0f172a', marginBottom: 3 }}>Saved Cards</h1>
            <p style={{ fontSize: 13, color: '#64748b' }}>{allSavedCards.length} card{allSavedCards.length !== 1 ? 's' : ''} saved</p>
          </div>
          <button
            onClick={() => setShowSaved(false)}
            style={{
              padding: '8px 16px', borderRadius: 10, background: '#f1f5f9', border: '0.5px solid #e2e8f0',
              color: '#475569', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}
          >
            ← Back to Study
          </button>
        </div>

        {/* Saved cards grid */}
        {allSavedCards.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {allSavedCards.map(c => (
              <div key={c.id} style={{ ...card, padding: '1.25rem', borderTop: `3px solid ${c.deckColor}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 6, background: c.deckColor + '20', color: c.deckColor }}>
                    {c.deckName}
                  </span>
                  <button
                    onClick={() => toggleSaveCard(c.id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                      color: '#534AB7',
                    }}
                  >
                    <Bookmark size={16} fill="#534AB7" color="#534AB7" />
                  </button>
                </div>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 10, lineHeight: 1.3 }}>
                  {c.front}
                </h3>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: 10, marginBottom: 12 }}>
                  <pre style={{ fontFamily: 'inherit', fontSize: 12, color: '#1e293b', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0, textAlign: 'left' }}>
                    {c.back}
                  </pre>
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  {pill(TYPE_META[c.type].color, TYPE_META[c.type].bg, TYPE_META[c.type].label)}
                  {pill(DIFF_META[c.difficulty].color, DIFF_META[c.difficulty].bg, DIFF_META[c.difficulty].label)}
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {c.examTags.map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 99, background: '#f1f5f9', color: '#475569' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ ...card, padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <Bookmark size={32} color="#cbd5e1" style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p style={{ fontSize: 14, marginBottom: 8 }}>No saved cards yet</p>
            <p style={{ fontSize: 12 }}>Click the bookmark icon on any card to save it</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '2.5rem' }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: '#0f172a', marginBottom: 3 }}>Revisions</h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>Smart flashcards · JEE · NEET · UPSC · SSC · CAT · Bank PO</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Saved cards button */}
          <button
            onClick={() => setShowSaved(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
              background: '#EEEDFE', border: '0.5px solid #AFA9EC', borderRadius: 10,
              color: '#534AB7', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            <Bookmark size={15} fill="#534AB7" />
            {allSavedCards.length}
          </button>
          <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 10, padding: 3, gap: 2 }}>
            {[['study', 'Study'], ['overview', 'Overview']].map(([v, l]) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: 'none',
                background: view === v ? '#fff' : 'transparent',
                color: view === v ? '#0f172a' : '#64748b',
                boxShadow: view === v ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Subject tabs + Add button */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {decks.map(d => (
          <button key={d.id} onClick={() => changeDeck(d.id)} style={{
            padding: '7px 16px', borderRadius: 10, border: `0.5px solid ${activeDeckId === d.id ? d.color : '#e2e8f0'}`,
            background: activeDeckId === d.id ? d.bg : '#f8fafc',
            color: activeDeckId === d.id ? d.color : '#475569',
            fontSize: 13, fontWeight: activeDeckId === d.id ? 600 : 500, cursor: 'pointer',
            transition: 'all 0.15s',
          }}>
            {d.subject}
          </button>
        ))}
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '7px 16px', borderRadius: 10, border: `0.5px solid ${deck.color}`,
            background: 'transparent',
            color: deck.color,
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.15s',
          }}
        >
          <Plus size={15} /> Add Card
        </button>
      </div>

      {/* Filters row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>

        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={13} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setCardIdx(0); setSessionDone(false); }}
            placeholder="Search cards…"
            style={{ width: '100%', padding: '8px 12px 8px 30px', fontSize: 12, borderRadius: 10, border: '0.5px solid #e2e8f0', outline: 'none', background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
          />
        </div>

        {/* Type filter */}
        <div style={{ display: 'flex', gap: 5 }}>
          {[['all', 'All'], ['formula', 'Formulas'], ['concept', 'Concepts'], ['trap', 'Traps']].map(([v, l]) => (
            <button key={v} onClick={() => { setFilterType(v); setCardIdx(0); setFlipped(false); setSessionDone(false); }} style={{
              padding: '6px 12px', borderRadius: 99, border: `0.5px solid ${filterType === v ? '#185FA5' : '#e2e8f0'}`,
              background: filterType === v ? '#E6F1FB' : 'transparent',
              color: filterType === v ? '#185FA5' : '#64748b',
              fontSize: 12, fontWeight: 500, cursor: 'pointer',
            }}>{l}</button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div style={{ display: 'flex', gap: 5 }}>
          {[['all', 'All levels'], ['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']].map(([v, l]) => {
            const m = DIFF_META[v] ?? { color: '#64748b', bg: 'transparent' };
            return (
              <button key={v} onClick={() => { setFilterDiff(v); setCardIdx(0); setFlipped(false); setSessionDone(false); }} style={{
                padding: '6px 12px', borderRadius: 99,
                border: `0.5px solid ${filterDiff === v ? m.color : '#e2e8f0'}`,
                background: filterDiff === v ? m.bg : 'transparent',
                color: filterDiff === v ? m.color : '#64748b',
                fontSize: 12, fontWeight: 500, cursor: 'pointer',
              }}>{l}</button>
            );
          })}
        </div>

        {/* Exam filter */}
        <select
          value={filterExam}
          onChange={e => { setFilterExam(e.target.value); setCardIdx(0); setFlipped(false); setSessionDone(false); }}
          style={{ padding: '7px 12px', fontSize: 12, borderRadius: 10, border: '0.5px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', outline: 'none', cursor: 'pointer' }}
        >
          {allExams.map(e => <option key={e} value={e}>{e === 'all' ? 'All exams' : e}</option>)}
        </select>
      </div>

      {/* Result count */}
      <p style={{ fontSize: 12, color: '#94a3b8', marginTop: -8 }}>
        Showing {total} card{total !== 1 ? 's' : ''} {search && `matching "${search}"`}
      </p>

      {view === 'overview' ? (
        /* ── Overview mode ── */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {decks.map(d => {
            const mastered  = d.cards.filter(c => results[c.id] === 'easy').length;
            const pct = d.cards.length ? Math.round(mastered / d.cards.length * 100) : 0;
            return (
              <div key={d.id} style={{ ...card, padding: '1rem 1.25rem', borderLeft: `3px solid ${d.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BookOpen size={14} color={d.color} />
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{d.subject}</p>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: d.color }}>{pct}%</span>
                </div>
                <div style={{ height: 5, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden', marginBottom: 10 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: d.color, borderRadius: 99 }} />
                </div>
                <p style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>
                  {d.cards.length} cards
                </p>
                <button onClick={() => { changeDeck(d.id); setView('study'); }} style={{
                  width: '100%', padding: '8px 0', background: activeDeckId === d.id ? d.color : d.bg,
                  border: `0.5px solid ${d.color}60`, borderRadius: 10,
                  fontSize: 13, fontWeight: 500, color: activeDeckId === d.id ? '#fff' : d.color, cursor: 'pointer',
                }}>
                  {activeDeckId === d.id ? 'Currently studying' : 'Study now'}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Study mode ── */
        <>
          {!sessionDone && current ? (
            <div style={card}>
              <div style={{ padding: '0.9rem 1.25rem', borderBottom: '0.5px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  {pill(typeMeta.color, typeMeta.bg, typeMeta.label)}
                  {pill(diffMeta.color, diffMeta.bg, diffMeta.label)}
                  {pill(tagStyle.color, tagStyle.bg, current.tag)}
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{current.topic}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* Save button */}
                  <button
                    onClick={() => toggleSaveCard(current.id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                      color: isCurrentCardSaved ? '#534AB7' : '#cbd5e1',
                    }}
                    title="Save this card"
                  >
                    <Bookmark size={16} fill={isCurrentCardSaved ? '#534AB7' : 'none'} color={isCurrentCardSaved ? '#534AB7' : '#cbd5e1'} />
                  </button>

                  {/* Edit & Delete buttons for custom cards */}
                  {current.tag === 'My Custom Card' && (
                    <>
                      <button
                        onClick={() => {
                          setEditingCard(current);
                          setShowAddModal(true);
                        }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                          color: '#64748b', display: 'flex', alignItems: 'center',
                        }}
                        title="Edit this card"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteCard(current.id)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                          color: '#B91C1C', display: 'flex', alignItems: 'center',
                        }}
                        title="Delete this card"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}

                  {current.examTags?.map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 99, background: '#f1f5f9', color: '#475569' }}>{t}</span>
                  ))}
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{cardIdx + 1} / {total}</span>
                </div>
              </div>

              <div style={{ padding: '1.25rem' }}>

                {/* Card face */}
                <div
                  onClick={() => setFlipped(!flipped)}
                  style={{
                    minHeight: 240, borderRadius: 12, padding: '2rem',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', userSelect: 'none', textAlign: 'center',
                    background: flipped ? (current.type === 'trap' ? '#FEF2F2' : '#EAF3DE') : '#F8FAFC',
                    border: flipped ? (current.type === 'trap' ? '1px solid #FECACA' : '1px solid #C0DD97') : '1px solid #e2e8f0',
                    transition: 'background 0.25s, border-color 0.25s',
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: flipped ? '#0F6E56' : '#185FA5', marginBottom: 16 }}>
                    {flipped ? <CheckCircle2 size={13} /> : <Zap size={13} />}
                    {flipped ? 'Answer' : 'Question — tap to reveal'}
                  </div>
                  <p style={{ fontSize: 19, fontWeight: 500, color: '#0f172a', marginBottom: 14, lineHeight: 1.4 }}>
                    {current.front}
                  </p>
                  {flipped && (
                    <pre style={{ fontFamily: 'inherit', fontSize: 13, color: '#1e293b', lineHeight: 1.7, whiteSpace: 'pre-wrap', textAlign: 'center', margin: 0, marginTop: 8, background: 'rgba(255,255,255,0.6)', padding: '0.75rem 1rem', borderRadius: 8, width: '100%', boxSizing: 'border-box' }}>
                      {current.back}
                    </pre>
                  )}
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button onClick={goPrev} disabled={cardIdx === 0} style={{ flex: 1, padding: '9px 0', borderRadius: 10, border: '0.5px solid #e2e8f0', background: '#f8fafc', cursor: cardIdx === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 13, color: '#64748b', opacity: cardIdx === 0 ? 0.4 : 1 }}>
                    <ChevronLeft size={15} /> Prev
                  </button>
                  <button onClick={goNext} style={{ flex: 1, padding: '9px 0', borderRadius: 10, border: '0.5px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 13, color: '#64748b' }}>
                    Skip <ChevronRight size={15} />
                  </button>
                </div>

                {/* Confidence buttons */}
                {flipped && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button onClick={() => rate('hard')} style={{ flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer', background: '#FEE2E2', border: '0.5px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#B91C1C' }}>
                      <ThumbsDown size={14} /> Hard
                    </button>
                    <button onClick={() => rate('medium')} style={{ flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer', background: '#FEF3C7', border: '0.5px solid #FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#92400E' }}>
                      Getting there
                    </button>
                    <button onClick={() => rate('easy')} style={{ flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer', background: '#EAF3DE', border: '0.5px solid #C0DD97', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#0F6E56' }}>
                      <ThumbsUp size={14} /> Got it
                    </button>
                  </div>
                )}

                {/* Progress */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>
                    <span>Session progress</span>
                    <span>{done}/{total} done</span>
                  </div>
                  <div style={{ height: 5, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: deck.color, borderRadius: 99, transition: 'width 0.3s' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : sessionDone ? (
            <div style={{ ...card, padding: '2.5rem', textAlign: 'center' }}>
              <Trophy size={40} color="#854F0B" style={{ marginBottom: 12 }} />
              <h2 style={{ fontSize: 20, fontWeight: 500, color: '#0f172a', marginBottom: 8 }}>Session complete!</h2>
              <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>
                {total} cards reviewed
              </p>
              <button onClick={resetSession} style={{ padding: '10px 24px', borderRadius: 10, background: deck.bg, border: `0.5px solid ${deck.border}`, color: deck.color, fontWeight: 500, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto' }}>
                <RotateCcw size={14} /> Study again
              </button>
            </div>
          ) : (
            <div style={{ ...card, padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
              No cards in this deck. Click <strong>"+ Add Card"</strong> to get started!
            </div>
          )}
        </>
      )}

      {/* Modal */}
      <AddCardModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingCard(null);
        }}
        onSubmit={handleAddOrUpdateCard}
        deckColor={deck?.color}
        editingCard={editingCard}
      />
    </div>
  );
};

export default Revisions;