import { useRouteError } from "react-router-dom"

export default function NotFound () {

    const error = useRouteError()
    console.log(error)

    return (
        <div className="wrapper-img w-100 d-flex justify-content-center align-items-center flex-column">
            <img className="vh-100" src="404.svg" alt="404 not found illustration" />
        </div>
    )
}