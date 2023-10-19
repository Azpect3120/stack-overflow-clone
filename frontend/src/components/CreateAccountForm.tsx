import { useState } from "react";
import { Link } from "react-router-dom";

function CreateAccountForm () {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password1 !== password2) {
            // Passwords do not match
        } else {
            // Query database and ensure username and such is valid
            try {
                const response = await fetch("http://localhost:4000/users/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password: password1 })
                });

                const data = await response.json();

                if (data.status == 201) {
                    window.location.href = "/accounts/login";
                } else {
                    window.alert("Could not create user!");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
            <div className="flex h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="outline-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0f6313] sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input name="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#{}[\]+/])[A-Za-z\d@$!%*?&^#{}[\]+/]{12,}$" value={password1} onChange={(e) => setPassword1(e.target.value)} type="password" required className="outline-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0f6313] sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>
                            <div className="mt-2">
                                <input name="confirmPassword" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#{}[\]+/])[A-Za-z\d@$!%*?&^#{}[\]+/]{12,}$" value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" required className="outline-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0f6313] sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-[#0f6313] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#0f6313] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-[#0f6313]">Sign in</button>
                        </div>
                    </form>
                    
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?
                        <Link to="/accounts/login" className="font-semibold leading-6 text-[#0f6313] hover:text-[#0f6313] ml-3">Login</Link>
                    </p>

                </div>
            </div>
    )
}

export default CreateAccountForm;
