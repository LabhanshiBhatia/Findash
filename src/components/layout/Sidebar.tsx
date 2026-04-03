import React from 'react';
import { useApp } from '../../context/AppContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡' },
  { id: 'transactions', label: 'Transactions', icon: '⇄' },
  { id: 'insights', label: 'Insights', icon: '◈' },
] as const;

const Sidebar: React.FC = () => {
  const { state, dispatch } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-name">FinDash</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-item ${state.activeTab === item.id ? 'nav-item--active' : ''}`}
            onClick={() => dispatch({ type: 'SET_TAB', payload: item.id })}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {state.activeTab === item.id && <span className="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="role-badge">
          <span className={`role-dot ${state.role === 'admin' ? 'role-dot--admin' : 'role-dot--viewer'}`} />
          <span className="role-text">{state.role === 'admin' ? 'Admin' : 'Viewer'}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
