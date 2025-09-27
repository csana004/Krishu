import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import VoiceButton from './shared/VoiceButton';
import LanguageToggle from './shared/LanguageToggle';

interface SignupScreenProps {
  onSignup: (userData: any) => void;
  onGoToLogin: () => void;
}

export default function SignupScreen({ onSignup, onGoToLogin }: SignupScreenProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    village: '',
    district: '',
    landSize: '',
    soilType: '',
    crops: '',
    irrigation: '',
    phone: '',
    email: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.phone) {
      onSignup(formData);
    }
  };

  const inputFields = [
    { key: 'name', label: t('name'), icon: User, type: 'text', required: true },
    { key: 'age', label: t('age'), icon: User, type: 'number', required: false },
    { key: 'village', label: t('village'), icon: MapPin, type: 'text', required: false },
    { key: 'district', label: t('district'), icon: MapPin, type: 'text', required: false },
    { key: 'landSize', label: t('landSize'), icon: MapPin, type: 'text', required: false },
    { key: 'soilType', label: t('soilType'), icon: MapPin, type: 'text', required: false },
    { key: 'crops', label: t('crops'), icon: MapPin, type: 'text', required: false },
    { key: 'irrigation', label: t('irrigation'), icon: MapPin, type: 'text', required: false },
    { key: 'phone', label: t('phone'), icon: Phone, type: 'tel', required: true },
    { key: 'email', label: t('email'), icon: Mail, type: 'email', required: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 p-4">
      <LanguageToggle />
      
      <div className="max-w-md mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('signup')}</h1>
          <p className="text-gray-600">Complete farmer profile with voice input</p>
        </div>

        <div className="space-y-6">
          {inputFields.map((field) => (
            <div key={field.key} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={field.type}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={field.label}
                  className="w-full pl-12 pr-14 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                />
                <VoiceButton 
                  onVoiceInput={(text) => handleInputChange(field.key, text)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!formData.name || !formData.phone}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
          >
            {t('submit')}
          </button>

          {/* Offline Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Offline-First Design</h3>
            <p className="text-sm text-green-700">
              Your data is saved locally and will sync when you're back online
            </p>
          </div>

          {/* Back to Login */}
          <button
            onClick={onGoToLogin}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            {t('back')} to {t('login')}
          </button>
        </div>
      </div>
    </div>
  );
}