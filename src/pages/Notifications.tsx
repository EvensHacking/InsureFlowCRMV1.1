import React from 'react';
import { Bell, Calendar, Filter } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: '1',
      title: 'Nouveau sinistre déclaré',
      message: 'Marie Dubois a déclaré un sinistre dégât des eaux',
      type: 'warning',
      timestamp: new Date('2024-03-15T10:30:00'),
      read: false
    },
    {
      id: '2',
      title: 'Contrat à renouveler',
      message: 'Le contrat de Jean Martin arrive à échéance dans 30 jours',
      type: 'info',
      timestamp: new Date('2024-03-14T15:45:00'),
      read: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtrer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Calendar className="w-5 h-5" />
            Date
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 bg-white rounded-lg shadow-sm ${
              !notification.read ? 'border-l-4 border-indigo-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className={`p-2 rounded-lg ${
                  notification.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  <Bell className={`w-5 h-5 ${
                    notification.type === 'warning' ? 'text-orange-500' : 'text-blue-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {notification.timestamp.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;