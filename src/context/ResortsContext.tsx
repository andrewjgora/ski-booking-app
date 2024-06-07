// src/context/ResortsContext.js
'use client';

import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { BoundingBox, Resort } from '@/types/types';
import { getResorts } from '@/actions/actions';


const ResortsContext = createContext<any>({});

export const ResortsProvider = ({ children }: { children: React.ReactNode; }) => {
  const [resorts, setResorts] = useState<Resort[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bounds, setBounds] = useState<BoundingBox | undefined>(undefined);
  const [query, setQuery] = useState<string | undefined>();
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await getResorts(query, bounds);
      setResorts(data);
      console.log('context set resorts:', data.length)
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      console.error(error);
      setLoading(false);
    }
  }, [query, bounds]);

  useEffect(() => {
    fetchData();
  }, [bounds, query, fetchData]);

  const handleSearch = async (query: string) => {
    console.log('context handleSearch ', query);
    setLoading(true);
    setQuery(query);
    // fetchData();
  };

  const handleMapChange = async (boundingBox: BoundingBox) => {
    console.log('context handleMapChange ', boundingBox);
    setLoading(true);
    setBounds(boundingBox);
    // fetchData();
  }

  return (
    <ResortsContext.Provider value={{ resorts, loading, error, handleSearch, handleMapChange }}>
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