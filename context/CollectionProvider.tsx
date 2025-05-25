'use client'

import { Collection } from '@/types';
import React from 'react';

interface CollectionContextType {
    collection: Collection | null;
    collections: Collection[];
    setCollection: React.Dispatch<React.SetStateAction<Collection | null>>;
    setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
}

interface CollectionProviderProps {
    children: React.ReactNode;
}

const CollectionContext = React.createContext<CollectionContextType | null>(null);

const CollectionProvider = ({ children }: CollectionProviderProps) => {
    const [collections, setCollections] = React.useState<Collection[]>([]);
    const [collection, setCollection] = React.useState<Collection | null>(null);

    return (
        <CollectionContext.Provider value={{ collections, collection, setCollections, setCollection }}>
            {children}
        </CollectionContext.Provider>
    )
}

export default CollectionProvider;

export const useCollection = () => {
    const context = React.useContext(CollectionContext);
    if (!context) {
        throw new Error('useCollection must be used within a CollectionProvider');
    }
    return context;
}