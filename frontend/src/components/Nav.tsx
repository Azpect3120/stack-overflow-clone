import "../assets/css/output.css"
import { Link } from "react-router-dom"

interface User {
    username: String,
    password: String,
    id: String
}

interface Props {
    user: User | null
}

function Navbar(props: Props) {

    const handleSubmit = () => {

    };

    return (
        <nav className="h-fit w-full border shadow-sm border-b-light-border flex items-center justify-center">
            
            <Link to="/posts" className="text-xl w-fit h-full p-4 hover:bg-light-border transition-all">
                Dev<span className="font-bold">Debate</span>
            </Link>

            <Link to={(props.user) ? "/posts/create" : "/accounts/login"} className="text-sm p-4 text-light-theme-green hover:text-light-theme-green-active">
                New Post
            </Link>

            <form onSubmit={handleSubmit} className="w-1/2">
                <input
                    type="search"
                    name="search"
                    placeholder="Search..."
                    className="outline-none px-2 py-1.5 text-sm w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-light-theme-green"
                />
                <button type="submit" className="hidden"></button>
            </form>

            <div className="px-4 text-md">
                {
                   (props.user) ? 
                    <h1 className="hover:underline hover:underline-offset-2 transition-all">
                        {props.user.username}
                    </h1>
                    :
                    <Link to="/accounts/login" className="hover:underline hover:underline-offset-2 transition-all">
                        Login
                    </Link>
                }
            </div>
        </nav>
    )
}

export default Navbar;
