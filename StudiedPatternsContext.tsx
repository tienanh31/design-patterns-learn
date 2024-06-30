import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StudiedPatternsContextProps {
  studiedPatterns: any[];
  addStudiedPattern: (pattern: any) => void;
}

const StudiedPatternsContext = createContext<StudiedPatternsContextProps | undefined>(undefined);

export const StudiedPatternsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studiedPatterns, setStudiedPatterns] = useState<any[]>([]);

  useEffect(() => {
    loadStudiedPatterns();
  }, []);

  const loadStudiedPatterns = async () => {
    try {
      const studiedPatternsValue = await AsyncStorage.getItem('studiedPatterns');
      if (studiedPatternsValue) {
        setStudiedPatterns(JSON.parse(studiedPatternsValue));
      }
    } catch (error) {
      console.error('Error loading studied patterns', error);
    }
  };

  const addStudiedPattern = async (pattern: any) => {
    try {
      const updatedPatterns = [...studiedPatterns];
      if (!updatedPatterns.some((p: any) => p.id === pattern.id)) {
        updatedPatterns.push(pattern);
        setStudiedPatterns(updatedPatterns);
        await AsyncStorage.setItem('studiedPatterns', JSON.stringify(updatedPatterns));
      }
    } catch (error) {
      console.error('Error adding studied pattern', error);
    }
  };

  return (
    <StudiedPatternsContext.Provider value={{ studiedPatterns, addStudiedPattern }}>
      {children}
    </StudiedPatternsContext.Provider>
  );
};

export const useStudiedPatterns = (): StudiedPatternsContextProps => {
  const context = useContext(StudiedPatternsContext);
  if (!context) {
    throw new Error('useStudiedPatterns must be used within a StudiedPatternsProvider');
  }
  return context;
};
