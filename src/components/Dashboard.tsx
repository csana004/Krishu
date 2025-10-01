import React from 'react';
import {
  User,
  MessageCircle,
  Activity,
  Bell,
  Megaphone,
  BookOpen,
  Book,
  Store,
  Users,
  Wifi,
  WifiOff,
  AlertTriangle,
  BarChart,
  FileText,
  Droplet
} from 'lucide-react';
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
                    <span>{language === 'en' ? 'Online' : 'ഓൺലൈൻ'}</span>
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
            <h2 className="text-lg font-bold">
              {language === 'en' ? 'Today\'s Advisory' : 'ഇന്നത്തെ ഉപദേശം'}
            </h2>
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

        {/* NEW: Crop Health Monitoring */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-green-600" />
            {language === 'en' ? 'Crop Health Status' : 'വിളാരോഗ്യ നില'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {language === 'en'
              ? 'Spectral index: NDVI = 0.72 (Healthy 🌿)'
              : 'സ്പെക്ട്രൽ സൂചിക: NDVI = 0.72 (ആരോഗ്യം 🌿)'}
          </p>
          <div className="mt-3 h-32 bg-gradient-to-r from-green-300 via-yellow-200 to-red-300 rounded-lg flex items-center justify-center text-gray-700 text-sm">
            {language === 'en'
              ? '[ Spectral Health Map Placeholder ]'
              : '[ സ്പെക്ട്രൽ ഹെൽത്ത് മാപ്പ് ]'}
          </div>
        </div>

        {/* NEW: Soil Sensor Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Droplet className="w-5 h-5 text-blue-600" />
            {language === 'en' ? 'Soil & Sensor Data' : 'മണ്ണും സെൻസർ ഡാറ്റയും'}
          </h2>
          <ul className="text-sm text-gray-700 mt-2 space-y-1">
            <li>{language === 'en' ? 'Soil Moisture: 28% (Optimal)' : 'മണ്ണിലെ ഈർപ്പം: 28% (ഉത്തമം)'}</li>
            <li>{language === 'en' ? 'Temperature: 26°C' : 'താപനില: 26°C'}</li>
            <li>{language === 'en' ? 'Humidity: 65%' : 'ആർദ്രത: 65%'}</li>
            <li>{language === 'en' ? 'Leaf Wetness: Normal' : 'ഇലയുടെ നനവ്: സാധാരണ'}</li>
          </ul>
        </div>

        {/* NEW: Predictions & Alerts */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            {language === 'en' ? 'Predictions & Alerts' : 'ഭവിഷ്യത്തിൻ്റെ മുന്നറിയിപ്പുകൾ'}
          </h2>
          <p className="text-sm text-gray-700 mt-1">
            {language === 'en' ? '⚠️ Pest outbreak risk: Medium' : '⚠️ കീട വ്യാപന ഭീഷണി: മിതമായ'}
          </p>
          <p className="text-sm text-gray-700">
            {language === 'en' ? '🌾 Yield stress detected in Zone 2' : '🌾 മേഖല 2-ൽ വിള സമ്മർദ്ദം കണ്ടെത്തി'}
          </p>
          <p className="text-sm text-gray-700">
            {language === 'en' ? '✅ Recommended: Apply bio-pesticide spray this week' : '✅ ശുപാർശ: ഈ ആഴ്ച ജൈവ കീടനാശിനി സ്പ്രേ പ്രയോഗിക്കുക'}
          </p>
        </div>

        {/* NEW: Generate Report */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            {language === 'en' ? 'Reports' : 'റിപ്പോർട്ടുകൾ'}
          </h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
            {language === 'en' ? 'Generate PDF' : 'PDF സൃഷ്ടിക്കുക'}
          </button>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-4">
          {navigationCards.map((card) => (
            <button
              key={card.key}
              onClick={() => onNavigate(card.key)}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all transform hover:scale-105 active:scale-95"
            >
              <div
                className={`${card.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm text-center">
                {card.label}
              </h3>
            </button>
          ))}
        </div>

        {/* SMS/IVR Fallback */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <h3 className="font-bold text-orange-800 mb-2">
            {language === 'en' ? '🔤 SMS/IVR Commands' : '🔤 SMS/IVR കമാൻഡുകൾ'}
          </h3>
          <div className="text-sm text-orange-700 space-y-1">
            <p><strong>SMS:</strong> {language === 'en' ? 'Send "WEATHER" to 54321' : '"WEATHER" 54321-ലേക്ക് അയക്കുക'}</p>
            <p><strong>SMS:</strong> {language === 'en' ? 'Send "ADVISORY" to 54321' : '"ADVISORY" 54321-ലേക്ക് അയക്കുക'}</p>
            <p><strong>IVR:</strong> {language === 'en' ? 'Call 1800-KRISHI for voice guidance' : 'വോയ്സ് മാർഗ്ഗനിർദ്ദേശത്തിന് 1800-KRISHI വിളിക്കൂ'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
