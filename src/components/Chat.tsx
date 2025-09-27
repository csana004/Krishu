import React, { useState } from 'react';
import { Send, Mic, Bot, User, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './shared/Header';
import VoiceButton from './shared/VoiceButton';
import { useEffect } from 'react';

interface ChatProps {
  user: any;
  onBack: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  language: 'en' | 'ml';
  timestamp: Date;
}

export default function Chat({ user, onBack }: ChatProps) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);

useEffect(() => {
  // Initialize bot message whenever language or user.name changes
  const initialBotMessage: Message = {
    id: Date.now().toString(),
    type: 'bot',
    content: language === 'en'
      ? `Hello ${user.name}! I'm your Krishi Sakhi assistant. Ask me anything about farming, weather, or crops.`
      : `ഹലോ ${user.name}! ഞാൻ നിങ്ങളുടെ കൃഷി സഖി അസിസ്റ്റന്റാണ്. കൃഷി, കാലാവസ്ഥ, അല്ലെങ്കിൽ വിളകളെക്കുറിച്ച് എന്തും ചോദിക്കാം.`,
    language,
    timestamp: new Date(),
  };
  setMessages([initialBotMessage]);
}, [language, user.name]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const farmerResponses = {
    en: {
      weather: "Based on your location in Kerala, expect light rain this week. It's perfect timing for rice sowing! Temperature: 28°C, Humidity: 85%",
      pest: "For pepper plants, common pests include thrips and scale insects. Use neem oil spray early morning. Mix 5ml per liter of water.",
      fertilizer: "For your coconut trees, apply organic compost in the monsoon. Use 10kg per tree around the root zone.",
      price: "Current market prices in Kottayam: Rice - ₹25/kg, Pepper - ₹450/kg, Coconut - ₹15/piece",
      irrigation: "For your 2.5 acres, drip irrigation would be most efficient. Consider subsidy schemes available in Kerala."
    },
    ml: {
      weather: "കേരളത്തിലെ നിങ്ങളുടെ സ്ഥലത്ത് ഈ ആഴ്ച നേരിയ മഴ പ്രതീക്ഷിക്കുന്നു. നെല്ല് വിതയ്ക്കാൻ നല്ല സമയം! താപനില: 28°C, ആർദ്രത: 85%",
      pest: "കുരുമുളക് ചെടികളിൽ ത്രിപ്സ്, സ്കെയിൽ പ്രാണികൾ സാധാരണമാണ്. നേരം പുലർന്ന് വേപ്പിൻ എണ്ണ സ്പ്രേ ചെയ്യുക. ഒരു ലിറ്റർ വെള്ളത്തിൽ 5ml കലർത്തുക.",
      fertilizer: "നിങ്ങളുടെ തെങ്ങുകൾക്ക് മഴക്കാലത്ത് ജൈവ കമ്പോസ്റ്റ് ഇടുക. ഓരോ മരത്തിനും വേരിന് ചുറ്റും 10kg വീതം.",
      price: "കോട്ടയത്തെ ഇന്നത്തെ വില: അരി - ₹25/kg, കുരുമുളക് - ₹450/kg, തെങ്ങ് - ₹15/എണ്ണം",
      irrigation: "നിങ്ങളുടെ 2.5 ഏക്കറിന് ഡ്രിപ്പ് ഇറിഗേഷൻ ഏറ്റവും നല്ലത്. കേരളത്തിൽ ലഭ്യമായ സബ്സിഡി സ്കീമുകൾ പരിഗണിക്കുക."
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const responses = farmerResponses[language];
    
    if (message.includes('weather') || message.includes('കാലാവസ്ഥ') || message.includes('മഴ')) {
      return responses.weather;
    } else if (message.includes('pest') || message.includes('കീട') || message.includes('പ്രാണി')) {
      return responses.pest;
    } else if (message.includes('fertilizer') || message.includes('വളം')) {
      return responses.fertilizer;
    } else if (message.includes('price') || message.includes('വില')) {
      return responses.price;
    } else if (message.includes('water') || message.includes('irrigation') || message.includes('നനയ്ക്കൽ')) {
      return responses.irrigation;
    } else {
      return language === 'en' 
        ? "I understand your question about farming. Let me help you with specific advice based on your crops and location. Could you be more specific about what you'd like to know?"
        : "കൃഷിയെക്കുറിച്ചുള്ള നിങ്ങളുടെ ചോദ്യം ഞാൻ മനസ്സിലാക്കി. നിങ്ങളുടെ വിളകളും സ്ഥലവും അടിസ്ഥാനമാക്കി വ്യക്തമായ ഉപദേശം തരാം. എന്താണ് അറിയാൻ ആഗ്രഹിക്കുന്നതെന്ന് കൂടുതൽ വ്യക്തമാക്കാമോ?";
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      language,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputText),
        language,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceToText = () => {
    // Simulate speech-to-text
    const voiceInputs = language === 'en' 
      ? ['What is the weather today?', 'How to control pests in pepper?', 'Current market prices']
      : ['ഇന്നത്തെ കാലാവസ്ഥ എന്താണ്?', 'കുരുമുളകിൽ കീടങ്ങളെ എങ്ങനെ നിയന്ത്രിക്കാം?', 'ഇന്നത്തെ മാർക്കറ്റ് വില'];
    
    const randomInput = voiceInputs[Math.floor(Math.random() * voiceInputs.length)];
    setInputText(randomInput);
  };

  const speakMessage = (content: string) => {
    // Simulate text-to-speech
    console.log('Speaking:', content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 flex flex-col">
      <Header title={t('chat')} onBack={onBack} />
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'user' 
                ? 'bg-blue-500' 
                : 'bg-gradient-to-r from-green-500 to-orange-500'
            }`}>
              {message.type === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            
            <div className={`flex-1 max-w-xs sm:max-w-sm ${
              message.type === 'user' ? 'text-right' : 'text-left'
            }`}>
              <div className={`rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}>
                <p className="text-sm">{message.content}</p>
                {message.type === 'bot' && (
                  <button
                    onClick={() => speakMessage(message.content)}
                    className="mt-2 p-1 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <Volume2 className="w-3 h-3 text-gray-500" />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-orange-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-3">
          <VoiceButton onVoiceInput={handleVoiceToText} />
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('typeMessage')}
              className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick Suggestions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(language === 'en' 
            ? ['Weather', 'Pest Control', 'Market Price', 'Irrigation']
            : ['കാലാവസ്ഥ', 'കീടനിയന്ത്രണം', 'മാർക്കറ്റ് വില', 'ജലസേചനം']
          ).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputText(suggestion)}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Offline Fallback */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3">
          <p className="text-sm text-orange-700">
            <strong>Low connectivity?</strong> SMS "ASK [your question]" to 54321
          </p>
        </div>
      </div>
    </div>
  );
}