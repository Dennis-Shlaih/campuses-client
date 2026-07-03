import {useNavigate} from "react-router-dom"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {createCampus} from "../api/campuses.js"
import CampusForm from "../components/CampusForm.jsx"
import ErrorMessage from "../components/ErrorMessage.jsx"

function addCampus(){
    const navigate = useNavigate()
    const queryClient=useQueryClient()
    const mutation = useMutation({
        mutationFn:createCampus, onSuccess:(campus)=>{
            queryClient.invalidateQueries({queryKey:["campuses"]})
            navigate(`/campuses/${campus.id}`)
        },
    })

    return(<section className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">Add Campus</h1>
        {mutation.isError && <ErrorMessage message={mutation.error.message}/>}
        <CampusForm onSubmit={mutation.mutate} submitText={mutation.isPending? "saving...": "Add Campus"}/>

    </section>)
}

export default addCampus