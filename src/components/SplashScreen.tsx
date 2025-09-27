import React from 'react';
import { Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SplashScreen() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-orange-400 to-yellow-400 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>
      
      {/* Logo */}
      <div className="flex items-center justify-center mb-8 animate-bounce">
        <div className="bg-white rounded-full p-6 shadow-2xl">
          <Leaf className="w-16 h-16 text-green-600" />
        </div>
      </div>
      
      {/* Title */}
      <div className="text-center text-white px-8">
        <h1 className="text-4xl font-bold mb-4 tracking-wide">
          {t('appTitle')}
        </h1>
        <p className="text-xl font-medium opacity-90 leading-relaxed">
          {t('appSubtitle')}
        </p>
      </div>
      
      {/* Loading Indicator */}
      <div className="mt-12">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}