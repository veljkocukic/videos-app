import ClipLoader from "react-spinners/ClipLoader";

export const Loader = () => {
    return <div className="loader"><ClipLoader
        color='#3499fe'
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    /></div>
}