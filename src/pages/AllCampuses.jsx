import {Link} from "react-router-dom" // external library, that goes in and grabs Links so that we can use usable links
import {useQuery} from "@tanstack/react-query" // this is also an external library and we use it to get data from the backend
import {getAllCampuses} from "../api/campuses.js" // this is a local import from the campus file to get the getallcampuses function 
import useUiStore from "../store/useUiStore.js" // the rest of these are local imports getting files that I have created this case the uI store where we store information like the current text in the search box, 
import Loading from "../components/Loading.jsx" // for the wait
import ErrorMessage from "../components/ErrorMessage.jsx" // for the errors

const fallBackImage = "https://placehold.co/600x400?text=Campus" //storing the backup image in this variable as a const so we don't change it. 

function AllCampuses(){// the start of the AllCampuses function
    const campusSearch = useUiStore((state) => state.campusSearch) // this line gets the state object who takes all of Uistore values and it then goes deeper into the campus search value specifically from the zustand storage
    const setCampusSearch = useUiStore((state) => state.setCampusSearch) //same as above but now gets the setCampusSearch value which is a function so it gets that function
    const {data: campuses = [], isLoading, isError, error} = useQuery({
        queryKey: ["campuses"],
        queryFn: getAllCampuses,
    }) //destructing these lines is destructing and it is also using the useQuery function with the parameters of campuses and get all campuses where the function then proceeds to actual complete what their names are said to do with campuses being the data, and the getAllCampuses being a function
    ////not only this but data: campuses above gives campuses the data value which is empty by default, followed by two boolean objects that we get the value of through deconstruction which we later use to in our similar loading and error message function
    const filteredCampuses = campuses.filter((campus)=> campus.name.toLowerCase().includes(campusSearch.toLowerCase()),)

    if(isLoading) return <Loading /> //uses the function that was created loading only if the isloading condition is true from the use query function
    if(isError)return <ErrorMessage message={error.message}/> //same idea with the condition but now we have the error message which is thrown durring the deconstruction process saved in error, and now used to be displayed
    return( // below is a bunch of styling using Classname for most of it affect what its in, we also have section for the large section and DIV for the smaller text box section followed by Input to create the text box, then LINK to create the link, article to create a more structured style of the box with a card layout, and all of this is customized with className
        <section><div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div> <h1 className="text-3xl font-bold">All Campuses</h1> {/*custimization here, 3xl xl is the size and mb margin bottom margine space and the specific distance from the edge, and grid features which controls how things line up, along with flex and flex-row controlling how the objects and text wrap around  */}
            <p className="text-slate-600">Browse every campus in the database.</p></div>
            <Link className="rounded-md bg-blue-600 px-4 py-2 text-white" to="/campuses/add">Add Campus</Link></div>
            
            <input className="mb-6 w-full rounded-md border bg-white p-3" value={campusSearch} onChange={(event)=> setCampusSearch(event.target.value)} placeholder="Search campuses by name..."/> 
            {filteredCampuses.length ===0?(
                <p className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">No campuses found.</p>) : ( 
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCampuses.map((campus)=>(<article key={campus.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                        {/*So filteredCampus is a collection of the campuses for said filter and we use map to turn it into usable code that we can use to go through each individual campus using campus, so that we can then create an article card for it with the key being the number of the card that we are currently at classname ofcourse styling it all bg is just the background color and shadow being a small box shadow behind the text or element */}
                    <img className="h-48 w-full object-cover" src={campus.imageUrl || fallBackImage} alt={campus.name}/>
                    <div className="p-5">
                        <h2 className="text-xl font-bold">{campus.name}</h2>
                        <p className="mb-4 text-sm text-slate-600">{campus.address}</p>
                        <Link className="font-medium text-blue-800" to={`/campuses/${campus.id}`}>view campus</Link>
                    </div>
                    </article>))}
                    </div>
            )}
                </section>
    )
}
export default AllCampuses