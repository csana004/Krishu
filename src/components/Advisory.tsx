import React from 'react';
import { Cloud, Sun, Droplets, TrendingUp, AlertTriangle, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './shared/Header';

interface AdvisoryProps {
  user: any;
  onBack: () => void;
}

export default function Advisory({ user, onBack }: AdvisoryProps) {
  const { language } = useLanguage();

  const todayAdvisories = [
    {
      id: '1',
      type: 'weather',
      icon: Cloud,
      title: language === 'en' ? 'Weather Alert' : 'കാലാവസ്ഥാ മുന്നറിയിപ്പ്',
      content: language === 'en'
        ? 'Moderate rainfall expected for 3 days. Perfect time for rice transplantation in Kottayam district.'
        : '3 ദിവസത്തേക്ക് മിതമായ മഴ പ്രതീക്ഷിക്കുന്നു. കോട്ടയം ജില്ലയിൽ നെല്ല് നടാൻ അനുകൂല സമയം.',
      priority: 'high',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      type: 'crop',
      icon: Leaf,
      title: language === 'en' ? 'Crop Care Advisory' : 'വിള പരിചരണ ഉപദേശം',
      content: language === 'en'
        ? 'Apply organic fertilizer to pepper plants. Use vermicompost 2kg per plant around root zone.'
        : 'കുരുമുളക് ചെടികൾക്ക് ജൈവ വളം ഇടുക. ഒരു ചെടിക്ക് 2kg വെർമി കമ്പോസ്റ്റ് വേരിന് ചുറ്റും ഇടുക.',
      priority: 'medium',
      color: 'bg-green-500'
    },
    {
      id: '3',
      type: 'market',
      icon: TrendingUp,
      title: language === 'en' ? 'Market Update' : 'മാർക്കറ്റ് അപ്ഡേറ്റ്',
      content: language === 'en'
        ? 'Pepper prices rising - ₹480/kg in Kochi market. Good time to sell stored pepper.'
        : 'കുരുമുളക് വില കൂടുന്നു - കൊച്ചി മാർക്കറ്റിൽ ₹480/kg. സംഭരിച്ച കുരുമുളക് വിൽക്കാൻ നല്ല സമയം.',
      priority: 'high',
      color: 'bg-yellow-600'
    },
    {
      id: '4',
      type: 'alert',
      icon: AlertTriangle,
      title: language === 'en' ? 'Pest Alert' : 'കീട മുന്നറിയിപ്പ്',
      content: language === 'en'
        ? 'Brown planthopper outbreak reported in nearby areas. Monitor rice fields closely.'
        : 'അടുത്തുള്ള പ്രദേശങ്ങളിൽ തുപ്പൽ കീടത്തിന്റെ വ്യാപനം. നെൽവയലുകൾ സൂക്ഷ്മമായി നിരീക്ഷിക്കുക.',
      priority: 'high',
      color: 'bg-red-500'
    }
  ];

  const weeklyAdvisories = [
    {
      day: language === 'en' ? 'Monday' : 'തിങ്കൾ',
      tasks: language === 'en'
        ? ['Check irrigation channels', 'Apply neem oil spray']
        : ['ജലസേചന കാലുവകൾ പരിശോധിക്കുക', 'വേപ്പിൻ എണ്ണ സ്പ്രേ ചെയ്യുക']
    },
    {
      day: language === 'en' ? 'Wednesday' : 'ബുധൻ',
      tasks: language === 'en'
        ? ['Monitor weather updates', 'Check soil moisture']
        : ['കാലാവസ്ഥാ വിവരങ്ങൾ പരിശോധിക്കുക', 'മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക']
    },
    {
      day: language === 'en' ? 'Friday' : 'വെള്ളി',
      tasks: language === 'en'
        ? ['Visit local market for price updates', 'Clean farm equipment']
        : ['വിലവിവരങ്ങൾക്കായി പ്രാദേശിക മാർക്കറ്റ് സന്ദർശിക്കുക', 'കാർഷിക ഉപകരണങ്ങൾ വൃത്തിയാക്കുക']
    }
  ];

  const governmentSchemes = [
    {
      name: language === 'en' ? 'PM-KISAN Scheme' : 'പിഎം-കിസാൻ പദ്ധതി',
      amount: '₹6,000/year',
      description: language === 'en'
        ? 'Direct income support for small farmers'
        : 'ചെറുകർഷകർക്കുള്ള നേരിട്ടുള്ള വരുമാന സഹായം',
      eligible: true
    },
    {
      name: language === 'en' ? 'Kisan Credit Card' : 'കിസാൻ ക്രെഡിറ്റ് കാർഡ്',
      amount: 'Up to ₹3,00,000',
      description: language === 'en'
        ? 'Low-interest agricultural loans'
        : 'കുറഞ്ഞ പലിശയിൽ കാർഷിക വായ്പ',
      eligible: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <Header title={language === 'en' ? 'Personalized Advisory' : 'വ്യക്തിഗത ഉപദേശം'} onBack={onBack} />

      <div className="p-4 space-y-6">
        {/* Today's Advisories */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {language === 'en' ? "Today's Advisory" : 'ഇന്നത്തെ ഉപദേശം'}
          </h2>
          <div className="space-y-3">
            {todayAdvisories.map((advisory) => (
              <div key={advisory.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-start p-4">
                  <div className={`${advisory.color} rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0`}>
                    <advisory.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-800">{advisory.title}</h3>
                      {advisory.priority === 'high' && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          {language === 'en' ? 'High Priority' : 'ഉയർന്ന പ്രാധാന്യം'}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{advisory.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Tasks */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {language === 'en' ? "This Week's Tasks" : 'ഈ ആഴ്ചയുടെ ജോലികൾ'}
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-4">
            {weeklyAdvisories.map((day, index) => (
              <div key={index} className={`${index !== weeklyAdvisories.length - 1 ? 'border-b border-gray-100 pb-4 mb-4' : ''}`}>
                <h3 className="font-semibold text-gray-800 mb-2">{day.day}</h3>
                <ul className="space-y-1">
                  {day.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Government Schemes */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Eligible Government Schemes' : 'അർഹമായ സർക്കാർ പദ്ധതികൾ'}
          </h2>
          <div className="space-y-3">
            {governmentSchemes.map((scheme, index) => (
              <div key={index} className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-white bg-opacity-95 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800">{scheme.name}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{scheme.amount}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{scheme.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium text-sm">
                      {language === 'en' ? '✓ Eligible' : '✓ അർഹൻ'}
                    </span>
                    <button className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-green-600 transition-all">
                      {language === 'en' ? 'Apply' : 'അപേക്ഷിക്കുക'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
