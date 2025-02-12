/* eslint-disable react-refresh/only-export-components */

import React from 'react';
import currencyService from '../services/currencyService';

// context

export type CurrencyOption = '$' | '€';

export interface CurrencyContextType {
  currency: CurrencyOption,
  handleCurrencyChange: () => void,
  rateUSDToEUR: number
}

export const CurrencyContext = React.createContext<CurrencyContextType>(
  {
    currency: '$',
    handleCurrencyChange: () => {},
    rateUSDToEUR: 1
  }
);

// provider

interface CurrencyProviderProps {
  children: React.ReactNode
}

export const CurrencyProvider = ({children}: CurrencyProviderProps) => {
  const [currency, setCurrency] = React.useState<CurrencyOption>('$');
  const [rateUSDToEUR, setRateUSDToEUR] = React.useState(1);

  React.useEffect(() => {
    fetchExchangeRate();
  }, [])

  const fetchExchangeRate = async () => {
    try {
      const exchangeRate = await currencyService.getUSDToEURExchangeRate();
      setRateUSDToEUR(exchangeRate);
    } catch(error) {
      console.error(error);
    }
  }

  const handleCurrencyChange = () => {
    if (currency === '$') {
      setCurrency('€');
    } else {
      setCurrency('$');
    }
  }

  return (
    <CurrencyContext.Provider value={{currency, handleCurrencyChange, rateUSDToEUR}}>
      {children}
    </CurrencyContext.Provider>
  )
}
