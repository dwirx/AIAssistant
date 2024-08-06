import React from 'react';
import { IconType } from 'react-icons';

interface AssistantCardProps {
  title: string;
  description: string;
  icon: IconType;
  isActive: boolean;
  onClick: () => void;
}

const AssistantCard: React.FC<AssistantCardProps> = ({ title, description, icon: Icon, isActive, onClick }) => {
  return (
    <div
      className={`flex flex-col bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex-grow p-2 sm:p-3">
        <div className="flex items-center mb-1">
          <Icon className={`text-lg sm:text-xl mr-2 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
          <h2 className={`text-sm sm:text-base font-semibold ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>{title}</h2>
        </div>
        <p className={`text-xs sm:text-sm ${isActive ? 'text-blue-600' : 'text-gray-600'} hidden sm:block`}>{description}</p>
      </div>
      <div className={`px-2 py-1 bg-gray-50 ${isActive ? 'bg-blue-50' : ''}`}>
        <span className={`text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          {isActive ? 'Active' : 'Activate'}
        </span>
      </div>
    </div>
  );
};

export default AssistantCard;
