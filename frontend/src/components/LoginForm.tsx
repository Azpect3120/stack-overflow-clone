import "../assets/css/output.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginError from "./LoginError";

function LoginForm() {
    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [error, setError] = useState<String | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/users/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            console.log(data);

            if (data.status === 200) {
                localStorage.setItem("user", JSON.stringify({ id: data.user.ID, username: data.user.username }));

                window.location.href = "/posts";
            } else if (data.status === 401) {
                setError(data.error);
            } else {
                window.alert(data.error);
            }


        } catch (err) {
            console.error(err);
        }
    };
    

    return (
        <div className="h-full flex flex-col items-center justify-center px-6 py-12 lg:px-8">
            {error && (
                <LoginError message="Failed to login" onClose={() => setError(null)} />
                )
            }
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input onChange={e => setUsername(e.target.value)} name="username" type="text" required className="outline-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-light-theme-green sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label  className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={e => setPassword(e.target.value)} name="password" type="password"  required className="outline-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-theme-green sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-light-theme-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-light-theme-green hover:bg-light-theme-green-active transition-all">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?
                    <Link to="/accounts/create" className="font-semibold leading-6 text-light-theme-green ml-3 hover:text-light-theme-green-active transition-all">Create One!</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm;
