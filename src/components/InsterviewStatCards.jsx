import React from 'react';
import { Users, Mail, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const InterviewStatsCard = ({ type, value }) => {
  const getIconAndLabel = (type) => {
    const config = {
      totalCandidates: {
        icon: Users,
        label: 'Total Candidates'
      },
      invitesSent: {
        icon: Mail,
        label: 'AI interview invites sent'
      },
      scheduled: {
        icon: Clock,
        label: 'AI interviews scheduled'
      },
      pending: {
        icon: AlertTriangle,
        label: 'AI interviews pending'
      },
      completed: {
        icon: CheckCircle,
        label: 'AI interviews completed'
      }
    };
    return config[type];
  };

  const { icon: Icon, label } = getIconAndLabel(type);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default InterviewStatsCard;