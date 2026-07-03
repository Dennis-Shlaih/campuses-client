import {Link, useNavigate, useParams}from "react-router-dom"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {deleteCampus, getCampus, updateStudent} from "../api/campuses.js"
import Loading from "../components/Loading.jsx"
import ErrorMessage from "../components/ErrorMessage.jsx"

const fallBackImage="https://placehold.co/900x400?text=Campus"

function campusDetails(){
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const{data: campus, isLoading, isError, error} = useQuery({
    queryKey:["campus",id], queryFn:()=>getCampus(id),
    })

    const deleteMutation = useMutation({
        mutationFn: () =>deleteCampus(id), onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["campuses"] })
            queryClient.invalidateQueries({ queryKey: ["students"] })
            navigate("/campuses")
        },
    })

    const unenrollMutation = useMutation({
        mutationFn: (student) =>updateStudent(student.id, {...student, campusId:null}),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["campus", id]})
                queryClient.invalidateQueries({queryKey:["students"]})
            
        },
    })

    function handleDelete(){
        const shouldDelete = window.confirm("Delete this campus? Students should now become unenrolled.")
        if(shouldDelete){
            deleteMutation.mutate()
        }
    }
    if(isLoading)return <Loading/>
    if(isError)return <ErrorMessage message={error.message}/>
    return (<section className="space-y-6">
        <img className="h-72 w-full rounded-xl object-cover" src = {campus.imageUrl||fallBackImage}
        alt={campus.name}/>

        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div><h1 className="text-3xl font-bold">{campus.name}</h1>
                <p className="text-slate-600">{campus.address}</p>
                </div>
                <div className="flex gap-2">
                    <Link className="rounded-md bg-slate-200 px-4 py-2" to={`/campuses/${campus.id}/edit`}>
                    Edit</Link>
                    <button className="rounded-md bg-red-700 px-4 py-2 text-white" onClick={handleDelete} disabled={deleteMutation.isPending}>
                        Delete
                    </button>
                </div>
            </div>
            <p>{campus.description}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Enrolled Students</h2>

            {!campus.students || campus.students.length ===0?(
                <p className="text-slate-500">No students are enrolled at this campus.</p>
            ): (
                <div className="space-y-3">{campus.students.map((student)=>(
                    <div key={student.id} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                        <div><p className="font-medium">{student.firstName} {student.lastName}</p>
                        <p className="text-sm text-slate-500">{student.email}</p></div>

                        <button className="rounded-md bg-orange-600 px-3 py-2 text-white" onClick={()=>unenrollMutation.mutate(student)} disabled={unenrollMutation.isPending}>
                            Un-enroll
                        </button>
                        </div>
                ))}
                </div>
            )}
        </div>
    </section>)
}
export default campusDetails