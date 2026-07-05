//This file contains zustand store for managing UI state, display of enrolled and unenrolled students/
import { create } from "zustand";

const useUiStore = create((set) => ({
  showUnenrolledOnly: false,
  toggleUnenrolledOnly: () =>
    set((state) => ({ showUnenrolledOnly: !state.showUnenrolledOnly })),

  campusSearch: "",
    setCampusSearch:(campusSearch)=>set({campusSearch}),
}));

export default useUiStore;