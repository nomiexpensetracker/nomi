
import React, { useState } from 'react';
import { Check, Crown, ArrowLeft, Lock } from 'lucide-react';

import { Button } from '@/components/atoms/button';

interface PricingScreenProps {
  isFromFreePlan?: boolean;
}

const PricingScreen: React.FC<PricingScreenProps> = ({
  isFromFreePlan = false
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    monthly: {
      price: '$9.99',
      period: 'month',
      savings: null
    },
    annual: {
      price: '$99.99',
      period: 'year',
      savings: 'Save 15%'
    }
  };

  const features = [
    'Unlimited expense entries',
    'Recurring transactions',
    'Monthly reports & downloadable e-statements',
    'Family Mode access (up to 5 members)'
  ];

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-6 pt-12">
        <button
          className="p-2 rounded-lg hover:bg-white/50 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-900">
          {isFromFreePlan ? 'Unlock Premium Features' : 'Family Mode Premium'}
        </h1>
      </div>

      <div className="flex-1 px-6 pb-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mb-4">
            {isFromFreePlan ? <Lock className="w-8 h-8 text-white" /> : <Crown className="w-8 h-8 text-white" />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isFromFreePlan ? 'Unlock Premium Features 🔓' : 'Unlock Family Mode'}
          </h2>
          <p className="text-gray-600">
            {isFromFreePlan 
              ? 'Get unlimited access to all expense tracking features'
              : 'Manage your entire household\'s finances with advanced tools and insights'
            }
          </p>
        </div>

        {/* Plan Selection */}
        <div className="space-y-3 mb-8">
          {Object.entries(plans).map(([key, plan]) => (
            <button
              key={key}
              onClick={() => setSelectedPlan(key as 'monthly' | 'annual')}
              className={`w-full p-4 rounded-2xl border-2 transition-all ${
                selectedPlan === key
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 capitalize">
                    {key} Plan
                  </h3>
                  <p className="text-gray-600">
                    {plan.price} per {plan.period}
                  </p>
                </div>
                <div className="text-right">
                  {plan.savings && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-1">
                      {plan.savings}
                    </span>
                  )}
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedPlan === key
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedPlan === key && (
                      <Check size={12} className="text-white m-0.5" />
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">What's included:</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe Button */}
        <Button
          onClick={handleSubscribe}
          disabled={isProcessing}
          className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-2xl"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing payment...</span>
            </div>
          ) : (
            `Subscribe for ${plans[selectedPlan].price}/${plans[selectedPlan].period}`
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </div>
  );
};

export default PricingScreen;
