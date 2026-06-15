import React from 'react';
import { Clock, Users, Play, Search, ChevronLeft, ChevronRight, Flag, CheckCircle, X, BarChart3 } from 'lucide-react';

// ─── Color tokens ─────────────────────────────────────────────────────────────
const DIFFICULTY = {
  EASY:   { label: 'Easy',   color: '#0F6E56', bg: '#EAF3DE' },
  MEDIUM: { label: 'Medium', color: '#854F0B', bg: '#FAEEDA' },
  HARD:   { label: 'Hard',   color: '#993556', bg: '#FBEAF0' },
};

const SUBJECT_COLOR = {
  'JEE Main':           { color: '#185FA5', bg: '#E6F1FB' },
  'NEET':               { color: '#534AB7', bg: '#EEEDFE' },
  'SSC CGL':            { color: '#0F6E56', bg: '#EAF3DE' },
  'UPSC CSE':           { color: '#854F0B', bg: '#FAEEDA' },
  'Banking (IBPS PO)':  { color: '#993556', bg: '#FBEAF0' },
  'CAT':                { color: '#1E6B7A', bg: '#E0F2F5' },
  'GATE':               { color: '#6B3FA0', bg: '#F1E9FA' },
};

// ─── Shared helpers ───────────────────────────────────────────────────────────
export const fmt = (secs) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

// ─── Question banks per exam ───────────────────────────────────────────────────
const QUESTION_BANKS = {
  'JEE Main': {
    Physics: [
      { subject: 'Physics', text: 'A particle moves in a straight line with uniform acceleration. If it covers distances s₁ and s₂ in the first two seconds and next two seconds respectively, then:', options: ['s₂ = 3s₁', 's₂ = s₁', 's₂ = 2s₁', 's₂ = 4s₁'], correct: 0 },
      { subject: 'Physics', text: 'A body is thrown vertically upward with velocity u. The ratio of times taken to reach maximum height and to return back is:', options: ['1:1', '1:2', '2:1', '1:3'], correct: 0 },
      { subject: 'Physics', text: 'Which of the following is NOT a vector quantity?', options: ['Displacement', 'Velocity', 'Speed', 'Acceleration'], correct: 2 },
      { subject: 'Physics', text: 'The dimensional formula of impulse is:', options: ['[MLT⁻¹]', '[MLT⁻²]', '[ML²T⁻¹]', '[ML²T⁻²]'], correct: 0 },
      { subject: 'Physics', text: 'A projectile is fired at 45°. The ratio of horizontal to vertical range is:', options: ['1:1', '2:1', '1:2', '4:1'], correct: 0 },
    ],
    Chemistry: [
      { subject: 'Chemistry', text: 'The hybridization of carbon in CO₂ is:', options: ['sp', 'sp²', 'sp³', 'sp³d'], correct: 0 },
      { subject: 'Chemistry', text: 'Which of the following has the highest ionization energy?', options: ['Na', 'Mg', 'Al', 'Si'], correct: 1 },
      { subject: 'Chemistry', text: 'Benzene undergoes which type of reaction preferentially?', options: ['Addition', 'Substitution', 'Elimination', 'Rearrangement'], correct: 1 },
      { subject: 'Chemistry', text: 'pH of a 0.01 M HCl solution is:', options: ['1', '2', '3', '4'], correct: 1 },
      { subject: 'Chemistry', text: 'The bond angle in water molecule is approximately:', options: ['90°', '104.5°', '109.5°', '120°'], correct: 1 },
    ],
    Mathematics: [
      { subject: 'Mathematics', text: 'The value of lim(x→0) sin(x)/x is:', options: ['0', '1', '∞', 'Undefined'], correct: 1 },
      { subject: 'Mathematics', text: 'If f(x) = x² + 2x + 1, then f\'(x) is:', options: ['2x + 1', '2x + 2', 'x + 2', '2x'], correct: 1 },
      { subject: 'Mathematics', text: '∫ eˣ dx equals:', options: ['eˣ + C', 'xeˣ + C', 'eˣ/x + C', 'e^(x+1) + C'], correct: 0 },
      { subject: 'Mathematics', text: 'The number of solutions of sin x = x/3 is:', options: ['1', '2', '3', '0'], correct: 2 },
      { subject: 'Mathematics', text: 'The derivative of ln(x) is:', options: ['1/x', 'x', 'ln(x)/x', '1'], correct: 0 },
    ],
  },
  'NEET': {
    Biology: [
      { subject: 'Biology', text: 'Which organelle is known as the "powerhouse of the cell"?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'], correct: 2 },
      { subject: 'Biology', text: 'In a dihybrid cross (AaBb × AaBb), the expected phenotypic ratio in F2 is:', options: ['1:1:1:1', '3:1', '9:3:3:1', '1:2:1'], correct: 2 },
      { subject: 'Biology', text: 'Which part of the human brain controls heart rate and breathing?', options: ['Cerebrum', 'Cerebellum', 'Medulla oblongata', 'Hypothalamus'], correct: 2 },
      { subject: 'Biology', text: 'Which of the following is a primary consumer in a food chain?', options: ['Lion', 'Grass', 'Deer', 'Vulture'], correct: 2 },
      { subject: 'Biology', text: 'DNA replication occurs during which phase of the cell cycle?', options: ['G1 phase', 'S phase', 'G2 phase', 'M phase'], correct: 1 },
    ],
    Physics: [
      { subject: 'Physics', text: 'A convex lens has a focal length of 20 cm. What is its power?', options: ['+5 D', '+0.05 D', '+2 D', '+20 D'], correct: 0 },
      { subject: 'Physics', text: 'The SI unit of electric resistance is:', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], correct: 2 },
      { subject: 'Physics', text: 'Which mirror is used as a rear-view mirror in vehicles?', options: ['Concave', 'Convex', 'Plane', 'Cylindrical'], correct: 1 },
      { subject: 'Physics', text: 'The work done by a force is maximum when the angle between force and displacement is:', options: ['0°', '90°', '180°', '45°'], correct: 0 },
      { subject: 'Physics', text: 'Escape velocity from Earth is approximately:', options: ['7.9 km/s', '9.8 km/s', '11.2 km/s', '15.0 km/s'], correct: 2 },
    ],
    Chemistry: [
      { subject: 'Chemistry', text: 'Which functional group is present in alcohols?', options: ['-COOH', '-OH', '-CHO', '-NH₂'], correct: 1 },
      { subject: 'Chemistry', text: 'The number of electrons in the valence shell of noble gases (except He) is:', options: ['2', '4', '6', '8'], correct: 3 },
      { subject: 'Chemistry', text: 'Which of the following is an example of a redox reaction?', options: ['NaCl + AgNO₃ → AgCl + NaNO₃', 'Zn + CuSO₄ → ZnSO₄ + Cu', 'HCl + NaOH → NaCl + H₂O', 'CaCO₃ → CaO + CO₂'], correct: 1 },
      { subject: 'Chemistry', text: 'The IUPAC name of CH₃-CH₂-OH is:', options: ['Methanol', 'Ethanol', 'Ethanal', 'Propanol'], correct: 1 },
      { subject: 'Chemistry', text: 'Which of these is a noble gas?', options: ['Nitrogen', 'Oxygen', 'Argon', 'Chlorine'], correct: 2 },
    ],
  },
  'SSC CGL': {
    'Quantitative Aptitude': [
      { subject: 'Quantitative Aptitude', text: 'If 40% of a number is 240, what is the number?', options: ['480', '600', '560', '520'], correct: 1 },
      { subject: 'Quantitative Aptitude', text: 'A shopkeeper sells an item for ₹450 at a profit of 12.5%. What was the cost price?', options: ['₹400', '₹390', '₹410', '₹420'], correct: 0 },
      { subject: 'Quantitative Aptitude', text: 'The average of first 10 natural numbers is:', options: ['5', '5.5', '6', '4.5'], correct: 1 },
      { subject: 'Quantitative Aptitude', text: 'A sum of ₹2000 becomes ₹2420 in 2 years at simple interest. The rate of interest per annum is:', options: ['8%', '9%', '10.5%', '10%'], correct: 3 },
      { subject: 'Quantitative Aptitude', text: 'The HCF of 24 and 36 is:', options: ['6', '8', '12', '18'], correct: 2 },
    ],
    Reasoning: [
      { subject: 'Reasoning', text: 'If CAT is coded as DBU, how is DOG coded?', options: ['EPH', 'EPI', 'FPH', 'EOH'], correct: 0 },
      { subject: 'Reasoning', text: 'Find the odd one out: Apple, Mango, Potato, Banana', options: ['Apple', 'Mango', 'Potato', 'Banana'], correct: 2 },
      { subject: 'Reasoning', text: 'Complete the series: 2, 6, 12, 20, 30, ?', options: ['38', '40', '42', '44'], correct: 2 },
      { subject: 'Reasoning', text: 'Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?', options: ['Mother', 'Grandmother', 'Sister', 'Aunt'], correct: 0 },
      { subject: 'Reasoning', text: 'If North becomes East, East becomes South, and so on, what will South become?', options: ['North', 'West', 'East', 'South'], correct: 1 },
    ],
    English: [
      { subject: 'English', text: 'Choose the correctly spelled word:', options: ['Acommodate', 'Accommodate', 'Acomodate', 'Accomodate'], correct: 1 },
      { subject: 'English', text: 'Choose the synonym of "Benevolent":', options: ['Cruel', 'Kind', 'Greedy', 'Arrogant'], correct: 1 },
      { subject: 'English', text: 'Fill in the blank: She has been working here ___ 2015.', options: ['since', 'from', 'for', 'at'], correct: 0 },
      { subject: 'English', text: 'Choose the antonym of "Optimistic":', options: ['Hopeful', 'Pessimistic', 'Cheerful', 'Confident'], correct: 1 },
      { subject: 'English', text: 'Identify the correctly punctuated sentence:', options: ['"Where are you going", he asked.', 'Where are you going? he asked.', '"Where are you going?" he asked.', 'Where, are you going he asked?'], correct: 2 },
    ],
  },
  'UPSC CSE': {
    History: [
      { subject: 'History', text: 'The Indian National Congress was founded in which year?', options: ['1883', '1885', '1887', '1890'], correct: 1 },
      { subject: 'History', text: 'Who was the founder of the Mughal Empire in India?', options: ['Akbar', 'Babur', 'Humayun', 'Aurangzeb'], correct: 1 },
      { subject: 'History', text: 'The Quit India Movement was launched in:', options: ['1940', '1942', '1944', '1946'], correct: 1 },
      { subject: 'History', text: 'Who gave the title "Father of the Nation" to Mahatma Gandhi?', options: ['Jawaharlal Nehru', 'Subhas Chandra Bose', 'Sardar Patel', 'Rabindranath Tagore'], correct: 1 },
      { subject: 'History', text: 'The Battle of Plassey was fought in:', options: ['1757', '1764', '1761', '1772'], correct: 0 },
    ],
    Polity: [
      { subject: 'Polity', text: 'Which Article of the Indian Constitution deals with the Right to Constitutional Remedies?', options: ['Article 30', 'Article 32', 'Article 35', 'Article 19'], correct: 1 },
      { subject: 'Polity', text: 'The Indian Constitution was adopted on:', options: ['26 January 1950', '26 November 1949', '15 August 1947', '2 October 1950'], correct: 1 },
      { subject: 'Polity', text: 'Who is the ex-officio Chairman of the Rajya Sabha?', options: ['President', 'Prime Minister', 'Vice President', 'Speaker of Lok Sabha'], correct: 2 },
      { subject: 'Polity', text: 'The concept of Directive Principles of State Policy is borrowed from the Constitution of:', options: ['USA', 'UK', 'Ireland', 'Canada'], correct: 2 },
      { subject: 'Polity', text: 'Fundamental Duties were added to the Indian Constitution by which amendment?', options: ['42nd Amendment', '44th Amendment', '52nd Amendment', '61st Amendment'], correct: 0 },
    ],
    Geography: [
      { subject: 'Geography', text: 'Which of the following is the longest river in India?', options: ['Yamuna', 'Godavari', 'Ganga', 'Brahmaputra'], correct: 2 },
      { subject: 'Geography', text: 'The Tropic of Cancer passes through how many Indian states?', options: ['6', '7', '8', '9'], correct: 2 },
      { subject: 'Geography', text: 'Which is the highest peak in India?', options: ['Nanda Devi', 'K2', 'Kanchenjunga', 'Mount Everest'], correct: 2 },
      { subject: 'Geography', text: 'The Deccan Plateau is located in which part of India?', options: ['North', 'South', 'East', 'West'], correct: 1 },
      { subject: 'Geography', text: 'Which state has the longest coastline in India?', options: ['Tamil Nadu', 'Andhra Pradesh', 'Gujarat', 'Kerala'], correct: 2 },
    ],
  },
  'Banking (IBPS PO)': {
    'Quantitative Aptitude': [
      { subject: 'Quantitative Aptitude', text: 'Find the simple interest on ₹5000 at 8% per annum for 3 years.', options: ['₹1000', '₹1100', '₹1200', '₹1300'], correct: 2 },
      { subject: 'Quantitative Aptitude', text: 'A train 100m long crosses a pole in 10 seconds. Its speed is:', options: ['10 m/s', '15 m/s', '20 m/s', '36 m/s'], correct: 0 },
      { subject: 'Quantitative Aptitude', text: 'The ratio of 2:3 is equivalent to:', options: ['4:6', '3:4', '6:8', '2:5'], correct: 0 },
      { subject: 'Quantitative Aptitude', text: 'If the cost price of 20 articles equals the selling price of 16 articles, the profit percent is:', options: ['20%', '25%', '15%', '30%'], correct: 1 },
      { subject: 'Quantitative Aptitude', text: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correct: 1 },
    ],
    Reasoning: [
      { subject: 'Reasoning', text: 'Statements: All pens are books. Some books are pencils. Conclusion: Some pens are pencils. Is the conclusion valid?', options: ['Valid', 'Invalid', 'Cannot be determined', 'Partially valid'], correct: 1 },
      { subject: 'Reasoning', text: 'In a certain code, "PAPER" is written as "QBQFS". How is "PENCIL" written?', options: ['QFODJM', 'QFOCJL', 'QEOCJM', 'QFODJL'], correct: 0 },
      { subject: 'Reasoning', text: 'Find the next term: 3, 9, 27, 81, ?', options: ['162', '243', '324', '729'], correct: 1 },
      { subject: 'Reasoning', text: 'If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?', options: ['Uncle', 'Father', 'Grandfather', 'Brother'], correct: 0 },
      { subject: 'Reasoning', text: 'Which word does NOT belong with the others?', options: ['Inch', 'Foot', 'Yard', 'Ounce'], correct: 3 },
    ],
    English: [
      { subject: 'English', text: 'Choose the word most nearly OPPOSITE in meaning to "Austerity":', options: ['Simplicity', 'Extravagance', 'Severity', 'Discipline'], correct: 1 },
      { subject: 'English', text: 'Choose the correct passive voice: "She writes a letter."', options: ['A letter is written by her.', 'A letter was written by her.', 'A letter has written by her.', 'A letter is being write by her.'], correct: 0 },
      { subject: 'English', text: 'Choose the correctly spelled word:', options: ['Recieve', 'Receive', 'Receeve', 'Receve'], correct: 1 },
      { subject: 'English', text: 'Fill in the blank: He is good ___ mathematics.', options: ['in', 'at', 'on', 'with'], correct: 1 },
      { subject: 'English', text: 'Choose the synonym of "Abundant":', options: ['Scarce', 'Plentiful', 'Limited', 'Rare'], correct: 1 },
    ],
  },
  'CAT': {
    'Quantitative Aptitude': [
      { subject: 'Quantitative Aptitude', text: 'A train travels 360 km in 4 hours. What is its speed in m/s?', options: ['25 m/s', '30 m/s', '90 m/s', '15 m/s'], correct: 0 },
      { subject: 'Quantitative Aptitude', text: 'What is the remainder when 7^100 is divided by 5?', options: ['1', '2', '3', '4'], correct: 0 },
      { subject: 'Quantitative Aptitude', text: 'If x + 1/x = 5, what is the value of x² + 1/x²?', options: ['21', '23', '25', '27'], correct: 1 },
      { subject: 'Quantitative Aptitude', text: 'The compound interest on ₹10,000 at 10% per annum for 2 years compounded annually is:', options: ['₹2000', '₹2100', '₹2200', '₹2010'], correct: 1 },
      { subject: 'Quantitative Aptitude', text: 'If a:b = 3:4 and b:c = 8:9, then a:b:c is:', options: ['3:4:9', '6:8:9', '3:4:4.5', '24:32:36'], correct: 1 },
    ],
    'Verbal Ability': [
      { subject: 'Verbal Ability', text: 'Choose the word that best fits: The committee\'s decision was met with _______ from the staff, who felt their concerns had been ignored.', options: ['enthusiasm', 'indifference', 'resentment', 'gratitude'], correct: 2 },
      { subject: 'Verbal Ability', text: 'Choose the correctly ordered sentence to form a coherent paragraph (Para jumble logic): Identify the concluding sentence among given options based on context.', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 0 },
      { subject: 'Verbal Ability', text: 'Choose the word closest in meaning to "Ephemeral":', options: ['Permanent', 'Fleeting', 'Eternal', 'Solid'], correct: 1 },
      { subject: 'Verbal Ability', text: 'Identify the correct usage: "Neither of the boys ___ ready."', options: ['are', 'is', 'were', 'have been'], correct: 1 },
      { subject: 'Verbal Ability', text: 'Choose the word with the correct meaning of "Pragmatic":', options: ['Idealistic', 'Practical', 'Theoretical', 'Emotional'], correct: 1 },
    ],
    'Data Interpretation': [
      { subject: 'Data Interpretation', text: 'If A is twice as efficient as B, and together they complete a task in 8 days, how many days would A alone take?', options: ['10', '12', '14', '16'], correct: 1 },
      { subject: 'Data Interpretation', text: 'A pie chart shows 25% allocation to category X out of a total of 800 units. How many units does X represent?', options: ['150', '180', '200', '220'], correct: 2 },
      { subject: 'Data Interpretation', text: 'In a bar graph, if sales grew from 100 to 150 units, the percentage growth is:', options: ['25%', '50%', '40%', '60%'], correct: 1 },
      { subject: 'Data Interpretation', text: 'Three pipes can fill a tank in 10, 15, and 30 minutes respectively. If all are opened together, the tank fills in:', options: ['5 minutes', '6 minutes', '7.5 minutes', '4 minutes'], correct: 0 },
      { subject: 'Data Interpretation', text: 'If the average of 5 numbers is 20 and one number is removed making the new average 18, the removed number is:', options: ['24', '26', '28', '30'], correct: 2 },
    ],
  },
  'GATE': {
    'Computer Science': [
      { subject: 'Computer Science', text: 'What is the time complexity of searching an element in a balanced binary search tree?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 1 },
      { subject: 'Computer Science', text: 'In which scheduling algorithm can starvation occur for low-priority processes?', options: ['Round Robin', 'FCFS', 'Priority Scheduling', 'SJF (non-preemptive)'], correct: 2 },
      { subject: 'Computer Science', text: 'Which layer of the OSI model is responsible for routing?', options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'], correct: 1 },
      { subject: 'Computer Science', text: 'Which data structure uses LIFO (Last In First Out) order?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], correct: 1 },
      { subject: 'Computer Science', text: 'What does ACID stand for in database transactions?', options: ['Atomicity, Consistency, Isolation, Durability', 'Accuracy, Concurrency, Isolation, Data', 'Atomicity, Concurrency, Integrity, Durability', 'Availability, Consistency, Isolation, Data'], correct: 0 },
    ],
    'Engineering Mathematics': [
      { subject: 'Engineering Mathematics', text: 'What is the rank of a 3×3 identity matrix?', options: ['0', '1', '2', '3'], correct: 3 },
      { subject: 'Engineering Mathematics', text: 'The eigenvalues of a diagonal matrix are:', options: ['The off-diagonal elements', 'The diagonal elements', 'Always zero', 'Always one'], correct: 1 },
      { subject: 'Engineering Mathematics', text: 'The Laplace transform of e^(at) is:', options: ['1/(s-a)', '1/(s+a)', 's/(s-a)', 'a/(s-a)'], correct: 0 },
      { subject: 'Engineering Mathematics', text: 'The probability of getting a sum of 7 when two dice are rolled is:', options: ['1/6', '1/12', '6/36', '1/9'], correct: 0 },
      { subject: 'Engineering Mathematics', text: 'The derivative of a constant function is:', options: ['1', '0', 'Undefined', 'The constant itself'], correct: 1 },
    ],
    'General Aptitude': [
      { subject: 'General Aptitude', text: 'For a Carnot engine operating between 500 K and 300 K, what is its efficiency?', options: ['20%', '40%', '60%', '80%'], correct: 1 },
      { subject: 'General Aptitude', text: 'In a series RLC circuit at resonance, the impedance is equal to:', options: ['Zero', 'Resistance R only', 'Reactance only', 'Infinite'], correct: 1 },
      { subject: 'General Aptitude', text: 'If a code increases all numbers by 2 and reverses digit order, 123 becomes:', options: ['345', '543', '321', '534'], correct: 1 },
      { subject: 'General Aptitude', text: 'A is twice as old as B. Five years ago, A was three times as old as B. The present age of B is:', options: ['10', '15', '20', '25'], correct: 0 },
      { subject: 'General Aptitude', text: 'Choose the word opposite in meaning to "Ductile":', options: ['Flexible', 'Brittle', 'Malleable', 'Soft'], correct: 1 },
    ],
  },
};

export const generateQuestions = (test) => {
  const banks = QUESTION_BANKS[test.exam] || QUESTION_BANKS['JEE Main'];
  const subjects = Object.keys(banks);

  const allQ = [];
  subjects.forEach(subj => {
    banks[subj].forEach(q => allQ.push({ ...q }));
  });

  const result = [];
  for (let i = 0; i < Math.min(test.questions, 30); i++) {
    result.push({ ...allQ[i % allQ.length], id: i + 1 });
  }
  return result;
};

// ─── Initial test list ────────────────────────────────────────────────────────
const INITIAL_TESTS = [
  { id: 1,  title: 'JEE Main full length mock',     exam: 'JEE Main',          duration: 180, questions: 15, difficulty: 'HARD',   participants: 1234, avgScore: 156 },
  { id: 2,  title: 'Physics chapter test',           exam: 'JEE Main',          duration: 60,  questions: 10, difficulty: 'MEDIUM', participants: 456,  avgScore: 68  },
  { id: 3,  title: 'Chemistry quick revision',       exam: 'JEE Main',          duration: 45,  questions: 10, difficulty: 'EASY',   participants: 789,  avgScore: 78  },
  { id: 4,  title: 'Math problem solving',           exam: 'JEE Main',          duration: 90,  questions: 10, difficulty: 'HARD',   participants: 345,  avgScore: 72  },
  { id: 5,  title: 'NEET full length mock',          exam: 'NEET',              duration: 180, questions: 15, difficulty: 'HARD',   participants: 5678, avgScore: 298 },
  { id: 6,  title: 'Chemistry organic reactions',    exam: 'JEE Main',          duration: 60,  questions: 10, difficulty: 'MEDIUM', participants: 612,  avgScore: 71  },
  { id: 7,  title: 'NEET Biology chapter test',      exam: 'NEET',              duration: 60,  questions: 10, difficulty: 'MEDIUM', participants: 2300, avgScore: 75  },
  { id: 8,  title: 'SSC CGL Tier-I full mock',        exam: 'SSC CGL',           duration: 60,  questions: 15, difficulty: 'MEDIUM', participants: 3450, avgScore: 95  },
  { id: 9,  title: 'SSC CGL Quant practice set',     exam: 'SSC CGL',           duration: 30,  questions: 10, difficulty: 'EASY',   participants: 1890, avgScore: 70  },
  { id: 10, title: 'UPSC CSE Prelims GS mock',        exam: 'UPSC CSE',          duration: 120, questions: 15, difficulty: 'HARD',   participants: 4210, avgScore: 88  },
  { id: 11, title: 'UPSC CSE Polity & Governance',    exam: 'UPSC CSE',          duration: 45,  questions: 10, difficulty: 'MEDIUM', participants: 1670, avgScore: 64  },
  { id: 12, title: 'IBPS PO Prelims full mock',       exam: 'Banking (IBPS PO)', duration: 60,  questions: 15, difficulty: 'MEDIUM', participants: 5120, avgScore: 102 },
  { id: 13, title: 'Banking Quant & Reasoning set',   exam: 'Banking (IBPS PO)', duration: 30,  questions: 10, difficulty: 'EASY',   participants: 2980, avgScore: 68  },
  { id: 14, title: 'CAT full length mock',            exam: 'CAT',               duration: 120, questions: 15, difficulty: 'HARD',   participants: 6500, avgScore: 110 },
  { id: 15, title: 'CAT Verbal Ability sectional',    exam: 'CAT',               duration: 40,  questions: 10, difficulty: 'MEDIUM', participants: 2150, avgScore: 58  },
  { id: 16, title: 'GATE CS full length mock',        exam: 'GATE',              duration: 180, questions: 15, difficulty: 'HARD',   participants: 3870, avgScore: 145 },
  { id: 17, title: 'GATE Engineering Maths set',      exam: 'GATE',              duration: 45,  questions: 10, difficulty: 'MEDIUM', participants: 1540, avgScore: 62  },
];

const EXAMS = ['All', 'JEE Main', 'NEET', 'SSC CGL', 'UPSC CSE', 'Banking (IBPS PO)', 'CAT', 'GATE'];

// ─── Chip ─────────────────────────────────────────────────────────────────────
const Chip = ({ label, color, bg }) => (
  <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 9px', borderRadius: 99, background: bg, color, display: 'inline-block' }}>
    {label}
  </span>
);

// ─── Test Screen ──────────────────────────────────────────────────────────────
const TestScreen = ({ test, onSubmit }) => {
  const questions               = React.useMemo(() => generateQuestions(test), [test]);
  const [current, setCurrent]   = React.useState(0);
  const [answers, setAnswers]   = React.useState({});
  const [flagged, setFlagged]   = React.useState(new Set());
  const [timeLeft, setTimeLeft] = React.useState(test.duration * 60);
  const [showPanel, setShowPanel] = React.useState(false);
  const [showConfirm, setConfirm] = React.useState(false);
  const startTime               = React.useRef(Date.now());
  const answersRef               = React.useRef(answers);
  const submittedRef             = React.useRef(false);

  React.useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  React.useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          if (!submittedRef.current) {
            submittedRef.current = true;
            const elapsed = Math.round((Date.now() - startTime.current) / 1000);
            onSubmit(answersRef.current, elapsed);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const q         = questions[current];
  const attempted = Object.keys(answers).length;
  const timerWarn = timeLeft < 300;

  const select     = (oi) => setAnswers(prev => ({ ...prev, [q.id]: oi }));
  const toggleFlag = () => setFlagged(prev => {
    const next = new Set(prev);
    next.has(q.id) ? next.delete(q.id) : next.add(q.id);
    return next;
  });

  const qStatus = (qi) => {
    const qid = questions[qi].id;
    if (flagged.has(qid)) return 'flagged';
    if (answers[qid] !== undefined) return 'answered';
    if (qi === current) return 'current';
    return 'unattempted';
  };

  const STATUS_STYLE = {
    answered:    { bg: '#185FA5', color: '#fff'    },
    flagged:     { bg: '#FAEEDA', color: '#854F0B' },
    current:     { bg: '#E6F1FB', color: '#185FA5' },
    unattempted: { bg: '#f1f5f9', color: '#64748b' },
  };

  const handleSubmit = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const elapsed = Math.round((Date.now() - startTime.current) / 1000);
    onSubmit(answers, elapsed);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#f8fafc', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{test.title}</p>
          <Chip label={`${attempted}/${questions.length} answered`} color="#185FA5" bg="#E6F1FB" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
            background: timerWarn ? '#FBEAF0' : '#f8fafc', borderRadius: 10,
            border: `0.5px solid ${timerWarn ? '#F4C0D1' : '#e2e8f0'}`,
          }}>
            <Clock size={14} color={timerWarn ? '#993556' : '#64748b'} />
            <span style={{ fontSize: 14, fontWeight: 600, color: timerWarn ? '#993556' : '#0f172a', fontVariantNumeric: 'tabular-nums' }}>
              {fmt(timeLeft)}
            </span>
          </div>
          <button onClick={() => setShowPanel(!showPanel)} style={{ padding: '6px 14px', background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#64748b', cursor: 'pointer' }}>
            Questions
          </button>
          <button onClick={() => setConfirm(true)} style={{ padding: '6px 16px', background: '#185FA5', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            Submit
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>Question {current + 1} of {questions.length}</span>
              <Chip label={q.subject} color={SUBJECT_COLOR[test.exam]?.color || '#185FA5'} bg={SUBJECT_COLOR[test.exam]?.bg || '#E6F1FB'} />
              <button onClick={toggleFlag} style={{
                marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontWeight: 500,
                background: flagged.has(q.id) ? '#FAEEDA' : '#f8fafc',
                color: flagged.has(q.id) ? '#854F0B' : '#64748b',
                border: flagged.has(q.id) ? '0.5px solid #FAC775' : '0.5px solid #e2e8f0',
              }}>
                <Flag size={12} /> {flagged.has(q.id) ? 'Flagged' : 'Flag'}
              </button>
            </div>

            <p style={{ fontSize: 16, color: '#0f172a', lineHeight: 1.7, marginBottom: 28 }}>{q.text}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                return (
                  <button key={oi} onClick={() => select(oi)} style={{
                    textAlign: 'left', padding: '14px 18px', borderRadius: 12, cursor: 'pointer',
                    background: selected ? '#E6F1FB' : '#fff',
                    border: selected ? '1.5px solid #185FA5' : '0.5px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', gap: 14, transition: 'border 0.15s',
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: selected ? '#185FA5' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 500, color: selected ? '#fff' : '#64748b' }}>{String.fromCharCode(65 + oi)}</span>
                    </div>
                    <span style={{ fontSize: 14, color: selected ? '#185FA5' : '#0f172a', fontWeight: selected ? 500 : 400 }}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {answers[q.id] !== undefined && (
              <button onClick={() => setAnswers(prev => { const n = { ...prev }; delete n[q.id]; return n; })} style={{ marginTop: 14, fontSize: 12, color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                Clear answer
              </button>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
              <button disabled={current === 0} onClick={() => setCurrent(c => c - 1)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: current === 0 ? 'not-allowed' : 'pointer', background: '#f8fafc', color: '#64748b', border: '0.5px solid #e2e8f0', opacity: current === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <ChevronLeft size={15} /> Previous
              </button>
              <button disabled={current === questions.length - 1} onClick={() => setCurrent(c => c + 1)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: current === questions.length - 1 ? 'not-allowed' : 'pointer', background: '#185FA5', color: '#fff', border: 'none', opacity: current === questions.length - 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                Next <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {showPanel && (
          <div style={{ width: 260, background: '#fff', borderLeft: '0.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <div style={{ padding: '1rem 1.1rem', borderBottom: '0.5px solid #f1f5f9' }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#0f172a', marginBottom: 10 }}>Question palette</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[['Answered', { bg: '#185FA5', color: '#fff' }], ['Flagged', { bg: '#FAEEDA', color: '#854F0B' }], ['Unattempted', { bg: '#f1f5f9', color: '#64748b' }]].map(([lbl, st]) => (
                  <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 4, background: st.bg, border: '0.5px solid #e2e8f0' }} />
                    <span style={{ fontSize: 11, color: '#64748b' }}>{lbl}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                {questions.map((_, qi) => {
                  const st = qStatus(qi);
                  const STATUS_STYLE = {
                    answered:    { bg: '#185FA5', color: '#fff'    },
                    flagged:     { bg: '#FAEEDA', color: '#854F0B' },
                    current:     { bg: '#E6F1FB', color: '#185FA5' },
                    unattempted: { bg: '#f1f5f9', color: '#64748b' },
                  };
                  return (
                    <button key={qi} onClick={() => { setCurrent(qi); setShowPanel(false); }} style={{ width: 36, height: 36, borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: st === 'current' ? '1.5px solid #185FA5' : '0.5px solid transparent', background: STATUS_STYLE[st].bg, color: STATUS_STYLE[st].color }}>
                      {qi + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '1.75rem', width: 380, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Submit test?</p>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>
              You've answered <strong style={{ color: '#0f172a' }}>{attempted}</strong> of <strong style={{ color: '#0f172a' }}>{questions.length}</strong> questions.
            </p>
            {attempted < questions.length && (
              <p style={{ fontSize: 13, color: '#854F0B', marginBottom: 4 }}>
                {questions.length - attempted} questions are unattempted.
              </p>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={handleSubmit} style={{ flex: 1, padding: '10px 0', background: '#185FA5', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                Submit test
              </button>
              <button onClick={() => setConfirm(false)} style={{ flex: 1, padding: '10px 0', background: '#f8fafc', color: '#64748b', border: '0.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Result Display ───────────────────────────────────────────────────────────
const ResultView = ({ test, answers, timeTaken, onBack, totalAttended }) => {
  const questions = React.useMemo(() => generateQuestions(test), [test]);
  const correct = questions.filter(q => answers[q.id] === q.correct).length;
  const attempted = Object.keys(answers).length;
  const score = correct * 4 - (attempted - correct);
  const percentage = Math.round((correct / questions.length) * 100);
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  const subj = SUBJECT_COLOR[test.exam] || SUBJECT_COLOR['JEE Main'];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Back button */}
        <button onClick={onBack} style={{ marginBottom: '1.5rem', fontSize: 13, color: '#185FA5', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
          ← Back to completed tests
        </button>

        {/* Header */}
        <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid #e2e8f0', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{test.title}</h2>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Chip label={test.exam} color={subj.color} bg={subj.bg} />
                <Chip label={DIFFICULTY[test.difficulty].label} color={DIFFICULTY[test.difficulty].color} bg={DIFFICULTY[test.difficulty].bg} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#0F6E56', lineHeight: 1 }}>{score}</p>
              <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Your score</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { label: 'Correct', value: correct, color: '#0F6E56', bg: '#EAF3DE' },
              { label: 'Incorrect', value: attempted - correct, color: '#993556', bg: '#FBEAF0' },
              { label: 'Unattempted', value: questions.length - attempted, color: '#854F0B', bg: '#FAEEDA' },
              { label: 'Accuracy', value: `${accuracy}%`, color: '#185FA5', bg: '#E6F1FB' },
            ].map((item, i) => (
              <div key={i} style={{ background: item.bg, borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.value}</p>
                <p style={{ fontSize: 12, color: item.color, opacity: 0.8 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Test stats */}
        <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid #e2e8f0', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart3 size={18} /> Performance metrics
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Time taken', value: fmt(timeTaken) },
              { label: 'Avg time per question', value: `${Math.round(timeTaken / questions.length)}s` },
              { label: 'Questions attempted', value: `${attempted}/${questions.length}` },
              { label: 'Average score', value: test.avgScore },
              { label: 'Your percentile', value: `${Math.max(15, Math.round(percentage / 10) * 10)}th` },
              { label: 'Category', value: percentage >= 70 ? 'Excellent' : percentage >= 50 ? 'Good' : 'Needs improvement' },
            ].map((item, i) => (
              <div key={i} style={{ paddingBottom: 16, borderBottom: i < 3 ? '0.5px solid #e2e8f0' : 'none' }}>
                <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>{item.label}</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Question review */}
        <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: '1.5rem' }}>Question review</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correct;
              const isAttempted = userAns !== undefined;

              return (
                <div key={idx} style={{ paddingBottom: 16, borderBottom: idx < questions.length - 1 ? '0.5px solid #f1f5f9' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'start', gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: isAttempted ? (isCorrect ? '#EAF3DE' : '#FBEAF0') : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: isAttempted ? (isCorrect ? '#0F6E56' : '#993556') : '#94a3b8' }}>
                        {isAttempted ? (isCorrect ? '✓' : '✗') : '—'}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, color: '#0f172a', fontWeight: 500, marginBottom: 8 }}>Q{idx + 1}: {q.text}</p>
                      {isAttempted && (
                        <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
                          <span style={{ color: '#64748b' }}>Your answer: <strong style={{ color: '#0f172a' }}>{String.fromCharCode(65 + userAns)}</strong></span>
                          {!isCorrect && <span style={{ color: '#64748b' }}>Correct answer: <strong style={{ color: '#0f172a' }}>{String.fromCharCode(65 + q.correct)}</strong></span>}
                        </div>
                      )}
                      {!isAttempted && <span style={{ fontSize: 12, color: '#94a3b8' }}>Not attempted</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Test Card ────────────────────────────────────────────────────────────────
const TestCard = ({ test, onStart, onViewResult, completedData }) => {
  const diff = DIFFICULTY[test.difficulty];
  const subj = SUBJECT_COLOR[test.exam] || SUBJECT_COLOR['JEE Main'];
  const isCompleted = !!completedData;

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: `0.5px solid ${isCompleted ? '#C0DD97' : '#e2e8f0'}`, boxShadow: '0 1px 6px rgba(0,0,0,0.05)', padding: '1.1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
      {isCompleted && (
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, background: '#EAF3DE', padding: '3px 10px', borderRadius: 99, border: '0.5px solid #C0DD97' }}>
          <CheckCircle size={11} color="#0F6E56" />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#0F6E56' }}>Completed</span>
        </div>
      )}

      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6, paddingRight: isCompleted ? 90 : 0 }}>{test.title}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Chip label={test.exam} color={subj.color} bg={subj.bg} />
          <Chip label={diff.label} color={diff.color} bg={diff.bg} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: '#f8fafc', borderRadius: 10, padding: '10px 0' }}>
        {[
          { label: 'Duration',     value: `${test.duration}m` },
          { label: 'Questions',    value: test.questions },
          { label: 'Participants', value: test.participants >= 1000 ? `${(test.participants / 1000).toFixed(1)}k` : test.participants },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: 'center', borderRight: i < 2 ? '0.5px solid #e2e8f0' : 'none', padding: '0 8px' }}>
            <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3 }}>{item.label}</p>
            <p style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
          <span style={{ color: '#64748b' }}>Average score</span>
          <span style={{ fontWeight: 500, color: '#0f172a' }}>{test.avgScore}</span>
        </div>
        {isCompleted && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#64748b' }}>Your score</span>
            <span style={{ fontWeight: 600, color: '#0F6E56' }}>{completedData.score}</span>
          </div>
        )}
      </div>

      {isCompleted ? (
        <button onClick={() => onViewResult(test.id)} style={{ width: '100%', padding: '9px 0', background: '#EAF3DE', color: '#0F6E56', border: '0.5px solid #C0DD97', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <BarChart3 size={14} /> View result
        </button>
      ) : (
        <button onClick={() => onStart(test)} style={{ width: '100%', padding: '9px 0', background: '#185FA5', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Play size={14} /> Start test
        </button>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const MockTests = () => {
  const [activeTab, setActiveTab] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [examFilter, setExamFilter] = React.useState('All');
  const [activeTest, setActiveTest] = React.useState(null);
  const [viewingResult, setViewingResult] = React.useState(null);
  const [completedMap, setCompletedMap] = React.useState({});
  const [totalAttended, setTotalAttended] = React.useState(0);

  const handleSubmit = (answers, timeTaken) => {
    const questions = generateQuestions(activeTest);
    const correct = questions.filter(q => answers[q.id] === q.correct).length;
    const attempted = Object.keys(answers).length;
    const score = correct * 4 - (attempted - correct);

    setCompletedMap(prev => ({
      ...prev,
      [activeTest.id]: { answers, timeTaken, score },
    }));
    setTotalAttended(prev => prev + 1);
    setViewingResult({ test: activeTest, answers, timeTaken });
    setActiveTest(null);
    setActiveTab('completed');
  };

  const handleViewResult = (testId) => {
    const test = INITIAL_TESTS.find(t => t.id === testId);
    const saved = completedMap[testId];
    setViewingResult({ test, answers: saved.answers, timeTaken: saved.timeTaken });
  };

  const filtered = INITIAL_TESTS.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchExam = examFilter === 'All' || t.exam === examFilter;
    const isCompleted = !!completedMap[t.id];
    
    if (activeTab === 'completed') return matchSearch && matchExam && isCompleted;
    return matchSearch && matchExam;
  });

  const completedCount = Object.keys(completedMap).length;

  if (activeTest) {
    return <TestScreen test={activeTest} onSubmit={handleSubmit} />;
  }

  if (viewingResult) {
    return (
      <ResultView
        test={viewingResult.test}
        answers={viewingResult.answers}
        timeTaken={viewingResult.timeTaken}
        onBack={() => setViewingResult(null)}
        totalAttended={totalAttended}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Mock tests</h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>Practice with full-length and chapter-wise tests across JEE, NEET, SSC, UPSC, Banking, CAT &amp; GATE</p>
        </div>
        {totalAttended > 0 && (
          <div style={{ background: '#E6F1FB', border: '0.5px solid #B5D4F4', borderRadius: 12, padding: '10px 18px', textAlign: 'center', minWidth: 100 }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#185FA5', lineHeight: 1 }}>{totalAttended}</p>
            <p style={{ fontSize: 11, color: '#185FA5', opacity: 0.8, marginTop: 2 }}>tests attended</p>
          </div>
        )}
      </div>

      {/* Search + exam filter + tabs */}
      <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #e2e8f0', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tests…"
              style={{ width: '100%', padding: '9px 14px 9px 36px', fontSize: 13, borderRadius: 10, border: '0.5px solid #e2e8f0', outline: 'none', color: '#0f172a', background: '#f8fafc', boxSizing: 'border-box' }}
            />
          </div>
          <select
            value={examFilter}
            onChange={e => setExamFilter(e.target.value)}
            style={{ padding: '9px 14px', fontSize: 13, borderRadius: 10, border: '0.5px solid #e2e8f0', outline: 'none', color: '#0f172a', background: '#f8fafc', cursor: 'pointer' }}
          >
            {EXAMS.map(ex => <option key={ex} value={ex}>{ex === 'All' ? 'All exams' : ex}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All tests', count: INITIAL_TESTS.length },
            { id: 'completed', label: 'Completed', count: completedCount },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              background: activeTab === tab.id ? '#185FA5' : '#f8fafc',
              color: activeTab === tab.id ? '#fff' : '#64748b',
              border: activeTab === tab.id ? 'none' : '0.5px solid #e2e8f0',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {tab.label}
              <span style={{ fontSize: 11, fontWeight: 700, background: activeTab === tab.id ? 'rgba(255,255,255,0.25)' : '#E6F1FB', color: activeTab === tab.id ? '#fff' : '#185FA5', padding: '1px 7px', borderRadius: 99 }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Test cards grid */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {filtered.map(test => (
            <TestCard
              key={test.id}
              test={test}
              onStart={setActiveTest}
              onViewResult={handleViewResult}
              completedData={completedMap[test.id] || null}
            />
          ))}
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #e2e8f0', padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#64748b' }}>
            {activeTab === 'completed'
              ? "No completed tests yet. Start a test to see it here!"
              : search ? `No tests found for "${search}"` : 'No tests available.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MockTests;