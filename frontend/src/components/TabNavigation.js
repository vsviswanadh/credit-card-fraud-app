import React from 'react';
import { FaUser, FaFileUpload, FaInfoCircle } from 'react-icons/fa';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'single', label: 'Single Transaction', icon: FaUser },
    { id: 'batch', label: 'Batch Processing', icon: FaFileUpload },
    { id: 'about', label: 'About', icon: FaInfoCircle }
  ];

  return (
    <div className="tab-navigation">
      {tabs.map(tab => {
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <IconComponent style={{ marginRight: '8px' }} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
