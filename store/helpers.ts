import { Context, useContext } from "react";
import { StoreApi, useStore } from "zustand";

type ExtractState<S> = S extends { getState: () => infer X } ? X : never;

export const createContextStore =
  <S extends StoreApi<unknown>>(
    context: Context<S | null>,
    contextName: string
  ) =>
  <T>(selector: (state: ExtractState<S>) => T) => {
    const store = useContext(context);
    if (!store) throw new Error(`Missing ${contextName}.Provider in the tree`);
    return useStore(store, selector);
  };
