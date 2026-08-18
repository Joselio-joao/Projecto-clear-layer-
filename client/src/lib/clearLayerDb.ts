export const CLEARLAYER_DB_NAME = "clearlayer-local";
export const CLEARLAYER_DB_VERSION = 1;
export const CLEARLAYER_STORE_NAME = "dossier-state";

export type DossierState = {
  lastSection?: string;
  lastProfile?: string;
  updatedAt: number;
};

const hasIndexedDb = () => typeof window !== "undefined" && "indexedDB" in window;

const openDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    if (!hasIndexedDb()) {
      reject(new Error("IndexedDB indisponível neste navegador."));
      return;
    }

    const request = window.indexedDB.open(CLEARLAYER_DB_NAME, CLEARLAYER_DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(CLEARLAYER_STORE_NAME)) {
        request.result.createObjectStore(CLEARLAYER_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Não foi possível abrir o armazenamento local."));
  });

export async function readDossierState(): Promise<DossierState | null> {
  try {
    const database = await openDatabase();
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(CLEARLAYER_STORE_NAME, "readonly");
      const request = transaction.objectStore(CLEARLAYER_STORE_NAME).get("current");
      request.onsuccess = () => resolve((request.result as DossierState | undefined) ?? null);
      request.onerror = () => reject(request.error ?? new Error("Não foi possível ler o estado local."));
      transaction.oncomplete = () => database.close();
    });
  } catch {
    return null;
  }
}

export async function writeDossierState(state: Omit<DossierState, "updatedAt">): Promise<boolean> {
  try {
    const database = await openDatabase();
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(CLEARLAYER_STORE_NAME, "readwrite");
      transaction.objectStore(CLEARLAYER_STORE_NAME).put({ ...state, updatedAt: Date.now() }, "current");
      transaction.oncomplete = () => {
        database.close();
        resolve(true);
      };
      transaction.onerror = () => reject(transaction.error ?? new Error("Não foi possível guardar o estado local."));
    });
  } catch {
    return false;
  }
}

export async function clearDossierState(): Promise<boolean> {
  try {
    const database = await openDatabase();
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(CLEARLAYER_STORE_NAME, "readwrite");
      transaction.objectStore(CLEARLAYER_STORE_NAME).delete("current");
      transaction.oncomplete = () => {
        database.close();
        resolve(true);
      };
      transaction.onerror = () => reject(transaction.error ?? new Error("Não foi possível limpar o estado local."));
    });
  } catch {
    return false;
  }
}
