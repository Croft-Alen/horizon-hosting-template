'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import navigationData from '@/data/navigation.json';

interface Currency {
  code: string;
  symbol: string;
  rate: number;
  countryCode: string;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number) => number;
  getSymbol: () => string;
  getFlagUrl: () => string;
  currencies: Currency[];
  isRatesLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const defaultCurrencies: Currency[] = navigationData.header.currencies || [
  { code: 'USD', symbol: '$', rate: 1, countryCode: 'us' },
  { code: 'EUR', symbol: '€', rate: 0.92, countryCode: 'eu' },
  { code: 'GBP', symbol: '£', rate: 0.79, countryCode: 'gb' }
];

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencies, setCurrencies] = useState<Currency[]>(defaultCurrencies);
  const [currency, setCurrency] = useState<Currency>(defaultCurrencies[0]);
  const [isRatesLoading, setIsRatesLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) throw new Error('Failed to fetch rates');
        
        const data = await response.json();
        
        const updatedCurrencies = defaultCurrencies.map((curr) => ({
          ...curr,
          rate: curr.code === 'USD' ? 1 : data.rates[curr.code] || curr.rate
        }));
        
        setCurrencies(updatedCurrencies);
        setCurrency((prev) => {
          const found = updatedCurrencies.find((c) => c.code === prev.code);
          return found || prev;
        });
        setIsRatesLoading(false);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        setIsRatesLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('selectedCurrency');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const found = currencies.find((c: Currency) => c.code === parsed.code);
        if (found) setCurrency(found);
      } catch (e) {}
    }
  }, [currencies]);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('selectedCurrency', JSON.stringify(newCurrency));
  };

  const convertPrice = (price: number) => {
    return Math.round(price * currency.rate * 100) / 100;
  };

  const getSymbol = () => currency.symbol;
  const getFlagUrl = () => `https://flagcdn.com/48x36/${currency.countryCode}.png`;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        convertPrice,
        getSymbol,
        getFlagUrl,
        currencies,
        isRatesLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}