import "../assets/css/output.css"
import { Link } from "react-router-dom"

interface User {
    username: String,
    id: String
}

function Navbar() {
    const ls = localStorage.getItem("user");
    const user: User = ls ? JSON.parse(ls) : null;

    const handleSubmit = () => {

    };

    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/accounts/login";
    };

    return (
        <nav className="h-fit w-full border shadow-sm border-b-light-border flex items-center justify-center">
            
            <Link to="/posts" className="text-xl w-fit h-full p-4 hover:bg-light-border transition-all">
                Dev<span className="font-bold">Debate</span>
            </Link>

            <Link to={(user) ? "/posts/create" : "/accounts/login"} className="text-sm mx-2 px-3 py-1.5 rounded-lg text-light-theme-green hover:bg-green-100 hover:text-light-theme-green-active">
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
                   (user) ? 
                    <h1 onClick={logout} title="Logout of account" className="hover:underline hover:underline-offset-2 transition-all">
                        {user.username}
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
