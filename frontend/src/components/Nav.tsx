import "../assets/css/output.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface User {
    username: String;
    id: String;
}

function Navbar() {
    const ls = localStorage.getItem("user");
    const user: User = ls ? JSON.parse(ls) : null;
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.prevent.default()
        navigate(`/posts/search=${search}`);
    };

    const handleInputChange = (event: any) => {
        const query = event.target.value;
        setSearch(query);
    };

    const viewProfile = () => {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : { username: "", id: "" };
        const url = `/accounts/profile/${user.username}`;
        navigate(url);
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/accounts/login")
    };

    const toHome = () => {
        navigate("/posts")
    };

    return (
        <nav className="h-fit w-full border shadow-sm border-b-light-border flex items-center justify-center">
            <button
                onClick={toHome}
                className="text-xl w-fit h-full p-4 hover:bg-light-border transition-all"
            >
                Dev<span className="font-bold">Debate</span>
            </button>

            <Link
                to={user ? "/posts/create" : "/accounts/login"}
                className="text-sm mx-2 px-3 py-1.5 rounded-lg text-light-theme-green hover:bg-green-100 hover:text-light-theme-green-active"
            >
                New Post
            </Link>

            <form onSubmit={(event) => handleSubmit(event)} className="w-1/2">
                <input
                    type="text"
                    name="search"
                    onChange={handleInputChange}
                    placeholder="Search..."
                    className="outline-none px-2 py-1.5 text-sm w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-light-theme-green"
                />
                <button type="submit" className="hidden"></button>
            </form>

            <div className="px-4 text-md">
                {user ? (
                    <div className="flex items-center">
                        <h1
                            onClick={viewProfile}
                            title="View profile"
                            className="hover:underline hover:underline-offset-2 transition-all"
                        >
                            {user.username}
                        </h1>
                        <button onClick={logout} className="mx-2 px-3 py-1.5 text-sm text-red-500 hover:bg-red-100 rounded-lg" title="Logout">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/accounts/login"
                        className="hover:underline hover:underline-offset-2 transition-all"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
