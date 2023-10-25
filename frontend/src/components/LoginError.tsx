import "../assets/css/output.css"

interface Props {
    message: String,
    onClose: any
}

function LoginError (props: Props): JSX.Element {

    return (
        <div className="absolute flex bg-red-600 text-gray-200 w-fit h-fit p-5 rounded-lg border-2 border-gray-200 shadow-gray-200 shadow-sm">
            <h1 className="text-xl">
                Error: {props.message}
            </h1>
            <button className="text-xl ml-10 font-bold" onClick={props.onClose}>
                X
            </button>
        </div>
    );
}

export default LoginError;
