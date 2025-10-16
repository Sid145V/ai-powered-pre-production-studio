import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ResearchHub from './pages/ResearchHub';
import MediaUpload from './pages/MediaUpload';
import ScriptEditor from './pages/ScriptEditor';
import StoryboardCreator from './pages/StoryboardCreator';
import Collaboration from './pages/Collaboration';
import Settings from './pages/Settings';
import AuthPage from './pages/AuthPage';
import { DataProvider } from './contexts/DataContext';
import { User } from './types';
import { mockAuthService } from './services/mockAuthService';

type Page = 'dashboard' | 'research' | 'media' | 'script-editor' | 'storyboard' | 'collaboration' | 'settings';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const sessionUser = mockAuthService.checkSession();
    if (sessionUser) {
      setUser(sessionUser);
    }
    setLoadingSession(false);
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    await mockAuthService.logout();
    setUser(null);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'research':
        return <ResearchHub />;
      case 'media':
        return <MediaUpload />;
      case 'script-editor':
        return <ScriptEditor />;
      case 'storyboard':
        return <StoryboardCreator />;
      case 'collaboration':
        return <Collaboration />;
      case 'settings':
        return <Settings user={user!} onLogout={handleLogout}/>;
      default:
        return <Dashboard />;
    }
  };

  if (loadingSession) {
    return <div className="bg-black text-white h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <DataProvider>
      <div className="bg-black text-white h-screen flex overflow-hidden font-sans">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header user={user} onLogout={handleLogout} />
          <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-[#111] to-black">
            {renderPage()}
          </div>
        </main>
      </div>
    </DataProvider>
  );
};

export default App;
