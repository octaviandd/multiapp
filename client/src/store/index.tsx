/** @format */
import { UniqueIdentifier } from "@dnd-kit/core";
import React, { createContext, useState, ReactNode } from "react";

interface StoreState {
  displaySidebar: boolean;
  currentBoardItem: UniqueIdentifier | null;
  removedItem: UniqueIdentifier | null;
}

interface StoreContextType {
  store: StoreState;
  setStore: React.Dispatch<React.SetStateAction<StoreState>>;
}

// Create a Context
export const StoreContext = createContext<StoreContextType>({
  store: {
    displaySidebar: false,
    currentBoardItem: null,
    removedItem: null,
  },
  setStore: () => {},
});

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreState>({
    displaySidebar: false,
    currentBoardItem: null,
    removedItem: null,
  });

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
