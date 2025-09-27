import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './shared/Header';
import VoiceButton from './shared/VoiceButton';

interface FertilizerShopsProps {
  user: any;
  onBack: () => void;
}

interface Shop {
  id: string;
  name: string;
  malayalamName: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  rating: number;
  specialties: string[];
  coords: { lat: number; lng: number };
  isOpen: boolean;
}

export default function FertilizerShops({ user, onBack }: FertilizerShopsProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);

  const shops: Shop[] = [
    {
      id: '1',
      name: 'Kerala Agri Mart',
      malayalamName: 'കേരള അഗ്രി മാർട്ട്',
      address: 'MC Road, Kottayam - 686001',
      distance: '2.5 km',
      phone: '0481-2563847',
      hours: '8:00 AM - 7:00 PM',
      rating: 4.5,
      specialties: ['Organic Fertilizers', 'Seeds', 'Pesticides'],
      coords: { lat: 9.5915, lng: 76.5222 },
      isOpen: true
    },
    {
      id: '2',
      name: 'Bharath Fertilizers',
      malayalamName: 'ഭാരത് ഫെർട്ടിലൈസേഴ്സ്',
      address: 'TB Road, Kottayam - 686002',
      distance: '3.1 km',
      phone: '0481-2567891',
      hours: '9:00 AM - 6:00 PM',
      rating: 4.2,
      specialties: ['Chemical Fertilizers', 'Farm Equipment', 'Seeds'],
      coords: { lat: 9.5851, lng: 76.5183 },
      isOpen: true
    },
    {
      id: '3',
      name: 'Green Valley Agro Store',
      malayalamName: 'ഗ്രീൻ വാലി അഗ്രോ സ്റ്റോർ',
      address: 'Kummakonam, Kottayam - 686003',
      distance: '5.2 km',
      phone: '0481-2587432',
      hours: '8:30 AM - 8:00 PM',
      rating: 4.7,
      specialties: ['Organic Products', 'Bio-fertilizers', 'Garden Tools'],
      coords: { lat: 9.6045, lng: 76.5145 },
      isOpen: false
    },
    {
      id: '4',
      name: 'Spice Land Agri Centre',
      malayalamName: 'സ്പൈസ് ലാൻഡ് അഗ്രി സെന്റർ',
      address: 'Pala Road, Kottayam - 686004',
      distance: '4.8 km',
      phone: '0481-2576543',
      hours: '9:00 AM - 7:30 PM',
      rating: 4.3,
      specialties: ['Spice Cultivation', 'Pepper Seeds', 'Specialized Fertilizers'],
      coords: { lat: 9.5789, lng: 76.5334 },
      isOpen: true
    }
  ];

  const filteredShops = shops.filter(shop =>
    !searchQuery || 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.malayalamName.includes(searchQuery) ||
    shop.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleDirections = (shop: Shop) => {
    // In a real app, this would open maps with directions
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${shop.coords.lat},${shop.coords.lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      <Header title={t('fertilizerShops')} onBack={onBack} />
      
      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search shops, products...' : 'കടകൾ, ഉൽപ്പാദനങ്ങൾ തിരയുക...'}
              className="w-full pl-12 pr-16 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <VoiceButton 
              onVoiceInput={setSearchQuery}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>

        {/* Map Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            {language === 'en' ? 'Nearby Shops' : 'അടുത്തുള്ള കടകൾ'} ({filteredShops.length})
          </h2>
          <button
            onClick={() => setShowMap(!showMap)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              showMap 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{showMap ? 'List View' : 'Map View'}</span>
          </button>
        </div>

        {/* Map View Placeholder */}
        {showMap && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center mb-6">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-600 mb-2">
              {language === 'en' ? 'Interactive Map' : 'ഇന്ററാക്ടീവ് മാപ്'}
            </h3>
            <p className="text-sm text-gray-500">
              {language === 'en' 
                ? 'Map integration would show shop locations with pins and real-time navigation'
                : 'മാപ് ഇന്റഗ്രേഷൻ പിന്നുകളും തത്സമയ നാവിഗേഷനും ഉള്ള കട സ്ഥാനങ്ങൾ കാണിക്കും'
              }
            </p>
          </div>
        )}

        {/* Shop List */}
        <div className="space-y-4">
          {filteredShops.map((shop) => (
            <div key={shop.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-gray-800">{shop.name}</h3>
                    {shop.isOpen ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {language === 'en' ? 'Open' : 'തുറന്നത്'}
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        {language === 'en' ? 'Closed' : 'അടച്ചത്'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{shop.malayalamName}</p>
                  <div className="flex items-center text-yellow-500 text-sm mb-2">
                    {'★'.repeat(Math.floor(shop.rating))}
                    <span className="ml-1 text-gray-500">({shop.rating})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-green-600">{shop.distance}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{shop.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{shop.hours}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{shop.phone}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Specialties:' : 'സ്പെഷ്യാലിറ്റികൾ:'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {shop.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleCall(shop.phone)}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{language === 'en' ? 'Call' : 'വിളിക്കുക'}</span>
                </button>
                <button
                  onClick={() => handleDirections(shop)}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{language === 'en' ? 'Directions' : 'വഴി'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {language === 'en' ? 'No shops found matching your search' : 'നിങ്ങളുടെ തിരയലിന് അനുയോജ്യമായ കടകൾ കണ്ടെത്തിയില്ല'}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6">
          <h3 className="font-bold text-orange-800 mb-2">
            {language === 'en' ? 'Voice Commands' : 'ശബ്ദ കമാൻഡുകൾ'}
          </h3>
          <div className="space-y-1 text-sm text-orange-700">
            <p><strong>{language === 'en' ? 'Say:' : 'പറയുക:'}</strong> "{language === 'en' ? 'Find fertilizer shops near me' : 'എന്റെ അടുത്തുള്ള വള കടകൾ കണ്ടെത്തുക'}"</p>
            <p><strong>{language === 'en' ? 'Say:' : 'പറയുക:'}</strong> "{language === 'en' ? 'Organic fertilizer shops' : 'ജൈവ വള കടകൾ'}"</p>
            <p><strong>SMS:</strong> Send "SHOPS [location]" to 54321</p>
          </div>
        </div>

        {/* Offline Notice */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
          <h3 className="font-semibold text-green-800 mb-2">
            {language === 'en' ? 'Offline Mode' : 'ഓഫ്‌ലൈൻ മോഡ്'}
          </h3>
          <p className="text-sm text-green-700">
            {language === 'en' 
              ? 'Shop data cached locally. GPS directions available via SMS link when offline.'
              : 'കട വിവരങ്ങൾ പ്രാദേശികമായി സംഭരിച്ചിരിക്കുന്നു. ഓഫ്‌ലൈനിൽ GPS വഴികാട്ടൽ SMS ലിങ്കിലൂടെ ലഭ്യമാണ്.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}