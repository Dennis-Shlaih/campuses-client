import {create}from "zustand"

const useAppStore = create((set) => ({
    campusSearch: "",
    setCampusSearch:(campusSearch)=>set({campusSearch}),
}))
export default useAppStore