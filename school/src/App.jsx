import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store';

import Signup          from './components/Pages/Signup';
import Login           from './components/Pages/Login';
import ForgotPassword  from './components/Pages/ForgotPassword';
import Dashboard       from './components/Pages/Dashboard';
import MockTests       from './components/Pages/MockTests';
import StudyPlanner    from './components/Pages/StudyPlanner';
import Revisions       from './components/Pages/Revisions';
import CurrentAffairs  from './components/Pages/CurrentAffairs';
import Videos          from './components/Pages/Videos';
import Notes           from './components/Pages/Notes';
import QuestionBank    from './components/Pages/QuestionBank';
import ExamNotifications from './components/Pages/ExamNotifications';
import Profile         from './components/Pages/Profile';
import Settings        from './components/Pages/Settings';
import Help            from './components/Pages/Help';
import Header          from './components/Layout/Header';
import Sidebar         from './components/Layout/Sidebar';
import AIDoubtSolver   from './components/Pages/AIDoubtSolver';

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Public routes — redirect to dashboard if already logged in */}
        <Route path="/login"           element={!isAuthenticated ? <Login />          : <Navigate to="/dashboard" replace />} />
        <Route path="/signup"          element={!isAuthenticated ? <Signup />         : <Navigate to="/dashboard" replace />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" replace />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="flex h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    <Routes>
                      <Route path="/dashboard"          element={<Dashboard />} />
                      <Route path="/mock-tests"         element={<MockTests />} />
                      <Route path="/question-bank"      element={<QuestionBank />} />
                      <Route path="/study-planner"      element={<StudyPlanner />} />
                      <Route path="/notes"              element={<Notes />} />
                      <Route path="/revisions"          element={<Revisions />} />
                      <Route path="/current-affairs"    element={<CurrentAffairs />} />
                      <Route path="/videos"             element={<Videos />} />
                      <Route path="/exam-notifications" element={<ExamNotifications />} />
                      <Route path="/profile"            element={<Profile />} />
                      <Route path="/settings"           element={<Settings />} />
                      <Route path="/help"               element={<Help />} />
                      <Route path="*"                   element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </main>
                </div>
                <AIDoubtSolver />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;