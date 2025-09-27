import React, { useState } from 'react';
import { ArrowLeft, Phone, User, Mic, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import VoiceButton from './shared/VoiceButton';
import LanguageToggle from './shared/LanguageToggle';

interface LoginScreenProps {
  onLogin: (userData: any) => void;
  onGoToSignup: () => void;
}

export default function LoginScreen({ onLogin, onGoToSignup }: LoginScreenProps) {
  const { t } = useLanguage();
  const [loginType, setLoginType] = useState<'phone' | 'username'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');

  const handleSendOTP = () => {
    if (loginType === 'phone' && phoneNumber) {
      setShowOTP(true);
    } else if (loginType === 'username' && username) {
      setShowOTP(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp === '1234') { // Demo OTP
      onLogin({
        name: 'രമേശ് കുമാർ',
        phone: phoneNumber || '9876543210',
        location: 'കേരളം'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 p-4">
      <LanguageToggle />
      
      <div className="max-w-md mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('login')}</h1>
          <p className="text-gray-600">Voice-enabled secure login</p>
        </div>

        {!showOTP ? (
          <div className="space-y-6">
            {/* Login Type Toggle */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setLoginType('phone')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  loginType === 'phone'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Phone
              </button>
              <button
                onClick={() => setLoginType('username')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  loginType === 'username'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                Username
              </button>
            </div>

            {/* Input Field */}
            <div className="relative">
              <input
                type={loginType === 'phone' ? 'tel' : 'text'}
                value={loginType === 'phone' ? phoneNumber : username}
                onChange={(e) => loginType === 'phone' ? setPhoneNumber(e.target.value) : setUsername(e.target.value)}
                placeholder={t(loginType === 'phone' ? 'phoneNumber' : 'username')}
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg pr-14"
              />
              <VoiceButton 
                onVoiceInput={(text) => loginType === 'phone' ? setPhoneNumber(text) : setUsername(text)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOTP}
              disabled={!(loginType === 'phone' ? phoneNumber : username)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
            >
              {t('sendOTP')}
            </button>

            {/* Offline Fallback */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Low Connectivity?</h3>
              <p className="text-sm text-orange-700 mb-2">
                SMS: Send "LOGIN {loginType === 'phone' ? phoneNumber : username}" to 54321
              </p>
              <p className="text-sm text-orange-700">
                IVR: Call 1800-KRISHI (1800-574744)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP sent to {loginType === 'phone' ? phoneNumber : username}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  placeholder="Enter 4-digit OTP"
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-center tracking-widest pr-14"
                  maxLength={4}
                />
                <VoiceButton 
                  onVoiceInput={setOTP}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 4}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
            >
              {t('verifyOTP')}
            </button>

            {/* Demo OTP Hint */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <strong>Demo:</strong> Use OTP "1234" to continue
              </p>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setShowOTP(false)}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              {t('back')}
            </button>
          </div>
        )}

        {/* Signup Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            New farmer?{' '}
            <button
              onClick={onGoToSignup}
              className="text-green-600 font-semibold hover:text-green-700"
            >
              {t('signup')} →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}