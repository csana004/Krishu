import React from 'react';
import { TrendingUp, Shield, DollarSign, AlertTriangle, Leaf, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './shared/Header';

interface KrishiLedgerProps {
  user: any;
  onBack: () => void;
}

export default function KrishiLedger({ user, onBack }: KrishiLedgerProps) {
  const { t, language } = useLanguage();

  const scores = {
    cropHealth: 85,
    sustainability: 78,
    creditReadiness: 92,
    riskLevel: 'Low'
  };

  const assets = [
    {
      name: language === 'en' ? 'Paddy Field (North)' : 'നെൽവയൽ (വടക്ക്)',
      area: '1.5 ഏക്കർ',
      value: '₹15,00,000',
      status: 'Excellent',
      health: 90
    },
    {
      name: language === 'en' ? 'Pepper Garden' : 'കുരുമുളക് തോട്ടം',
      area: '0.8 ഏക്കർ',
      value: '₹8,50,000',
      status: 'Good',
      health: 82
    },
    {
      name: language === 'en' ? 'Coconut Grove' : 'തെങ്ങ് തോട്ടം',
      area: '0.7 ഏക്കർ',
      value: '₹5,25,000',
      status: 'Fair',
      health: 75
    }
  ];

  const recentTransactions = [
    {
      date: '2024-01-20',
      type: 'Income',
      description: language === 'en' ? 'Pepper Sale' : 'കുരുമുളക് വിൽപ്പന',
      amount: '+₹45,000',
      color: 'text-green-600'
    },
    {
      date: '2024-01-18',
      type: 'Expense',
      description: language === 'en' ? 'Fertilizer Purchase' : 'വളം വാങ്ങൽ',
      amount: '-₹12,500',
      color: 'text-red-600'
    },
    {
      date: '2024-01-15',
      type: 'Income',
      description: language === 'en' ? 'Rice Sale' : 'അരി വിൽപ്പന',
      amount: '+₹28,000',
      color: 'text-green-600'
    }
  ];

  const recommendations = [
    {
      type: 'credit',
      title: language === 'en' ? 'Eligible for KCC Loan' : 'കെസിസി വായ്പയ്ക്ക് യോഗ്യൻ',
      description: language === 'en' 
        ? 'Based on your assets and credit score, you can apply for up to ₹3,00,000 KCC loan at 4% interest.'
        : 'നിങ്ങളുടെ സ്വത്തുക്കളും ക്രെഡിറ്റ് സ്കോറും അടിസ്ഥാനമാക്കി 4% പലിശയിൽ ₹3,00,000 വരെ KCC വായ്പയ്ക്ക് അപേക്ഷിക്കാം.',
      action: language === 'en' ? 'Apply Now' : 'ഇപ്പോൾ അപേക്ഷിക്കുക'
    },
    {
      type: 'insurance',
      title: language === 'en' ? 'Crop Insurance Due' : 'വിള ഇൻഷുറൻസ് അടയ്ക്കേണ്ടത്',
      description: language === 'en'
        ? 'Renew your crop insurance by Jan 31st to protect against weather risks. Premium: ₹2,850 for all crops.'
        : 'കാലാവസ്ഥാ അപകടങ്ങളിൽ നിന്ന് സംരക്ഷിക്കാൻ ജനുവരി 31 നകം വിള ഇൻഷുറൻസ് പുതുക്കുക. പ്രീമിയം: എല്ലാ വിളകൾക്കും ₹2,850.',
      action: language === 'en' ? 'Renew' : 'പുതുക്കുക'
    },
    {
      type: 'sustainability',
      title: language === 'en' ? 'Organic Certification' : 'ജൈവ സാക്ഷ്യപത്രം',
      description: language === 'en'
        ? 'Your farm practices qualify for organic certification. This can increase your pepper price by 25-30%.'
        : 'നിങ്ങളുടെ കൃഷിരീതി ജൈവ സാക്ഷ്യപത്രത്തിന് യോഗ്യമാണ്. ഇത് കുരുമുളക് വില 25-30% വർധിപ്പിക്കാം.',
      action: language === 'en' ? 'Get Certified' : 'സർട്ടിഫിക്കറ്റ് എടുക്കുക'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      <Header title={t('krishiLedger')} onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Score Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Leaf className="w-6 h-6" />
              <span className="text-2xl font-bold">{scores.cropHealth}%</span>
            </div>
            <h3 className="font-semibold">
              {language === 'en' ? 'Crop Health' : 'വിള ആരോഗ്യം'}
            </h3>
            <p className="text-sm opacity-90">
              {language === 'en' ? 'Excellent condition' : 'മികച്ച അവസ്ഥ'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-6 h-6" />
              <span className="text-2xl font-bold">{scores.sustainability}%</span>
            </div>
            <h3 className="font-semibold">
              {language === 'en' ? 'Sustainability' : 'സുസ്ഥിരത'}
            </h3>
            <p className="text-sm opacity-90">
              {language === 'en' ? 'Good practices' : 'നല്ല രീതികൾ'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6" />
              <span className="text-2xl font-bold">{scores.creditReadiness}%</span>
            </div>
            <h3 className="font-semibold">
              {language === 'en' ? 'Credit Ready' : 'ക്രെഡിറ്റ് തയ്യാറാണ്'}
            </h3>
            <p className="text-sm opacity-90">
              {language === 'en' ? 'Excellent rating' : 'മികച്ച റേറ്റിംഗ്'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-sm p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-xl font-bold">{scores.riskLevel}</span>
            </div>
            <h3 className="font-semibold">
              {language === 'en' ? 'Risk Level' : 'അപകട നില'}
            </h3>
            <p className="text-sm opacity-90">
              {language === 'en' ? 'Low risk profile' : 'കുറഞ്ഞ അപകടം'}
            </p>
          </div>
        </div>

        {/* Farm Assets */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Farm Assets' : 'കാർഷിക സ്വത്തുക്കൾ'}
          </h2>
          <div className="space-y-4">
            {assets.map((asset, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{asset.name}</h3>
                  <span className="text-lg font-bold text-green-600">{asset.value}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">
                      {language === 'en' ? 'Area' : 'വിസ്തൃതി'}
                    </span>
                    <div className="font-medium">{asset.area}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      {language === 'en' ? 'Status' : 'അവസ്ഥ'}
                    </span>
                    <div className="font-medium">{asset.status}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      {language === 'en' ? 'Health' : 'ആരോഗ്യം'}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${asset.health}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{asset.health}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 mt-4">
            <div className="text-center">
              <span className="text-lg font-semibold text-gray-700">
                {language === 'en' ? 'Total Asset Value' : 'മൊത്തം സ്വത്ത് മൂല്യം'}
              </span>
              <div className="text-3xl font-bold text-green-600 mt-1">₹28,75,000</div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Recent Transactions' : 'സമീപകാല ഇടപാടുകൾ'}
          </h2>
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{transaction.description}</h3>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <span className={`font-bold ${transaction.color}`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Recommendations' : 'ശുപാർശകൾ'}
          </h2>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold text-gray-800">{rec.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all">
                  {rec.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-sm p-6 text-white text-center">
          <Award className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">
            {language === 'en' ? '🏆 Model Farmer 2024' : '🏆 മാതൃകാ കർഷകൻ 2024'}
          </h3>
          <p className="text-sm opacity-90">
            {language === 'en' 
              ? 'Recognized for sustainable farming practices and excellent crop management'
              : 'സുസ്ഥിര കൃഷിരീതികൾക്കും മികച്ച വിള പരിപാലനത്തിനും അംഗീകാരം'
            }
          </p>
        </div>

        {/* Voice Commands */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-bold text-green-800 mb-2">
            {language === 'en' ? 'Voice Commands' : 'ശബ്ദ കമാൻഡുകൾ'}
          </h3>
          <div className="space-y-1 text-sm text-green-700">
            <p><strong>{language === 'en' ? 'Say:' : 'പറയുക:'}</strong> "{language === 'en' ? 'What is my crop health score?' : 'എന്റെ വിള ആരോഗ്യ സ്കോർ എന്താണ്?'}"</p>
            <p><strong>{language === 'en' ? 'Say:' : 'പറയുക:'}</strong> "{language === 'en' ? 'Show my asset value' : 'എന്റെ സ്വത്ത് മൂല്യം കാണിക്കുക'}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}