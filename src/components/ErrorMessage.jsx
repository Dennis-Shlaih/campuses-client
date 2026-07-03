function ErrorMessage({message}){
    return(
        <p className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
            {message || "Unable to load this page."}
        </p>
    )
}

export default ErrorMessage