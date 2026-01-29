'use client';
import { createContext, useContext } from 'react';

const DataContext = createContext(null);

export function useData() {
    return useContext(DataContext);
}

export default function DataProvider({ value, children }) {
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

