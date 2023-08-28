'use client';
import React, { createContext, useReducer } from 'react';
import reducer, { initialState } from './priceSlice';

export const CryptoFilter = createContext();

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CryptoFilter.Provider value={{ state, dispatch }}>
      {children}
    </CryptoFilter.Provider>
  );
}
