import{useNavigate, useParams} from "react-router-dom" //imports two functions from external library react-router-dom useNavigate and useParams
import{useMutation, useQuery, useQueryClient} from "@tanstack/react-query"//gets three functions from tanstack external library, UseMutation Use Query and UseQueryClient
import{getCampus, updateCampus} from "../api/campuses.js"//two functins from the campuses file imported
import CampusForm from "../components/CampusForm.jsx"//gets the campusform file
import Loading from "../components/Loading.jsx" //gets the loading file from loading.jsx same for campus form, and will be the same for Error message
import ErrorMessage from "../components/ErrorMessage.jsx"

function EditCampus(){//creates the Edit Campus function
    const {id} = useParams()//gives the external functions names so that we can use them more easily
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {data:campus, isLoading, isError, error} = useQuery({ //destructor is created and we use useQuery as the function with parameters queryKey the names such as campus and id in their spots for ID gets the actual number 
        queryKey: ["campus", id], queryFn:()=>getCampus(id), //then QueryFn which is the actual function which in this case takes no new parameters and is getCampus and has parameter id
    })//first it runs useQuery then immediatly pulls out all of the data that it can to fill in the copy of the backend data, and is loading is great protect because at the first instance its true if we don't have everything yet and the code doesn't run all the way through of the file until we get some required information like campus name   

    const mutation = useMutation({//here we are creating the variable name mutation to use the UseMutation function from the external library
        mutationFn: (updatedCampus) => updateCampus(id, updatedCampus),
        //our backend copy data proceeds to use the updatedCampus input to run the updateCampus function
        onSuccess:()=> {//now after mutationFn is done recieving data and succesfully running we have onSuccess
            queryClient.invalidateQueries({queryKey:["campuses"]}) //uses the backend copy manager and ruler of the array language queryclient to allow the staling of campus and id in the frontend copy along with campuses in this line other was for the bottom
            queryClient.invalidateQueries({queryKey:["campus", id]})
            navigate(`/campuses/${id}`)// we now move our website to the page that is called campuses because of the navigate function which also brings it to the specific campus because of the id their id is a number so like 3 or something
        },
    })
    if (isLoading)return <Loading/> //checks if is loading is still true if true then halt we must wait for it before we proceed
    if(isError)return <ErrorMessage message={error.message}/> //checks if their is an error message found, if their is an error message then it prints the error message that was found in our details and caught by error and prints it here
    return(// this is the styling section, here section margins are auto width double xl title styles with 6 bmargin and triple xl size for the text bold font then a printed message 
        <section className="mx-auto max-w-2xl">
            <h1 className="mb-6 text-3xl font-bold">EditCampus</h1>
            {mutation.isError && <ErrorMessage message={mutation.error.message}/>}{/*if their is an error then print the message if not lets move on */}
            <CampusForm initialCampus={campus} onSubmit={mutation.mutate} submitText={mutation.isPending?"Saving..." : "Save Changes"}/> {/*here we actually participate in the updating or mutation, but first we just get the initial campus, then we mutate and also we also customize our button to say saving when clicked but not done and to have a message by default */}
        </section>
    )

}

export default EditCampus //so that our function can move around to other files when we import it 