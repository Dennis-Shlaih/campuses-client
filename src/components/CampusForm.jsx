import { useState } from "react";

function campusForm({initialCampus, onSubmit, submitText}){
    const [name, setname] = useState(initialCampus?.name || "")
    const [address, setAddress] = useState(initialCampus?.address || "")
    const [imageUrl, setImageURL] = useState(initialCampus?.imageUrl || "")
    const [description, setDescription] = useState(initialCampus?.description || "")
    const [error, setError] = useState("")

    function handleSubmit(event){
        event.preventDefault()
        if(!name.trim()||!address.trim()||!description.trim()){
            setError("Name, address, and description are required.")
            return
        }
        setError("")

        onSubmit({
            name:name.trim(), address:address.trim(), imageUrl: imageUrl.trim(), description: description.trim(),
        })
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            {error && <p className="rounded-md bg-red-50 p-3 text-red-700">{error}</p>}
            <label className="block">
                <span className="font-medium">Campus Name</span>
                <input className="mt-1 w-full rounded-md border p-3" value={name} onChange={(event)=>setname(event.target.value)}
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

                    <button className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-900">
                        {submitText}
                    </button>
        </form>
    )

}

export default campusForm