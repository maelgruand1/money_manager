import React, { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react';

// Définition du contexte pour IndexedDB
interface StorageContextType {
  db: IDBDatabase | null;
  isReady: boolean;
  error: Error | null;
}

const StorageContext = createContext<StorageContextType>({
  db: null,
  isReady: false,
  error: null,
});

interface StorageProviderProps {
  children: ReactNode;
  dbName: string;
  version: number;
  objectStores: string[]; // Liste des noms des object stores
}

export const StorageProvider: React.FC<StorageProviderProps> = ({
  children,
  dbName,
  version,
  objectStores,
}) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const openRequest = indexedDB.open(dbName, version);

    openRequest.onerror = (event) => {
      setError((event.target as IDBRequest).error || new Error("Erreur lors de l'ouverture de la base de données."));
      setIsReady(false);
      console.error("IndexedDB error:", (event.target as IDBRequest).error);
    };

    openRequest.onsuccess = (event) => {
      setDb((event.target as IDBRequest).result);
      setIsReady(true);
      setError(null);
      console.log("Base de données IndexedDB ouverte avec succès.");
    };

    openRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      console.log("Mise à niveau de la base de données IndexedDB.");

      objectStores.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true }); // Exemple avec 'id' comme clé
          console.log(`Object store "${storeName}" créé.`);
        }
      });
    };

    // Nettoyage : ne pas fermer la base de données ici, car le contexte doit la maintenir ouverte
  }, [dbName, version, objectStores]);

  return (
    <StorageContext.Provider value={{ db, isReady, error }}>
      {children}
    </StorageContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte IndexedDB
export const useIndexedDB = () => {
  return useContext(StorageContext);
};

// Exemple de hook personnalisé pour effectuer des opérations sur un object store spécifique
export const useObjectStore = (storeName: string) => {
  const { db, isReady, error } = useIndexedDB();

  const add = useCallback(async (data: any) => {
    return new Promise<IDBValidKey | undefined>((resolve, reject) => {
      if (!isReady || error || !db) {
        reject(error || new Error("La base de données n'est pas prête."));
        return;
      }
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error || new Error(`Erreur lors de l'ajout à "${storeName}".`));
      };
    });
  }, [db, isReady, error, storeName]);

  const get = useCallback(async (id: IDBValidKey) => {
    return new Promise<any>((resolve, reject) => {
      if (!isReady || error || !db) {
        reject(error || new Error("La base de données n'est pas prête."));
        return;
      }
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error || new Error(`Erreur lors de la récupération de "${id}" dans "${storeName}".`));
      };
    });
  }, [db, isReady, error, storeName]);

  // Ajout de la fonction 'put' pour mettre à jour ou ajouter un enregistrement
  const put = useCallback(async (data: any) => {
    return new Promise<IDBValidKey | undefined>((resolve, reject) => {
      if (!isReady || error || !db) {
        reject(error || new Error("La base de données n'est pas prête."));
        return;
      }
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error || new Error(`Erreur lors de la mise à jour de "${storeName}".`));
      };
    });
  }, [db, isReady, error, storeName]);

  // Ajoutez ici d'autres fonctions pour interagir avec l'object store (delete, getAll, index queries, etc.)

  return { add, get, put, isReady, error, db };
};