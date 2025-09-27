import React, { useState, useEffect } from 'react';
import { Plus, Droplets, Bug, Leaf, Scissors } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './shared/Header';
import VoiceButton from './shared/VoiceButton';

interface ActivityTrackerProps {
  user: any;
  onBack: () => void;
}

interface Activity {
  id: string;
  type: 'sowing' | 'watering' | 'fertilizing' | 'pestControl' | 'harvest';
  crop: string;
  date: Date;
  notes: string;
  location?: string;
}

interface Crop {
  id: string;
  name: string;
  sowingDate: Date;
  expectedYield: string;
  irrigationMethod: string;
  soilType: string;
}

export default function ActivityTracker({ user, onBack }: ActivityTrackerProps) {
  const { t, language } = useLanguage();
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showAddCrop, setShowAddCrop] = useState(false);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);

  const [newActivity, setNewActivity] = useState({
    type: 'sowing' as Activity['type'],
    crop: '',
    notes: '',
    location: ''
  });

  const [newCrop, setNewCrop] = useState({
    name: '',
    expectedYield: '',
    irrigationMethod: '',
    soilType: ''
  });

  const activityTypes = [
    { key: 'sowing', icon: Leaf, label: t('sowing'), color: 'bg-green-500' },
    { key: 'watering', icon: Droplets, label: t('watering'), color: 'bg-blue-500' },
    { key: 'fertilizing', icon: Leaf, label: t('fertilizing'), color: 'bg-yellow-500' },
    { key: 'pestControl', icon: Bug, label: t('pestControl'), color: 'bg-red-500' },
    { key: 'harvest', icon: Scissors, label: t('harvest'), color: 'bg-orange-500' }
  ];

  // Initialize default crops and activities based on language
  useEffect(() => {
    setCrops([
      {
        id: '1',
        name: language === 'en' ? 'Rice' : 'നെല്ല്',
        sowingDate: new Date('2024-01-15'),
        expectedYield: language === 'en' ? '25 quintals' : '25 ക്വിന്റൽ',
        irrigationMethod: language === 'en' ? 'Well irrigation' : 'കിണർ നനവ്',
        soilType: language === 'en' ? 'Clay soil' : 'കളിമണ്ണ്'
      }
    ]);

    setActivities([
      {
        id: '1',
        type: 'sowing',
        crop: language === 'en' ? 'Rice' : 'നെല്ല്',
        date: new Date('2024-01-15'),
        notes: language === 'en' ? 'Planted good seeds in north field' : 'വടക്കൻ വയലിൽ നല്ല വിത്ത് വിതച്ചു',
        location: language === 'en' ? 'North field' : 'വടക്കൻ വയൽ'
      },
      {
        id: '2',
        type: 'watering',
        crop: language === 'en' ? 'Pepper' : 'കുരുമുളക്',
        date: new Date('2024-01-20'),
        notes: language === 'en' ? 'Watered in the morning using well' : 'പുലർച്ചെ നനച്ചു - കിണർ വെള്ളം',
        location: language === 'en' ? 'East farm' : 'കിഴക്കൻ തോട്ടം'
      }
    ]);
  }, [language]);

  const handleAddActivity = () => {
    if (newActivity.crop) {
      const activity: Activity = {
        id: Date.now().toString(),
        type: newActivity.type,
        crop: newActivity.crop,
        date: new Date(),
        notes: newActivity.notes,
        location: newActivity.location
      };
      setActivities(prev => [activity, ...prev]);
      setNewActivity({ type: 'sowing', crop: '', notes: '', location: '' });
      setShowAddActivity(false);
    }
  };

  const handleAddCrop = () => {
    if (newCrop.name) {
      const crop: Crop = {
        id: Date.now().toString(),
        name: newCrop.name,
        sowingDate: new Date(),
        expectedYield: newCrop.expectedYield,
        irrigationMethod: newCrop.irrigationMethod,
        soilType: newCrop.soilType
      };
      setCrops(prev => [crop, ...prev]);
      setNewCrop({ name: '', expectedYield: '', irrigationMethod: '', soilType: '' });
      setShowAddCrop(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      <Header title={t('activityTracker')} onBack={onBack} />

      <div className="p-4">
        {/* Action Buttons */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={() => setShowAddActivity(true)}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:from-green-600 hover:to-green-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>{t('addActivity')}</span>
          </button>
          <button
            onClick={() => setShowAddCrop(true)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            <Leaf className="w-5 h-5" />
            <span>{t('addNewCrop')}</span>
          </button>
        </div>

        {/* My Crops */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">{t('myCrops')}</h2>
          <div className="space-y-3">
            {crops.map((crop) => (
              <div key={crop.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-green-600">{crop.name}</h3>
                  <span className="text-sm text-gray-500">{crop.sowingDate.toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>{t('expectedYield')}: {crop.expectedYield}</div>
                  <div>{t('irrigation')}: {crop.irrigationMethod}</div>
                  <div className="col-span-2">{t('soilType')}: {crop.soilType}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">{t('recentActivities')}</h2>
          <div className="space-y-3">
            {activities.map((activity) => {
              const activityType = activityTypes.find(type => type.key === activity.type);
              return (
                <div key={activity.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`${activityType?.color} rounded-full w-10 h-10 flex items-center justify-center`}>
                      {activityType?.icon && <activityType.icon className="w-5 h-5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800">{activityType?.label}</h3>
                        <span className="text-sm text-gray-500">{activity.date.toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600 mb-1">{t('crop')}: {activity.crop}</p>
                      <p className="text-sm text-gray-500">{activity.notes}</p>
                      {activity.location && (
                        <p className="text-xs text-gray-400 mt-1">📍 {activity.location}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Activity Modal */}
      {showAddActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t('addActivity')}</h2>
            
            <div className="space-y-4">
              {/* Activity Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('activityType')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {activityTypes.slice(0, 4).map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setNewActivity(prev => ({ ...prev, type: type.key as Activity['type'] }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        newActivity.type === type.key
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon className={`w-5 h-5 mx-auto mb-1 ${
                        newActivity.type === type.key ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Crop Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('crop')}</label>
                <select
                  value={newActivity.crop}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, crop: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                >
                  <option value="">{t('selectCrop')}</option>
                  {crops.map(crop => <option key={crop.id} value={crop.name}>{crop.name}</option>)}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('notes')}</label>
                <div className="relative">
                  <textarea
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder={t('enterNotes')}
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                  />
                  <VoiceButton
                    onVoiceInput={(text) => setNewActivity(prev => ({ ...prev, notes: text }))}
                    className="absolute right-3 top-3"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('location')}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                    placeholder={t('enterLocationOptional')}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                  />
                  <VoiceButton
                    onVoiceInput={(text) => setNewActivity(prev => ({ ...prev, location: text }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddActivity(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleAddActivity}
                disabled={!newActivity.crop}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all"
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Crop Modal */}
      {showAddCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t('addNewCrop')}</h2>
            
            <div className="space-y-4">
              {['name', 'expectedYield', 'irrigationMethod', 'soilType'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t(field)}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newCrop[field as keyof typeof newCrop]}
                      onChange={(e) =>
                        setNewCrop(prev => ({ ...prev, [field]: e.target.value }))
                      }
                      placeholder={t(`${field}Example`)}
                      className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                    />
                    <VoiceButton
                      onVoiceInput={(text) =>
                        setNewCrop(prev => ({ ...prev, [field]: text }))
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddCrop(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleAddCrop}
                disabled={!newCrop.name}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
