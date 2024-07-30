import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@/db";
import migrations from "@/drizzle/migrations";
import { useEffect, useState } from "react";
import { initializeDatabase } from "@/db/initialize";

export const useInitializeDatabase = () => {
  const { success, error: migrationError } = useMigrations(db, migrations);

  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase();
        setInitialized(true);
      } catch (e: unknown) {
        setInitialized(false);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    if (success) {
      init();
    } else {
      setInitialized(false);
      setError(
        migrationError?.message ?? "An unknown migration error occurred"
      );
    }
  }, [success]);

  return [initialized, error];
};
