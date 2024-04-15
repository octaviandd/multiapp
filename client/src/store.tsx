/** @format */
import React, { createContext, useState, ReactNode } from "react";

interface StoreState {
  displaySidebar: boolean;
}

interface StoreContextType {
  store: StoreState;
  setStore: React.Dispatch<React.SetStateAction<StoreState>>;
}

// Create a Context
export const StoreContext = createContext<StoreContextType>({
  store: {
    displaySidebar: false,
  },
  setStore: () => {},
});

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreState>({
    displaySidebar: false,
  });

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
