
import React, { useState, useRef, useEffect } from 'react';
import { KeyRound, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/atoms/button';

interface PINScreenProps {
  isSettingPIN?: boolean;
}

const PINScreen: React.FC<PINScreenProps> = ({ isSettingPIN = false }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // Focus previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinString = pin.join('');
    
    if (pinString.length !== 4) {
      setError('Please enter all 4 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate async operation
    setTimeout(() => {
      setIsLoading(false);
      if (isSettingPIN) {
        alert('PIN set successfully!');
      } else {
        // Simulate PIN verification
        if (pinString === '1234') {
          alert('PIN verified successfully!');
        } else {
          setError('Incorrect PIN. Please try again.');
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col justify-center p-4">
      <div className="max-w-md w-full mx-auto space-y-8">
        <button
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
            <KeyRound className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isSettingPIN ? 'Set Your PIN' : 'Enter Your PIN'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isSettingPIN 
              ? 'Create a 4-digit PIN for quick access'
              : 'Enter your 4-digit PIN to continue'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                // ref={(el) => (inputRefs.current[index] = el)}
                type="password"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                disabled={isLoading}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isSettingPIN ? 'Setting PIN...' : 'Verifying...'}
              </div>
            ) : (
              isSettingPIN ? 'Set PIN' : 'Continue'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PINScreen;
