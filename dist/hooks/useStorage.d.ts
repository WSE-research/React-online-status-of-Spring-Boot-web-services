export function useStorage<T>(storage: Storage, key: string, defaultValue: T, checkIntervalMs?: number): [T, (param: T) => void];
export function useLocalStorage(key: any, defaultValue: any, checkIntervalMs?: number): [any, (param: any) => void];
export function useSessionStorage(key: any, defaultValue: any, checkIntervalMs?: number): [any, (param: any) => void];
//# sourceMappingURL=useStorage.d.ts.map