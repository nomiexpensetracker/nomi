'use client';

import { Check } from 'lucide-react';
import React, { useState } from 'react';

import Cookies from 'js-cookie';
import { USER_LOCALE_KEY } from '@/constants';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'id', name: 'Bahasa Indonesia', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
];

const Language: React.FC = () => {
  const storedLocale = Cookies.get(USER_LOCALE_KEY);

  const [currentLocale, setCurrentLocale] = useState(storedLocale || 'en')

  const handleChangeLanguage = (value: string) => {
    Cookies.set(USER_LOCALE_KEY, value);
    setCurrentLocale(value);
  }

  return (
    <>
      {/* Content */}
      <div className="px-6 py-6 space-y-6 mt-20">
        <div className="space-y-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleChangeLanguage(language.code)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                currentLocale === language.code
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <span className="text-3xl">{language.flag}</span>
              <div className="flex-1 text-left">
                <p className="font-semibold text-black">{language.name}</p>
                <p className="text-sm text-muted-foreground">{language.nativeName}</p>
              </div>
              {currentLocale === language.code && (
                <Check className="w-6 h-6 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Language;
