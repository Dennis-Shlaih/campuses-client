import {useNavigate} from "react-router-dom" // import useNavigate function from the react-router-dom external library
import {useMutation, useQueryClient} from "@tanstack/react-query" // import two functions from tanstack use mutation and usequeryclient
import {createCampus} from "../api/campuses.js" //import create campus function from our local campuses.js file
import CampusForm from "../components/CampusForm.jsx" //import campusForm file from its file which is local to our computers
import ErrorMessage from "../components/ErrorMessage.jsx"//import the ErrorMessage file from its location in my computer

function AddCampus(){ //creating the addCampus function
    const navigate = useNavigate() // these two lines we are giving names to the functions that are originally located externally so that we can use them
    const queryClient=useQueryClient()
    const mutation = useMutation({ //we are creating the variable mutation
        mutationFn:createCampus, onSuccess:(campus)=>{ //mutationFn uses create Campus as its function which sends the signal to the backend to be used
            //then we have onSuccess which runs after the backend sucessfully adds the campus, now we have the same thing happen to the front ends copy of the backend
            queryClient.invalidateQueries({queryKey:["campuses"]})//campus is the input for this function function being the whole block after, and it includes the details of the frontend copy of the backend
            navigate(`/campuses/${campus.id}`) //this line allows for the direction of the page to be shifted to the new campus 
        },
    })
//just styling mx-auto just means center it horizontally, then max width, follows by a size of double xl followed by text styling with size and color
    return(<section className="mx-auto max-w-2xl"> 
        <h1 className="mb-6 text-3xl font-bold">Add Campus</h1> 
        {mutation.isError && <ErrorMessage message={mutation.error.message}/>} {/*first we check if the mutation failed before running anything */}
        <CampusForm onSubmit={mutation.mutate} submitText={mutation.isPending? "saving...": "Add Campus"}/>

    </section>)
}

export default AddCampus
//In React, when we see an && statement then it is by default saying if left is true then run the right
//show the error message is what the <> does and same for the form, but in the campus form, same thing with the form but submitform has its set of rules that it runs like the mutation function that deals with the backend and the submit text is the text of the the usable button and it is either add campus or saving... for when the text is submitted. 