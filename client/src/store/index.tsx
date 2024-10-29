/** @format */
import { Task, User } from "@/components/drag-and-drop/tasks/Board";
import { UniqueIdentifier } from "@dnd-kit/core";
import React, { createContext, useState, ReactNode } from "react";
import { TaskFile } from "@/components/drag-and-drop/tasks/Board";

interface StoreState {
  displaySidebar: boolean;
  currentBoardItem: UniqueIdentifier | null;
  removedItem: UniqueIdentifier | null;
  completedItem: Task | null;
  user: User | null;
  filePickerModalIsOpen: boolean;
  imageModalIsOpen: boolean;
  recentlyAddedTaskFile: undefined | TaskFile;
  recentlyRemovedTaskFileId: undefined | UniqueIdentifier;
}

interface StoreContextType {
  store: StoreState;
  setStore: React.Dispatch<React.SetStateAction<StoreState>>;
}

export const StoreContext = createContext<StoreContextType>({
  store: {
    displaySidebar: true,
    currentBoardItem: null,
    removedItem: null,
    completedItem: null,
    user: null,
    filePickerModalIsOpen: false,
    imageModalIsOpen: false,
    recentlyAddedTaskFile: undefined,
    recentlyRemovedTaskFileId: undefined,
  },
  setStore: () => {},
});

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreState>({
    displaySidebar: true,
    currentBoardItem: null,
    removedItem: null,
    completedItem: null,
    user: null,
    filePickerModalIsOpen: false,
    imageModalIsOpen: false,
    recentlyAddedTaskFile: undefined,
    recentlyRemovedTaskFileId: undefined,
  });

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
