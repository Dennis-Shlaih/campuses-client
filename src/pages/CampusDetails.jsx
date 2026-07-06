import {Link, useNavigate, useParams}from "react-router-dom" // imports multiple likely functions from the external react-router-dom library
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"//imports multiple likely functions from the external tanstack library
import {deleteCampus, getCampus,} from "../api/campuses.js" //imports multiple functions but this time its from my library in campuses.js
import {updateStudent} from "../api/students.js" //another likely function but this time it its from the students.js file
import Loading from "../components/Loading.jsx" // loading and error message files were imported here
import ErrorMessage from "../components/ErrorMessage.jsx"

const fallBackImage="https://placehold.co/900x400?text=Campus" // a link to a backupimage was stored in fallback just in case

function CampusDetails(){ //creating the campusdetails function 
    const {id} = useParams() // creating a bunch of variables to hold these react functions
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const{data: campus, isLoading, isError, error} = useQuery({ // destructor these are the values that will replace some of the names of the existing headers so that we can pull out that information
    queryKey:["campus",id], queryFn:()=>getCampus(id), //these are the paremeters for the useQuery function which allows the backend to peak in to the front end via front end request while of course changing names and getting ids, along with functions in the paramters that were using
    })

    const deleteMutation = useMutation({//here we declare deleteMutation to be the holder of these functions, first UseMutation( which has access the abilit to call the backend first we rename the mutationFn to the deleteCampus() function with param id only no other possible, and on success built in to useMutation to be used after success of the first function, 
        mutationFn: () =>deleteCampus(id), onSuccess:()=>{ //on success holds multiple functions first function is like the function manager of the backend or the front ends copy of it, and it calls invalidateQueries which deletes the values that we call in the first 
            queryClient.invalidateQueries({ queryKey: ["campuses"] }) //first we have the manager of the queryclient allow us to use querykey because we need to speak the array language when asking to make something in the copy of the front end stale, so that the front can be refreshed. 
            queryClient.invalidateQueries({ queryKey: ["students"] }) //same idea front end students part becomes stale then refreshed on success of course upating the front end all possible because of the array structure that we enforced with query for the tanstake
            navigate("/campuses")// this is a funciton by react and its purpose is to send the user to another page in this case /campuses ofcourse on success
        },
    })

    const unenrollMutation = useMutation({// this is similar to the above code in where we use unenroll variable to call multiple functions starting with use mutation which allows us to work in the backend a little indirectly
        //MutationFn is basically the function name because student would be the name of the function then we use the update student function with no new parameters, followed by the onsuccess feature that useMutation and this is what deletes the backend data 
        mutationFn: (student) =>updateStudent(student.id, {...student, campusId:null}),
        onSuccess: ()=>{ //this is what deletes the front end copy version of the backend after we see that the backend is truly gone so we update the front end knowing that it went null in the backend. 
            queryClient.invalidateQueries({queryKey:["campus", id]}) //does the action with campus section id, and the students section aswell to complete the overall idea
                queryClient.invalidateQueries({queryKey:["students"]})
            
        },
    })

    function handleDelete(){ // creates the function handle delete
        //creates the should delete variables that uses the window function that allows for access to the browswer page then it uses the comfirm function to allow for a pop up like comfirming that you want to do an action
        const shouldDelete = window.confirm("Delete this campus? Students should now become unenrolled.")
        if(shouldDelete){
            deleteMutation.mutate() //activates the deletemutation variables which uses useMutation mainly and this is only activated when the mutate function is called with this variable.
        }
    }
    if(isLoading)return <Loading/> // this line calls the loading function if the isLoading boolean is true above
    if(isError)return <ErrorMessage message={error.message}/> // this line does a similar thing with Error message for its boolean but also gives us the return of error message using the error to store the actual message
    return (<section className="space-y-6"> {/*the styling begins, first we start with the bigger section */}
        <img className="h-72 w-full rounded-xl object-cover" src = {campus.imageUrl||fallBackImage} /*more styling information and guiding the height of the image if its rounded or not, and then it even gives the actual image here, with the call of it and the usage of image, not only this but it also, has a backup option for the image */
        alt={campus.name}/>

        <div className="rounded-xl bg-white p-6 shadow-sm"> {/*more styling shadow for the background text color, bg background color also p-6 padding on all sides for the image */}
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div><h1 className="text-3xl font-bold">{campus.name}</h1>
                <p className="text-slate-600">{campus.address}</p> {/*html paragraph tag followed by text */}
                </div>
                <div className="flex gap-2">
                    <Link className="rounded-md bg-slate-200 px-4 py-2" to={`/campuses/${campus.id}/edit`}>
                    Edit</Link>
                    <button className="rounded-md bg-red-700 px-4 py-2 text-white" onClick={handleDelete} disabled={deleteMutation.isPending}>
                        Delete
                    </button>
                </div> {/*followed by buttons and Links that are visible because of the green, and div creating multiple box sections that are smaller than section but different than article, */}
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
export default CampusDetails //allows us to actually export the CampusDetails function that we created when using it in another file