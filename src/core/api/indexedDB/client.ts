const DB_NAME = 'codenotes'
const DB_VERSION = 1
export const SNIPPETS_OBJECT_STORE = 'snippets'

/**
 * TODO:
 * 1) Написать юниты
 * 2) Продумать над инициализацией localDB.openDB(DB_NAME, DB_VERSION) - костыльно
 * 3) Продумать механизм версионирования
 * 4) Обрабатывать ошибки - если база не доступна
 * 5) !. висят после accessDB()
 * 6) перейти на реализацию с rxjs
 */

const OBJECT_STORES = [{
  name: SNIPPETS_OBJECT_STORE,
  params: {
    keyPath: 'id'
  }
}]

export class LocalDB {
  private db: IDBDatabase | null = null
  private dbOpening = Promise.withResolvers<IDBDatabase>()

  async openDB(name: string, version?: number) {
    const openDBRequest = window.indexedDB.open(name, version)

    openDBRequest.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      this.db = db
      this.dbOpening.resolve(db)
    }

    openDBRequest.onerror = (event) => {
      this.dbOpening.reject((event.target as IDBOpenDBRequest).error)
    }

    openDBRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      this.db = db
      this.initObjectStores()
    }

    return this.dbOpening.promise
  }

  async initObjectStores() {
    OBJECT_STORES.forEach((objectStore) => {
      this.db!.createObjectStore(objectStore.name, objectStore.params)
    })
  }

  async accessDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db)
        return
      }
      this.dbOpening.promise.then(resolve).catch(reject)
    })
  }

  async getFromObjectStore<T>(storeName: string, key: string): Promise<T> {
    await this.accessDB()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName).objectStore(storeName).get(key)

      transaction.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result)
      }

      transaction.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  async getAllGromObjectStore<T>(storeName: string): Promise<T[]> {
    await this.accessDB()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName).objectStore(storeName).getAll()

      transaction.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result)
      }

      transaction.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  async addToObjectStore<T, Res>(storeName: string, payload: T): Promise<Res> {
    await this.accessDB()
    return new Promise((resolve, reject) => {
      if (Array.isArray(payload)) {
        const transactions: Promise<Res>[] = []
        payload.forEach((data) => {
          transactions.push(this.addToObjectStore(storeName, data))
        })
        return Promise.all(transactions)
      } else {
        const transaction = this.db!.transaction(storeName, 'readwrite').objectStore(storeName).add(payload)
        transaction.onsuccess = (event) => {
          resolve((event.target as IDBRequest).result) as Res
        }
        transaction.onerror = (event) => {
          reject((event.target as IDBRequest).error)
        }
      }
    })
  }
}

export const localDB = new LocalDB()

localDB.openDB(DB_NAME, DB_VERSION)
