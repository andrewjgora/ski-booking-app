// src/context/ResortsContext.js
'use client';

import { PropsWithChildren, createContext, useState, useEffect, useContext, useCallback } from 'react';
import { Resort } from '@/types/resorts';
import { getResorts } from '../lib/api';


const ResortsContext = createContext<any>({});

export const ResortsProvider = ({ children }: { children: React.ReactNode; }) => {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (query?: string) => {
    try {
      const resorts = await getResorts(query);
      setResorts(resorts);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    fetchData(query);
  };

  return (
    <ResortsContext.Provider value={{ resorts, loading, error, handleSearch }}>
      {children}
    </ResortsContext.Provider>
  );
};

export const useResorts: Function = () => {
  const context = useContext(ResortsContext);
  if (!context) {
    throw new Error('useResorts must be used within a ResortsProvider');
  }
  return context;
};