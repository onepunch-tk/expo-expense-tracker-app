import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialize } from "@/db/dirzzle";
import { DbType } from "@/db/types";

type ContextType = { db: DbType | null };
export const DatabaseContext = createContext<ContextType>({ db: null });
export const useDatabase = () => useContext(DatabaseContext);
function DatabaseProvider({ children }: PropsWithChildren) {
  const [db, setDb] = useState<DbType | null>(null);
  useEffect(() => {
    if (db) return;
    initialize().then((newDb) => {
      setDb(newDb);
    });
  }, []);

  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export default DatabaseProvider;
