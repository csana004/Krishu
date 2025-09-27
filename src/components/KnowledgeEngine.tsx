import React, { useState } from 'react';
import { Search, Book, Leaf, Bug, Droplets, Sun, TrendingUp, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './shared/Header';
import VoiceButton from './shared/VoiceButton';

interface KnowledgeEngineProps {
  user: any;
  onBack: () => void;
}

interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  content: string;
  image?: string;
  tags: string[];
}

export default function KnowledgeEngine({ user, onBack }: KnowledgeEngineProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeItem | null>(null);

  const categories = [
    { key: 'all', label: language === 'en' ? 'All' : 'എല്ലാം', icon: Book, color: 'bg-gray-500' },
    { key: 'crops', label: language === 'en' ? 'Crops' : 'വിളകൾ', icon: Leaf, color: 'bg-green-500' },
    { key: 'pests', label: language === 'en' ? 'Pests' : 'കീടങ്ങൾ', icon: Bug, color: 'bg-red-500' },
    { key: 'irrigation', label: language === 'en' ? 'Irrigation' : 'ജലസേചനം', icon: Droplets, color: 'bg-blue-500' },
    { key: 'weather', label: language === 'en' ? 'Weather' : 'കാലാവസ്ഥ', icon: Sun, color: 'bg-yellow-500' },
    { key: 'market', label: language === 'en' ? 'Market' : 'വിപണി', icon: TrendingUp, color: 'bg-purple-500' }
  ];

  const knowledgeBase: KnowledgeItem[] = [
    {
      id: '1',
      title: language === 'en' ? 'Rice Cultivation Best Practices' : 'നെല്ല് കൃഷിയുടെ മികച്ച രീതികൾ',
      category: 'crops',
      content: language === 'en' 
        ? 'Rice is the staple food crop of Kerala. For optimal yield, select high-quality seeds, prepare the land properly with adequate plowing, and ensure proper water management. The ideal time for transplantation is during monsoon months.'
        : 'നെല്ല് കേരളത്തിലെ പ്രധാന ഭക്ഷ്യവിളയാണ്. മികച്ച വിളവിനായി ഗുണമേന്മയുള്ള വിത്തുകൾ തിരഞ്ഞെടുക്കുക, ശരിയായ ഉഴവോടെ ഭൂമി തയ്യാറാക്കുക, കൂടാതെ ശരിയായ ജല പരിപാലനം ഉറപ്പാക്കുക. നടീൽ ചെയ്യാനുള്ള അനുയോജ്യമായ സമയം മൺസൂൺ മാസങ്ങളാണ്.',
      tags: ['rice', 'നെല്ല്', 'cultivation', 'കൃഷി']
    },
    {
      id: '2',
      title: language === 'en' ? 'Pepper Pest Management' : 'കുരുമുളക് കീട പരിപാലനം',
      category: 'pests',
      content: language === 'en'
        ? 'Common pests in pepper include thrips, mites, and scale insects. Use neem oil spray (5ml per liter) during early morning or evening. Apply organic pesticides like panchagavya for sustainable pest control.'
        : 'കുരുമുളകിലെ സാധാരണ കീടങ്ങൾ ത്രിപ്സ്, ചെറുകിട കീടങ്ങൾ, സ്കെയിൽ പ്രാണികൾ എന്നിവയാണ്. നേരം പുലർന്നോ സായാഹ്നമോ വേപ്പിൻ എണ്ണ സ്പ്രേ (ഒരു ലിറ്ററിൽ 5ml) ഉപയോഗിക്കുക. സുസ്ഥിര കീട നിയന്ത്രണത്തിന് പഞ്ചഗവ്യ പോലുള്ള ജൈവ കീടനാശിനികൾ പ്രയോഗിക്കുക.',
      tags: ['pepper', 'കുരുമുളക്', 'pests', 'കീടങ്ങൾ', 'neem', 'വേപ്പ്']
    },
    {
      id: '3',
      title: language === 'en' ? 'Drip Irrigation Setup' : 'ഡ്രിപ്പ് ഇറിഗേഷൻ സജ്ജീകരണം',
      category: 'irrigation',
      content: language === 'en'
        ? 'Drip irrigation is water-efficient method suitable for Kerala\'s climate. Install main pipes, sub-main pipes, and lateral lines with emitters. This system reduces water usage by 30-50% and improves crop yield.'
        : 'ഡ്രിപ്പ് ഇറിഗേഷൻ കേരളത്തിന്റെ കാലാവസ്ഥയ്ക്ക് അനുയോജ്യമായ ജല സാമ്പത്തിക രീതിയാണ്. പ്രധാന പൈപ്പുകൾ, ഉപ-പ്രധാന പൈപ്പുകൾ, ഇമിറ്റർമാരുള്ള ലാറ്ററൽ ലൈനുകൾ എന്നിവ സ്ഥാപിക്കുക. ഈ സംവിധാനം ജല ഉപയോഗം 30-50% കുറയ്ക്കുകയും വിള വിളവ് മെച്ചപ്പെടുത്തുകയും ചെയ്യുന്നു.',
      tags: ['irrigation', 'ജലസേചനം', 'drip', 'ഡ്രിപ്പ്', 'water saving', 'ജല സംരക്ഷണം']
    },
    {
      id: '4',
      title: language === 'en' ? 'Monsoon Farming Tips' : 'മൺസൂൺ കൃഷി നുറുങ്ങുകൾ',
      category: 'weather',
      content: language === 'en'
        ? 'Monsoon season is crucial for Kerala agriculture. Prepare drainage systems, select monsoon-resistant varieties, and practice mixed cropping. Avoid over-watering and ensure proper plant spacing for air circulation.'
        : 'കേരള കൃഷിക്ക് മൺസൂൺ കാലാവസ്ഥ നിർണ്ണായകമാണ്. ഡ്രെയിനേജ് സംവിധാനങ്ങൾ തയ്യാറാക്കുക, മൺസൂൺ പ്രതിരോധശേഷിയുള്ള ഇനങ്ങൾ തിരഞ്ഞെടുക്കുക, സമ്മിശ്ര കൃഷി പരിശീലിക്കുക. അധിക വെള്ളം ഒഴിവാക്കുകയും വായു സഞ്ചാരത്തിനായി ശരിയായ ചെടി അകലം ഉറപ്പാക്കുകയും ചെയ്യുക.',
      tags: ['monsoon', 'മൺസൂൺ', 'weather', 'കാലാവസ്ഥ', 'farming', 'കൃഷി']
    },
    {
      id: '5',
      title: language === 'en' ? 'Coconut Market Trends' : 'തെങ്ങ് മാർക്കറ്റ് ട്രെൻഡുകൾ',
      category: 'market',
      content: language === 'en'
        ? 'Coconut prices have shown upward trend due to increased demand for coconut oil and value-added products. Current price in Kerala: ₹15-20 per piece. Consider value addition through copra making or coconut oil extraction.'
        : 'തെങ്ങാ എണ്ണയ്ക്കും മൂല്യവർദ്ധിത ഉൽപ്പാദനങ്ങൾക്കുമുള്ള വർധിച്ച ആവശ്യം കാരണം തെങ്ങിന്റെ വില ഉയർന്ന പ്രവണത കാണിച്ചിരിക്കുന്നു. കേരളത്തിലെ നിലവിലെ വില: ഒരു എണ്ണത്തിന് ₹15-20. കൊപ്ര നിർമ്മാണം അല്ലെങ്കിൽ തെങ്ങാ എണ്ണ വേർതിരിക്കൽ വഴി മൂല്യവർദ്ധന പരിഗണിക്കുക.',
      tags: ['coconut', 'തെങ്ങ്', 'market', 'വിപണി', 'price', 'വില']
    }
  ];

  const filteredKnowledge = knowledgeBase.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const popularTopics = [
    language === 'en' ? 'Rice cultivation' : 'നെല്ല് കൃഷി',
    language === 'en' ? 'Pepper pests' : 'കുരുമുളക് കീടങ്ങൾ',
    language === 'en' ? 'Organic farming' : 'ജൈവ കൃഷി',
    language === 'en' ? 'Drip irrigation' : 'ഡ്രിപ്പ് ഇറിഗേഷൻ',
    language === 'en' ? 'Coconut prices' : 'തെങ്ങ് വില'
  ];

  const handleVoiceSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      <Header title={t('knowledgeEngine')} onBack={onBack} />
      
      {selectedArticle ? (
        // Article Detail View
        <div className="p-4">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-green-600 mb-4 hover:text-green-700 transition-all"
          >
            ← {t('back')} to search
          </button>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{selectedArticle.title}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {categories.find(cat => cat.key === selectedArticle.category)?.label}
              </span>
            </div>
            <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
              {selectedArticle.content}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">
                {language === 'en' ? 'Tags:' : 'ടാഗുകൾ:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Search and Browse View
        <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchKnowledge')}
                className="w-full pl-12 pr-16 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
              <VoiceButton 
                onVoiceInput={handleVoiceSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.key
                      ? `${category.color} text-white`
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Topics */}
          {!searchQuery && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">{t('popularTopics')}</h2>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(topic)}
                    className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-all"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {searchQuery 
                ? `${language === 'en' ? 'Search Results' : 'തിരയൽ ഫലങ്ങൾ'} (${filteredKnowledge.length})`
                : `${language === 'en' ? 'All Articles' : 'എല്ലാ ലേഖനങ്ങളും'} (${filteredKnowledge.length})`
              }
            </h2>
            
            {filteredKnowledge.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {language === 'en' ? 'No articles found' : 'ലേഖനങ്ങൾ കണ്ടെത്തിയില്ല'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredKnowledge.map((article) => {
                  const categoryInfo = categories.find(cat => cat.key === article.category);
                  return (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all transform hover:scale-[1.02]"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`${categoryInfo?.color || 'bg-gray-500'} rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                          {categoryInfo?.icon && <categoryInfo.icon className="w-6 h-6 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-2">{article.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                            {article.content.substring(0, 150)}...
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                              {categoryInfo?.label}
                            </span>
                            <span className="text-green-600 font-medium text-sm">
                              {language === 'en' ? 'Read more →' : 'കൂടുതൽ വായിക്കുക →'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Offline Fallback */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6">
            <h3 className="font-bold text-orange-800 mb-2">
              {language === 'en' ? 'Offline Access' : 'ഓഫ്‌ലൈൻ പ്രവേശനം'}
            </h3>
            <p className="text-sm text-orange-700">
              {language === 'en' 
                ? 'Articles are cached locally. SMS "SEARCH [topic]" to 54321 for low connectivity.'
                : 'ലേഖനങ്ങൾ പ്രാദേശികമായി സംഭരിച്ചിരിക്കുന്നു. കുറഞ്ഞ കണക്റ്റിവിറ്റിക്ക് "SEARCH [വിഷയം]" 54321 ലേക്ക് SMS ചെയ്യുക.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}