import {Link} from "react-router-dom"
import {useQuery} from "@tanstack/react-query"
import {getCampuses} from "../api/campuses.js"
import useAppStore from "../store.js"
import Loading from "../components/Loading.jsx"
import ErrorMessage from "../components/ErrorMessage.jsx"

const fallBackImage = "https://placehold.co/600x400?text=Campus"

function Allcampuses(){
    const campusSearch = useAppStore((state) => state.campusSearch)
    const setCampusSearch = useAppStore((state) => state.setCampusSearch)
    const {data: campuses = [], isLoading, isError, error} = useQuery({
        queryKey: ["campuses"],
        queryFn: getCampuses,
    })
    const filteredCampuses = campuses.filter((campus)=> campus.name.toLowerCase().includes(campusSearch.toLowerCase()),)

    if(isLoading) return <Loading />
    if(isError)return <ErrorMessage message={error.message}/>
    return(
        <section><div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div> <h1 className="text-3xl font-bold">All Campuses</h1>
            <p className="text-slate-600">Browse every campus in the database.</p></div>
            <Link className="rounded-md bg-blue-600 px-4 py-2 text-white" to="/campuses/new">Add Campus</Link></div>
            
            <input className="mb-6 w-full rounded-md border bg-white p-3" value={campusSearch} onChange={(event)=> setCampusSearch(event.target.value)} placeholder="Search campuses by name..."/> 
            {filteredCampuses.length ===0?(
                <p className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">No campuses found.</p>) : ( 
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCampuses.map((campus)=>(<article key={campus.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
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
export default Allcampuses