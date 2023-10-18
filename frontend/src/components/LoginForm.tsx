import "../assets/css/output.css"
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();



        // Sign in logic
    };

    return (
        <div className="h-full flex flex-col justify-center px-6 py-12 lg:px-8">
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