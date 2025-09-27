import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ml';
  setLanguage: (lang: 'en' | 'ml') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Splash & Login
    appTitle: 'Krishi Sakhi',
    appSubtitle: 'Your Digital Farming Companion',
    getStarted: 'Get Started',
    login: 'Login',
    signup: 'Sign Up',
    phoneNumber: 'Phone Number',
    username: 'Username',
    password: 'Password',
    sendOTP: 'Send OTP',
    verifyOTP: 'Verify OTP',
    welcomeBack: 'Welcome back',
    
    // Dashboard
    dashboard: 'Dashboard',
    profile: 'Profile',
    chat: 'Chat',
    activityTracker: 'Activity Tracker',
    personalizedAdvisory: 'Personalized Advisory',
    reminders: 'Reminders',
    knowledgeEngine: 'Knowledge Engine',
    krishiLedger: 'Krishi-Ledger',
    fertilizerShops: 'Fertilizer Shops',
    community: 'Farmer Community',
    
    // Common
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    search: 'Search',
    loading: 'Loading...',
    offline: 'You are offline',
    
    // Profile
    name: 'Name',
    age: 'Age',
    location: 'Location',
    village: 'Village',
    district: 'District',
    landSize: 'Land Size',
    soilType: 'Soil Type',
    crops: 'Crops',
    irrigation: 'Irrigation',
    farmArea: 'Farm Area',
    phone: 'Phone',
    email: 'Email',
    
    // Activity Tracker
    addActivity: 'Add Activity',
    addNewCrop: 'Add New Crop',
    sowing: 'Sowing',
    watering: 'Watering',
    fertilizing: 'Fertilizing',
    pestControl: 'Pest Control',
    harvest: 'Harvest',
    
    // Chat
    typeMessage: 'Type your message...',
    askQuestion: 'Ask me anything about farming',
    
    // Advisory
    todayAdvisory: 'Today\'s Advisory',
    weather: 'Weather',
    cropCare: 'Crop Care',
    marketPrices: 'Market Prices',
    
    // Knowledge Engine
    searchKnowledge: 'Search farming knowledge...',
    popularTopics: 'Popular Topics',
    
    // Community
    postQuestion: 'Post Your Question',
    recentPosts: 'Recent Posts'
  },
  ml: {
    // Splash & Login
    appTitle: 'കൃഷി സഖി',
    appSubtitle: 'നിങ്ങളുടെ ഡിജിറ്റൽ കൃഷി കൂട്ടുകാരി',
    getStarted: 'ആരംഭിക്കുക',
    login: 'ലോഗിൻ',
    signup: 'സൈൻ അപ്പ്',
    phoneNumber: 'ഫോൺ നമ്പർ',
    username: 'ഉപയോക്തൃനാമം',
    password: 'പാസ്‌വേഡ്',
    sendOTP: 'OTP അയയ്ക്കുക',
    verifyOTP: 'OTP സ്ഥിരീകരിക്കുക',
    welcomeBack: 'സ്വാഗതം',
    
    // Dashboard
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    profile: 'പ്രൊഫൈൽ',
    chat: 'ചാറ്റ്',
    activityTracker: 'പ്രവർത്തന ട്രാക്കർ',
    personalizedAdvisory: 'വ്യക്തിഗത ഉപദേശം',
    reminders: 'ഓർമ്മപ്പെടുത്തലുകൾ',
    knowledgeEngine: 'അറിവിന്റെ കലവറ',
    krishiLedger: 'കൃഷി-ലെഡ്ജർ',
    fertilizerShops: 'വളക്കടകൾ',
    community: 'കർഷക സമൂഹം',
    
    // Common
    back: 'തിരിച്ച്',
    save: 'സേവ് ചെയ്യുക',
    cancel: 'റദ്ദാക്കുക',
    submit: 'സമർപ്പിക്കുക',
    search: 'തിരയുക',
    loading: 'ലോഡ് ചെയ്യുന്നു...',
    offline: 'നിങ്ങൾ ഓഫ്‌ലൈനാണ്',
    
    // Profile
    name: 'പേര്',
    age: 'വയസ്സ്',
    location: 'സ്ഥലം',
    village: 'ഗ്രാമം',
    district: 'ജില്ല',
    landSize: 'ഭൂമിയുടെ വലുപ്പം',
    soilType: 'മണ്ണിന്റെ തരം',
    crops: 'വിളകൾ',
    irrigation: 'ജലസേചനം',
    farmArea: 'കൃഷിയിടം',
    phone: 'ഫോൺ',
    email: 'ഇമെയിൽ',
    
    // Activity Tracker
    addActivity: 'പ്രവർത്തനം ചേർക്കുക',
    addNewCrop: 'പുതിയ വിള ചേർക്കുക',
    sowing: 'വിതയ്ക്കൽ',
    watering: 'നനയ്ക്കൽ',
    fertilizing: 'വളപ്രയോഗം',
    pestControl: 'കീടനിയന്ത്രണം',
    harvest: 'വിളവെടുപ്പ്',
    
    // Chat
    typeMessage: 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...',
    askQuestion: 'കൃഷിയെക്കുറിച്ച് എന്തും ചോദിക്കുക',
    
    // Advisory
    todayAdvisory: 'ഇന്നത്തെ ഉപദേശം',
    weather: 'കാലാവസ്ഥ',
    cropCare: 'വിള പരിചരണം',
    marketPrices: 'മാർക്കറ്റ് വില',
    
    // Knowledge Engine
    searchKnowledge: 'കൃഷി അറിവ് തിരയുക...',
    popularTopics: 'ജനപ്രിയ വിഷയങ്ങൾ',
    
    // Community
    postQuestion: 'നിങ്ങളുടെ ചോദ്യം പോസ്റ്റ് ചെയ്യുക',
    recentPosts: 'സമീപകാല പോസ്റ്റുകൾ'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<'en' | 'ml'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};