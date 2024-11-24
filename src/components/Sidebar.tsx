import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Users, 
  Bell,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Contrats', path: '/contracts' },
    { icon: AlertTriangle, label: 'Sinistres', path: '/claims' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ];

  return (
    <div className="h-screen w-64 bg-indigo-900 text-white p-6">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8" />
        <h1 className="text-xl font-bold">InsureFlowCRM</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-800'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-indigo-100 hover:bg-indigo-800 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;