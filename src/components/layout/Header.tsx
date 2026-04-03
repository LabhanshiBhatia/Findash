import React from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

const TAB_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Financial overview at a glance' },
  transactions: { title: 'Transactions', subtitle: 'Complete transaction history' },
  insights: { title: 'Insights', subtitle: 'Intelligent spending analysis' },
};

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const { title, subtitle } = TAB_TITLES[state.activeTab];

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
        <p className="topbar-subtitle">{subtitle}</p>
      </div>

      <div className="topbar-right">
        {/* Dark Mode Toggle */}
        <button
          className="icon-btn"
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          title="Toggle dark mode"
        >
          {state.darkMode ? '☀' : '☽'}
        </button>

        {/* Role Switcher */}
        <div className="role-switcher">
          <span className="role-switcher-label">Role:</span>
          <select
            className="role-select"
            value={state.role}
            onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value as Role })}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {state.role === 'viewer' && (
          <div className="viewer-badge">
            <span>👁 View Only</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
