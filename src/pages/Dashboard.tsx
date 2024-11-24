import React from 'react';
import DashboardStats from '../components/DashboardStats';
import { Bell, Calendar } from 'lucide-react';

const Dashboard = () => {
  const recentActivities = [
    {
      type: 'Nouveau contrat',
      client: 'Marie Dubois',
      date: '2024-03-15',
      status: 'En attente'
    },
    {
      type: 'Sinistre déclaré',
      client: 'Jean Martin',
      date: '2024-03-14',
      status: 'Urgent'
    },
    {
      type: 'Renouvellement',
      client: 'Sophie Bernard',
      date: '2024-03-13',
      status: 'À traiter'
    }
  ];

  const upcomingTasks = [
    {
      title: 'Appel client - Renouvellement',
      date: '2024-03-16 14:00',
      client: 'Pierre Durant'
    },
    {
      title: 'Suivi sinistre',
      date: '2024-03-17 10:30',
      client: 'Anne Michel'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <div className="flex gap-4">
          <button className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50">
            <Calendar className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Activités récentes</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-gray-500">{activity.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.date}</p>
                  <span className="text-sm font-medium text-indigo-600">{activity.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Tâches à venir</h2>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.client}</p>
                </div>
                <p className="text-sm text-gray-500">{task.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;