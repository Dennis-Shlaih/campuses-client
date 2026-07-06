//This file contains zustand store for managing UI state, display of enrolled and unenrolled students/
import { create } from "zustand";

const useUiStore = create((set) => ({ //create to create the store with zustand which theirfore means that it is front end only and if we want to update it then we use the set function
  showUnenrolledOnly: false, //set is not a direct parameter of create but a parameter to the function that you call insdie of create
  toggleUnenrolledOnly: () =>
    set((state) => ({ showUnenrolledOnly: !state.showUnenrolledOnly })),

  campusSearch: "",//the starting value of setCampusSearch, 
    setCampusSearch:(campusSearch)=>set({campusSearch}), //the transformation from starting value to user input value
})); //{} inside of hte () is the same as writing campusSearch: campusSearch

export default useUiStore;