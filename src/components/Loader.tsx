import ClipLoader from "react-spinners/ClipLoader";

export const Loader = ({ image }: { image?: boolean }) => {
    let cName = 'loader'
    if (image) cName += ' image-loader'
    return <div className={cName}><ClipLoader
        color={'#3499fe'}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    /></div>
}