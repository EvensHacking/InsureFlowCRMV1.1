import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import ReportingDashboard from '../components/reports/ReportingDashboard';

const Reports = () => {
  // Données simulées pour la démonstration
  const contractStats = [
    { month: 'Jan', nouveaux: 45, renouveles: 120 },
    { month: 'Fév', nouveaux: 52, renouveles: 115 },
    { month: 'Mar', nouveaux: 48, renouveles: 125 },
    { month: 'Avr', nouveaux: 70, renouveles: 130 },
    { month: 'Mai', nouveaux: 65, renouveles: 140 },
    { month: 'Jun', nouveaux: 85, renouveles: 135 }
  ];

  const claimStats = [
    { name: 'Habitation', value: 35 },
    { name: 'Automobile', value: 45 },
    { name: 'Santé', value: 15 },
    { name: 'Autres', value: 5 }
  ];

  const revenueData = [
    { month: 'Jan', revenus: 45000, depenses: 32000 },
    { month: 'Fév', revenus: 52000, depenses: 34000 },
    { month: 'Mar', revenus: 48000, depenses: 31000 },
    { month: 'Avr', revenus: 70000, depenses: 45000 },
    { month: 'Mai', revenus: 65000, depenses: 42000 },
    { month: 'Jun', revenus: 85000, depenses: 51000 }
  ];

  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Rapports</h1>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download className="w-5 h-5" />
            Exporter
          </button>
        </div>
      </div>

      <ReportingDashboard
        contractStats={contractStats}
        claimStats={claimStats}
        revenueData={revenueData}
      />
    </div>
  );
};

export default Reports;