import React from 'react';
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp 
} from 'lucide-react';

const StatsCard = ({ icon: Icon, label, value, trend }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-500">{trend}</span>
        </div>
      </div>
      <div className="bg-indigo-50 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
    </div>
  </div>
);

const DashboardStats = () => {
  const stats = [
    {
      icon: Users,
      label: "Clients Actifs",
      value: "1,482",
      trend: "+12.5%"
    },
    {
      icon: FileText,
      label: "Contrats",
      value: "3,274",
      trend: "+8.2%"
    },
    {
      icon: AlertTriangle,
      label: "Sinistres en cours",
      value: "142",
      trend: "-3.1%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;