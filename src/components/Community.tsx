import React, { useState } from 'react';
import { Users, Plus, MessageSquare, Heart, Share2, Clock, User, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './shared/Header';
import VoiceButton from './shared/VoiceButton';

interface CommunityProps {
  user: any;
  onBack: () => void;
}

interface Post {
  id: string;
  author: string;
  authorLocation: string;
  category: string;
  title: string;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

export default function Community({ user, onBack }: CommunityProps) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({
    category: 'cropCare',
    title: '',
    content: ''
  });

  const categories = [
    { key: 'all', label: language === 'en' ? 'All Posts' : 'എല്ലാ പോസ്റ്റുകളും', color: 'bg-gray-500' },
    { key: 'cropCare', label: language === 'en' ? 'Crop Care' : 'വിള പരിചരണം', color: 'bg-green-500' },
    { key: 'pests', label: language === 'en' ? 'Pests & Diseases' : 'കീടങ്ങളും രോഗങ്ങളും', color: 'bg-red-500' },
    { key: 'irrigation', label: language === 'en' ? 'Irrigation' : 'ജലസേചനം', color: 'bg-blue-500' },
    { key: 'market', label: language === 'en' ? 'Market Prices' : 'മാർക്കറ്റ് വില', color: 'bg-purple-500' },
    { key: 'schemes', label: language === 'en' ? 'Govt Schemes' : 'സർക്കാർ പദ്ധതികൾ', color: 'bg-yellow-600' }
  ];

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'രാജേഷ് നായർ',
      authorLocation: 'ആലപ്പുഴ',
      category: 'cropCare',
      title: language === 'en' ? 'Best time for pepper pruning?' : 'കുരുമുളക് വള്ളിക്ക് ചില്ലകൾ മുറിക്കാൻ നല്ല സമയം എപ്പോൾ?',
      content: language === 'en' 
        ? 'My pepper vines are growing well but getting dense. When is the ideal time for pruning? Should I do it before or after monsoon?'
        : 'എന്റെ കുരുമുളക് വള്ളികൾ നന്നായി വളരുന്നു പക്ഷേ കട്ടിയാകുന്നു. ചില്ലകൾ മുറിക്കാൻ അനുയോജ്യമായ സമയം എപ്പോൾ? മൺസൂണിന് മുമ്പോ പിമ്പോ?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
      comments: 8,
      isLiked: false
    },
    {
      id: '2',
      author: 'സീത ജോസ്',
      authorLocation: 'കോട്ടയം',
      category: 'pests',
      title: language === 'en' ? 'White spots on rice leaves - help needed!' : 'നെൽപ്പാടത്തിലെ ഇലകളിൽ വെളുത്ത പാടുകൾ - സഹായം വേണം!',
      content: language === 'en'
        ? 'Noticed white powdery spots appearing on my rice plants. Is this fungal? What organic treatment can I use? Attaching photo.'
        : 'എന്റെ നെൽ ചെടികളിൽ വെളുത്ത പൊടിപടുത്ത പാടുകൾ കാണുന്നു. ഇത് ഫംഗസ് ആണോ? എന്ത് ജൈവ ചികിത്സ ഉപയോഗിക്കാം? ഫോട്ടോ ഇടുന്നു.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 18,
      comments: 15,
      isLiked: true
    },
    {
      id: '3',
      author: 'മുരളി കുമാർ',
      authorLocation: 'തൃശ്ശൂർ',
      category: 'market',
      title: language === 'en' ? 'Coconut prices update - Thrissur market' : 'തെങ്ങിന്റെ വില അപ്ഡേറ്റ് - തൃശ്ശൂർ മാർക്കറ്റ്',
      content: language === 'en'
        ? 'Current coconut prices at Thrissur wholesale market: ₹18-22 per piece depending on size. Demand is good for medium-sized coconuts.'
        : 'തൃശ്ശൂർ മൊത്തവ്യാപാര മാർക്കറ്റിൽ നിലവിലെ തെങ്ങിന്റെ വില: വലുപ്പം അനുസരിച്ച് ഒരെണ്ണത്തിന് ₹18-22. ഇടത്തരം വലുപ്പമുള്ള തെങ്ങിന് നല്ല ഡിമാൻഡ് ഉണ്ട്.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 25,
      comments: 6,
      isLiked: false
    },
    {
      id: '4',
      author: 'അനിൽ വർമ്മ',
      authorLocation: 'മലപ്പുറം',
      category: 'schemes',
      title: language === 'en' ? 'PM-KISAN payment received - verification tips' : 'PM-KISAN പേമെന്റ് കിട്ടി - വെരിഫിക്കേഷൻ നുറുങ്ങുകൾ',
      content: language === 'en'
        ? 'Received ₹2000 today. For those still waiting, check your land records are updated and Aadhaar is linked properly. Visit nearest CSC.'
        : 'ഇന്ന് ₹2000 കിട്ടി. ഇനിയും കാത്തിരിക്കുന്നവർ ഭൂമി രേഖകൾ അപ്ഡേറ്റ് ചെയ്തിട്ടുണ്ടോ ആധാർ ശരിയായി ലിങ്ക് ചെയ്തിട്ടുണ്ടോ പരിശോധിക്കുക. അടുത്തുള്ള CSC സന്ദർശിക്കുക.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 34,
      comments: 12,
      isLiked: true
    }
  ]);

  const [postComments] = useState<{ [key: string]: Comment[] }>({
    '1': [
      {
        id: '1',
        author: 'പ്രകാശ് പിള്ള',
        content: 'മൺസൂണിന് മുമ്പ് ജനുവരി-ഫെബ്രുവരിയിൽ ചെയ്യുക. അപ്പോൾ വേനലിൽ പുതിയ ചില്ലകൾ വരും.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        id: '2',
        author: 'ലീല രാജ്',
        content: 'എന്റെ അനുഭവത്തിൽ ഡിസംബറിൽ ചെയ്യുന്നതാണ് നല്ലത്. വെട്ടിയ ഭാഗത്ത് കോപ്പർ സൾഫേറ്റ് പേസ്റ്റ് ഇടണം.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000)
      }
    ],
    '2': [
      {
        id: '3',
        author: 'ഡോക്ടർ രാജൻ',
        content: 'ബ്ലാസ്റ്റ് രോഗമാണ് ഇത്. പൊട്ടാഷ് ഡയഫോസ്ഫേറ്റ് 2 ഗ്രാം ഒരു ലിറ്റർ വെള്ളത്തിൽ കലർത്തി സ്പ്രേ ചെയ്യുക.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ]
  });

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  );

  const getCategoryInfo = (categoryKey: string) => {
    return categories.find(cat => cat.key === categoryKey) || categories[0];
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post: Post = {
        id: Date.now().toString(),
        author: user.name || 'Anonymous',
        authorLocation: user.location || 'Unknown',
        category: newPost.category,
        title: newPost.title,
        content: newPost.content,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        isLiked: false
      };
      setPosts([post, ...posts]);
      setNewPost({ category: 'cropCare', title: '', content: '' });
      setShowCreatePost(false);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return language === 'en' ? 'Just now' : 'ഇപ്പോൾ';
    if (hours < 24) return `${hours}${language === 'en' ? 'h ago' : 'മ മുമ്പ്'}`;
    const days = Math.floor(hours / 24);
    return `${days}${language === 'en' ? 'd ago' : 'ദി മുമ്പ്'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      <Header title={t('community')} onBack={onBack} />
      
      {selectedPost ? (
        // Post Detail View
        <div className="p-4">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center text-green-600 mb-4 hover:text-green-700 transition-all"
          >
            ← {t('back')} to community
          </button>
          
          {/* Post Detail */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{selectedPost.author}</h3>
                <p className="text-sm text-gray-500">{selectedPost.authorLocation}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <span className={`${getCategoryInfo(selectedPost.category).color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {getCategoryInfo(selectedPost.category).label}
              </span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-3">{selectedPost.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{selectedPost.content}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{formatTimeAgo(selectedPost.timestamp)}</span>
              <div className="flex space-x-4">
                <span>{selectedPost.likes} likes</span>
                <span>{selectedPost.comments} comments</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => handleLike(selectedPost.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  selectedPost.isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${selectedPost.isLiked ? 'fill-current' : ''}`} />
                <span>{language === 'en' ? 'Like' : 'ഇഷ്ടം'}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-50">
                <Share2 className="w-4 h-4" />
                <span>{language === 'en' ? 'Share' : 'പങ്കിടുക'}</span>
              </button>
            </div>
          </div>
          
          {/* Comments */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {language === 'en' ? 'Comments' : 'കമന്റുകൾ'}
            </h3>
            <div className="space-y-4">
              {(postComments[selectedPost.id] || []).map((comment) => (
                <div key={comment.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-8 h-8 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{comment.author}</h4>
                      <p className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Community Feed View
        <div className="p-4">
          {/* Create Post Button */}
          <button
            onClick={() => setShowCreatePost(true)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 mb-6 hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>{t('postQuestion')}</span>
          </button>

          {/* Category Filter */}
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
                  <Tag className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              {t('recentPosts')} ({filteredPosts.length})
            </h2>
            
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{post.author}</h3>
                        <p className="text-sm text-gray-500">{post.authorLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{formatTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className={`${getCategoryInfo(post.category).color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {getCategoryInfo(post.category).label}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 text-lg mb-2">{post.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.content.length > 120 ? `${post.content.substring(0, 120)}...` : post.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current text-red-500' : ''}`} />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium text-sm">
                      {language === 'en' ? 'View →' : 'കാണുക →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Commands */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6">
            <h3 className="font-bold text-orange-800 mb-2">
              {language === 'en' ? 'Voice Commands' : 'ശബ്ദ കമാൻഡുകൾ'}
            </h3>
            <div className="space-y-1 text-sm text-orange-700">
              <p><strong>{language === 'en' ? 'Say:' : 'പറയുക:'}</strong> "{language === 'en' ? 'Ask about pepper pest control' : 'കുരുമുളക് കീട നിയന്ത്രണത്തെക്കുറിച്ച് ചോദിക്കുക'}"</p>
              <p><strong>SMS:</strong> Send "COMMUNITY [your question]" to 54321</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t('postQuestion')}</h2>
            
            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Category' : 'വിഭാഗം'}
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Question Title' : 'ചോദ്യത്തിന്റെ ശീർഷകം'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={language === 'en' ? 'What do you want to ask?' : 'എന്താണ് ചോദിക്കാൻ ആഗ്രഹിക്കുന്നത്?'}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                  />
                  <VoiceButton 
                    onVoiceInput={(text) => setNewPost(prev => ({ ...prev, title: text }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Details' : 'വിശദാംശങ്ങൾ'}
                </label>
                <div className="relative">
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder={language === 'en' ? 'Describe your question in detail...' : 'നിങ്ങളുടെ ചോദ്യം വിശദമായി വിവരിക്കുക...'}
                    rows={4}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                  />
                  <VoiceButton 
                    onVoiceInput={(text) => setNewPost(prev => ({ ...prev, content: text }))}
                    className="absolute right-3 top-3"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreatePost(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.title || !newPost.content}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all"
              >
                {language === 'en' ? 'Post' : 'പോസ്റ്റ് ചെയ്യുക'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}