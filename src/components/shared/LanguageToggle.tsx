import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
      className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-all"
    >
      <Globe className="w-4 h-4 text-gray-600" />
      <span className="font-medium text-gray-700">
        {language === 'en' ? 'മലയാളം' : 'English'}
      </span>
    </button>
  );
}