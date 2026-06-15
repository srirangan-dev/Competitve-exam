// Exam configurations
export const EXAMS = {
  JEE_MAIN: {
    id: 'jee_main',
    name: 'JEE Main',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    duration: 180,
    totalMarks: 300,
  },
  JEE_ADVANCED: {
    id: 'jee_advanced',
    name: 'JEE Advanced',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    duration: 360,
    totalMarks: 360,
  },
  NEET: {
    id: 'neet',
    name: 'NEET',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    duration: 180,
    totalMarks: 720,
  },
  UPSC_CSE: {
    id: 'upsc_cse',
    name: 'UPSC CSE',
    subjects: ['Polity', 'History', 'Geography', 'Economics', 'Science'],
    duration: 120,
    totalMarks: 250,
  },
  CAT: {
    id: 'cat',
    name: 'CAT',
    subjects: ['Quantitative Ability', 'Logical Reasoning', 'Verbal Ability'],
    duration: 120,
    totalMarks: 300,
  },
};

// Question types
export const QUESTION_TYPES = {
  MCQ: 'Multiple Choice',
  MULTIPLE_CORRECT: 'Multiple Correct',
  NUMERICAL: 'Numerical',
  COMPREHENSION: 'Comprehension',
  SUBJECTIVE: 'Subjective',
};

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
  EXPERT: 'Expert',
};

// Test status
export const TEST_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  SUBMITTED: 'submitted',
};

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

// Subscription plans
export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    duration: 'Forever',
    features: [
      '5 Mock Tests/Month',
      'Basic Performance Analytics',
      'Community Support',
      'Access to Study Materials',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 999,
    duration: 'Monthly',
    features: [
      'Unlimited Mock Tests',
      'Advanced Analytics',
      'AI Doubt Solving',
      'Study Plan Generator',
      'Priority Support',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4999,
    duration: 'Quarterly',
    features: [
      'Everything in Pro',
      '1-on-1 Mentoring',
      'Interview Prep',
      'Career Guidance',
      'VIP Support',
      'Custom Study Plan',
    ],
  },
];

// Menu items
export const MENU_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'BarChart3',
    path: '/dashboard',
  },
  {
    id: 'mock-tests',
    label: 'Mock Tests',
    icon: 'BookOpen',
    path: '/mock-tests',
  },
  {
    id: 'study-planner',
    label: 'Study Planner',
    icon: 'Calendar',
    path: '/study-planner',
  },
  {
    id: 'doubts',
    label: 'Doubts',
    icon: 'MessageCircle',
    path: '/doubts',
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: 'TrendingUp',
    path: '/performance',
  },
  {
    id: 'revisions',
    label: 'Revisions',
    icon: 'RotateCcw',
    path: '/revisions',
  },
  {
    id: 'current-affairs',
    label: 'Current Affairs',
    icon: 'Newspaper',
    path: '/current-affairs',
  },
  {
    id: 'interview',
    label: 'Interview Prep',
    icon: 'Mic',
    path: '/interview',
  },
];

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Mock test data samples
export const SAMPLE_QUESTIONS = [
  {
    id: 1,
    examCode: 'jee_main',
    subject: 'Physics',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    difficulty: 'MEDIUM',
    questionType: 'MCQ',
    content: {
      text: 'A particle moves with constant velocity. What is the displacement after 5 seconds if velocity is 20 m/s?',
      imageUrl: null,
    },
    options: [
      { optionId: 'a', text: '100 m' },
      { optionId: 'b', text: '200 m' },
      { optionId: 'c', text: '50 m' },
      { optionId: 'd', text: '150 m' },
    ],
    correctAnswer: { options: ['a'] },
    timeSpent: 45,
  },
  {
    id: 2,
    examCode: 'jee_main',
    subject: 'Chemistry',
    topic: 'Chemical Bonding',
    subtopic: 'Ionic Bonding',
    difficulty: 'MEDIUM',
    questionType: 'MCQ',
    content: {
      text: 'Which of the following exhibits ionic bonding?',
    },
    options: [
      { optionId: 'a', text: 'NaCl' },
      { optionId: 'b', text: 'H₂O' },
      { optionId: 'c', text: 'O₂' },
      { optionId: 'd', text: 'CH₄' },
    ],
    correctAnswer: { options: ['a'] },
    timeSpent: 30,
  },
];

// Performance metrics
export const PERFORMANCE_METRICS = [
  {
    label: 'Total Tests',
    value: 15,
    unit: '',
    icon: 'BookOpen',
    color: 'primary',
  },
  {
    label: 'Accuracy',
    value: 78,
    unit: '%',
    icon: 'Target',
    color: 'success',
  },
  {
    label: 'Avg. Score',
    value: 234,
    unit: '/300',
    icon: 'Star',
    color: 'warning',
  },
  {
    label: 'Percentile',
    value: 87,
    unit: '%ile',
    icon: 'TrendingUp',
    color: 'info',
  },
];

// Time slots for study planning
export const TIME_SLOTS = [
  { label: '6:00 AM', value: '06:00' },
  { label: '7:00 AM', value: '07:00' },
  { label: '8:00 AM', value: '08:00' },
  { label: '9:00 AM', value: '09:00' },
  { label: '10:00 AM', value: '10:00' },
  { label: '11:00 AM', value: '11:00' },
  { label: '12:00 PM', value: '12:00' },
  { label: '1:00 PM', value: '13:00' },
  { label: '2:00 PM', value: '14:00' },
  { label: '3:00 PM', value: '15:00' },
  { label: '4:00 PM', value: '16:00' },
  { label: '5:00 PM', value: '17:00' },
  { label: '6:00 PM', value: '18:00' },
  { label: '7:00 PM', value: '19:00' },
  { label: '8:00 PM', value: '20:00' },
  { label: '9:00 PM', value: '21:00' },
  { label: '10:00 PM', value: '22:00' },
];

// Success stories for motivation
export const SUCCESS_STORIES = [
  {
    id: 1,
    name: 'Arjun Kumar',
    rank: 'AIR 45',
    exam: 'JEE Main 2024',
    message: 'ApexPrep\'s personalized study plans helped me master my weak areas.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rank: 'AIR 128',
    exam: 'NEET 2024',
    message: 'The doubt solving feature was a game-changer for me!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
  {
    id: 3,
    name: 'Rajesh Patel',
    rank: 'AIR 210',
    exam: 'JEE Advanced 2024',
    message: 'The mock tests prepared me perfectly for the actual exam.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  },
];