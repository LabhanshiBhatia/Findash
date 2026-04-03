import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/layout/Dashboard';
import TransactionsPage from './components/layout/TransactionsPage';
import Insights from './components/insights/Insights';
import './styles.css';

const AppContent: React.FC = () => {
  const { state } = useApp();

  return (
    <div className={`app-root ${state.darkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <div className="main-wrap">
        <Header />
        <main className="main-content">
          {state.activeTab === 'dashboard' && <Dashboard />}
          {state.activeTab === 'transactions' && <TransactionsPage />}
          {state.activeTab === 'insights' && <Insights transactions={state.transactions} />}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
