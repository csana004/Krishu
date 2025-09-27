import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Chat from './components/Chat';
import ActivityTracker from './components/ActivityTracker';
import Advisory from './components/Advisory';
import Reminders from './components/Reminders';
import KnowledgeEngine from './components/KnowledgeEngine';
import KrishiLedger from './components/KrishiLedger';
import FertilizerShops from './components/FertilizerShops';
import Community from './components/Community';
import LanguageProvider from './contexts/LanguageContext';

function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [user, setUser] = useState<any>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate splash screen timer
    const timer = setTimeout(() => {
      setShowSplash(false);
      setCurrentScreen('login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const handleSignup = (userData: any) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    if (showSplash) {
      return <SplashScreen />;
    }

    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen 
            onLogin={handleLogin}
            onGoToSignup={() => setCurrentScreen('signup')}
          />
        );
      case 'signup':
        return (
          <SignupScreen 
            onSignup={handleSignup}
            onGoToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setCurrentScreen} />;
      case 'profile':
        return <Profile user={user} onBack={() => setCurrentScreen('dashboard')} />;
      case 'chat':
        return <Chat user={user} onBack={() => setCurrentScreen('dashboard')} />;
      case 'activity':
        return <ActivityTracker user={user} onBack={() => setCurrentScreen('dashboard')} />;
      case 'advisory':
        return <Advisory user={user} onBack={() => setCurrentScreen('dashboard')} />;
      case 'reminders':
        return <Reminders user={user} onBack={() => setCurrentScreen('dashboard')} />;
      case 'knowledge':
        return <KnowledgeEngine user={user} onBack={() => setCurrentScreen('dashboard')} />;
      case 'ledger':
        return <KrishiLedger user={user} onBack={() => setCurrentScreen('dashboard')} />;
      case 'shops':
        return <FertilizerShops user={user} onBack={() => setCurrentScreen('dashboard')} />;
      case 'community':
        return <Community user={user} onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return <Dashboard user={user} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
        {renderScreen()}
      </div>
    </LanguageProvider>
  );
}

export default App;