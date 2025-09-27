import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceButtonProps {
  onVoiceInput: (text: string) => void;
  className?: string;
}

export default function VoiceButton({ onVoiceInput, className = '' }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(true);
    
    // Simulate voice recognition (in a real app, this would use Web Speech API)
    setTimeout(() => {
      setIsListening(false);
      // Demo responses based on current context
      const demoTexts = [
        'പാടി നെല്ല്', // Paddy rice in Malayalam
        'കുരുമുളക്', // Pepper in Malayalam
        'കൊച്ചി', // Kochi in Malayalam
        'രണ്ട് ഏക്കർ', // Two acres in Malayalam
        'ദിവസവും', // Daily in Malayalam
        'രമേശ് കുമാർ' // Name in Malayalam
      ];
      const randomText = demoTexts[Math.floor(Math.random() * demoTexts.length)];
      onVoiceInput(randomText);
    }, 2000);
  };

  return (
    <button
      onClick={handleVoiceInput}
      disabled={isListening}
      className={`p-2 rounded-full transition-all ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-green-500 text-white hover:bg-green-600'
      } disabled:cursor-not-allowed ${className}`}
      title="Voice Input"
    >
      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </button>
  );
}