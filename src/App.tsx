import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Contracts from './pages/Contracts';
import Claims from './pages/Claims';
import Clients from './pages/Clients';
import Notifications from './pages/Notifications';
import ClientPortal from './pages/ClientPortal';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<ClientPortal />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />
                  <main className="flex-1 p-8">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/contracts" element={<Contracts />} />
                      <Route path="/claims" element={<Claims />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route path="/notifications" element={<Notifications />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;