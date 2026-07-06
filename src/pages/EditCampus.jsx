import{useNavigate, useParams} from "react-router-dom"
import{useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import{getCampus, updateCampus} from "../api/campuses.js"
import CampusForm from "../components/CampusForm.jsx"
import Loading from "../components/Loading.jsx"
import ErrorMessage from "../components/ErrorMessage.jsx"

function EditCampus(){
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {data:campus, isLoading, isError, error} = useQuery({
        queryKey: ["campus", id], queryFn:()=>getCampus(id),
    })

    const mutation = useMutation({
        mutationFn: (updatedCampus) => updateCampus(id, updatedCampus),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey:["campuses"]})
            queryClient.invalidateQueries({queryKey:["campus", id]})
            navigate(`/campuses/${id}`)
        },
    })
    if (isLoading)return <Loading/>
    if(isError)return <ErrorMessage message={error.message}/>
    return(
        <section className="mx-auto max-w-2xl">
            <h1 className="mb-6 text-3xl font-bold">Edit Campus</h1>
            {mutation.isError && <ErrorMessage message={mutation.error.message}/>}
            <CampusForm initialCampus={campus} onSubmit={mutation.mutate} submitText={mutation.isPending?"Saving..." : "Save Changes"}/>
        </section>
    )

}

export default EditCampus