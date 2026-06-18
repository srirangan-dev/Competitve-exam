import { create } from 'zustand';

// ✅ FIXED: Use environment variable or Render backend URL
const API_BASE = process.env.REACT_APP_API_URL || 'https://competitve-exam.onrender.com/api';

// ===== Auth Store =====
export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  token: localStorage.getItem('token') || null,

  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.message || 'Login failed' };
      }
      set({ user: data.user, isAuthenticated: true, token: data.token });
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', data.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Cannot reach server. Is the backend running?' };
    }
  },

  signup: async (form) => {
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          exam: form.exam,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        const errorMsg = data.errors?.[0]?.msg || data.message || 'Signup failed';
        return { success: false, error: errorMsg };
      }
      set({ user: data.user, isAuthenticated: true, token: data.token });
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', data.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Cannot reach server. Is the backend running?' };
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, token: null });
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
  },

  updateProfile: (updatedUser) => {
    set({ user: updatedUser });
    localStorage.setItem('user', JSON.stringify(updatedUser));
  },
}));

// ===== Theme Store =====
export const useThemeStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  darkMode: false,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
}));

// ===== Exam (Mock Test) Store =====
export const useExamStore = create((set) => ({
  currentTest: null,
  answers: {},
  testProgress: 0,
  timeRemaining: 0,
  testHistory: [],
  startTest:        (test)      => set({ currentTest: test, answers: {}, testProgress: 0 }),
  updateAnswer:     (qId, ans)  => set((s) => ({ answers: { ...s.answers, [qId]: ans } })),
  submitTest:       (results)   => set((s) => ({ currentTest: null, answers: {}, testProgress: 0, testHistory: [...s.testHistory, results] })),
  setTimeRemaining: (time)      => set({ timeRemaining: time }),
}));

// ===== Study Plan Store =====
export const useStudyPlanStore = create((set) => ({
  studyPlan: [],
  completedTopics: [],
  completeTask: (taskId) => set((s) => ({ completedTopics: [...s.completedTopics, taskId] })),
  updatePlan:   (plan)   => set({ studyPlan: plan }),
}));

// ===== Doubt Store =====
export const useDoubtStore = create((set) => ({
  doubts: [],
  addDoubt: (doubt) => set((s) => ({ doubts: [...s.doubts, doubt] })),
}));

// ===== Notification Store =====
export const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (n) => set((s) => ({ notifications: [...s.notifications, n] })),
}));

// ===== Notes Store =====
export const useNotesStore = create((set, get) => ({
  notes: JSON.parse(localStorage.getItem('studyNotes')) || [],

  addNote: (note) => {
    const newNote = {
      id: Date.now(),
      title:     note.title,
      content:   note.content,
      subject:   note.subject,
      topic:     note.topic,
      tags:      note.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const notes = [...get().notes, newNote];
    set({ notes });
    localStorage.setItem('studyNotes', JSON.stringify(notes));
    return newNote;
  },

  updateNote: (id, updates) => {
    const notes = get().notes.map((n) =>
      n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
    );
    set({ notes });
    localStorage.setItem('studyNotes', JSON.stringify(notes));
  },

  deleteNote: (id) => {
    const notes = get().notes.filter((n) => n.id !== id);
    set({ notes });
    localStorage.setItem('studyNotes', JSON.stringify(notes));
  },

  getNotesByTopic: (subject, topic) =>
    get().notes.filter((n) => n.subject === subject && n.topic === topic),
}));

// ===== Question Bank Store =====
export const useQuestionBankStore = create((set, get) => ({
  questions: [],
  filters: { exam: 'All', subject: 'All', topic: 'All', difficulty: 'All' },
  bookmarked: JSON.parse(localStorage.getItem('bookmarkedQuestions')) || [],

  setQuestions:  (questions) => set({ questions }),
  setFilter:     (key, val)  => set((s) => ({ filters: { ...s.filters, [key]: val } })),
  resetFilters:  ()          => set({ filters: { exam: 'All', subject: 'All', topic: 'All', difficulty: 'All' } }),

  getFilteredQuestions: () => {
    const { questions, filters } = get();
    return questions.filter((q) =>
      (filters.exam       === 'All' || q.exam       === filters.exam)       &&
      (filters.subject    === 'All' || q.subject    === filters.subject)    &&
      (filters.topic      === 'All' || q.topic      === filters.topic)      &&
      (filters.difficulty === 'All' || q.difficulty === filters.difficulty)
    );
  },

  toggleBookmark: (id) => {
    const bookmarked = get().bookmarked.includes(id)
      ? get().bookmarked.filter((b) => b !== id)
      : [...get().bookmarked, id];
    set({ bookmarked });
    localStorage.setItem('bookmarkedQuestions', JSON.stringify(bookmarked));
  },
}));

// ===== Exam Selector / Subject Config =====
export const EXAM_SUBJECTS = {
  'JEE Advanced 2025': [
    { key: 'physics',     name: 'Physics',     color: '#185FA5' },
    { key: 'chemistry',   name: 'Chemistry',   color: '#0F6E56' },
    { key: 'mathematics', name: 'Mathematics', color: '#854F0B' },
  ],
  'NEET 2025': [
    { key: 'physics',   name: 'Physics',   color: '#185FA5' },
    { key: 'chemistry', name: 'Chemistry', color: '#0F6E56' },
    { key: 'biology',   name: 'Biology',   color: '#534AB7' },
  ],
  'UPSC CSE 2025': [
    { key: 'history',   name: 'History',   color: '#185FA5' },
    { key: 'polity',    name: 'Polity',    color: '#0F6E56' },
    { key: 'geography', name: 'Geography', color: '#854F0B' },
    { key: 'economy',   name: 'Economy',   color: '#534AB7' },
  ],
  'SSC CGL 2025': [
    { key: 'quant',     name: 'Quantitative Aptitude', color: '#185FA5' },
    { key: 'reasoning', name: 'Reasoning',             color: '#0F6E56' },
    { key: 'english',   name: 'English',               color: '#854F0B' },
  ],
  'CAT 2025': [
    { key: 'quant',  name: 'Quantitative Aptitude', color: '#185FA5' },
    { key: 'verbal', name: 'Verbal Ability',         color: '#0F6E56' },
    { key: 'di',     name: 'Data Interpretation',   color: '#854F0B' },
  ],
  'GATE CS 2025': [
    { key: 'cs',       name: 'Computer Science',  color: '#185FA5' },
    { key: 'maths',    name: 'Engineering Maths', color: '#0F6E56' },
    { key: 'aptitude', name: 'General Aptitude',  color: '#854F0B' },
  ],
};

export const EXAM_LIST = Object.keys(EXAM_SUBJECTS);

export const useExamSelectorStore = create((set) => ({
  selectedExam: localStorage.getItem('selectedExam') || 'JEE Advanced 2025',
  setSelectedExam: (exam) => {
    set({ selectedExam: exam });
    localStorage.setItem('selectedExam', exam);
  },
}));

// ===== Dashboard Stats Store =====
export const useDashboardStore = create((set, get) => ({
  examData: JSON.parse(localStorage.getItem('dashboardExamData')) || {
    'JEE Advanced 2025': {
      streak: 12, todayStudy: '2.5h', percentile: 87, daysToExam: 45,
      testsCompleted: 24, testsThisWeek: 3, accuracy: 76, accuracyDelta: 4,
      rank: 4520, totalStudyTime: '142h',
      weeklyScores: [62, 70, 58, 80, 75, 88, 92],
      subjectMastery: { physics: 72, chemistry: 65, mathematics: 80 },
      upcomingTests: [
        { id: 1, name: 'Physics: Electrostatics', subject: 'Physics', date: 'Tomorrow',  duration: '60m',  questions: 25 },
        { id: 2, name: 'Full Mock Test 4',         subject: 'Math',   date: 'In 3 days', duration: '180m', questions: 75 },
      ],
      recentActivity: [
        { label: 'Completed Chemistry mock test', meta: '2h ago',   dotColor: '#0F6E56' },
        { label: 'Updated study plan',            meta: '5h ago',   dotColor: '#185FA5' },
        { label: 'Solved 12 doubt questions',     meta: 'Yesterday', dotColor: '#854F0B' },
      ],
    },
    'NEET 2025': {
      streak: 8, todayStudy: '3h', percentile: 91, daysToExam: 60,
      testsCompleted: 18, testsThisWeek: 2, accuracy: 82, accuracyDelta: 6,
      rank: 1850, totalStudyTime: '98h',
      weeklyScores: [70, 75, 68, 85, 90, 78, 95],
      subjectMastery: { physics: 60, chemistry: 70, biology: 88 },
      upcomingTests: [
        { id: 1, name: 'Biology: Genetics', subject: 'Biology', date: 'Tomorrow',  duration: '45m',  questions: 25  },
        { id: 2, name: 'NEET Full Mock 3',  subject: 'Mixed',   date: 'In 2 days', duration: '200m', questions: 180 },
      ],
      recentActivity: [
        { label: 'Completed Biology mock test', meta: '1h ago', dotColor: '#534AB7' },
        { label: 'Reviewed Physics notes',      meta: '4h ago', dotColor: '#185FA5' },
      ],
    },
    'UPSC CSE 2025': {
      streak: 20, todayStudy: '4h', percentile: 70, daysToExam: 120,
      testsCompleted: 10, testsThisWeek: 1, accuracy: 65, accuracyDelta: 2,
      rank: 8900, totalStudyTime: '210h',
      weeklyScores: [55, 60, 58, 65, 62, 70, 68],
      subjectMastery: { history: 55, polity: 70, geography: 60, economy: 50 },
      upcomingTests: [
        { id: 1, name: 'Prelims GS Mock 2', subject: 'GS', date: 'In 4 days', duration: '120m', questions: 100 },
      ],
      recentActivity: [
        { label: 'Completed Polity mock test',  meta: '3h ago',    dotColor: '#0F6E56' },
        { label: 'Read Current Affairs digest', meta: 'Yesterday', dotColor: '#854F0B' },
      ],
    },
    'SSC CGL 2025': {
      streak: 5, todayStudy: '1.5h', percentile: 60, daysToExam: 30,
      testsCompleted: 14, testsThisWeek: 4, accuracy: 71, accuracyDelta: 3,
      rank: 12000, totalStudyTime: '60h',
      weeklyScores: [50, 55, 60, 58, 65, 70, 72],
      subjectMastery: { quant: 68, reasoning: 75, english: 60 },
      upcomingTests: [
        { id: 1, name: 'SSC CGL Tier-I Mock', subject: 'Mixed', date: 'Tomorrow', duration: '60m', questions: 100 },
      ],
      recentActivity: [
        { label: 'Completed Reasoning practice set', meta: '2h ago', dotColor: '#0F6E56' },
      ],
    },
    'CAT 2025': {
      streak: 15, todayStudy: '2h', percentile: 85, daysToExam: 90,
      testsCompleted: 16, testsThisWeek: 2, accuracy: 74, accuracyDelta: 5,
      rank: 3200, totalStudyTime: '120h',
      weeklyScores: [60, 65, 70, 68, 75, 80, 82],
      subjectMastery: { quant: 78, verbal: 65, di: 70 },
      upcomingTests: [
        { id: 1, name: 'CAT Full Mock 5', subject: 'Mixed', date: 'In 5 days', duration: '120m', questions: 66 },
      ],
      recentActivity: [
        { label: 'Completed DI sectional test', meta: '6h ago', dotColor: '#854F0B' },
      ],
    },
    'GATE CS 2025': {
      streak: 10, todayStudy: '3.5h', percentile: 78, daysToExam: 75,
      testsCompleted: 12, testsThisWeek: 2, accuracy: 69, accuracyDelta: 1,
      rank: 5400, totalStudyTime: '140h',
      weeklyScores: [58, 62, 65, 60, 70, 72, 75],
      subjectMastery: { cs: 72, maths: 64, aptitude: 68 },
      upcomingTests: [
        { id: 1, name: 'GATE CS Full Mock 2', subject: 'CS', date: 'In 6 days', duration: '180m', questions: 65 },
      ],
      recentActivity: [
        { label: 'Completed OS practice set', meta: '4h ago', dotColor: '#185FA5' },
      ],
    },
  },

  getExamData: (exam) => get().examData[exam] || null,

  updateExamData: (exam, updates) => {
    const examData = {
      ...get().examData,
      [exam]: { ...get().examData[exam], ...updates },
    };
    set({ examData });
    localStorage.setItem('dashboardExamData', JSON.stringify(examData));
  },

  recordTestResult: (exam, scorePercent) => {
    const current = get().examData[exam];
    if (!current) return;
    const weeklyScores   = [...current.weeklyScores.slice(1), scorePercent];
    const testsCompleted = (current.testsCompleted ?? 0) + 1;
    const testsThisWeek  = (current.testsThisWeek  ?? 0) + 1;
    get().updateExamData(exam, { weeklyScores, testsCompleted, testsThisWeek });
  },
}));
