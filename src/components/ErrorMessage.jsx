function ErrorMessage({message}){//creates the error message function
    return( // literally just returns a text paragraph that either returns the stored message or returns the phrase unable to load with some tailwind styling
        <p className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
            {message || "Unable to load this page."}
        </p>
    )
}

export default ErrorMessage //this allows for the file to be exported along with its function to other files
//this is helpful because it will only display the error message followed by the background environment that we have created, and this is in part because of the return function that was called

// their are layers to this it replaces the entire content of the section that it is in if the above section that is outside of it is unaffected then it will remain that appearance for the app. 