import "./LoadingError.css"

const LoadingError = ({error}) => {
    return (
        <section className="container dashboard-error">
            <h2 className="text-h4--bold">Oops</h2>
            {error && <p>`Error: ${error}`</p>}
            <p className="text-label--name">Service not available now, try again later`}</p>
        </section>
    )
}

export default LoadingError