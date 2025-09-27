import React from 'react';
import { User, MessageCircle, Activity, Bell, Megaphone, BookOpen, Book, Store, Users, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './shared/LanguageToggle';

interface DashboardProps {
  user: any;
  onNavigate: (screen: string) => void;
}

export default function Dashboard({ user, onNavigate }: DashboardProps) {
   const { t, language } = useLanguage();

  const [isOnline] = React.useState(true); // Demo state

  const navigationCards = [
    { key: 'profile', icon: User, color: 'bg-blue-500', label: t('profile') },
    { key: 'chat', icon: MessageCircle, color: 'bg-green-500', label: t('chat') },
    { key: 'activity', icon: Activity, color: 'bg-orange-500', label: t('activityTracker') },
    { key: 'advisory', icon: Megaphone, color: 'bg-purple-500', label: t('personalizedAdvisory') },
    { key: 'reminders', icon: Bell, color: 'bg-red-500', label: t('reminders') },
    { key: 'knowledge', icon: BookOpen, color: 'bg-indigo-500', label: t('knowledgeEngine') },
    { key: 'ledger', icon: Book, color: 'bg-teal-500', label: t('krishiLedger') },
    { key: 'shops', icon: Store, color: 'bg-yellow-600', label: t('fertilizerShops') },
    { key: 'community', icon: Users, color: 'bg-pink-500', label: t('community') }
  ];


const advisories = [
  {
    title: language === 'en' ? 'Weather Alert' : 'കാലാവസ്ഥ മുന്നറിയിപ്പ്',
    content:
      language === 'en'
        ? 'Rain expected. Good time for sowing seeds!'
        : 'മഴ പ്രതീക്ഷിക്കുന്നു. വിത്ത് വിതയ്ക്കാൻ ഉത്തമ സമയം!',
    color: 'bg-blue-100',
  },
  {
    title: language === 'en' ? 'Crop Care' : 'വിള പരിപാലനം',
    content:
      language === 'en'
        ? 'Rice crop needs fertilizer application this week.'
        : 'ഈ ആഴ്ച നെൽകൃഷിക്ക് വളം ഇടേണ്ടതാണ്.',
    color: 'bg-green-100',
  },
  {
    title: language === 'en' ? 'Market Price' : 'വിപണി വില',
    content:
      language === 'en'
        ? 'Pepper prices are rising – good time to sell.'
        : 'കുരുമുളക് വില ഉയരുന്നു – വിൽക്കാൻ നല്ല സമയം.',
    color: 'bg-yellow-100',
  },
];


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {t('welcomeBack')}, {user.name}! 🌱
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {isOnline ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-orange-500" />
                    <span>{t('offline')}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Advisory Banner */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-orange-500 text-white p-4">
            <h2 className="text-lg font-bold">{t('todayAdvisory')}</h2>
          </div>
          <div className="p-4 space-y-3">
            {advisories.map((advisory, index) => (
              <div key={index} className={`${advisory.color} rounded-lg p-3`}>
                <h3 className="font-semibold text-gray-800">{advisory.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{advisory.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-4">
          {navigationCards.map((card) => (
            <button
              key={card.key}
              onClick={() => onNavigate(card.key)}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all transform hover:scale-105 active:scale-95"
            >
              <div className={`${card.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm text-center">{card.label}</h3>
            </button>
          ))}
        </div>

        {/* SMS/IVR Fallback */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <h3 className="font-bold text-orange-800 mb-2">🔤 SMS/IVR Commands</h3>
          <div className="text-sm text-orange-700 space-y-1">
            <p><strong>SMS:</strong> Send "WEATHER" to 54321</p>
            <p><strong>SMS:</strong> Send "ADVISORY" to 54321</p>
            <p><strong>IVR:</strong> Call 1800-KRISHI for voice guidance</p>
          </div>
        </div>
      </div>
    </div>
  );
}