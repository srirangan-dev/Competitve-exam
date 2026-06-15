import React, { useEffect, useState } from 'react';
import { Filter, Bookmark, BookmarkCheck, RotateCcw, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useQuestionBankStore } from '../../store';
import { QUESTION_BANK, EXAM_OPTIONS, SUBJECT_OPTIONS, DIFFICULTY_OPTIONS, getTopicsForSubject } from '../../data/questionBankData';

const difficultyColor = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
};

const QuestionBank = () => {
  const { filters, setFilter, resetFilters, getFilteredQuestions, setQuestions, bookmarked, toggleBookmark } = useQuestionBankStore();
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  useEffect(() => {
    setQuestions(QUESTION_BANK);
  }, [setQuestions]);

  const topicOptions = getTopicsForSubject(filters.subject);

  const handleSubjectChange = (value) => {
    setFilter('subject', value);
    setFilter('topic', 'All');
  };

  const filteredQuestions = getFilteredQuestions().filter((q) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBookmark = !showBookmarkedOnly || bookmarked.includes(q.id);
    return matchesSearch && matchesBookmark;
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Question Bank</h1>
        <p className="text-sm text-gray-500 mt-1">
          Practice previous-year and topic-wise questions across JEE, NEET, CAT, GATE, UPSC, SSC, and Banking exams.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by question text or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
        />
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
          <Filter size={16} /> Filters
          <button
            onClick={() => setShowBookmarkedOnly((s) => !s)}
            className={`ml-auto flex items-center gap-1 text-xs px-2 py-1 rounded-full transition ${
              showBookmarkedOnly ? 'bg-[#185FA5] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark size={12} /> Bookmarked only
          </button>
          <button
            onClick={() => { resetFilters(); setSearchTerm(''); setShowBookmarkedOnly(false); }}
            className="flex items-center gap-1 text-xs text-[#185FA5] hover:underline"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Exam</label>
            <select
              value={filters.exam}
              onChange={(e) => setFilter('exam', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
            >
              {EXAM_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Subject</label>
            <select
              value={filters.subject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
            >
              {SUBJECT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Topic</label>
            <select
              value={filters.topic}
              onChange={(e) => setFilter('topic', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
            >
              {topicOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilter('difficulty', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
            >
              {DIFFICULTY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-3">{filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} found</p>

      {/* Questions list */}
      <div className="space-y-3">
        {filteredQuestions.map((q, idx) => {
          const isExpanded = expandedId === q.id;
          const isBookmarked = bookmarked.includes(q.id);

          return (
            <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-[#185FA5] bg-[#E6F1FB] px-2 py-0.5 rounded-full">{q.exam}</span>
                    <span className="text-xs text-gray-500">{q.subject} • {q.topic}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">{idx + 1}. {q.question}</p>
                </div>
                <button onClick={() => toggleBookmark(q.id)} className="text-gray-400 hover:text-[#185FA5] flex-shrink-0">
                  {isBookmarked ? <BookmarkCheck size={18} className="text-[#185FA5]" /> : <Bookmark size={18} />}
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`text-sm px-3 py-2 rounded-lg border ${
                      isExpanded && i === q.correctAnswer
                        ? 'border-green-300 bg-green-50 text-green-800 font-medium'
                        : 'border-gray-100 bg-gray-50 text-gray-600'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="flex items-center gap-1 text-xs text-[#185FA5] mt-3 hover:underline"
              >
                {isExpanded ? <>Hide answer <ChevronUp size={14} /></> : <>Show answer <ChevronDown size={14} /></>}
              </button>

              {isExpanded && (
                <div className="mt-2 text-sm text-gray-600 bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                  <span className="font-medium text-gray-800">Explanation: </span>{q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            No questions match the selected filters. Try resetting filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;