import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialize, runMigrations } from "@/db/dirzzle";
import { DbType } from "@/db/types";

type DbContextType = {
  db: DbType | null;
  isLoading: boolean;
  error: Error | null;
};
export const DatabaseContext = createContext<DbContextType>({
  db: null,
  isLoading: true,
  error: null,
});
export const useDatabase = () => useContext(DatabaseContext);

function DatabaseProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<DbContextType>({
    db: null,
    isLoading: true,
    error: null,
  });
  useEffect(() => {
    if (state.db) return;
    const initDb = async () => {
      try {
        const newDb = await initialize();
        await runMigrations(newDb);
        setState({ db: newDb, isLoading: false, error: null });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }));
      }
    };

    initDb();
  }, []);

  return (
    <DatabaseContext.Provider value={state}>
      {children}
    </DatabaseContext.Provider>
  );
}

export default DatabaseProvider;
