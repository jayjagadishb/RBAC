import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { useAuthStore } from './store/authStore';

function App() {
  const user = useAuthStore((state) => state.user);

  if (!user?.isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  


  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute requiredRole={['1','2']}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute requiredRole={['1','2']}>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/roles"
              element={
                <PrivateRoute requiredRole={['1']}>
                  <Roles />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute requiredRole={['3']}>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
          
        </main>
      </div>
    </Router>
  );
}

export default App;