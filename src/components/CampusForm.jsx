import { useState } from "react"; //imports the useState function from react

function CampusForm({initialCampus, onSubmit, submitText}){ //creates the Campus Form function with three parameters
    const [name, setname] = useState(initialCampus?.name || "") //here for the next couple of lines we are basically just filling in the initial campus state and all the variables that it could have with either a value or nothing
    const [address, setAddress] = useState(initialCampus?.address || "")
    const [imageUrl, setImageURL] = useState(initialCampus?.imageUrl || "")
    const [description, setDescription] = useState(initialCampus?.description || "")
    const [error, setError] = useState("") //this line is just saying that it should start with no errror message its not exactly tied to the backend like the others are.

    function handleSubmit(event){ //creates the function called handle submit
        event.preventDefault()//becomes an event for the reason the fact that react is calling this function and this is the param that it has.  prevent default prevents the refresh from ruining it.
        if(!name.trim()||!address.trim()||!description.trim()){ //basically checks if any of them are empty, with trim javascript default function
            setError("Name, address, and description are required.") //prints this error message and saves it to seterror if any of the above is true
            return
        }
        setError("")//this acts like the else statement if the if condition isn't met then it prints nothing for the error message

        onSubmit({
            name:name.trim(), address:address.trim(), imageUrl: imageUrl.trim(), description: description.trim(), // this line basically makes sure that all of the values are presentable and have their extra spaces removed when they are submitted
        })
    }
    return ( //this deals with the styling of the campus form color text size everything and in its own section
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            {error && <p className="rounded-md bg-red-50 p-3 text-red-700">{error}</p>}
            <label className="block"> {/*gives the labels a value of label for the text with below span just displaying the words above the input, in this case campus name */}
                <span className="font-medium">Campus Name</span> 
                <input className="mt-1 w-full rounded-md border p-3" value={name} onChange={(event)=>setname(event.target.value)} //the actual changing ofthe actual input text box
                placeholder="Cuny Hunter College"/></label>

                <label className="block"><span className="font-medium">Address</span>
                <input className="mt-1 w-full rounded-md border p-3" value ={address} onChange={(event)=>setAddress(event.target.value)} placeholder="695 Park Ave, New York, NY"/></label>

                <label className="block">
                    <span className="font-medium">Image URL</span>
                    <input className="mt-1 w-full rounded-md border p-3" value={imageUrl} onChange={(event)=>setImageURL(event.target.value)} placeholder="https://something.com/campus.jpg"/>
                </label>
                <label className = "block">
                    <span className="font-medium">Description</span>
                    <textarea className="mt-1 min-h-28 w-full rounded-md border p-3" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Write a short campus description."/></label>
{/*then we have text area which is a related partner o input because it is also an input text box but this time this is mean for longer text */}
                    <button className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-900">
                        {submitText}
                    </button>
        </form>
    )

}

export default CampusForm