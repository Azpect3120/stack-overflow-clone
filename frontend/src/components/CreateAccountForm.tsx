import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

function CreateAccountForm () {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const updateInput = (input: string, e: string) => {
        switch (input) {
            case "u": setUsername(e);
            break;

            case "p1": setPassword1(e);
            break;

            case "p2": setPassword2(e);
            break;
        }
    }

    const disable = useMemo(()=>{ 
        return password1 === password2 && username.length > 3 && password1.length > 3;
    }, [username, password1, password2]);


    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password1 !== password2 || password1.length < 3) {
            window.alert("You screwed up");
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
                                <input name="username" type="text" onChange={(e) => updateInput("u", e.target.value)} required className="outline-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0f6313] sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={(e) => updateInput("p1", e.target.value)} name="password" type="password" required className="outline-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0f6313] sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={(e) => updateInput("p2", e.target.value)} name="confirmPassword" type="password" required className="outline-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0f6313] sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={!disable} className={disable == false ? 
                            "flex w-full justify-center rounded-md bg-[#0f6313] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#0f6313] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-[#0f6313] opacity-25" : 
                            "flex w-full justify-center rounded-md bg-[#0f6313] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#0f6313] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-[#0f6313]"}>
                                Create Account</button>
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
