import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  title: string;
  onBack: () => void;
  showLanguageToggle?: boolean;
}

export default function Header({ title, onBack, showLanguageToggle = true }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white shadow-sm px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
        {showLanguageToggle && <LanguageToggle />}
      </div>
    </div>
  );
}