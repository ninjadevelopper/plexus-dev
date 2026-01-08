
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discussions from './pages/Discussions';
import Projects from './pages/Projects';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Docs from './pages/Docs';
import Contact from './pages/Contact';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [targetDiscussionId, setTargetDiscussionId] = useState<string | null>(null);

  const handleNavigateToDiscussion = (id: string) => {
    setTargetDiscussionId(id);
    setCurrentView('discussions');
  };

  const handleViewChange = (view: View) => {
    if (view !== 'discussions') {
      setTargetDiscussionId(null);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigateToDiscussion={handleNavigateToDiscussion} />;
      case 'discussions':
        return <Discussions initialSelectedId={targetDiscussionId} onClearTarget={() => setTargetDiscussionId(null)} />;
      case 'projects':
        return <Projects />;
      case 'explore':
        return <Explore />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'auth':
        return <Auth />;
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <Privacy />;
      case 'docs':
        return <Docs />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigateToDiscussion={handleNavigateToDiscussion} />;
    }
  };

  return (
    <Layout activeView={currentView} onViewChange={handleViewChange}>
      {renderContent()}
    </Layout>
  );
};

export default App;
